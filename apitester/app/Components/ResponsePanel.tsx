import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'


const ResponsePanel = () => {
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);

  const Arrayrender = ({ response }: { response: object[] }) => {
   
    // if (Array.isArray(response[0])){
    //   return <Arrayrender response = {response} />
    // }
    // else {
      return (
        <>
          {response.map((item, index) => {
            const temp = lineNumbers[index];
           
          
            return (
              <div key={index} className="">
                <Objectrender key={index} response={item} currLine={temp}  indent={1}/>
              </div>
            );
          })}
        </>
      );
      
    

    
  };

  const Objectrender = ({ response , currLine ,indent }: { response: object  , currLine : number , indent: number}) => {

      const size  = Object.keys(response).length
    

    return (
      <>
         <div className='flex justify-between'> <span>{"{"}</span> <p className='text-xs text-gray-400 font-light  text-opacity-40'>{currLine - 1}</p> </div>
        {Object.entries(response).map(([key, value] , index) => {
         
          return (
            <div key={key} className={`flex justify-between ${
              indent === 1 ? 'pl-6' : indent === 2 ? 'pl-12' : indent === 3 ? 'pl-18' : 'pl-0'
            }`} >
              <div className='flex'>
                <p className='text-purple-400'>{  '"' + key + '"' }</p> <p className='mx-1'> : </p>
                
                <p
  className={`${
    value === true || value === false 
      ? 'text-yellow-400'
      : !isNaN(parseInt(value)) 
      ? 'text-blue-400'
      : 'text-green-400'
  }`}
>
  {JSON.stringify(value)}
</p>
              </div>
              <p className='text-xs text-gray-400 font-light  text-opacity-40'>{currLine + index}</p> 
            </div>
          );
        })}
        <div className='flex justify-between'> <span>{"}"}</span> <p className='text-xs text-gray-400 font-light  text-opacity-40'>{currLine+ 1 + size}</p> </div>
      </>
    );
  };

  const tabId = useSelector((state: RootState) => state.tabs.currTabId);
  const [activeTab, setActiveTab] = useState('');
  const sentStatus = useSelector((state: RootState) => state.tabs.value[tabId].sentStatus);
  const response = useSelector((state: RootState) => state.tabs.value[tabId].response);
  const responseHeaders = useSelector((state: RootState) => state.tabs.value[tabId].responseHeaders);

  const responseMetaData = useSelector((state: RootState) => state.tabs.value[tabId].responseMetaData)
  const requestMetaData = useSelector((state: RootState) => state.tabs.value[tabId].requestMetaData)


  useEffect(() => {
    let lineCounter = 1;
    const calculatedLines = response.map((item: object) => {
      const currentLine = lineCounter;
      lineCounter += Object.keys(item).length + 2;
      return currentLine;
    });
    setLineNumbers(calculatedLines);
  
    }, [response])
  
    
  return (
    <div className=' flex flex-grow flex-col max-pc:min-h-80 bg-lightgrey max-pc:rounded-lg pc:rounded-tr-lg pc:rounded-br-lg overflow-hidden'>
      <div className='border-b-[0.5px] border-b-slate-600 border-opacity-40 h-12 flex items-center gap-3 px-7'>
        <button className={`btn btn-sm border-none h-[80%] ${activeTab == "Request" ? "bg-[#323030]" : "bg-transparent"} w-28`}>Request</button>
        <button className={`btn btn-sm border-none h-[80%] ${activeTab == "Response" ? "bg-[#323030]" : "bg-transparent"} w-28`}>Response</button>
      </div>

      {sentStatus ? (
        <div className='pc:overflow-scroll pc:max-h-[75vh] flex flex-col px-6'>
          
          {Array.isArray(response) ? <Arrayrender response={response} /> : <Objectrender response={response} currLine={0} indent = {1}/>}
        </div>
      ) : (
        <div className='m-auto flex flex-col items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="90px" fill="#666666">
            <path d="m358-316 122-122 122 122 42-42-122-122 122-122-42-42-122 122-122-122-42 42 122 122-122 122 42 42ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z"/>
          </svg>
          <p className='text-[#666666]'>Not sent</p>
        </div>
      )}
    </div>
  );
}

export default ResponsePanel;
