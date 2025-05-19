import React from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

interface UserLayoutProps {
  children: React.ReactNode
  showNavigation?: boolean
}

export function UserLayout({ children, showNavigation = true }: UserLayoutProps) {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {(showNavigation || !isAuthPage) && <Navbar />}
      <div className="flex-grow pt-24 pb-16">
        {children}
      </div>
      <Footer />
    </div>
  )
}