import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../features/CartSlice'
function Payment() {
    const [payment, setPayment] = useState("PayPal")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    useEffect(() => {
        if (!shippingAddress) {
            navigate("/shipping")
        }


    }, [shippingAddress, navigate])

    const handlePayment = (e) => {
        e.preventDefault()
    dispatch(savePaymentMethod(payment))
    navigate("/placeorder")
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={handlePayment}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            className='my-2'
                            id='paypal'
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e => setPayment(e.target.value))}
                        >
                        </Form.Check>
                    </Col>

                    <Button type='submit' variant='dark'>Continue</Button>
                </Form.Group>
            </Form>
        </FormContainer>
    )
}

export default Payment