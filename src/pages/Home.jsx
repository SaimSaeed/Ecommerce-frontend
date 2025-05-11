import React from 'react'
import {Row,Col} from "react-bootstrap"
import Product from '../components/Product'
import { useGetProductsQuery } from '../features/ProductApiSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
function Home() {
const {pageNumber,keyword} = useParams()
 const {data,isLoading,error} = useGetProductsQuery({pageNumber,keyword});
 
  return (
    <>
    {!keyword ? <ProductCarousel/> : <Link to={"/"} className='btn btn-dark btn-sm mb-4'>Go Back</Link>}
  {isLoading ? (
    <Loader/>
  ) : error ? (<Message variant={"danger"}>{error?.data?.message || error.error}</Message>): (<>
  <Meta/>
  <h1 className='text-center'>Latest Products</h1>
  <Row>
  {data?.products?.map(item=>{
      return <Col sm={12} md={6} lg={4} xl={3}>
       <Product  key={item._id} item={item}/>
      </Col>
  })}
      
  </Row>
  <Paginate 
  pages={data?.pages}
  page={data?.page}
  keyword= {keyword ? keyword : ""}
  />
 
 
  </>
  )}

    </>
  )
}

export default Home