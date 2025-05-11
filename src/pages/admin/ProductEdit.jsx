import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {  useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../features/ProductApiSlice'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

function ProductEdit() {
  const { id } = useParams()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [imageSrc, setImageSrc] = useState("")
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id)
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()
  const [uploadImage, { isLoading: loadingUpload }] = useUploadProductImageMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setDescription(product.description)
      setCategory(product.category)
      setBrand(product.brand)
      setImageSrc(product.imageSrc)
      setPrice(product.price)
      setCountInStock(product.countInStock)


    }
  }, [product])


  const updateHandler = async (e) => {
    e.preventDefault()
    const updatedProduct = {
      _id: id,
      name,
      description,
      category,
      brand,
      imageSrc,
      price,
      countInStock

    }

    const result = await updateProduct(updatedProduct)
    if (result.error) {
      toast.error(result.error)

    } else {
      toast.success("Product Updated!")
      navigate("/admin/productlist")
    }


  }


  const uploadImageHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadImage(formData).unwrap()
      toast.success(res.message)
      setImageSrc(res.image)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }


  


  return (
    <>
      <Link to={"/admin/productlist"} className='btn btn-sm btn-dark my-3'>
        Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? <Loader /> : error ? <Message variant={"danger"}>{error?.data?.message || error.error}</Message> : (
          <Form onSubmit={updateHandler}>
            <Form.Group>
              <Form.Label>
                Image
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image Url'
                value={imageSrc}
                onChange={(e) => { setImageSrc(e.target.value) }}
              >
              </Form.Control>
              <Form.Control
                type='file'
                onChange={uploadImageHandler}
              >

              </Form.Control>
            </Form.Group>
            {loadingUpload && <Loader/>}
            <Form.Group>
              <Form.Label>
                Name
              </Form.Label>
              <Form.Control
                type='name'
                placeholder=' Enter Name'
                value={name}
                onChange={e => setName(e.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Description
              </Form.Label>
              <Form.Control
                type='text'
                placeholder=' Enter Description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Category
              </Form.Label>
              <Form.Control
                type='text'
                placeholder=' Enter Category'
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Brand
              </Form.Label>
              <Form.Control
                type='text'
                placeholder=' Enter Brand'
                value={brand}
                onChange={e => setBrand(e.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Price
              </Form.Label>
              <Form.Control
                type='number'
                placeholder=' Enter Price'
                value={price}
                onChange={e => setPrice(e.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Stock
              </Form.Label>
              <Form.Control
                type='number'
                placeholder=' Enter Stock'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Button type='submit' variant='dark' className='my-2 btn-sm'>Update</Button>
          </Form>)}
      </FormContainer>
    </>
  )
}

export default ProductEdit