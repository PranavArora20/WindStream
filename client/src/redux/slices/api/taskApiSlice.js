import { apiSlice } from "../apiSlice";

const TASKS_URL = "/task";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: `${TASKS_URL}/dashboard`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Dashboard", "Users", "Task"],
    }),

    getAllTask: builder.query({
      query: ({ strQuery, isTrashed, search }) => ({
        url: `${TASKS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result) => [{ type: "Task", id: "LIST" }],
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Task", "Dashboard", { type: "Task", id: "LIST" }],
    }),

    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `${TASKS_URL}/duplicate/${id}`,
        method: "POST",
        body: {},
        credentials: "include",
      }),
      invalidatesTags: ["Task", "Dashboard", { type: "Task", id: "LIST" }],
    }),


    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/update/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Task", "Dashboard", { type: "Task", id: "LIST" }],
    }),

    trashTask: builder.mutation({
      query: ({ id }) => ({
        url: `${TASKS_URL}/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Task", "Dashboard", { type: "Task", id: "LIST" }],
    }),

    createSubTask: builder.mutation({
      query: ({ data, id }) => ({
        url: `${TASKS_URL}/create-subtask/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Task", "Dashboard", { type: "Task", id: "LIST" }],
    }),

    getSingleTask: builder.query({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),

    postTaskActivity: builder.mutation({
      query: ({ data, id }) => ({
        url: `${TASKS_URL}/activity/${id}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" },
        "Dashboard",
      ],
    }),
    
    deleteRestoreTask: builder.mutation({
      query: ({ id, actionType }) => ({
          url: `${TASKS_URL}/delete-restore/${id}?actionType=${actionType}`,
          method: "DELETE",
          credentials: "include",
      }),
      invalidatesTags: ["Task", "Dashboard", { type: "Task", id: "LIST" }],
  }),

  
  }),
});

export const { useTrashTaskMutation,
  useGetDashboardStatsQuery,
  useGetAllTaskQuery,
  useCreateTaskMutation,
  useDuplicateTaskMutation,
  useUpdateTaskMutation,
  useCreateSubTaskMutation,
  useGetSingleTaskQuery,
usePostTaskActivityMutation,
useDeleteRestoreTaskMutation } = taskApiSlice;
