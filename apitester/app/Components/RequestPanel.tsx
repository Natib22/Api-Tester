"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { changeParams } from '../features/tabs/tabsSlice'



const RequestPanel = ({tabId} :{tabId: string}) => {
  const [activeTab, setActiveTab] = useState('Params')
  const dispatch = useDispatch()
  const [index, setIndex] = useState(3)
  useEffect(() => {
    // Dispatch once when component mounts or when specific dependencies change
    dispatch(changeParams({ tabid: tabId, params: ["my", "21"], index: index }));
  }, [dispatch , index]);

  
 
 const params = useSelector((state: RootState) => state.tabs.value[Number(tabId)].params)
 console.log(params)


     

  return (
    <div className='w-full mb-2 min-h-[300px] pc:h-full bg-lightgrey flex flex-col rounded-lg'>
      <div className='border-b-[0.5px] border-b-slate-600 border-opacity-40 h-12 flex gap-3'>
        <button aria-selected={activeTab == "Params"} role="tab" id= "Params" onClick={() => setActiveTab("Params")}> Params</button>
        <button aria-selected={activeTab == "Headers"} role="tab" id="Headers" onClick={() => setActiveTab("Headers")}>Headers</button>
        <button aria-selected={activeTab == "Body"} role="tab" id="Body" onClick={() => setActiveTab("Body")}>Body</button>
        <button aria-selected={activeTab == "Auth"} role="tab" id = "Auth" onClick={() => setActiveTab("Auth")}>Auth</button>
      </div>
      

      <div className=' flex flex-grow flex-col'>
      <div
          id="params-panel"
          role="tabpanel"
          aria-labelledby="tab-1"
          hidden={activeTab !== 'Params'}
          className=""
        >
          {params.map((param, index) => (
            <div className='flex px-4 mx-5  border-opacity-50  border-b-gray-600 border-b-[0.05px] h-12  hover:bg-[#2d2b2b]' >  
            <input
                  type="checkbox"
                  
                  className="mr-2 outline-none border-none"
                  id="toggle-checkbox"
                />

            <input 
            id= {`tab1-input-${index}`}
            name= {`${tabId}-${index}`}
            value={params[index][0]}
            key={index}
            onChange={(e) => dispatch(changeParams({ tabid: tabId, params: [e.target.value, params[index][1]], index: index }))}
            className='w-2/5 outline-none bg-transparent'
            placeholder='name'
            
          />
          <input 
            id= {`tab1-input-${index}`}
            name= {`${tabId}-${index}`}
            value={params[index][1]}
            key={index}
            onChange={(e) => dispatch(changeParams({ tabid: tabId, params: [params[index][0], e.target.value], index: index }))}
            className='w-2/5 flex-grow outline-none bg-transparent'
            placeholder='value'
          />
           </div>
           
          ))}
          
          {/* <input
            id="tab1-input"
            type="text"
            value={tab1Input}
            onChange={(e) => setTab1Input(e.target.value)}
          /> */}
        </div>
        
      </div>


       
      
    </div>
  )
}

export default RequestPanel
