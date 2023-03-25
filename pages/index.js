import React from 'react'
import {Product, FooterBanner, HeroBanner, Footer} from '../components'
import {client} from '../lib/client'

const Home = ({products, bannerData}) => {
  return (
    <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

    <div className='products-heading'>
      <h2>Best Selling Books</h2>
      <p>Our Most Popular</p>
    </div>
    <div className='products-container'>
      {products?.map((product) => <Product  key={product._id} product={product}/>)}
    </div>
   <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]' //* stands for fetch all, so this means fetching all products in sanity dashboard
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]' 
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {products, bannerData}
  }
}

export default Home
