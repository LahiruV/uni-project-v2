import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
import { AuthHeader } from '../components/AuthHeader'
import { UserPlus, Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { register } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import type { RegisterDto } from '../services/types'


export function Register() {
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<RegisterDto>({
    name: '',
    email: '',
    password: '',
  })

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      authLogin(data.token)
      navigate('/')
    },
    onError: () => {
      setError('Registration failed. Please try again.')
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    mutation.mutate(formData)
  }

  return (
    <AuthLayout>
      <AuthHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
          <div className="hidden lg:block lg:w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2086"
              alt="University campus"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
          <div className="w-full lg:w-1/2 p-8">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <UserPlus className="h-8 w-8 text-yellow-500" />
              <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4 mr-2" />
                )}
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-yellow-500 hover:text-yellow-600">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}