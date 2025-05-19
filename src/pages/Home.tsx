import { Hero } from '../components/Hero'
import { UserLayout } from '../layouts/UserLayout'
import { MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { getFeedbacks } from '../services/api'

interface FeedbackItem {
  id: string
  name: string
  message: string
  type: string
  createdAt: Date
}

export function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['feedback'],
    queryFn: getFeedbacks,
  })

  return (
    <UserLayout>
      <Hero />
      {/* Feedback Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <MessageSquare className="h-8 w-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Student Feedback</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear what our students have to say about their experience at Deakin University.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-3 text-center text-red-600">
                Failed to load feedback. Please try again later.
              </div>
            ) : data?.feedbacks.map((feedback) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-gray-600 mb-4 italic">"{feedback.message}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{feedback.name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  )
}