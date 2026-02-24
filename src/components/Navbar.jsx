import React from 'react'

export default function Navbar() {
  return (
    <nav>

<div className="navbar flex w-full h-15  justify-between bg-blue-900 text-cyan-50  items-center">

    <div className="logo   text-bold text-4xl px-3 font-bold ">AlphaTask</div>
    <div className='gap-5 flex items-center px-2'>

        <div className="home cursor-pointer">Home</div>
        <div className="about cursor-pointer ">About</div>
        <div className="contact cursor-pointer  ">Contact</div>
    </div>
</div>
      
    </nav>
  )
}
