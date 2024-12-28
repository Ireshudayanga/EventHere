import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

const Dashboard = () => {
    return (
        <div>
            <div><Outlet /></div>
            <div><SideBar/></div>
        </div>
    )
}

export default Dashboard
