import React, { useState,useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from "../features/userApiSlice.js"
import {setCredentials} from "../features/authSlice.js"
import {toast}  from "react-toastify"
import Loader from "../components/Loader.jsx"

function Login() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

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
        try {
        const res = await login({username,password}).unwrap();
        dispatch(setCredentials({...res}))
        navigate(redirect)
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
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
                <Button type="submit" variant="dark" className="my-3">
                    Sign In
                </Button>
                {isLoading && <Loader/>}
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer?<Link to={redirect ? `/register?redirect=${redirect}`: "/register"}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Login