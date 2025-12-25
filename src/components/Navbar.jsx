import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='w-full bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-b border-gray-700'>
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo/Brand */}
          <div className='flex items-center'>
            <h1 className='text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-400 to-white bg-clip-text text-transparent'>
              📝 PasteApp
            </h1>
          </div>
          
          {/* Navigation Links */}
          <div className='flex gap-3 sm:gap-4'>
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `px-4 sm:px-6 py-2 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base ${
                  isActive 
                    ? 'bg-linear-to-r from-blue-500 to-white text-white shadow-lg shadow-blue-500/50' 
                    : 'bg-gray-700 text-white hover:bg-gray-600 hover:text-white hover:shadow-lg'
                }`
              }
            >
              <span className='hidden sm:inline'>🏠 Home</span>
              <span className='sm:hidden text-xl'>🏠</span>
            </NavLink>
            <NavLink 
              to="/pastes"
              className={({isActive}) => 
                `px-4 sm:px-6 py-2 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base ${
                  isActive 
                    ? 'bg-linear-to-r from-purple-500 to-white text-white shadow-lg shadow-purple-500/50' 
                    : 'bg-gray-700 text-white hover:bg-gray-600 hover:text-white hover:shadow-lg'
                }`
              }
            >
              <span className='hidden sm:inline'>📋 All Pastes</span>
              <span className='sm:hidden text-xl'>📋</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar