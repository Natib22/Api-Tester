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
  }),
});
  
  // Export the hook to use it in the component
export const { useLazyFetchDataFromUrlQuery } = apiSlice;