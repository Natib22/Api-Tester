"use client"
import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { changeParams , changeHeaders } from '../features/tabs/tabsSlice'
import Body from './Body'



const RequestPanel = () => {
  const tabId = useSelector((state: RootState) => state.tabs.currTabId)
  const [activeTab, setActiveTab] = useState('Params')
  const dispatch = useDispatch()
 
 
 const params = useSelector((state: RootState) => state.tabs.value[tabId].params || [["", ""]])
 const headers = useSelector((state:RootState) => state.tabs.value[tabId].headers || [["", ""]]) 




     

  return (
    <div className='max-pc:w-full pc:w-40%  mb-2 min-h-[300px] pc:h-full bg-lightgrey flex flex-col pc:rounded-tl-lg pc:border-r-[0.5px] pc:border-opacity-40 pc:rounded-bl-lg pc:border-r-slate-600 max-pc:rounded-lg'>
      <div className='border-b-[0.5px] border-b-slate-600 border-opacity-40 h-12 flex items-center gap-3 px-7'>
        <button className= {`btn btn-sm border-none h-[80%] ${activeTab == "Params" ? "bg-[#323030]" :"bg-transparent" }  w-20`} aria-selected={activeTab == "Params"} role="tab" id= "Params" onClick={() => setActiveTab("Params")}> Params</button>
        <button  className={`btn btn-sm border-none h-[80%] ${activeTab == "Headers" ? "bg-[#323030]" :"bg-transparent" }  w-20`} aria-selected={activeTab == "Headers"} role="tab" id="Headers" onClick={() => setActiveTab("Headers")}>Headers</button>
        <button className={`btn btn-sm border-none h-[80%] ${activeTab == "Body" ? "bg-[#323030]" :"bg-transparent" } w-20`} aria-selected={activeTab == "Body"} role="tab" id="Body" onClick={() => setActiveTab("Body")}>Body</button>
        <button className={`btn btn-sm border-none h-[80%] ${activeTab == "Auth" ? "bg-[#323030]" :"bg-transparent" }  w-20`} aria-selected={activeTab == "Auth"} role="tab" id = "Auth" onClick={() => setActiveTab("Auth")}>Auth</button>
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
            <div key = {index} className='flex items-center px-4 mx-5  border-opacity-50  border-b-gray-600 border-b-[0.05px] h-12  hover:bg-[#2d2b2b]' >  
            <input
                  type="checkbox"    
                  className="mr-2 appearance-none w-4 h-4 border-[1px] border-gray-500 rounded-md checked:bg-green-400 checked:border-transparent focus:ring-2 focus:ring-neutral-content outline-none transition duration-300 ease-in-out relative checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:absolute checked:font-black  checked:before:left-[1px] checked:before:top-0"
                  id="toggle-checkbox"
                />

            <input 
            id= {`tab1-input-${index}`}
            name= {`${tabId}-${index}`}
            value={param[0]}
            key={index}
            onChange={(e) => dispatch(changeParams({ tabid: tabId, params: [e.target.value, param[1]], index: index }))}
            className='w-2/5 outline-none bg-transparent placeholder:font-light placeholder:text-sm  placeholder:opacity-40'
            placeholder='name'
            
          />
          <input 
            id= {`tab1-input-${index}`}
            name= {`${tabId}-${index}`}
            value={param[1]}
            key={-index - 1}
            onChange={(e) => dispatch(changeParams({ tabid: tabId, params: [param[0], e.target.value], index: index }))}
            className='w-2/5 flex-grow outline-none bg-transparent  placeholder:opacity-40 placeholder:text-sm placeholder:font-light'
            placeholder='value'
          />
           </div>
           
          ))}
          
          
        </div>

        <div
          id="headers-panel"
          role="tabpanel"
          aria-labelledby="tab-2"
          hidden={activeTab !== 'Headers'}
          className=""
        >
          {headers.map((header, index) => (
            <div key = {index} className='flex items-center px-4 mx-5  border-opacity-50  border-b-gray-600 border-b-[0.05px] h-12  hover:bg-[#2d2b2b]' >  
            <input
                  type="checkbox"    
                  className="mr-2 appearance-none w-4 h-4 border-[1px] border-gray-500 rounded-md checked:bg-green-400 checked:border-transparent focus:ring-2 focus:ring-neutral-content outline-none transition duration-300 ease-in-out relative checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:absolute checked:font-black  checked:before:left-[1px] checked:before:top-0"
                  id="toggle-checkbox"
                />

            <input 
            id= {`tab1-input-${index}`}
            name= {`${tabId}-${index}`}
            value={header[0]}
            key={index}
            onChange={(e) => dispatch(changeHeaders({ tabid: tabId, headers: [e.target.value, header[1]], index: index }))}
            className='w-2/5 outline-none bg-transparent placeholder:font-light placeholder:text-sm  placeholder:opacity-40'
            placeholder='name'
            
          />
          <input 
            id= {`tab1-input-${index}`}
            name= {`${tabId}-${index}`}
            value={header[1]}
            key={-index - 1}
            onChange={(e) => dispatch(changeHeaders({ tabid: tabId, headers: [header[0], e.target.value], index: index }))}
            className='w-2/5 flex-grow outline-none bg-transparent  placeholder:opacity-40 placeholder:text-sm placeholder:font-light'
            placeholder='value'
          />
           </div>
           
          ))}
          
          
        </div>

        <div
        id  = "body-panel"
        role="tabpanel"
        aria-labelledby="tab-3"
        hidden={activeTab !== 'Body'}>
          <Body  />

        </div>

        
      </div>


       
      
    </div>
  )
}

export default RequestPanel
