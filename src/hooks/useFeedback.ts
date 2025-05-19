import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFeedbacks, createFeedback, deleteFeedback } from '../services/api'
import { toast } from 'sonner'

export function useFeedback() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['feedback'],
    queryFn: getFeedbacks,
  })

  const createMutation = useMutation({
    mutationFn: createFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] })
      toast.success('Feedback submitted successfully')
    },
    onError: () => {
      toast.error('Failed to submit feedback')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] })
      toast.success('Feedback deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete feedback')
    },
  })

  return {
    feedback: data?.feedbacks || [],
    isLoading,
    error,
    createFeedback: createMutation.mutate,
    deleteFeedback: deleteMutation.mutate,
  }
}