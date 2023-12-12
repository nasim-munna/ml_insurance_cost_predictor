import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 ">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">Insurance</a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li><a>Home</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar