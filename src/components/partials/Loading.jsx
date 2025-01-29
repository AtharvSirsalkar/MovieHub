import React from 'react'
import Loader from '../../utils/images/Loader.gif'

const Loading = () => {
  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <img src={Loader} alt="" />
    </div>
  )
}

export default Loading