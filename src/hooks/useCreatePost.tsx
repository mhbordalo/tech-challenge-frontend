import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
//import { useAuth } from '../context/AuthContext'
import { CreatePost } from '../types'

export function useCreatePost({
  title = '',
  content = '',
  img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxqHVvjehI51bq2YwrC5iElwO7FcWlZGWiQ&s',
}: CreatePost): UseMutationResult<void, Error, void, unknown> {
  const queryClient = useQueryClient()
  //const { isLoggedIn } = useAuth()

  const mutation = useMutation<void, Error>({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      console.log(1)
      if (!token) {
        throw new Error('Token not found')
      }
      console.log(title)
      await axios.post(
        `https://tech-challenge-back-end.vercel.app/posts/`,
        {
          title,
          content,
          img,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    },
    onSuccess: () => {
      console.log(2)
      queryClient.invalidateQueries(['posts'])
    },
  })

  return mutation
}
