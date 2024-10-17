"use client"
import React from 'react'

import Tabs from './Components/Tabs'
import Urlsearchbar from './Components/Urlsearchbar'
import Panel from './Components/Panel'

const Homepage
 = () => {
  const [currTabId, setCurrTabId] = React.useState("0")
  return (
    <div className='h-full w-full flex '>
      <div className='h-screen sticky top-0 w-14 max-tablet:w-[12%]'>
        <span className='w-full flex items-center justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="40px " height="40px"><polygon fill="#43a047" points="43,35.112 43,13.336 24,2.447 5,13.336 5,35.112 24,46"/><path fill="#fff" d="M32.5,13c-1.381,0-2.5,1.119-2.5,2.5v11.276L18.984,14.453l-0.131-0.152 C17.609,12.938,16.187,13,15.5,13c-1.381,0-2.5,1.119-2.5,2.5v17c0,1.381,1.119,2.5,2.5,2.5s2.5-1.119,2.5-2.5V21.141 l11.278,12.627l0.11,0.142C30.62,35.133,32.295,35,32.5,35c1.381,0,2.5-1.119,2.5-2.5v-17C35,14.119,33.881,13,32.5,13z"/></svg>
        </span>
      

      </div>
      <div className=' max-tablet:w-[80%] tablet:w-[90%] flex-grow  pr-4 flex flex-col '>
        < Tabs setCurrTabId = { setCurrTabId}  currTabId = {currTabId}/>
        < Urlsearchbar currTabId  = {currTabId} />
        < Panel tabId={currTabId} />
      </div>
     
     
    </div>
  )
}

export default Homepage

