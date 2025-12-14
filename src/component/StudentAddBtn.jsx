"use client"
import React, { useState } from 'react'

export default function StudentAddBtn() {

    const [dis, setdis] = useState(false)

    console.log(dis);
    

    return (
        <>
        <button className='fixed bottom-8 right-8 bg-black text-2xl py-2 rounded-2xl px-8 text-white active:bg-black/90 cursor-pointer active:scale-95 transition-all duration-100 ease-linear ' onClick={()=>setdis(true)} >ADD</button>
        {
            dis && (
                <div className='w-full min-h-screen flex justify-center items-center backdrop-blur-[3px] fixed top-0 left-0 z-10 '>
                    {/* form yhan bany ga  */}
                </div>
            )
        }
        </>
    )
}
