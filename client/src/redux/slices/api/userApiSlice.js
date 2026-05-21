import { apiSlice } from "../apiSlice";

const USER_URL = "/user";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Users", "Dashboard"],
        }),


        getTeamList: builder.query({
            query: () => ({
                url: `${USER_URL}/get-team`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Users"],
        }),
       
       
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Users", "Dashboard"],
        }),
       
       
        userAction: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Users", "Dashboard"],
        }),


        getNotifications: builder.query({
            query: () => ({
                url: `${USER_URL}/notifications`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Notifications"],
        }),
        
        
        
        markNotiAsRead: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`,
                method: "PUT",
                body:data,
                credentials: "include",
            }),
            invalidatesTags: ["Notifications", "Dashboard"],
        }),
        
        
        changePassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/change-password`,
                method: "PUT",
                body:data,
                credentials: "include",
            }),
            invalidatesTags: ["Users"],
        }),

    }),
});


export const { useUpdateUserMutation, useUserActionMutation, useDeleteUserMutation, useGetTeamListQuery, useMarkNotiAsReadMutation, useGetNotificationsQuery, useChangePasswordMutation } = userApiSlice;
