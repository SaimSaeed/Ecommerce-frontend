import React from 'react'
import { useGetTopProductsQuery } from '../features/ProductApiSlice'
import Message from './Message'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from './Loader'
function ProductCarousel() {
    const {data:products,isLoading,error} = useGetTopProductsQuery()
    

    
  return (
    <>
   {isLoading ? <Loader/>:error ? <Message variant={"danger"}>{error?.data?.message || error.error}</Message>: <>
   <Carousel pause="hover" className='bg-dark mb-4'>
   {products.map((product)=>{
   return <Carousel.Item key={product._id}>
      <Link to={`/product/${product._id}`}>
      <Image src={product.imageSrc} fluid style={{height:"100vh"}}/>
      <Carousel.Caption className='carousel-caption'>
      <h2>{product.name} (${product.price})</h2>
      </Carousel.Caption>
      </Link>
    </Carousel.Item>
   })}
   </Carousel>
   </>}
    
    </>
  )
}

export default ProductCarousel