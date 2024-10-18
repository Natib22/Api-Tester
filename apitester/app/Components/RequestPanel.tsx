"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { changeParams , changeHeaders } from '../features/tabs/tabsSlice'



const RequestPanel = ({tabId} :{tabId: string}) => {
  const [activeTab, setActiveTab] = useState('Params')
  const dispatch = useDispatch()
 
  // useEffect(() => {
  //   // Dispatch once when component mounts or when specific dependencies change
  //   dispatch(changeParams({ tabid: tabId, params: ["my", "21"], index: 0 }));
  // }, [tabId , dispatch]);
  

  
 
 const params = useSelector((state: RootState) => state.tabs.value[Number(tabId)].params || [["", ""]])
 const headers = useSelector((state:RootState) => state.tabs.value[Number(tabId)].headers || [["", ""]]) 


 useEffect(() => {

  console.log(params)


 },[params])


     

  return (
    <div className='w-full mb-2 min-h-[300px] pc:h-full bg-lightgrey flex flex-col rounded-lg'>
      <div className='border-b-[0.5px] border-b-slate-600 border-opacity-40 h-12 flex items-center gap-3 px-7'>
        <button className= "btn btn-sm h-[80%] bg-transparent w-20" aria-selected={activeTab == "Params"} role="tab" id= "Params" onClick={() => setActiveTab("Params")}> Params</button>
        <button  className="btn btn-sm h-[80%] bg-transparent w-20" aria-selected={activeTab == "Headers"} role="tab" id="Headers" onClick={() => setActiveTab("Headers")}>Headers</button>
        <button className="btn btn-sm h-[80%] bg-transparent w-20" aria-selected={activeTab == "Body"} role="tab" id="Body" onClick={() => setActiveTab("Body")}>Body</button>
        <button className="btn btn-sm h-[80%] bg-transparent w-20" aria-selected={activeTab == "Auth"} role="tab" id = "Auth" onClick={() => setActiveTab("Auth")}>Auth</button>
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
        
      </div>


       
      
    </div>
  )
}

export default RequestPanel
