import { useState } from 'react'
import axios from 'axios'

interface DeletePostVariables {
  _id: string
}

export function useDeletePost() {
  const [isLoading, setIsLoading] = useState(false)

  const deletePost = async ({ _id }: DeletePostVariables) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Token não encontrado.')

      await axios.delete(
        `https://tech-challenge-back-end.vercel.app/posts/${_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
    } finally {
      setIsLoading(false)
    }
  }

  return { deletePost, isLoading }
}
