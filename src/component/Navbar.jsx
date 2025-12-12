"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

export default function Navbar() {


    const pathname = usePathname()


    return (
        <nav className='w-full h-14 flex justify-between items-center bg-white fixed top-0 left-0 px-5 ' >
            <div className='w-30 '> <img src="/next.svg" className='w-full h-full' alt="" /> </div>
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
        </nav>
    )
}
