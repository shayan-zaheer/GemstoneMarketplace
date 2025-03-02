
'use client'
import axios from "axios";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from 'react'


const IndividualProduct = ({productID}) => {
    const [gem, setGem] = useState({})
   useEffect(()=>{
    const fetchData = async ()=>{
        try{
            const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gems/${productID}`, {withCredentials: true});
            if(result.data.status == "success"){
              setGem(result.data.gem)
            } else {
              throw new Error();
            }
          } catch(err){
            return null;
          }
    }
    fetchData();
    
   },[productID])
  return (
    <div className="relative top-20 min-h-content mb-20 bg-[#1a1c1ff8] md:pl-12 md:flex md:flex-row-reverse">
      <div className="md:w-[70%] h-[100vh] relative">
        <img
          src={gem.coverImage}
          alt="Fading Image"
          className="w-full h-[300px] md:h-full  object-cover mask-gradient2 md:mask-gradient "
        />
      </div>
      <div className="md:w-[40%] md:pt-12 px-5 md:absolute md:z-10 md:left-10 md:top-12">
        <h1 className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text text-4xl md:text-6xl font-bold ">
          {gem.name}
        </h1>
        <span className="mt-1 text-white text-3xl font-semibold">{gem.price}</span>
        <div className="md:mt-8 mt-4">
            <p className="text-slate-300  md:text-sm text-[0.65rem] italic text-justify">{gem.description}</p>
        </div>
        <div className="mt-8 text-white text-xl font-semibold">{gem.createdAt}</div>
      </div>
    </div>
  )
}

export default IndividualProduct