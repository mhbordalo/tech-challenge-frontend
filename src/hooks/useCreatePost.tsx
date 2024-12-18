import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { CreatePost } from '../types'
import { toast } from 'react-toastify'

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (post: CreatePost) => {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Token não encontrado.')

      const formData = new FormData()
      formData.append('title', post.title)
      formData.append('content', post.content)
      if (post.img && post.img instanceof File) formData.append('img', post.img)

      const response = await axios.post(
        'https://tech-challenge-back-end.vercel.app/posts/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Post criado com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao criar post.')
    },
  })
}
