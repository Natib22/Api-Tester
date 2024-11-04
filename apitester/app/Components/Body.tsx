import React  from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { RootState } from '../store'
import { changeBody } from '../features/tabs/tabsSlice'



const Body = () => {
    const tabId = useSelector((state: RootState) => state.tabs.currTabId)
    const body = useSelector((state: RootState) => state.tabs.value[tabId].body)
    console.log(tabId , body)
    
    const dispatch = useDispatch()

  return (
    <div>
        <textarea
          className='w-full h-96 bg-lightgrey border-none p-4 text-sm outline-none'
          placeholder='Enter your request body here'
          onChange={(e) => dispatch(changeBody({ tabid: tabId, body: e.target.value }))}
          aria-placeholder='{}'
        >
            
            
        </textarea>

      
    </div>
  )
}

export default Body