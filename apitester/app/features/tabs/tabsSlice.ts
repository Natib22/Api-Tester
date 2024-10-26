import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { ResponseMetadata } from './tabsInterface';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';



export interface tabState {
  tabid: string;
  title: string;
  url: string;
  method: string;
  params: [string, string][];
  headers: [string, string][];
  sentStatus: boolean;
  response: (Array<object> | object)[]
  responseHeaders : object
  responseMetaData : ResponseMetadata
  requestMetaData : object
  error : FetchBaseQueryError | SerializedError | undefined
  isLoading : boolean


}

export interface TabsState {
  value: {
    [tabid: string]: tabState; // Hash map where tabid is the key
  };
  nextTabId: string;
  currTabId: string;
}

const responseMetaData : ResponseMetadata = {
        type: "",
        url: "",
        redirected: false,
        status: 0,
        ok: false,
        statusText: "",
        headers: new Headers(), // Create a new Headers object
        body: new ReadableStream(), // Create a new ReadableStream object
        bodyUsed: false,
      }


const initialState: TabsState = {
    value:{
       "0" : {tabid: "0", title: "untitled", url: ""  , method: "GET" , params: [["" , ""]] , headers :[["",""]] , sentStatus: false , response: [] , responseHeaders: {}  , responseMetaData : responseMetaData , requestMetaData : {} , error : undefined , isLoading : false},

    },

     
    nextTabId: "0",
    currTabId: "0",
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab : (state) => {
         const tabid: number = Number(state.nextTabId) + 1

        state.value[String(tabid)] = {tabid: String(tabid), title: "untitled", url: "", method: "GET" , params: [["", ""]] , headers :[["", ""]] , sentStatus: false , response: [] , responseHeaders: {} , responseMetaData : {
          type: "",
          url: "",
          redirected: false,
          status: 0,
          ok: false,
          statusText: "",
          headers: new Headers(), // Create a new Headers object
          body: new ReadableStream(), // Create a new ReadableStream object
          bodyUsed: false,
        }
   , requestMetaData : {} , error:undefined , isLoading: false}  
        state.nextTabId = String(tabid)

    },

   
    removeTab: (state, action: PayloadAction<string>) => {
        
        if (Object.keys(state.value).length > 1){
          delete state.value[action.payload]

        }
        else {
          state.value = {["0"] : {tabid: "0", title: "untitled", url: "", method: "GET" , params: [["", ""]] , headers :[["", ""]] , sentStatus: false , response: [] , responseHeaders:{} ,responseMetaData : {
            type: "",
            url: "",
            redirected: false,
            status: 0,
            ok: false,
            statusText: "",
            headers: new Headers(), // Create a new Headers object
            body: new ReadableStream(), // Create a new ReadableStream object
            bodyUsed: false,
          }
     , requestMetaData : {} , error:undefined , isLoading: false}}
        }
        if (action.payload === state.currTabId) {
          state.currTabId = Object.keys(state.value)[0]
          console.log(state.currTabId , "checking if the probkem is here" , Object.keys(state.value))
        }

        // need to handle the order or convert it to hashmap
        
        
    },
    changeActiveTabs : (state , action: PayloadAction<{ tabid: string }>) => {
      const { tabid } = action.payload
      state.currTabId = tabid

    },

    changeUrl : (state , action: PayloadAction<{ tabid: string; url: string }>) => {
      const { tabid , url} = action.payload
      // state.value = state.value.map((tab: tabState) => tab.tabid === tabid ? { ...tab, url } : tab  )
      state.value[tabid].url = url
       
    },

    changeMethod : (state , action: PayloadAction<{ tabid: string; method: string }>) => {
      const { tabid , method} = action.payload
      // state.value = state.value.map((tab: tabState) => tab.tabid === tabid ? { ...tab, method } : tab  )
      state.value[tabid].method = method


    },


    changeParams : (state , action: PayloadAction<{ tabid: string; params: [string, string]; index: number }>) => {
      const { tabid , params, index} = action.payload
      const tab = state.value[tabid];
  if (!tab) return; // If tab is not found, exit early

  // Handling params deletion
  if (params[0] === "" && params[1] === "") {
    if (index < tab.params.length - 1) {
      // Remove the param by filtering it out
      tab.params = tab.params.filter((_, i) => i !== index);
    } else if (index === tab.params.length - 1) {
      // Pop the last element if it is at the end
      tab.params.pop();
    }
  } else {
    // Ensure the index is within bounds, otherwise push a new param
    if (index < tab.params.length) {
      tab.params[index] = params;
    } else {
      tab.params.push(params); // Add new params if index is beyond current length
    }
    const temp: [string , string][] =[]
    for (const [key, value] of tab.params) {
      if (key !== "" || value !== "") {
      temp.push([key, value])
      }
    }
    temp.push(["", ""]) // Add an empty param at the end
    tab.params = temp
    // Add an empty param at the end
  }
      
     
    },


    changeHeaders : (state , action: PayloadAction<{ tabid: string; headers: [string, string]; index: number }>) => {

      const { tabid , headers, index} = action.payload
        const tab = state.value[tabid];
    if (!tab) return; // If tab is not found, exit early
  
    // Handling headers deletion
    if (headers[0] === "" && headers[1] === "") {
      if (index < tab.headers.length - 1) {
        // Remove the param by filtering it out
        tab.headers = tab.headers.filter((_, i) => i !== index);
      } else if (index === tab.headers.length - 1) {
        // Pop the last element if it is at the end
        tab.headers.pop();
      }
    } else {
      // Ensure the index is within bounds, otherwise push a new param
      if (index < tab.headers.length) {
        tab.headers[index] = headers;
      } else {
        tab.headers.push(headers); // Add new headers if index is beyond current length
      }
      const temp: [string , string][] =[]
      for (const [key, value] of tab.headers) {
        if (key !== "" || value !== "") {
        temp.push([key, value])
        }
      }
      temp.push(["", ""]) // Add an empty param at the end
      tab.headers = temp
  
    }
    
  },

  changeResponse : (state , action: PayloadAction<{ tabid: string; response: (Array<object> | object)[]
  }>) => {
    const { tabid , response} = action.payload
    if (Array.isArray(response)) {
      state.value[tabid].response = response
    }
    else{
      if (state.value[tabid].response.length > 0){
        state.value[tabid].response = []
      }
      state.value[tabid].response.push(response)

    }
    state.value[tabid].error = undefined
   
    

    
  
  },

  changeResponseStatus : (state , action: PayloadAction<{ tabid: string , status: boolean }>) =>  {
    const { tabid  , status} = action.payload
    state.value[tabid].sentStatus =  status

  },

   changeResponseHeaders : (state , action: PayloadAction<{ tabid: string , headers : object }>) => {
    const { tabid , headers}  = action.payload
    state.value[tabid].responseHeaders = headers
   },

   changeMetaData : (state , action: PayloadAction<{ tabid: string , response : ResponseMetadata , request : object }>) => {
    const { tabid , request , response}  = action.payload
    state.value[tabid].requestMetaData = request
    state.value[tabid].responseMetaData = response
    
   },
   changeLoadingStatus : (state , action: PayloadAction<{ tabid: string , status: boolean }>) => {
    const { tabid  , status} = action.payload
    state.value[tabid].isLoading = status
   },  
   changeError : (state , action: PayloadAction<{ tabid: string , error: FetchBaseQueryError | SerializedError }>) => {
    const { tabid  , error} = action.payload
    state.value[tabid].error = error
      // if ('status' in error && typeof error.status === 'number'){
      // state.value[tabid].responseMetaData.status = error.status;
      // }
      // else {
      //   state.value[tabid].responseMetaData.status = 404;
      // }

      // state.value[tabid].responseMetaData.status = 404;
    
   },


}
})

// Action creators are generated for each case reducer function
export const { addTab , removeTab , changeUrl , changeMethod , changeParams , changeHeaders , changeActiveTabs , changeResponse , changeResponseStatus , changeResponseHeaders , changeMetaData , changeError , changeLoadingStatus} = tabsSlice.actions

export default tabsSlice.reducer