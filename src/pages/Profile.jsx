import React, { useEffect, useState } from 'react'
import { useProfileMutation } from '../features/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { setCredentials } from '../features/authSlice'
import { useGetMyOrdersQuery } from '../features/orderApiSlice'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

function Profile() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()
    const {data:myOrders,isLoading,error}  = useGetMyOrdersQuery()

    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username)
            setEmail(userInfo.email)
        }

    }, [userInfo.username, userInfo.email, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== cPassword) {
            toast.error("Password Do Not Match!")
            return
        } else {
            try {
                const res = await updateProfile({ _id: userInfo._id, username, email, password }).unwrap()
                dispatch(setCredentials(res))
                toast.success("Profile Updated Successfully!")
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }



    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter Name...'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email' className='my-2'>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email...'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password' className='my-2'>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password...'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='cpassword' className='my-2'>
                        <Form.Label>
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password...'
                            value={cPassword}
                            onChange={e => setCPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='dark' className='my-2'>Update</Button>
                    {loadingUpdateProfile && <Loader />}
                </Form>
            </Col>
            <Col md={9}>
<h2>My Orders</h2>
{isLoading ? <Loader/> : error ? <Message variant={"danger"}>({error?.data?.message || error.error})</Message> : <>

<Table striped hover responsive className='table-sm'>
<thead>
    <tr>
        <th>ID</th>
        <th>DATE</th>
        <th>TOTAL</th>
        <th>PAID</th>
        <th>DELIVERED</th>
        <th></th>

    </tr>
</thead>
<tbody>
   {myOrders.map((item)=>{
    return <tr key={item._id}>
        <td>{item._id}</td>
        <td>{item.createdAt.substring(0,10)}</td>
        <td>{item.totalPrice}</td>
        <td>{item.isPaid? (item.paidAt.substring(0,10)): <FaTimes style={{color:"red"}}/>}</td>
        <td>{item.isDelivered? (item.deliveredAt.substring(0,10)): <FaTimes style={{color:"red"}}/>}</td>
        <td>
            <Link to={`/order/${item._id}`} className='btn-sm btn bg-dark text-white'>Details</Link>
        </td>




    </tr>
   })}
</tbody>

</Table>
</>}

            </Col>
        </Row>
    )
}

export default Profile