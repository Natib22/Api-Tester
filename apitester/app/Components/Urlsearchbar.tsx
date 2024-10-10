"use client"
import React from "react";
import { useState } from "react";

const Urlsearchbar = () => {
  const[reqType , setReqType] = useState<string>("GET")
  return <div className="w-full  flex items-center mobile:h-10 pc:h-12 bg-lightgrey rounded-xl">
    <div className=" h-full flex items-center dropdown dropdown-bottom mobile:px-1 pc:px-2">
  <div tabIndex={0} role="button" className="     btn btn-xs h-3/4 w-24 bg-transparent border-none">{reqType} <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="10px" height= "10px" viewBox="0 0 12 12" className="ml-0.5 Icon_icon__QR_ZH Icon_size_xs__Uce_e"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.841 5.031H8.16c.257 0 .422-.232.3-.424L6.301 1.184c-.129-.204-.473-.204-.602 0L3.541 4.607c-.122.192.043.424.3.424Zm4.318 2H3.84c-.257 0-.422.232-.3.424l2.158 3.424c.129.203.473.203.602 0l2.158-3.424c.122-.192-.043-.424-.3-.424Z" fill="currentColor"></path></svg></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow">
    <li><a onClick={() => setReqType("GET")}>GET</a></li>
    <li><a onClick={() => setReqType("HEAD")}>HEAD</a></li>
    <li><a onClick={() => setReqType("POST")}>POST</a></li>
    <li><a onClick={() => setReqType("PUT")}>PUT</a></li>
    <li><a onClick={() => setReqType("PATCH")}>PATCH</a></li>
    <li><a onClick={() => setReqType("DELETE")}>DELETE</a></li>
    
    
  </ul>
</div>

<input type="text" className=" h-full flex-grow min-w-0"></input>
<div className="h-full flex mx-2 items-center justify-between gap-3">
<button className="btn-xs h-2/3 pc:w-16 mobile:w-8 bg-green-500 max-pc:hidden"> send</button>
<button className="btn-xs h-2/3 pc:w-16 mobile:w-8 bg-green-500 hidden pc:hidden"> send request</button>
<button className="btn btn-xs h-2/3 w-8"></button>
</div>


  </div>;
};

export default Urlsearchbar;
