import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useGetSingleUserQuery, useUpdateUserMutation } from '../../features/userApiSlice'

function ProductEdit() {
    const { id } = useParams()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [isadmin, setIsAdmin] = useState(null)
    const { data: user, isLoading, error,refetch } = useGetSingleUserQuery(id)
    const [updateUser, { isLoading: loadingUpdateUser }] = useUpdateUserMutation()


    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user])


    const updateHandler = async (e) => {
        e.preventDefault()
        const data = {
            _id: id,
            username,
            email,
            isAdmin: isadmin
        }
        const result = await updateUser(data)
        refetch()
        if (result.error) {
            toast.error(result.error)

        } else {
            toast.success("User Updated!")
            navigate("/admin/userlist")
        }


    }







    return (
        <>
            <Link to={"/admin/userlist"} className='btn btn-sm btn-dark my-3'>
                Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                <Form onSubmit={updateHandler}>
                    <Form.Group>
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control
                            type='name'
                            placeholder=' Enter Name'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder=' Enter Description'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Admin</Form.Label>
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="Admin ON/OFF"
                            checked={isadmin}
                            onChange={(e => setIsAdmin(e.target.checked))}
                        />
                        <p>Admin is {isadmin ? "On" : "Off"}</p>
                        {/* <Form.Control
                        type='radio'
                        onClick={()=>setAdmin(true)}/>
                    
                        <Form.Control
                        type='radio'
                        onClick={()=>setAdmin(false)}/> */}
                    </Form.Group>

                    <Button type='submit' variant='dark' className='my-2 btn-sm'>Update</Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default ProductEdit