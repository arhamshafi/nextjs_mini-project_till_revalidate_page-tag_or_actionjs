"use client"
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function page() {
    const router = useRouter()
    const [loader, setlaoder] = useState(false)

    const Submit = async (e) => {
        e.preventDefault()
        try {
            setlaoder(true)
            toast.success("working")

        } catch (err) {
            toast.error(err.message || "Invalid Error")
        } finally {
            setlaoder(false)
        }
    }

    return (
        <div className='w-full min-h-screen flex justify-center items-center bg-black'>
            <form onSubmit={Submit} className=' w-full max-w-lg py-12 px-8 bg-white rounded-3xl'>
                <p className='font-bold text-black/85 text-lg tracking-[1px] '>Name</p>
                <input className='w-full h-10 outline-none mt-3 rounded-lg px-5 transition-all duration-150 ease-linear text-md focus:ring-blue-400 ring-black/20 ring-1 ' placeholder='Enter Name Here' />
                <p className='font-bold text-black/85 text-lg mt-3 tracking-[1px] '>E-Mail</p>
                <input className='w-full h-10 outline-none mt-3 rounded-lg px-5 transition-all duration-150 ease-linear text-md focus:ring-blue-400 ring-black/20 ring-1 ' placeholder='Enter E-Mail Here' />
                <p className='font-bold text-black/85 text-lg mt-3 tracking-[1px]'>Password</p>
                <input className='w-full h-10 mt-3 outline-none rounded-lg px-5 transition-all duration-150 ease-linear text-md focus:ring-blue-400 ring-black/20 ring-1' placeholder='Enter Password Here' />
                <p className='font-bold text-black/85 text-lg tracking-[1px] mt-3 '>Confirm Password</p>
                <input className='w-full h-10 outline-none mt-3 rounded-lg px-5 transition-all duration-150 ease-linear text-md focus:ring-blue-400 ring-black/20 ring-1 ' placeholder='Confirm Password Here' />
                <button className='w-full h-12 bg-black/90 cursor-pointer active:bg-black/80 text-white mt-10 rounded-2xl' type='submit' >Sign up</button>
                <p className='text-md text-black/85 mt-5 w-max mx-auto '>Don't have an account? <span className='text-blue-400 font-bold ml-2 hover:underline cursor-pointer' onClick={() => router.push("/login")} >Sign up</span> </p>
                <div className='w-full h-max flex justify-between items-center mt-5  '>
                    <button className='w-[48%] h-12 border border-black/20 rounded-xl cursor-pointer hover:bg-gray-50 flex justify-center items-center gap-3 text-black/85'> <FcGoogle className='text-2xl -ml-2 ' /> <span>Google</span> </button>
                    <button className='w-[48%] h-12 border border-black/20 rounded-xl cursor-pointer hover:bg-gray-50 flex justify-center items-center gap-3 text-black/85'> <FaApple className='text-2xl -ml-2' /> <span>Apple</span> </button>
                </div>
            </form>
        </div>
    )
}
