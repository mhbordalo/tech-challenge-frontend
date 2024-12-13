import { createFileRoute } from '@tanstack/react-router'
import logoVertical from '/assets/images/logo_vertical.png'
import { Button } from '../../components/Button'
import { useLogin } from '../../hooks/useLogin'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/Login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, login } = useLogin()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate({ to: '/Home' })
        },
      },
    )
  }

  return (
    <div className="bg-login-page h-screen bg-no-repeat bg-cover flex items-center justify-center px-4">
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl p-5 py-8 w-96 flex flex-col justify-center">
          <img
            src={logoVertical}
            alt="Logo TechSchool"
            className="w-44 mx-auto mb-6"
          />

          <form onSubmit={handleSubmit}>
            <label className="block text-gray-700 text-xs font-bold mb-1">
              Usuário
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 mb-2"
            />

            <label className="block text-gray-700 text-xs font-bold mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 mb-6"
            />
            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RouteComponent
