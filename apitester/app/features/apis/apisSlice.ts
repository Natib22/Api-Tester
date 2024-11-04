// apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const apiSlice = createApi({
  reducerPath: 'api', // The name of the slice
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // No specific base URL since it will be user input
  endpoints: (builder) => ({
    fetchDataFromUrl: builder.query({
      query: ({ url, params, headers }) => ({
        url: url + params,
        method: 'GET',
        headers: headers, // Custom headers passed to the request
      }),
      // Use transformResponse to include headers in the response
      transformResponse: (response : (Array<object> | object)[]  , meta) => {
        
        
        return {
          data: response, // The actual response data
          headers: meta?.response?.headers,
          
          response: meta?.response,
          request: meta?.request,

           // Headers from the response
        };
      },
    }),


    // DELETE request to delete data
    deleteDataFromUrl: builder.mutation({
      query: ({ url, params, headers }) => ({
        url: url + params,
        method: 'DELETE',
        headers: headers, // Custom headers passed to the request
      }),
      // Optional transformResponse for DELETE (if you want to handle the response)
      transformResponse: (response: object, meta) => {
        return {
          data: response, // The actual response data
          headers: meta?.response?.headers,
          response: meta?.response,
          request: meta?.request,
        };
      },
    }),

     // POST request to send data
     postDataToUrl: builder.mutation({
      query: ({ url, body, headers }) => ({
        url: url,
        method: 'POST',
        body: body, // The request payload
        headers: headers, // Custom headers if needed
      }),
      // Optional transformResponse for POST (if you want to handle the response)
      transformResponse: (response: object, meta) => {
        return {
          data: response,
          headers: meta?.response?.headers,
          response: meta?.response,
          request: meta?.request,
        };
      },
    }),


    // PUT request to update data
    putDataToUrl: builder.mutation({
      query: ({ url, body, headers }) => ({
        url: url,
        method: 'PUT',
        body: body, // The request payload
        headers: headers, // Custom headers if needed
      }),
      transformResponse: (response: object, meta) => {
        return {
          data: response,
          headers: meta?.response?.headers,
          response: meta?.response,
          request: meta?.request,
        };
      },
    }),



  }),
});
  
  // Export the hook to use it in the component
export const { useLazyFetchDataFromUrlQuery , useDeleteDataFromUrlMutation , usePostDataToUrlMutation , usePutDataToUrlMutation } = apiSlice;