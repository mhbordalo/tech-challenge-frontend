import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

interface DeletePostVariables {
  _id: string
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  const { isLoggedIn } = useAuth()

  const mutation = useMutation<void, Error, DeletePostVariables>({
    mutationFn: async ({ _id }) => {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Token not found')
      }

      await axios.delete(
        `https://tech-challenge-back-end.vercel.app/posts/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    },
  })

  return mutation
}
