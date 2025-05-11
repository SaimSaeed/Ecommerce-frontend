import React from 'react'
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../features/userApiSlice'
import { Button, Row, Col, Table } from 'react-bootstrap'
import { toast } from "react-toastify"
import { FaEdit, FaTrash, FaTimes, FaCheck, } from 'react-icons/fa'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { Link } from 'react-router-dom'

function UserList() {
    const { data: users, isLoading, error, refetch } = useGetAllUsersQuery()
    const [deleteUser] = useDeleteUserMutation()

    const deleteUserHandler = async (id) => {
        if (window.confirm("Are You Sure You Want To Delete User?")) {
            try {
                await deleteUser(id)
                refetch()
                toast.success("User Deleted Successfully!")
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }


    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Users</h1>
                </Col>
            </Row>
            {isLoading ? <Loader /> : error ? <Message variant={"danger"}>{error?.data?.message || error.error}</Message> : <>
                <Table striped responsive hover className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? <FaCheck color='green' /> : <FaTimes color='red' />}</td>
                                <td><Link to={`/admin/user/${user._id}/edit`} className='btn btn-dark btn-sm mx-1'><FaEdit /></Link>
                                    <Button className='btn-danger btn-sm text-dark' onClick={() => deleteUserHandler(user._id)}><FaTrash /></Button>
                                </td>

                            </tr>
                        })}
                    </tbody>

                </Table>

            </>}
        </>
    )
}

export default UserList