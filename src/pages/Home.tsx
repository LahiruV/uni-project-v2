import { useState, useEffect } from 'react'
import { Hero } from '../components/Hero'
import { UserLayout } from '../layouts/UserLayout'
import { MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { getFeedbacks } from '../services/api'

interface FeedbackItem {
  id: string
  name: string
  message: string
  type: string
  createdAt: Date
}

export function Home() {
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([])
  const [totalFeedback, setTotalFeedback] = useState<number>(0)

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await getFeedbacks()
        setFeedbackData(response.feedbacks)
        setTotalFeedback(response.total)
      } catch (error) {
        console.error('Error fetching feedback:', error)
      }
    }

    fetchFeedback()
  }, [])
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
            {feedbackData.map((feedback) => (
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