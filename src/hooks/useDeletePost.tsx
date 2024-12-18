import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

interface DeletePostVariables {
  _id: string
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ _id }: DeletePostVariables) => {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Token não encontrado.')

      await axios.delete(
        `https://tech-challenge-back-end.vercel.app/posts/${_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Post excluído com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao excluir post.')
    },
  })
}
