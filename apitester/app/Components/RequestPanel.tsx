"use client"
import React from 'react'
import { useState } from 'react'

const RequestPanel = () => {
    const [list , setList] = useState<string[]>([])

  return (
    <div className='w-full mb-2 min-h-[100px] bg-slate-500 flex flex-col'>
        <button className='h-6 bg-blue-400' onClick={() => setList((prev) => [...prev, "another item"])}> here</button>

        {list.map((  item , ind) => {
            return <div className='h-5 w-full bg-white' key={ind}>{item}</div>
        })}
      
    </div>
  )
}

export default RequestPanel
