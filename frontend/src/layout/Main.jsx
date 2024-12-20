import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
const Main = () => {
    return (
        <div className='bg-image'>
            <div >
            <Navbar />
            <div className=''>
                <Outlet />
            </div>
            <Footer />
        </div>
        </div>
    )
}

export default Main
