import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

interface User {
  isAdmin: boolean
}

interface LoginResponse {
  token: string
  user: User
}

interface LoginVariables {
  email: string
  password: string
}

export function useLogin() {
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: async (variables) => {
      const response = await axios.post(
        'https://tech-challenge-back-end.vercel.app/users/login',
        {
          email: variables.email,
          password: variables.password,
        },
      )
      return response.data
    },
    onSuccess: (data) => {
      const isAdmin =
        data.user?.isAdmin !== undefined ? data.user.isAdmin : false
      login(data.token, isAdmin)
      setError(null)
    },
    onError: () => {
      setError(
        'Falha no login. Por favor, verifique suas credenciais e tente novamente.',
      )
    },
  })

  return { error, login: mutation.mutate }
}
