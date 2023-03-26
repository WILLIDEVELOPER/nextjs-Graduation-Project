import { appContext } from '@/Context/AppContext'
import React, { useContext } from 'react'
import ContentP from './Profile/ContentP'
import NavBarP from './Profile/NavBarP'

export default function Profile() {
  return (
    <div className='flex bg-[#242233]'>
      <NavBarP/>
      <ContentP/>
    </div>
  )
}
