"use client"
import { AppContext } from '@/context/context';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { FaCrown } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {


    const pathname = usePathname()
    const {ok} = useContext(AppContext)
    console.log(ok);
    


    return (
        <nav className='w-full h-14 flex justify-between items-center bg-white fixed top-0 left-0 px-5 ' >
            <div className='w-30 '> <img src="/next.svg" className='w-full h-full' alt="" /> </div>
            <div className=' flex justify-center items-center'>
                <ul className='w-max h-max flex justify-center items-center gap-5 text-black '>
                    {
                        ["home", "services", "todo", "contact"].map((ele, idx) => {
                            const link = ele == "home" ? "/" : `/${ele}`
                            return (
                                <Link key={idx} href={link} > <li className={` ${pathname == link && "text-green-400"} capitalize  `}>{ele}</li> </Link>
                            )
                        })
                    }
                </ul>
                    <FaCrown className='text-yellow-400 text-2xl ml-5 cursor-pointer' />
                    <FaUserCircle className='text-blue-500 text-2xl ml-2 cursor-pointer' />
            </div>
        </nav>
    )
}
