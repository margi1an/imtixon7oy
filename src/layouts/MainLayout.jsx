import React from 'react'
import { Navbar } from '../components'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
        <Navbar></Navbar>
        <main>
            <Outlet></Outlet>
        </main>
    </>
  )
}

export default MainLayout