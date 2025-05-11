import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                credentials: "include",
                body: data

            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/`,
                method: "POST",
                credentials: "include",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
                credentials: "include"
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data
            })
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}/`
            }),
            keepUnusedDataFor:5,
            invalidatesTags:["User"]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method:"DELETE"
            })
        }),
        getSingleUser: builder.query({
            query:(id)=>({
                url:`${USERS_URL}/${id}`
            
            }),
            keepUnusedDataFor:5
        }),
        updateUser: builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/${data._id}`,
                method:"PUT",
                body:data
            })
        })
    })
})


export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetAllUsersQuery ,useDeleteUserMutation,useGetSingleUserQuery,useUpdateUserMutation} = userApiSlice 