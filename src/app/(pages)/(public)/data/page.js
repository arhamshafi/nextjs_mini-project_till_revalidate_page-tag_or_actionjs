import ConnectDB from '@/lib/mongo'
import Student from '@/model/student'
import { getServerSession } from 'next-auth';
import React from 'react'
import { RiAlarmWarningLine } from "react-icons/ri";

import StudentData from '@/component/StudentData';
import StudentAddBtn from '@/component/StudentAddBtn';
import { AuthOption } from '@/app/api/auth/[...nextauth]/route';

export const metadata = {
  title: "CRUD Operation | action.js "
}
export default async function page() {

  await ConnectDB()
  const std = await Student.find({}) || []
  const session = await getServerSession(AuthOption)


  if (!session) return <div className='w-full min-h-screen bg-purple-700 pt-12  px-10 ' >
    <p className='text-center text-4xl tracking-[2px] mt-15 font-bold '>Students Data</p>
    <div className='w-full h-12 bg-white mt-10 rounded-xl flex items-center font-normal justify-between px-5'>
      <p className=' w-70 lg:min-w-xs text-black text-xl '>Name</p>
      <p className='w-22 text-xl text-center capitalize text-black '>Class</p>
      <p className='w-22 text-xl text-center capitalize text-black '>Age</p>
      <p className='w-22 text-xl text-center capitalize text-black '>city</p>
      <p className='w-22 text-xl text-center capitalize text-black '>gender</p>
      <p className='w-22 text-xl text-center capitalize text-black '>actions</p>
    </div>
    <RiAlarmWarningLine className=' text-red-500 text-5xl mx-auto scale-140 mt-30  ' />
    <p className='text-center mt-5 text-2xl text-white/50 '>Authentication Required</p>
  </div>

  return (
    <div className='w-full min-h-screen bg-purple-700 pt-12  px-10'>
      <p className='text-center text-4xl tracking-[2px] mt-15 font-bold '>Students Data</p>
      <div className='w-full h-12 bg-white mt-10 rounded-xl flex items-center font-normal justify-between px-5'>
        <p className=' w-70 lg:min-w-xs text-black text-xl '>Name</p>
        <p className='w-22 text-xl text-center capitalize text-black '>Class</p>
        <p className='w-22 text-xl text-center capitalize text-black '>Age</p>
        <p className='w-22 text-xl text-center capitalize text-black '>city</p>
        <p className='w-22 text-xl text-center capitalize text-black '>gender</p>
        <p className='w-22 text-xl text-center capitalize text-black '>actions</p>
      </div>

      <div className='w-full max-h-[50vh] mt-10 overflow-y-auto scrollbar-hide '>

        {std.length > 0 ? (


          std.map((ele, idx) => (
            <div key={idx} className='w-full border-b h-12 flex justify-between items-center px-5 transition-all duration-150 ease-in-out hover:bg-black/20 '>
              <p className=' w-70 lg:min-w-xs text-white text-xl '>{ele?.name}</p>
              <p className='w-22 text-xl text-center capitalize text-white '>{ele?.class}</p>
              <p className='w-22 text-xl text-center capitalize text-white '>{ele?.age}</p>
              <p className='w-22 text-xl text-center capitalize text-white '>{ele?.city}</p>
              <p className='w-22 text-xl text-center capitalize text-white '>{ele?.gender}</p>
              <StudentData id={ele._id.toString()} />
            </div>
          ))) : (
          <p className='text-2xl text-white font-bold text-center mt-30 '>NO MORE DATA</p>
        )
        }

      </div>
      {session.user.role === "admin" && (<StudentAddBtn />)}

    </div>
  )
}
