"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function NOTFOUND() {
    const router = useRouter();

    const goHome = () => {
        router.replace("/");
    };

    return (
        <div className='w-full min-h-screen flex flex-col relative justify-center items-center gap-5 text-black'>
            <p className='font-bold text-2xl'>Error 404: This Route Drifted Off Orbit</p>
            <p className='animate-pulse text-lg '>Let’s Take You Back Home</p>

            <button
                onClick={goHome}
                className='px-5 cursor-pointer py-2 bg-black text-white rounded-lg '
            >
                Click Here
            </button>
            <img src='/minions.png' className='absolute bottom-0 left-0 w-50 h-7/12 ' />
        </div>
    );
}
