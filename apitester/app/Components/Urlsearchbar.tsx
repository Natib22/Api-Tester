"use client"
import React, { useEffect, useState } from "react";

import { RootState } from '../store'
import { useDispatch, useSelector } from "react-redux";
import {changeBodyError ,  changeUrl , changeMethod , changeResponse , changeResponseStatus , changeResponseHeaders , changeMetaData , changeError  , changeLoadingStatus} from "../features/tabs/tabsSlice";
import { useLazyFetchDataFromUrlQuery , useDeleteDataFromUrlMutation , usePostDataToUrlMutation } from "../features/apis/apisSlice";
import { prepareStateForMongoDB } from "../features/tabs/tabsSlice";


 


const Urlsearchbar = ()=> {
  const currTabId = useSelector( (state : RootState) => state.tabs.currTabId)
  const tabs = useSelector((state : RootState) => state.tabs.value)
  const currentState = useSelector((state : RootState) => state)
  const [flag , setFlag] = useState(false)
  // Assuming currTabId is defined and tabs is an array of tab objects
  const  currTab = tabs[currTabId];

  const [fetchData, { data:fetchedData  ,  error :fetchError, isLoading: isFetching}] = useLazyFetchDataFromUrlQuery();
  const [deleteData , {data:deletedData , isLoading: isDeleting , error :deleteError}] = useDeleteDataFromUrlMutation();
  const [postData , {data:postedData , isLoading: isPosting , error: postError}] = usePostDataToUrlMutation();
  

 

  const dispatch = useDispatch()
   
  

  const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeUrl({ tabid: String(currTabId), url: event.target.value })); // Update state with the current value of the input
  };

  const handleChangeMethod = (method: string) => {

    dispatch(changeMethod({tabid: String(currTabId) , method : method}))
  }

  
   

  const handleSubmission =  () => {
    if (currTab.method === "GET"){

      const queryString = currTab.params ? '?' + new URLSearchParams(currTab.params).toString() : '';
    // Assuming currTab.headers is an array of header entries (key-value pairs)
      const headers = currTab.headers ? Object.fromEntries(
                        Array.from(currTab.headers).filter(([key, value]) => key && value) // Filter out empty keys and values
                      )
                    : {};

      fetchData({url: currTab?.url , params: queryString , headers: headers}) 
      console.log("clicked get") 
    }

    if (currTab.method === "DELETE"){
      const queryString = currTab.params ? '?' + new URLSearchParams(currTab.params).toString() : '';
    // Assuming currTab.headers is an array of header entries (key-value pairs)
      const headers = currTab.headers ? Object.fromEntries(
                        Array.from(currTab.headers).filter(([key, value]) => key && value) // Filter out empty keys and values
                      )
                    : {};

      deleteData({url: currTab?.url , params: queryString , headers: headers})  
    }


    if (currTab.method === "POST"){
      const body = currTab.body;
      try {
        const parsedBody = JSON.parse(body);
        if (typeof parsedBody !== 'object' || parsedBody === null) {
          throw new Error('Input must be a valid object');
        }
      }
        catch (err) {
          dispatch(changeBodyError({tabid: String(currTabId) , error: (err as Error).message || "Something went wrong"}))
        

      }

      

   

      const headers = currTab.headers ? Object.fromEntries(
                        Array.from(currTab.headers).filter(([key, value]) => key && value) // Filter out empty keys and values
                      )
                    : {};
      postData({url: currTab?.url , body: body , headers: headers}) 
      console.log("posting")
       
    }

    setFlag(!flag)
        
    

  }

  const handleSave = async () => {
    const state = prepareStateForMongoDB(currentState.tabs)
    // const result = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: state
    // })
    console.log(state)


  }


  useEffect(() => {

    if (fetchedData) {
      
      dispatch(changeResponse({tabid: currTabId , response: fetchedData.data}))  
      dispatch(changeResponseStatus({tabid: String(currTabId) , status: true}))
      dispatch(changeResponseHeaders({tabid : currTabId , headers: fetchedData.headers || {}}))
      // const temp: Record<string, unknown> = data.metadata || {};
      // temp["response"] = data.response;
      // temp["request"] = data.request;
      
      dispatch(changeMetaData({tabid: String(currTabId) , request: fetchedData.request|| {} , response : fetchedData.response || {}}))
    }
    if (deletedData && currTab.method === "DELETE") {
      console.log(deletedData)
      dispatch(changeResponse({tabid: currTabId , response: [deletedData]}))  
      dispatch(changeResponseStatus({tabid: String(currTabId) , status: true}))
      dispatch(changeResponseHeaders({tabid : currTabId , headers: deletedData.headers || {}}))

      
      dispatch(changeMetaData({tabid: String(currTabId) , request: deletedData.request|| {} , response : deletedData.response || {}}))
    }
    if (postedData && currTab.method === "POST") {
      dispatch(changeResponse({tabid: currTabId , response: [postedData]}))  
      dispatch(changeResponseStatus({tabid: String(currTabId) , status: true}))
      dispatch(changeResponseHeaders({tabid : currTabId , headers: postedData.headers || {}}))

      
      dispatch(changeMetaData({tabid: String(currTabId) , request: postedData.request|| {} , response : postedData.response || {}}))
      dispatch(changeBodyError({tabid: String(currTabId) , error: ""}))
      console.log(Response)
    }

    if (fetchError) {
      dispatch(changeError({tabid: String(currTabId) , error: fetchError}))
     
      
    }
    if (deleteError) {
      dispatch(changeError({tabid: String(currTabId) , error: deleteError}))
      
    }
    if (postError) {
      dispatch(changeError({tabid: String(currTabId) , error: postError}))
      
    }
    if (isFetching) {
      dispatch(changeLoadingStatus({tabid: String(currTabId) , status: false}))
    }
      
      
  } , [fetchedData , deletedData , postedData , fetchError , deleteError , postError ,isFetching , isDeleting ,isPosting,   dispatch , flag ])
  
    
 
  
  return <div className="w-full  flex items-center mobile:h-10 pc:h-14 bg-lightgrey rounded-xl active:bg-[#2d2b2b]  hover:bg-[#2d2b2b]">
    <div className=" h-full flex items-center dropdown dropdown-bottom mobile:px-1 pc:px-2">
  <div tabIndex={0} role="button" className= {`btn btn-xs h-3/4 w-24 bg-transparent border-none ${currTab.method == "GET" ? ("text-GET"): currTab.method == "PUT" ? "text-PUT" : currTab.method == "PATCH" ? ("text-PATCH"): currTab.method == "DELETE" ? ("text-DELETE"): currTab.method == "HEAD" ? ("text-GET"): currTab.method == "POST" ? ("text-POST"): "" }`}>{currTab?.method} <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="10px" height= "10px" viewBox="0 0 12 12" className="ml-0.5 Icon_icon__QR_ZH Icon_size_xs__Uce_e"><path fillRule="evenodd" clipRule="evenodd" d="M3.841 5.031H8.16c.257 0 .422-.232.3-.424L6.301 1.184c-.129-.204-.473-.204-.602 0L3.541 4.607c-.122.192.043.424.3.424Zm4.318 2H3.84c-.257 0-.422.232-.3.424l2.158 3.424c.129.203.473.203.602 0l2.158-3.424c.122-.192-.043-.424-.3-.424Z" fill="currentColor"></path></svg></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow">
    <li><a  className = "text-GET" onClick={() => {  handleChangeMethod("GET"); }}>GET</a></li>
    <li><a className = "text-GET" onClick={() => {  handleChangeMethod("HEAD"); }}>HEAD</a></li>
    <li><a className = "text-POST" onClick={() => {  handleChangeMethod("POST"); }}>POST</a></li>
    <li><a className = "text-PUT" onClick={() => {  handleChangeMethod("PUT"); }}>PUT</a></li>
    <li><a className = "text-PATCH" onClick={() => { handleChangeMethod("PATCH"); }}>PATCH</a></li>
    <li><a className = "text-DELETE" onClick={() => {  handleChangeMethod("DELETE"); }}>DELETE</a></li>
    
    
  </ul>
</div>

<input value ={currTab?.url} onChange={handleChangeUrl} placeholder ="https://love.com "type="text" className=" h-full max-tablet:w-1/2 tablet:flex-grow w-2/3 outline-none bg-transparent tracking-widest  font-extralight text-sm"></input>
<p>{currTabId}</p>
<div className="h-full flex mx-2 items-center justify-between gap-3">
<button  onClick = {handleSubmission} className="btn-xs h-2/3 pc:w-16 mobile:w-8 bg-green-500 max-pc:hidden rounded-md text-neutral-200"> send</button>
<button onClick = {handleSubmission} className="btn-xs h-2/3 pc:w-16 mobile:w-8 bg-green-500  pc:hidden rounded-lg"> <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="100%" height="100%" viewBox="0 0 96.000000 96.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M465 747 c-198 -72 -366 -136 -373 -140 -28 -18 -10 -52 75 -138 65
-67 93 -89 112 -89 19 0 81 45 221 161 107 89 202 166 210 172 19 15 -18 -31
-189 -238 -100 -120 -141 -177 -141 -196 0 -19 22 -47 89 -112 86 -85 117
-101 138 -75 6 7 70 179 144 381 138 382 142 398 93 404 -10 1 -181 -57 -379
-130z"/>
</g>
</svg> </button>
<button onClick={ handleSave } className="btn btn-xs h-2/3 w-8 p-0 bg-transparent border-none"> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg></button>
</div>


  </div>;
};

export default Urlsearchbar;
