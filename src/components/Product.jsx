import React from 'react'
import {Card,Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import Rating from "./Rating"
function Product({item}) {
  console.log(item.imageSrc)
  return (
    <>
         <Card className='my-3 py-3 rounded'>
            <Link to={`/product/${item._id}`}>
            <Card.Img variant="top" src={item.imageSrc} />
      <Card.Body>
        <Card.Title className='product-title'>{item.name}</Card.Title>
        <Card.Text>
       {item.imageAlt}
        </Card.Text>
        <Card.Text>
          <Rating value={item.rating} text={`${item.reviewNum}`}/>
        </Card.Text>
        <Card.Text>
       ${item.price}
        </Card.Text>
        <Button variant="dark">Add to Cart</Button>
      </Card.Body>
            </Link>
     
    </Card>
    </>
  )
}

export default Product