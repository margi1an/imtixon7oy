import React from 'react'
import { Link } from 'react-router-dom'
import vidio from '../vidio/404.mp4'
import { useNavigate } from 'react-router-dom'


function  ErrorPage() {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }

  return (
    <div className='text-center w-screen mt-[200px]'>
         <video
          src={vidio}
          className="absolute w-screen h-full top-1/2 left-1/2 min-w-screen min-h-screen transform -translate-x-1/2 -translate-y-1/2 z-[-1] object-cover"
          muted
          autoPlay
          loop
        ></video>
        <p className='text-9xl text-slate-900 font-bold mb-4'>
            404
        </p>
        <h1 className='text-5xl font-semibold mb-4 text-slate-900'>Page Not Found</h1>
        <button onClick={handleNavigate} className='btn btn-primary'>
        Back to Home     
       </button>
    </div>
  )
}

export default ErrorPage