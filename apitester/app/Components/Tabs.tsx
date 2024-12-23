"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { addTab, removeTab , changeActiveTabs } from '../features/tabs/tabsSlice'



const Tabs = () => {

  const dispatch = useDispatch()
  const tabs = useSelector((state: RootState) => state.tabs.value)
  const currTabId = useSelector((state: RootState) => state.tabs.currTabId)
  const handleAddTab = () => {
    dispatch(addTab())
  }
  const handleRemoveTab = (tabid: string , e: React.MouseEvent<HTMLSpanElement>) => { 
    e.stopPropagation()
    dispatch(removeTab(tabid))
    

  }
  const handleChangeTab = (tabid: string) => {
     
      dispatch(changeActiveTabs({tabid: tabid}))
      

  }
  return (
    <div className=' h-9 w-auto my-2  flex items-center overflow-x-auto '>
      <div className='  h-full overflow-scroll flex items-center gap-2'>
      {Object.values(tabs).map((tab, index) => (
        <div onClick={() => handleChangeTab(tab.tabid)} key = {index} className= {`flex h-full relative group   w-auto max-w-52 p-1  items-center ${currTabId == tab.tabid ? "bg-[#343232]" : "bg-lightgrey"} rounded-lg`}> <span className={`text-[8px] ml-1 ${tab.method == "GET" ? ("text-GET"): tab.method == "PUT" ? "text-PUT" : tab.method == "PATCH" ? ("text-PATCH"): tab.method == "DELETE" ? ("text-DELETE"): tab.method == "HEAD" ? ("text-GET"): tab.method == "POST" ? ("text-POST"): "" }`}>{tab.method}</span> <span className='text-xs m-1 overflow-hidden
        '>{tab.title}</span> <span  onClick = {(e) => handleRemoveTab(tab.tabid ,e)} className='hidden group-hover:block'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#B7B7B7"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg></span></div>
        

      ))}

      </div>
      
      
      
      <span onClick = {handleAddTab} className='h-full w-auto px-1 hover:bg-[#2d2b2b] rounded-lg flex items-center'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></span>
    </div>
  )
}

export default Tabs
