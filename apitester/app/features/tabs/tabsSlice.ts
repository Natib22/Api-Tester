import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface tabState {
    tabid : string,
  title : string,
    url : string,
    method : string,
    params : [ string, string][], 
    headers : [ string, string][],

}

export interface TabsState {
    value: tabState[]
    currentTabId: string
    
}

const initialState: TabsState = {
    value: [{tabid: "0", title: "untitled", url: "https://love.com"  , method: "GET" , params: [["" , ""]] , headers :[["",""]]}],
    currentTabId: "0"
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab : (state) => {
         const tabid: number = Number(state.currentTabId) + 1

        state.value.push({tabid: String(tabid), title: "untitled", url: "https://love.com", method: "GET" , params: [["", ""]] , headers :[["", ""]]})
        state.currentTabId = String(tabid)

    },

   
    removeTab: (state, action: PayloadAction<string>) => {
        state.value = state.value.filter((tab : tabState) => tab.tabid !== action.payload)
    },

    changeUrl : (state , action: PayloadAction<{ tabid: string; url: string }>) => {
      const { tabid , url} = action.payload
      state.value = state.value.map((tab: tabState) => tab.tabid === tabid ? { ...tab, url } : tab  )
       
    },

    changeMethod : (state , action: PayloadAction<{ tabid: string; method: string }>) => {
      const { tabid , method} = action.payload
      state.value = state.value.map((tab: tabState) => tab.tabid === tabid ? { ...tab, method } : tab  )


    },


    changeParams : (state , action: PayloadAction<{ tabid: string; params: [string, string]; index: number }>) => {
      const { tabid , params, index} = action.payload
      const tab = state.value.find((tab) => tab.tabid === tabid);
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
        const tab = state.value.find((tab) => tab.tabid === tabid);
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
  
  },
})

// Action creators are generated for each case reducer function
export const { addTab , removeTab , changeUrl , changeMethod , changeParams , changeHeaders} = tabsSlice.actions

export default tabsSlice.reducer