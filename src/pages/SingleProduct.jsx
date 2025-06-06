import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from '../components/Rating'
import { useCreateReviewsMutation, useGetProductDetailsQuery } from '../features/ProductApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../features/CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Meta from '../components/Meta'
function SingleProduct() {
    const [qty, setQty] = useState(1)
    const { id } = useParams()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(id)
    const [createReview, { isLoading: loadingReview }] = useCreateReviewsMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, qty }))
        navigate("/cart")
    }


    const createReviewHandler = async (e) => {
        e.preventDefault()
        try {
            const data = {
                _id:id,
                rating,
                comment
            }
            await createReview(data).unwrap()
            refetch()
            toast.success("Review Submitted!")
            setRating(0)
            setComment("")
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }
    return (
        <>
            <Link to={"/"} className='btn btn-light my-3'>Go Back</Link>
            {isLoading ? (<Loader />) : error ? (<Message variant={"danger"}>{error?.data?.message || error.error}</Message>) : (
                <>
                <Meta title={product.name}/>
                    <Row>
                        <Col md={5}>
                            <Image src={product.imageSrc} alt={product.name} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3><Rating value={product.rating} text={`${product.reviewNum} reviews`} /></h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: {product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.imageAlt}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>{product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Qty
                                                </Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) => { setQty(Number(e.target.value)) }}
                                                    >
                                                        {[...Array(product.countInStock).keys()].map((x) => {
                                                            return <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        })}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col><strong>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button
                                            className='btn-block'
                                            variant='dark'
                                            type='button'
                                            disabled={product.countInStock === 0} onClick={handleAddToCart}>
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="review">
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map(review => {
                                    return <ListGroup.Item key={review._id}>
                                        <strong>{review.username}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>

                                    </ListGroup.Item>
                                })}
                                <ListGroup.Item>
                                    <h2>Write a customer review</h2>
                                    {loadingReview && <Loader/>}
                                    {userInfo ? (<Form onSubmit={createReviewHandler}>
                                        <Form.Group controlId='rating' className='my-2'>
                                      <Form.Label>Rating</Form.Label>
                                      <Form.Control
                                      as= "select"
                                      value={rating}
                                      onChange={e=>setRating(Number(e.target.value))}
                                      >
                                      <option >Select...</option>
                                      <option value={1}>1-Poor</option>
                                      <option value={2}>2-Fair</option>
                                      <option value={3}>3-Good</option>
                                      <option value={4}>4-Very Good</option>
                                      <option value={5}>5-Excellent</option>

                                      </Form.Control>

                                        </Form.Group>
                                        <Form.Group controlId='comment' className='my-2'>
                                        <Form.Label>
                                            Comment
                                        </Form.Label>
                                        <Form.Control
                                        as={"textarea"}
                                        rows={"3"}
                                        value={comment}
                                        onChange={e=>setComment(e.target.value)}
                                        >
                                        </Form.Control>
                                        </Form.Group>
                                        <Button
                                        disabled={loadingReview}
                                        type='submit'
                                         variant='dark'>Submit</Button>
                                    </Form>): (<Message>
                                        Please<Link to={"/login"}> log In</Link> to write a review
                                    </Message>)}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}


        </>
    )
}

export default SingleProduct