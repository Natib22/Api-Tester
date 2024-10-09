
import React from 'react'
import Themeswitcher from './Components/Themeswitcher'
import Tabs from './Components/Tabs'
import Urlsearchbar from './Components/Urlsearchbar'
import Panel from './Components/Panel'

const Homepage
 = () => {
  return (
    <div className='h-full w-full flex '>
      <div className='h-full mobile:w-10 pc:w-14  '>
        icon
      </div>
      <div className='w-full min-h-[100vh] pr-4 flex flex-col '>
        < Tabs />
        < Urlsearchbar />
        < Panel />
      </div>
     
     
    </div>
  )
}

export default Homepage

