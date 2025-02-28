import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

import Arrayrender from './Arrayrender'
import Objectrender from './Objectrender'



const ResponsePanel = () => {
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('');


  const tabId = useSelector((state: RootState) => state.tabs.currTabId);
  
  const sentStatus = useSelector((state: RootState) => state.tabs.value[tabId].sentStatus);
  const response = useSelector((state: RootState) => state.tabs.value[tabId].response);
  const errorObj = useSelector((state: RootState) => state.tabs.value[tabId].error);
  const responseMetaData = useSelector((state: RootState) => state.tabs.value[tabId].responseMetaData);
  const bodyError = useSelector((state: RootState) => state.tabs.value[tabId].bodyError);


  const requestMetaData = useSelector((state: RootState) => state.tabs.value[tabId].requestMetaData)

  

  const cloneResponseMetaData = {
    type: responseMetaData.type,  // e.g., "cors"
    url: responseMetaData.url,  // e.g., "https://jsonplaceholder.typicode.com/todos/1?="
    redirected: responseMetaData.redirected,  // e.g., false
    status: responseMetaData.status,  // e.g., 200
    ok: responseMetaData.ok,  // e.g., true
    statusText: responseMetaData.statusText,  // e.g., ""
    headers: {
      "cache-control": responseMetaData.headers.get("cache-control") || "max-age=43200",
      "content-type": responseMetaData.headers.get("content-type") || "application/json; charset=utf-8",
      "expires": responseMetaData.headers.get("expires") || "-1",
      "pragma": responseMetaData.headers.get("pragma") || "no-cache",
      // Add any other relevant headers as needed
      "x-powered-by": responseMetaData.headers.get("x-powered-by") || "Express",
    },
    body: {
      locked: responseMetaData.body.locked || true,  // Just an example, depending on the context
      // Optionally add more structure if needed
    },
    bodyUsed: responseMetaData.bodyUsed,  // e.g., true
  };


 

 

  useEffect(() => {
    let lineCounter = 1;
    const calculatedLines = response.map((item: object) => {
      const currentLine = lineCounter;
      lineCounter += Object.keys(item).length + 2;
      return currentLine;
    });
    setLineNumbers(calculatedLines);

    
  
    }, [response])

    useEffect(() => {
      setActiveTab("Response")
    }, [responseMetaData])


    
   
  return (
    <div className=' flex flex-grow flex-col max-pc:min-h-80 bg-lightgrey max-pc:rounded-lg pc:rounded-tr-lg pc:rounded-br-lg overflow-hidden'>
      <div className='border-b-[0.5px] border-b-slate-600 border-opacity-40 h-12 flex items-center gap-3 px-7'>
        <button onClick = {() => setActiveTab("Request")} className={`btn btn-sm border-none h-[80%] ${activeTab == "Request" ? "bg-[#323030]" : "bg-transparent"} w-auto`}>Request <span className={`${cloneResponseMetaData.status == 200 ? ("text-GET") : cloneResponseMetaData.status == 0 ? ("hidden") :("text-DELETE")}`}> {requestMetaData.method}</span></button>
        <button onClick = {() => setActiveTab("Response")} className={`btn btn-sm w-auto border-none h-[80%] flex text-sm  ${activeTab == "Response" ? "bg-[#323030]" : "bg-transparent"} w-28`}>Response <span className={`${cloneResponseMetaData.status == 200 ? ("text-GET") : cloneResponseMetaData.status == 0  ? ("hidden") :("text-DELETE")}`}> {errorObj == undefined ?  cloneResponseMetaData.status : ""} </span>  <span className='text-DELETE'>{errorObj?.status}</span></button>
        
      </div>

      {(!errorObj && sentStatus && cloneResponseMetaData.status === 200) ? (
          <>
          <div className=''></div>
<div tabIndex={0} className="collapse collapse-arrow  border-base-300 bg-[#323030] border-none  w-[95%] mx-auto my-3  ">
<div className="collapse-title text-base flex justify-start gap-4 items-center min-h-12 py-0"> <span>HTTP/1.1</span>  <span> {cloneResponseMetaData.status} {cloneResponseMetaData.ok}</span> <span>{Object.keys(cloneResponseMetaData).length} headers</span></div>
<div className="collapse-content">
<div> 
          
          { Object.entries(cloneResponseMetaData).map(([key, value]) => {
       
            return ( <p key={key}>{key} : {JSON.stringify(value)}</p>);
          })} 
        </div>
</div>
</div>
        <div className='pc:overflow-scroll pc:max-h-[75vh] flex flex-col px-2'>
          
          
          {Array.isArray(response) ? <Arrayrender response={response} lineNumbers = {lineNumbers}/> : <Objectrender response={response} currLine={0} indent = {3}/>}
        </div>
        </>
      ) : (
        bodyError ? bodyError  : (
        <>
        <div className='mx-auto my-20 flex flex-col items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="90px" fill="#666666">
            <path d="m358-316 122-122 122 122 42-42-122-122 122-122-42-42-122 122-122-122-42 42 122 122-122 122 42 42ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z"/>
          </svg>
          <span className='text-[#666666] text-sm flex flex-col justify-center items-center'> < span>{errorObj?.status}</span>  <span>{errorObj?.error}</span></span>
          
        </div>
        {errorObj && <Objectrender response={errorObj} currLine={1} indent = {3}/>}
        
        </>
        
      )
      )}
    </div>
  );
}

export default ResponsePanel;
