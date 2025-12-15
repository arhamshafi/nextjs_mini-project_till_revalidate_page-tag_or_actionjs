"use client"
import { add } from '@/app/(pages)/(public)/data/action'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function StudentAddBtn() {

    const router = useRouter()
    const [dis, setdis] = useState(false)
    const [loader, setloader] = useState(false)
    const [formdata, setformdata] = useState({ name: "", clas: "", age: "", gender: "", city: "" })

    const handler = (e) => {
        const { name, value } = e.target
        setformdata({ ...formdata, [name]: value })
    }

    const Submit = async (e) => {
        e.preventDefault()

        const { name, clas, age, gender, city } = formdata
        if (!name || !clas || !age || !gender || !city) return toast.error("Both Field Must Be Required")
        try {
            setloader(true)
            const res = await add(formdata)
            const data = JSON.parse(res)
            if (!data.success) throw new Error(data.message)
            toast.success(data.message)
            setformdata({ name: "", clas: "", age: "", gender: "", city: "" })
            

        } catch (err) {
            toast.error(err.message || "Invalid Error")
        } finally {
            setloader(false)
        }

    }


    return (
        <>
            <button className='fixed bottom-8 right-8 bg-black text-2xl py-2 rounded-2xl px-8 text-white active:bg-black/90 cursor-pointer active:scale-95 transition-all duration-100 ease-linear ' onClick={() => setdis(true)} >ADD</button>
            {
                dis && (
                    <div className='w-full min-h-screen flex justify-center items-center backdrop-blur-[3px] fixed top-0 left-0 z-10 transition-all duration-200 ease-linear ' onClick={() =>{ setdis(false) , router.refresh()} } >
                        <form onSubmit={Submit} onClick={(e) => e.stopPropagation()} className={`min-w-lg rounded-xl h-max p-8 transition-all duration-200 ease-linear bg-white ${dis ? "visible opacity-100" : "invisible opacity-0"} `}>
                            <h1 className='text-black text-xl font-bold text-center'>Add Details</h1>
                            <p className='text-black text-xl mt-5 font-bold ' >Name </p>
                            <input placeholder='Enter Your Name' onChange={handler} name='name' value={formdata.name} type="text" className='w-full mt-2 h-12 border-none bg-gray-100 rounded-xl outline-none ring-1 ring-black/10 text-black px-5 focus:ring-blue-400 ' />
                            <div className='w-full flex justify-between mt-3 items-center'>
                                <div className='w-[48%] h-max'>
                                    <p className='text-black text-xl font-bold ' >Class </p>
                                    <input onChange={handler} placeholder='Enter Your Class' name='clas' value={formdata.clas} type="text" className='w-full mt-2 h-12 border-none bg-gray-100 rounded-xl outline-none ring-1 ring-black/10 text-black px-5 focus:ring-blue-400 ' />
                                </div>
                                <div className='w-[48%] h-max'>
                                    <p className='text-black text-xl font-bold ' >Age </p>
                                    <input onChange={handler} placeholder='Enter Your Age' name='age' value={formdata.age} type="number" className='w-full mt-2 h-12 border-none bg-gray-100 rounded-xl outline-none ring-1 ring-black/10 text-black px-5 focus:ring-blue-400 ' />
                                </div>
                            </div>
                            <div className='w-full flex justify-between mt-3 items-center'>
                                <div className='w-[48%] h-max'>
                                    <p className='text-black text-xl font-bold ' >Gender </p>
                                    <select onChange={handler} value={formdata.gender} name="gender" className='w-full mt-2 h-12 border-none bg-gray-100 rounded-xl outline-none ring-1 ring-black/10 text-black px-5 focus:ring-blue-400 '>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className='w-[48%] h-max'>
                                    <p className='text-black text-xl font-bold ' >City </p>
                                    <input onChange={handler} name='city' placeholder='Enter Your City' value={formdata.city} type="text" className='w-full mt-2 h-12 border-none bg-gray-100 rounded-xl outline-none ring-1 ring-black/10 text-black px-5 focus:ring-blue-400 ' />
                                </div>
                            </div>
                            <button type='submit' className='w-full bg-black mt-10 cursor-pointer text-2xl active:bg-black/85 rounded-xl tracking-[2px] h-12 '>Enter</button>
                        </form>
                    </div>
                )
            }
        </>
    )
}
