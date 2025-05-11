import React from 'react'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation} from '../../features/ProductApiSlice'
import { Button, Row, Col, Table } from 'react-bootstrap'
import { toast } from "react-toastify"
import { FaEdit, FaTrash ,FaCheck} from 'react-icons/fa'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Paginate from '../../components/Paginate'

function ProductList() {
    const {pageNumber} = useParams()
    const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber})
    const [createProduct, { isLoading: loadingCreateProduct }] = useCreateProductMutation()
    const [deleteProduct, { isLoading: LoadingDelete }] = useDeleteProductMutation()

    const deleteProductHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete product?")){
        try {
            await deleteProduct(id)
            refetch()
            toast.success("Product Deleted!")
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }
    }

    const createProductHandler = async () => {
        if (window.confirm("Are you sure you want to create a new product?")) {
            try {
                await createProduct()
                refetch()
                toast.success("Product Created Successfully!")
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }

    }


    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button className='my-3 btn-sm btn-dark' onClick={createProductHandler}>
                        Create Product
                    </Button>
                </Col>
            </Row>
            {loadingCreateProduct && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant={"danger"}>{error?.data?.message || error.error}</Message> : <>
                <Table striped responsive hover className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.products?.map((product) => {
                            return <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td><Link to={`/admin/product/${product._id}/edit`} className='btn btn-dark btn-sm mx-1'><FaEdit /></Link>
                                    <Button className='btn-danger btn-sm text-dark' onClick={() => deleteProductHandler(product._id)}><FaTrash /></Button>
                                </td>

                            </tr>
                        })}
                    </tbody>

                </Table>
               <Paginate pages={data?.pages} page={data?.page} isAdmin={true}/>
            </>}
        </>
    )
}

export default ProductList
