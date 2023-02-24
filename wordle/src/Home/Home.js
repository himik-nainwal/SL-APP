import React from 'react'
import { useState , useEffect } from 'react'
import config from "./config.json";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
    <div className='min-h-screen'>
    <div className="relative">
      <button
        className="flex items-center justify-center w-full px-4 py-2 font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
        onClick={toggle}
      >
        Dropdown
        <svg
          className="w-4 h-4 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 14l6-6H4z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              5 X 5
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              6 X 6
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              7 X 7
            </a>
          </div>
        </div>
      )}
    </div>
    <div className=''>
      Hello
    </div>
    </div>
  )
}

export default Home