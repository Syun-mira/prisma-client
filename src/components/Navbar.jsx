import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth'

const Navbar = () => {
  const { user, logout } = useAuth();
 
  
  return (
    <>
      <header className="bg-gray-700 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-semibold text-xl">
            <Link to="/">SNS Clone</Link>
          </h1>
          <nav>
            <ul className="flex space-x-4">
              {user ? (
                <>
                  <button className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                  onClick={logout}
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                  >
                    ログイン
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                  >
                    サインアップ
                  </Link>
                </>
              )
              }

            </ul>
          </nav>
        </div >
      </header >
    </>
  )
}

export default Navbar