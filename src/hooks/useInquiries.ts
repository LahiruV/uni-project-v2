import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getInquiries, createInquiry, updateInquiry, completeInquiry, deleteInquiry } from '../services/api'
import { toast } from 'sonner'

export function useInquiries() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['get-inquiries'],
    queryFn: getInquiries,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delete-inquiries'] })
      toast.success('Inquiry deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete inquiry')
    },
  })

  const createMutation = useMutation({
    mutationFn: createInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['create-inquiries'] })
      toast.success('Inquiry created successfully')
    },
    onError: () => {
      toast.error('Failed to create inquiry')
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['update-inquiries'] })
      toast.success('Inquiry updated successfully')
    },
    onError: () => {
      toast.error('Failed to update inquiry')
    },
  })

  const completeMutation = useMutation({
    mutationFn: completeInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complete-inquiries'] })
      toast.success('Inquiry marked as complete')
    },
    onError: () => {
      toast.error('Failed to complete inquiry')
    },
  })

  return {
    inquiries: data?.inquiries || [],
    isLoading,
    error,
    createInquiry: createMutation.mutate,
    updateInquiry: updateMutation.mutate,
    completeInquiry: completeMutation.mutate,
    deleteInquiry: deleteMutation.mutate,
  }
}