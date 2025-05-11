import React, { useState,useEffect } from 'react'
import FormContainer from '../components/FormContainer.jsx'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from "../features/userApiSlice.js"
import {setCredentials} from "../features/authSlice.js"
import {toast}  from "react-toastify"
import Loader from "../components/Loader.jsx"

function Register() {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()

    const { userInfo } = useSelector(state => state.auth)
    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || '/'

    useEffect(() => {

        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(cpassword !== password){
            toast.error("Password Do Not Match!")
            return 
        }
        else{
            try {
                const res = await register({username,email,password}).unwrap();
                dispatch(setCredentials({...res}))
                navigate(redirect)
                } catch (err) {
                    toast.error(err?.data?.message || err.message)
                }
        }
      
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='username' className='my-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='username'
                        placeholder='Enter Username'
                        value={username}
                        onChange={e => setUserName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='cpassword' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={cpassword}
                        onChange={e => setCPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="dark" className="my-3">
                    Register
                </Button>
                {isLoading && <Loader/>}
            </Form>
            <Row className="py-3">
                <Col>
                    Already a member?<Link to={redirect ? `/login?redirect=${redirect}`: "/login"}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Register