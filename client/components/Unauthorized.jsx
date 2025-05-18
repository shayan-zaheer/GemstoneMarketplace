import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
   <div className='relative top-20 mb-20 min-h-[80vh]  px-4 py-6 text-white flex flex-col items-center bg-main'>
      <div className="flex flex-col items-center text-center justify-center h-full">
        <img src='/Diamond.png' className='w-40 h-40 mb-4'/>
        <h1 className="text-4xl text-primary font-bold mb-4">Unauthorized Access (403)</h1>
        <p className="text-lg text-gray-400 mb-6">
          You do not have permission to access this page.
        </p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>

   </div>
  )
}

export default page