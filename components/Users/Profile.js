import { appContext } from '@/Context/AppContext'
import React, { useContext } from 'react'
import ContentP from './Profile/ContentP'
import NavBarP from './Profile/NavBarP'

export default function Profile() {
  const {contentId} = useContext(appContext)
  return (
    <div className='flex bg-[#242233]'>
      <NavBarP/>
      <ContentP content={contentId}/>
    </div>
  )
}
