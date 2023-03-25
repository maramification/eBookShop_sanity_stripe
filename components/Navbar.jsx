// import React, {useState, useRef} from "react";
// import Link from 'next/link'
// import {AiOutlineShopping, AiOutlineMinus, AiOutlinePlus, AiOutlineLeft} from 'react-icons/ai'
// import {TiDeleteOutline} from "react-icons/ti"
// import { toast } from "react-hot-toast"
// import { urlFor } from "../lib/client"
// // import {Cart} from './'
// // import { useStateContext } from '../context/StateContext'

// const Navbar = () => {
//   const cartRef = useRef()
//   const [showCart, setShowCart] = useState(false);
//   const [totalQuantities, setTotalQuantities] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [cartItems, setCartItems] = useState([]);



//   // const {showCart, setShowCart, totalQuantities} = useStateContext()
//   return (
//     <div className='navbar-container'>
//       <p className='logo'>
//         <Link href='/'>PAPERBACK</Link>
//       </p>
//       <button type='button' className='cart-icon' onClick={() => {setShowCart(true)}}>
//         <AiOutlineShopping />
//         <span className='cart-item-qty'>{totalQuantities}</span>
//       </button>
//       {showCart && ( <div className="cart-wrapper" ref={cartRef}>
//       <div className="cart-container">
//         <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
//           <AiOutlineLeft />
//           <span className="heading">Your Cart</span>
//           <span className="cart-num-items">({totalQuantities} items)</span>
//         </button>
//         {cartItems.length < 1 && (
//           <div className="empty-cart">
//             <AiOutlineShopping size={150} />
//             <h3>Your shopping bag is empty</h3>
//             <Link href='/'>
//               <button type="button" onClick={() => setShowCart(false)} className='btn'>Continue Shopping</button>
//             </Link>
//           </div>
//         )}
//         <div className="product-container">
//           {cartItems.length >= 1 && cartItems.map((item) => (
//             <div className="product" key={item_id}>
//               <img src={urlFor(item?.image[0])}  className='cart-product-image'/>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>) }
//     </div>
//   )
// }

// export default Navbar