import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { ResponseMetadata , RequestMetaData } from './tabsInterface';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';


export const prepareStateForMongoDB = (state: TabsState) => {
  return {
    ...state,
    value: Object.fromEntries(
      Object.entries(state.value).map(([key, tab]) => [
        key,
        {
          ...tab,
          responseMetaData: {
            ...tab.responseMetaData,
            // Manually set each responseMetaData field
            type: tab.responseMetaData.type || "",
            url: tab.responseMetaData.url || "",
            redirected: tab.responseMetaData.redirected || false,
            status: tab.responseMetaData.status || 0,
            ok: tab.responseMetaData.ok || false,
            statusText: tab.responseMetaData.statusText || "",
            headers: Object.fromEntries(tab.responseMetaData.headers.entries()), // Convert Headers
            body: null, // Remove ReadableStream (can't be serialized)
            bodyUsed: tab.responseMetaData.bodyUsed || false,
          },
          requestMetaData: {
            ...tab.requestMetaData,
            // Manually set each requestMetaData field
            method: tab.requestMetaData.method || "",
            url: tab.requestMetaData.url || "",
            headers: Object.fromEntries(tab.requestMetaData.headers.entries()), // Convert Headers
            destination: tab.requestMetaData.destination || "",
            referrer: tab.requestMetaData.referrer || "",
            referrerPolicy: tab.requestMetaData.referrerPolicy || "",
            mode: tab.requestMetaData.mode || "cors",
            credentials: tab.requestMetaData.credentials || "same-origin",
            cache: tab.requestMetaData.cache || "default",
            redirect: tab.requestMetaData.redirect || "follow",
            integrity: tab.requestMetaData.integrity || "",
            signal: undefined, // AbortSignal cannot be serialized
            bodyUsed: tab.requestMetaData.bodyUsed || false,
          },
        },
      ])
    ),
  };
};
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
  requestMetaData : RequestMetaData
  error : FetchBaseQueryError | SerializedError | undefined
  isLoading : boolean,
  body : string
  bodyError : string

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
  
const requestMetaDataClone: RequestMetaData = {
        method: "",
        url: "",
        headers: new Headers(), // or populate with specific headers
        destination: "",
        referrer: "",
        referrerPolicy: "",
        mode: "cors",
        credentials: "same-origin",
        cache: "default",
        redirect: "follow",
        integrity: "",
        signal: new AbortController().signal, // you may need to replace this with a real signal depending on use
        bodyUsed: false,
      };
      


const initialState: TabsState = {
    value:{
       "0" : {tabid: "0", title: "untitled", url: ""  , method: "GET" , params: [["" , ""]] , headers :[["",""]] , sentStatus: false , response: [] , responseHeaders: {}  , responseMetaData : responseMetaData , requestMetaData : requestMetaDataClone , error : undefined , isLoading : false , body : '{}' , bodyError : ''},

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

        state.value[String(tabid)] = {tabid: String(tabid), title: "untitled", url: "", method: "GET" , body : '{ }' , bodyError : '' ,  params: [["", ""]] , headers :[["", ""]] , sentStatus: false , response: [] , responseHeaders: {} , responseMetaData : responseMetaData
   , requestMetaData : requestMetaDataClone , error:undefined , isLoading: false}  
        state.nextTabId = String(tabid)

    },
    saveTabs: (state) => {
      
     
      const temp = prepareStateForMongoDB(state)
      console.log(temp.value["0"].responseMetaData)
      

      console.log(state.value["0"].responseMetaData)
      console.log("second")
      console.log(JSON.stringify(state))
      console.log(temp)
      
    },

   
    removeTab: (state, action: PayloadAction<string>) => {
        
        if (Object.keys(state.value).length > 1){
          delete state.value[action.payload]

        }
        else {
          state.value = {["0"] : {tabid: "0", title: "untitled", url: "", method: "GET" ,body : '' ,bodyError : '' ,  params: [["", ""]] , headers :[["", ""]] , sentStatus: false , response: [] , responseHeaders:{} ,responseMetaData : {
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
     , requestMetaData : requestMetaDataClone , error:undefined , isLoading: false}}
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

   changeMetaData : (state , action: PayloadAction<{ tabid: string , response : ResponseMetadata , request : RequestMetaData }>) => {
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
   changeBody : (state , action: PayloadAction<{ tabid: string , body: string }>) => {  
    const { tabid , body} = action.payload
    state.value[tabid].body = body
   },
   changeBodyError : (state , action: PayloadAction<{ tabid: string , error: string }>) => {
    const { tabid , error} = action.payload
    state.value[tabid].bodyError = error
   },


}
})

// Action creators are generated for each case reducer function
export const { changeBodyError ,  changeBody , addTab,saveTabs , removeTab , changeUrl , changeMethod , changeParams , changeHeaders , changeActiveTabs , changeResponse , changeResponseStatus , changeResponseHeaders , changeMetaData , changeError , changeLoadingStatus} = tabsSlice.actions

export default tabsSlice.reducer