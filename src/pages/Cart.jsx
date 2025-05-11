import React from 'react'
import { Col, ListGroup, Row,Image,Form,Button,Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { FaTrash } from 'react-icons/fa'
import { addToCart ,removeFromCart} from '../features/CartSlice'
function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    const addtoCartHandler = (product,qty)=>{
        dispatch(addToCart({...product,qty}))
    }
    
    const handleDeleteFromCart = (id)=>{
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = ()=>{
   navigate("/login?redirect=/shipping")
    }
    return (
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
                <Link to={"/"} className='btn btn-light mb-2'>Go Back</Link>
                {cartItems.length === 0 ?
                    (<Message>
                        Your Cart is empty <Link to={"/"} style={{color:"#0d6efd",textDecoration:"underline"}}>Go Back</Link>
                    </Message>) :
                    (<ListGroup variant='flush'>
                        {
                            cartItems.map((item) => {
                                return <ListGroup.Item key={item._id}>
                                    <Row>
                                        <Col md={2}>
                                        <Image src={item.imageSrc} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                        ${item.price}
                                        </Col>
                                        <Col md={2}>
                                        <Form.Control
                                            as="select"
                                             value={item.qty}
                                             onChange={(e)=>{addtoCartHandler(item, Number(e.target.value))}}
                                            >
                                           {[...Array(item.countInStock).keys()].map((x)=>{
                                            return <option key={x+1} value={x+1}>
                                        {x+1}
                                            </option>
                                           })}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                        <Button type="button" variant="light"><FaTrash onClick={()=>handleDeleteFromCart(item._id)}/></Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            })
                        }

                    </ListGroup>)
                }
            </Col>
            <Col md={4}>
            <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Sub Total ({cartItems.reduce((acc,item)=> acc += item.qty,0)}) Items</h2>
                    ${cartItems.reduce((acc,item)=>acc += item.qty * item.price,0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button type='button' variant='dark' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                   Proceed To Checkout
                    </Button>
                </ListGroup.Item>
                </ListGroup>
            </Card>
            </Col>
        </Row>
    )
}

export default Cart