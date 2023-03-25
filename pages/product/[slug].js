import React, {useState, useRef} from "react";
import {client, urlFor} from '../../lib/client'
import getStripe from '../../lib/getStripe'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar, AiOutlineShopping, AiOutlineLeft } from "react-icons/ai";
import {TiDeleteOutline} from "react-icons/ti"
import {Product} from '../../components'
import { toast } from "react-hot-toast";
import Link from "next/link";
//import { useStateContext } from "../../context/StateContext";

const ProductDetails= ({product, products}) => {
    const cartRef = useRef()
    const {image, name, price, details} = product;
    const [index, setIndex] = useState(0)
    const [qty, setQty] = useState(1);
    const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  let foundProduct;
  let i;
    //const { decQty, incQty, qty} = useStateContext() || 0;

    const handleBuyNow = () => {
        onAdd(product, qty);
    
        setShowCart(true);
      }

    const handleCheckout = async () => {
        const stripe = await getStripe();
    
        const response = await fetch('/api/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItems),
        });
    
        if(response.statusCode === 500) return;
        
        const data = await response.json();
    
        toast.loading('Redirecting...');
    
        stripe.redirectToCheckout({ sessionId: data.id });
      }



    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
    
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
      }

    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        i = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id)
    
        if(value === 'inc') {
          setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
          setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if(value === 'dec') {
          if (foundProduct.quantity > 1) {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
          }
        }
      }

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
       
       setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
       setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
       
       if(checkProductInCart) {
         const updatedCartItems = cartItems.map((cartProduct) => {
           if(cartProduct._id === product._id) return {
             ...cartProduct,
             quantity: cartProduct.quantity + quantity
           }
         })
   
         setCartItems(updatedCartItems);
       } else {
         product.quantity = quantity;
         
         setCartItems([...cartItems, { ...product }]);
       }
   
       toast.success(`${qty} ${product.name} added to the cart.`);
     } 
   

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
      }
    
      const decQty = () => {
        setQty((prevQty) => {
          if(prevQty - 1 < 1) return 1;
         
          return prevQty - 1;
        });
      }
    
    return (
<div>
{/* navbar */}
<div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>PAPERBACK</Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => {setShowCart(true)}}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {showCart && ( <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button type="button" onClick={() => setShowCart(false)} className='btn'>Continue Shopping</button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item, index) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])}  className='cart-product-image'/>
              <div className="item-desc">
                <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                    <div>
                    <p className="quantity-desc">
                            <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
                                <AiOutlineMinus />
                            </span>
                            <span className="num">
                                {item.quantity}
                            </span>
                            <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <button type="button" className="remove-item" onClick={() => onRemove(item)}>
                        <TiDeleteOutline />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
            <div className="cart-bottom">
                <div className="total">
                    <h3>Subtotal: </h3>
                    <h3>${totalPrice}</h3>
                </div>
                <div className="btn-container">
                    <button type="button" className="btn" onClick={handleCheckout}>
                        Pay
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>) }
    </div>















        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[index])} className='product-detail-image' />
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => (<img src={urlFor(item)}  
                        className={i === index ? 'small-image selected-image': 'small-image'} 
                        onMouseEnter={() => setIndex(i)}
                        key={i}
                        
                        />))}
                    </div>
                </div>
                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details:</h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className="num">
                                {qty}
                            </span>
                            <span className="plus" onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                <div className="maylike-products-container track">
                    {products.map((item) => (<Product  key={item._id} product={item}/>))}
                </div>
                </div>
               
            </div>
        </div>


        </div>
    )
}


export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
          current
        }
      }
      `;

    const products = await client.fetch(query)
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'] [0]` //* stands for fetch all, so this means fetching all products in sanity dashboard
    const productsQuery ='*[_type == "product"]'
    const product = await client.fetch(query)
    const products = await client.fetch(productsQuery)
  
//   console.log(product)
    return {
      props: {products, product}
    }
  }

export default ProductDetails