import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { EditPost } from '../types'
import { toast } from 'react-toastify'

export function useEditPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (post: EditPost) => {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Token não encontrado.')

      const formData = new FormData()
      formData.append('title', post.title)
      formData.append('content', post.content)
      if (post.img && post.img instanceof File) formData.append('img', post.img)

      await axios.patch(
        `https://tech-challenge-back-end.vercel.app/posts/${post._id}`,
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
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Post atualizado com sucesso!')
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message || 'Erro ao atualizar post.')
      } else {
        toast.error('Erro ao atualizar post.')
      }
    },
  })
}
