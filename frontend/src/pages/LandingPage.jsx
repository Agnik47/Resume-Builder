import React from 'react'
import Navbar from '../components/Landing/Navbar'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
        <Navbar />
        <Link to='/dashboard'>Go to Dashboard</Link>
    </div>
  )
}

export default LandingPage