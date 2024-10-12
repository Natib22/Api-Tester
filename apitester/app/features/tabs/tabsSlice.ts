import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface tabState {
    tabid : string,
  title : string,
    url : string,
    method : string,

}

export interface TabsState {
    value: tabState[]
    currentTabId: string
    
}

const initialState: TabsState = {
    value: [{tabid: "1", title: "untitled", url: "https://love.com"  , method: "GET"}],
    currentTabId: "1"
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab : (state) => {
         const tabid: number = Number(state.currentTabId) + 1

        state.value.push({tabid: String(tabid), title: "untitled", url: "https://love.com", method: "GET"})
        state.currentTabId = String(tabid)

    },
   
    removeTab: (state, action: PayloadAction<string>) => {
        state.value = state.value.filter((tab : tabState) => tab.tabid !== action.payload)
    },
    changeUrl : (state , action: PayloadAction<{ tabid: string; url: string }>) => {
      const { tabid , url} = action.payload
      state.value = state.value.map((tab: tabState) => tab.tabid === tabid ? { ...tab, url } : tab  )
       
    }
  },
})

// Action creators are generated for each case reducer function
export const { addTab , removeTab , changeUrl} = tabsSlice.actions

export default tabsSlice.reducer