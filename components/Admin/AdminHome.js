import React from 'react'
import NavBar from './Context/NavBar'
import Content from './Context/Content'

export default function AdminHome() {
  return (
    <div className='flex justify-between bg-[#242233]'>
      <Content/>
      <NavBar/>
    </div>
  )
}
