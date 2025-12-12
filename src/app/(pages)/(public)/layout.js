import Navbar from '@/component/Navbar'
import React from 'react'

export default function layout({ children }) {
    return (
        <div className='w-full min-h-screen bg-black text-white '>
            <Navbar />
            {children}
        </div>
    )
}
