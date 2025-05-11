import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useDeliveredOrdersMutation } from '../features/orderApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import {PayPalButtons,usePayPalScriptReducer} from "@paypal/react-paypal-js"
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'



function OrderDetail() {
    const { id } = useParams()
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(id)
    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()
    const [{isPending},paypalDispatch] = usePayPalScriptReducer()
    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery()
    const [deliveredOrder,{isLoading: LoadingDeliver}] = useDeliveredOrdersMutation()
    const {userInfo} = useSelector(state=>state.auth)
  

    useEffect(() => {
      if(!errorPayPal && !loadingPayPal && paypal.clientId){
        const loadPayPalScript = async ()=>{
         paypalDispatch({
            type:'resetOptions',
            value:{
                'clientId': paypal.clientId,
                currency:"USD"
            }
         });
         paypalDispatch({type:'setLoadingStatus',value:'pending'})
        }
        if(order && !order.isPaid){
            if(!window.paypal){
                loadPayPalScript()
            }
        }
      }
    }, [order,paypal,paypalDispatch,loadingPayPal,errorPayPal])
    

   function onApprove(data,actions){
    return actions.order.capture().then( async function (details){
        try {
            await payOrder({id,details})
            refetch()
            toast.success("Payment SuccessFul!")
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    })
   }
//    async function  onApproveTest(){
//     await payOrder({id,details:{payer:{}}})
//     refetch()
//     toast.success("Payment SuccessFul!")
//    }
   function createOrder(data,actions){
    return actions.order.create({
        purchase_units:[
            {
                amount:{
                    value:order.totalPrice
                }
            }
        ]
    }).then((id)=>{
       return id
    })
   }
   function onError(err){
    toast.error(err?.data?.message || err.message)
   }


   const deliveredOrderHandler = async ()=>{
      try {
        await deliveredOrder(id)
        refetch()
        toast.success("Order Marked as Delivered!")
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
   }



    return (
        <div>{isLoading ? <Loader /> : error ? <Message variant={"danger"}>{error?.data?.message || error.error}</Message> :
            <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>{order.user.username}
                                </p>
                                <p>
                                    <strong>Email: </strong>{order.user.email}
                                </p>
                                <p>
                                    <strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (<Message variant={"success"}>
                                    Delivered on {order.deliveredAt}
                                </Message>) : (<Message variant={"danger"}>Not Delivered</Message>)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>{order.paymentMethod}
                                </p>
                                {order.isPaid ? (<Message variant={"success"}>
                                    Paid on {order.paidAt}
                                </Message>) : (<Message variant={"danger"}>Not Paid</Message>)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
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
                                ))}
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
                                            Items
                                        </Col>
                                        <Col>
                                            ${order.itemsPrice}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            Shipping
                                        </Col>
                                        <Col>
                                            ${order.shippingPrice}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            Tax
                                        </Col>
                                        <Col>
                                            ${order.taxPrice}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            Total
                                        </Col>
                                        <Col>
                                            ${order.totalPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                               {
                                !order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader/>}
                                        {isPending ? <Loader/> :(
                                            <div>
                                                {/* <Button onClick={onApproveTest} style={{marginBottom:"10px"}}>Test Button</Button> */}
                                                <div>
                                                <PayPalButtons
                                                createOrder={createOrder}
                                                onApprove={onApprove}
                                                onError={onError}
                                                >
                                                    
                                                </PayPalButtons>
                                            </div>
                                            </div>
                                            
                                        )}
                                    </ListGroup.Item>
                                )
                               }
                               {LoadingDeliver && <Loader/>}
                               {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered
                               && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block btn-dark' onClick={deliveredOrderHandler}>
                                Mark As Delivered
                                    </Button>
                                </ListGroup.Item>
                               )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>



            </>}</div>
    )
}

export default OrderDetail