import { useState } from 'react'
import NavBar from './navbar.jsx'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <NavBar />
      <div className="container-sm">
        <Outlet />
      </div>
    </>
  )
}

export default App;
