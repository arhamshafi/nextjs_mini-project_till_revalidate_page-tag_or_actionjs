"use client"
import { AppContext } from '@/context/context';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaCrown } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {

    const [profilebar, setProfileBar] = useState(false)
    const pathname = usePathname()
    const profileRef = useRef(null)
    const { ok } = useContext(AppContext)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileBar(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <nav className='w-full h-1/12 flex justify-between items-center bg-white fixed top-0 left-0 px-5 ' >

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
                <FaUserCircle className='text-blue-500 text-2xl ml-2 cursor-pointer' onClick={() => setProfileBar(true)} />
            </div>
            {/* /////////// */}
            <div ref={profileRef} className={`w-[400px] h-max py-3 rounded-2xl bg-white fixed top-22 flex flex-col transition-all duration-300 ease-in-out items-center ${profilebar ? "right-2 visible opacity-100 " : " right-[-25%] opacity-0 invisible"} `}>
                <h1 className='text-black text-2xl font-bold uppercase ' >Profile</h1>
            </div>
        </nav>
    )
}
