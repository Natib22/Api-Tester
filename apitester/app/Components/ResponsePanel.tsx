import React, { useState } from 'react'
import { useSelector} from 'react-redux'
import { RootState } from '../store'

const Arrayrender = ({response} : {response : object[]})  => {
  const [line , setLine] = useState(0)

  return (
    <>
    {response.map((item, index) => (
      <div key={index} className="mb-4">
        {Object.entries(item).map(([key, value]) => (
          <div key={key} className='flex justify-between'>
             <p>{key}</p> < p className='text-yellow-400'>{JSON.stringify(value)}</p>
          </div>
        ))}
      </div>
    ))}
  </>
  )
}

const ResponsePanel = () => {
  // const tabs = useSelector((state: RootState) => state.tabs.value)
  
  const tabId = useSelector((state: RootState) => state.tabs.currTabId)
  const [activeTab, setActiveTab] = useState('')
  const sentStatus = useSelector((state: RootState) => state.tabs.value[tabId].sentStatus)
  const response = useSelector((state: RootState) => state.tabs.value[tabId].response)
  
  
  return (
    <div className='w-full flex flex-col max-pc:min-h-80  bg-lightgrey max-pc:rounded-lg pc:rounded-tr-lg pc:rounded-br-lg  overflow-hidden'>
      <div className='border-b-[0.5px] border-b-slate-600 border-opacity-40 h-12 flex items-center gap-3 px-7'> 
      
        <button className= {`btn btn-sm border-none h-[80%] ${activeTab == "Request" ? "bg-[#323030]" :"bg-transparent" }  w-28`}>Request</button>
        <button className= {`btn btn-sm border-none h-[80%] ${activeTab == "Response" ? "bg-[#323030]" :"bg-transparent" }  w-28`}>Response</button>

      </div>

      {
        sentStatus ? <div className='pc:overflow-scroll pc:max-h-[75vh] flex flex-col'> {Array.isArray(response) ? <Arrayrender response = {response} /> : <Objectrender response = {response} />  } </div> : <div className='m-auto flex flex-col items-center justify-center'> <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="90px" fill="#666666"><path d="m358-316 122-122 122 122 42-42-122-122 122-122-42-42-122 122-122-122-42 42 122 122-122 122 42 42ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z"/></svg> 
        <p className='text-[#666666]'>Not sent</p>
        </div>
      }
    </div>
  )
}

export default ResponsePanel
