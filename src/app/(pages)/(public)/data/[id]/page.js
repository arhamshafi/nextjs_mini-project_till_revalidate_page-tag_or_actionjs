import React from 'react'

export default async function page({params}) {
    
    const {id} = await params
console.log(id);

  return (
    <div className='w-full bg-black min-h-screen'>
      
    </div>
  )
}
