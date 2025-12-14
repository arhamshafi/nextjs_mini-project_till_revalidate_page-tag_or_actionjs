"use client"
import React, { useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signup } from './action';
import { signIn } from 'next-auth/react';


export const dynamic = "force-dynamic"
export default function page() {

    const router = useRouter()
    const [loader, setlaoder] = useState(false)
    const [formdata, setformdata] = useState({ name: "", email: "", password: "", confirmpassword: "" })
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passRef = useRef(null)
    const conpassRef = useRef(null)

    const handler = (e) => {
        const { name, value } = e.target
        setformdata({ ...formdata, [name]: value })
    }

    const Submit = async (e) => {

        e.preventDefault()
        const { name, email, password, confirmpassword } = formdata
        if (!name) {
            toast.error("Name Field Must Be Required")
            nameRef.current.focus()
            return
        }
        if (!email) {
            toast.error("E-mail Adress Must Be Required")
            emailRef.current.focus()
            return
        }
        if (!password) {
            toast.error("Password Must Be Required")
            passRef.current.focus()
            return
        }
        if (!confirmpassword) {
            toast.error("Password Must Be Required")
            conpassRef.current.focus()
            return
        }
        if (password !== confirmpassword) {
            toast.error("Password is Not Matched")
            setformdata({ ...formdata, password: "", confirmpassword: "" })
            passRef.current.focus()

            return
        }
        try {

            setlaoder(true)
            const res = await signup(formdata)
            const data = JSON.parse(res)
            if (!data.success) throw new Error(data.message)
            toast.success(data.message)

            const autosignin = await signIn("credentials", {
                email: formdata.email,
                password: formdata.password,
                redirect: false
            })
            if (autosignin?.error) throw new Error("Authentication Error")
            setformdata({ name: "", email: "", password: "", confirmpassword: "" })
            nameRef.current?.blur()
            emailRef.current?.blur()
            passRef.current?.blur()
            conpassRef.current?.blur()
            setTimeout(() => router.push("/"), 1800)

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
                <input type='text' autoComplete='off' ref={nameRef} onChange={handler} name='name' value={formdata.name} className='w-full h-10 outline-none mt-3 rounded-lg px-5 transition-all duration-150 ease-linear text-md focus:ring-blue-400 ring-black/20 ring-1 ' placeholder='Enter Name Here' />
                <p className='font-bold text-black/85 text-lg mt-3 tracking-[1px] '>E-Mail</p>
                <input type='email' autoComplete='off' ref={emailRef} onChange={handler} name='email' value={formdata.email} className='w-full h-10 outline-none mt-3 rounded-lg px-5 transition-all duration-150 ease-linear text-md focus:ring-blue-400 ring-black/20 ring-1 ' placeholder='Enter E-Mail Here' />
                <p className='font-bold text-black/85 text-lg mt-3 tracking-[1px]'>Password</p>
                <input type='password' autoComplete='off' ref={passRef} onChange={handler} name='password' value={formdata.password} className='w-full h-10 mt-3 outline-none rounded-lg px-5 transition-all duration-150 ease-linear text-md focus:ring-blue-400 ring-black/20 ring-1' placeholder='Enter Password Here' />
                <p className='font-bold text-black/85 text-lg tracking-[1px] mt-3 '>Confirm Password</p>
                <input type='password' autoComplete='off' ref={conpassRef} onChange={handler} name='confirmpassword' value={formdata.confirmpassword} className='w-full h-10 outline-none mt-3 rounded-lg px-5 transition-all duration-150 ease-linear text-md focus:ring-blue-400 ring-black/20 ring-1 ' placeholder='Confirm Password Here' />
                <button className='w-full h-12 bg-black/90 cursor-pointer active:bg-black/80 text-white mt-10 rounded-2xl' type='submit' disabled={loader} > {loader ? (<div className='w-5 h-5 border-white border-b-2 border-l-2 rounded-full mx-auto animate-spin '></div>) : "Sign up"} </button>
                <p className='text-md text-black/85 mt-5 w-max mx-auto '>Don't have an account? <span className='text-blue-400 font-bold ml-2 hover:underline cursor-pointer' onClick={() => router.push("/login")} >Sign up</span> </p>
                <div className='w-full h-max flex justify-between items-center mt-5  '>
                    <button type='button' disabled={loader} className='w-[48%] h-12 border border-black/20 rounded-xl cursor-pointer hover:bg-gray-50 flex justify-center items-center gap-3 text-black/85' onClick={() => toast.info("Feature Will Active Soon ")}> <FcGoogle className='text-2xl -ml-2 ' /> <span>Google</span> </button>
                    <button type='button' disabled={loader} className='w-[48%] h-12 border border-black/20 rounded-xl cursor-pointer hover:bg-gray-50 flex justify-center items-center gap-3 text-black/85' onClick={() => toast.info("Feature Will Active Soon ")}> <FaApple className='text-2xl -ml-2' /> <span>Apple</span> </button>
                </div>
            </form>
        </div>
    )
}
