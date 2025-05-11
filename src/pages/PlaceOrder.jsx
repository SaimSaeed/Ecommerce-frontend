import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import Message from '../components/Message'
import { useCreateOrderMutation } from '../features/orderApiSlice'
import Loader from '../components/Loader'
import { clearCartItems } from '../features/CartSlice'
import { toast } from 'react-toastify'

function PlaceOrder() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const [createOrder, { isLoading, error }] = useCreateOrderMutation()
    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate("/shipping")
        } else if (!cart.paymentMethod) {
            navigate("/payment")
        }
    }, [cart.shippingAddress, cart.paymentMethod, navigate])


    const handlePayment = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap()
            dispatch(clearCartItems())
            navigate(`/order/${res._id}`)
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItemslength === 0 ? (
                                <Message>
                                    Your Cart is Empty
                                </Message>
                            ) : (
                                <ListGroup variant='flush'>

                                    {cart.cartItems.map((item, index) => {
                                        return <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.imageSrc} alt={item.imageAlt} fluid />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    })}

                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>

                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Items:
                                    </Col>
                                    <Col>
                                        ${cart.itemPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping Price:
                                    </Col>
                                    <Col>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax Price:
                                    </Col>
                                    <Col>
                                        ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total Price:
                                    </Col>
                                    <Col>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message>{error?.data?.message || error.error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item className='text-center'>
                                <Button type='button'
                                    variant='dark'
                                    disabled={cart.cartItems.length === 0}
                                    onClick={handlePayment}
                                >Place Order</Button>
                                {isLoading && <Loader />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default PlaceOrder