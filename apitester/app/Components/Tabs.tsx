"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { addTab, removeTab } from '../features/tabs/tabsSlice'

const Tabs = () => {
  const dispatch = useDispatch()
  const tabs = useSelector((state: RootState) => state.tabs.value)
  const handleAddTab = () => {
    dispatch(addTab())
  }
  const handleRemoveTab = (tabid: string) => { 
    dispatch(removeTab(tabid))
  }
  return (
    <div className=' h-8 w-auto my-2  flex items-center overflow-x-auto '>
      <div className='  h-full overflow-scroll flex items-center gap-2'>
      {tabs.map((tab, index) => (
        <div key = {index} className='flex h-full   w-auto max-w-52 p-1  items-center bg-[#2d2b2b] rounded-lg'> <span className='text-[10px] ml-1'>{tab.method}</span> <span className='text-xs m-1 overflow-hidden
        '>{tab.title}{tab.tabid}</span> <span  onClick = {() => handleRemoveTab(tab.tabid)} className=''><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#B7B7B7"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg></span></div>
        

      ))}

      </div>
      
      
      
      <span onClick = {handleAddTab} className='h-full w-auto px-1 hover:bg-[#2d2b2b] rounded-lg flex items-center'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></span>
    </div>
  )
}

export default Tabs
