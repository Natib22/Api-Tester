"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Tabs from './Components/Tabs'
import Urlsearchbar from './Components/Urlsearchbar'
import Panel from './Components/Panel'
import Image from 'next/image'


const Homepage
 = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  

  useEffect(() => {
    // Redirect to login if no session is found
    if (status !== 'loading' && !session) {
      router.push('/auth/login')
    }
  }, [status, session, router])


  if (status === 'loading') {
    return <p>Loading...</p>
  }
  if (status == 'authenticated') {
    console.log('authenticated')
    console.log(session)
  }
  


    
  
  
  
  return (
    <div className='h-full w-full flex '>
      <div className='h-screen sticky top-0 w-14 max-tablet:w-[12%]'>
        <span className='w-full flex items-center justify-center'>
        <Image src="/logo.gif" alt="Loading" width={50} height={50} unoptimized />
        </span>
      

      </div>
      <div className=' max-tablet:w-[80%] tablet:w-[90%] flex-grow  pr-4 flex flex-col '>
        < Tabs />
        < Urlsearchbar  />
        < Panel  />
      </div>
     
     
    </div>
  )
}

export default Homepage

