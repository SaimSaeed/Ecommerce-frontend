import { ORDERS_URL, PAYPAL_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
       
        createOrder: builder.mutation({
            query: (order) => ({
                url: `${ORDERS_URL}/`,
                method:"POST",
                credentials:"include",
                body:order
        })
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`
            }),
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: ({id,details}) => ({
                url: `${ORDERS_URL}/${id}/pay`,
                method:"PUT",
                body:{...details}
            })
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: `${PAYPAL_URL}`
            }),
            keepUnusedDataFor:5
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`
            }),
            keepUnusedDataFor:5
        }),
        getOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/`
            }),
            keepUnusedDataFor:5
        }),
        deliveredOrders: builder.mutation({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}/deliver`,
                method:'PUT'
            })
        })
    })
})


export const { useCreateOrderMutation,useGetOrderDetailsQuery,usePayOrderMutation,useGetPayPalClientIdQuery,useGetMyOrdersQuery,useGetOrdersQuery,useDeliveredOrdersMutation} = orderApiSlice 