import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: ({keyword,pageNumber}) => ({
                url: `${PRODUCTS_URL}/`,
                params:{
                    pageNumber,
                    keyword
                }
            }),
            providesTags:["Product"],
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`
        }),
        keepUnusedDataFor:5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: `${PRODUCTS_URL}/`,
                method:"POST",
            
        }),
        invalidatesTags:['Product']
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data._id}`,
                method:"PUT",
                body:data
            
        }),
        invalidatesTags:['Product']
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/`,
                method:"POST",
                body:data
            
        })
        }),
        deleteProduct:builder.mutation({
            query:(id)=>({
            url:`${PRODUCTS_URL}/${id}`,
            method:"DELETE"
            })
        }),
        createReviews: builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data._id}/reviews`,
                method:"POST",
                body:data
            })
        }),
        getTopProducts: builder.query({
            query:()=>({
            url:`${PRODUCTS_URL}/top`
            }),
            keepUnusedDataFor:5
        })
       
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery,useCreateProductMutation,useUpdateProductMutation,useUploadProductImageMutation ,useDeleteProductMutation,useCreateReviewsMutation,useGetTopProductsQuery} = productApiSlice 