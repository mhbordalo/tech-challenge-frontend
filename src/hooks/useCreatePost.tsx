import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
import { CreatePost } from '../types'

export function useCreatePost(): UseMutationResult<
  void,
  Error,
  CreatePost,
  unknown
> {
  const queryClient = useQueryClient()

  const mutation = useMutation<void, Error, CreatePost>({
    mutationFn: async ({ title, content, img }) => {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Token not found')
      }

      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (img instanceof File) {
        formData.append('img', img)
      } else {
        formData.append('img', img)
      }

      await axios.post(
        `https://tech-challenge-back-end.vercel.app/posts/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
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
