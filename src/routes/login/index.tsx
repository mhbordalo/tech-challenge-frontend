import { createFileRoute } from '@tanstack/react-router'
import logoVertical from '/assets/images/logo_vertical.png'
import { Button } from '../../components/Button'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="bg-login-page h-screen bg-no-repeat bg-cover flex items-center justify-center px-4">
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl p-5 py-8 w-96 flex flex-col justify-center">
            <img
              src={logoVertical}
              alt="Logo TechSchool"
              className="w-44 mx-auto mb-6"
            />

            <form>
              <label className="block text-gray-700 text-xs font-bold mb-1">
                Usuário
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 mb-2"
              />

              <label className="block text-gray-700 text-xs font-bold mb-1">
                Senha
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 mb-6"
              />
              <Button variant="primary" size="lg" className="w-full">
                Entrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
