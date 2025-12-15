import React from 'react'
import { fetchDetails } from './action';
import Link from 'next/link';
import ConnectDB from '@/lib/mongo';
import Student from '@/model/student';

export const generateStaticParams = async () => {

  await ConnectDB()
  const res = await Student.find({}) || []
  return res.map((ele) => ({
    id: ele._id.toString()
  }))
}

export default async function page({ params }) {

  const { id } = await params
  const res = await fetchDetails(id)
  const data = JSON.parse(res) || null

  return (
    <div className='w-full bg-black min-h-screen pt-20 px-10'>
      <Link href={"/data"}><button className='py-1 px-5 bg-white fixed top-26 left-12 cursor-pointer active:scale-95 transition-all duration-150 ease-linear text-black rounded-lg' >Back</button></Link>
      <h1 className='text-white font-bold text-center mt-5 text-2xl tracking-[2px] '>Student Detail Page</h1>
      <div className='w-max h-max mt-20 justify-between items-center flex  '>
        <p className='w-35 font-bold text-2xl '>Name :</p>
        <p className='text-white'>{data?.details?.name}</p>
      </div>
      <div className='w-max h-max mt-5 justify-between items-center flex  '>
        <p className='w-35 font-bold text-2xl '>Age :</p>
        <p className='text-white'>{data?.details?.age}</p>
      </div>
      <div className='w-max h-max mt-5 justify-between items-center flex  '>
        <p className='w-35 font-bold text-2xl '>Gender :</p>
        <p className='text-white'>{data?.details?.gender}</p>
      </div>
      <div className='w-max h-max mt-5 justify-between items-center flex  '>
        <p className='w-35 font-bold text-2xl '>Class :</p>
        <p className='text-white'>{data?.details?.class}</p>
      </div>
      <div className='w-max h-max mt-5 justify-between items-center flex  '>
        <p className='w-35 font-bold text-2xl '>City :</p>
        <p className='text-white'>{data?.details?.city}</p>
      </div>
    </div>
  )
}
