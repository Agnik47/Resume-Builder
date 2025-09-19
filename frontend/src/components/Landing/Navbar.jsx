import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-20 bg-blue-600 text-white flex items-center justify-between px-8'>
      <div className='text-lg font-bold'>Logo</div>
      <div className='space-x-4'>
        <a href="#" className='hover:underline'>Home</a>
        <a href="#" className='hover:underline'>About</a>
        <a href="#" className='hover:underline'>Contact</a>
      </div>
    </div>
  )
}

export default Navbar