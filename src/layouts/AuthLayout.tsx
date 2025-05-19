import React from 'react'
import { AuthHeader } from '../components/AuthHeader'
import { AuthFooter } from '../components/AuthFooter'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AuthHeader />
      <div className="flex-grow pt-24 pb-16">
        {children}
      </div>
      <AuthFooter />
    </div>
  )
}