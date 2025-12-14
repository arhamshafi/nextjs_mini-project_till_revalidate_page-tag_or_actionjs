"use client"
import { del } from '@/app/(pages)/(public)/data/action';
import { useRouter } from 'next/navigation';
import React from 'react'
import { MdEditDocument } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlinePageview } from "react-icons/md";
import { toast } from 'react-toastify';

export default function StudentData({ id }) {


    const router = useRouter()
    const handleDel = async (id) => {
        try {
            const res = await del(id)
            const data = JSON.parse(res)
            if (!data.success) throw new Error(data.message)
            toast.success(data.message)
            router.refresh()

        } catch (err) {
            toast.error(err.message || "Invalid Error")
        }
    }

    return (
        <div className='w-22 text-xl text-center capitalize text-white flex justify-center items-center gap-2 '>
            <MdOutlinePageview className='text-white cursor-pointer hover:scale-110 transition-all duration-150 ease-linear' />
            <MdEditDocument className='text-blue-500 cursor-pointer hover:scale-110 transition-all duration-150 ease-linear' />
            <MdDelete className='cursor-pointer hover:scale-110 transition-all duration-150 ease-linear text-red-500' onClick={() => handleDel(id)} />
        </div>

    )
}
