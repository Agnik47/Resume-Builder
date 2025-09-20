

/*import React from 'react'
>>>>>>> e7c8009 (frontend changes commited)

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
<<<<<<< HEAD
}

export default Navbar
=======
}*/
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-blue-600 text-white flex items-center justify-between px-8">
      <div className="text-2xl font-bold">SkillMentor AI</div>
      <div className="space-x-6">
        <a href="#home" className="hover:underline">Home</a>
        <a href="#about" className="hover:underline">About</a>
        <a href="#features" className="hover:underline">Features</a>
        <a href="#contact" className="hover:underline">Contact</a>
        <Link
          to="/dashboard"
          className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Navbar;


