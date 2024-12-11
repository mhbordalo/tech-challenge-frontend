import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import logoHorinzontal from '/assets/images/logo_horizontal.png'
import { useAuth } from '../../context/AuthContext'
import newPost from '/assets/icons/edit_document.png'
import adminPanel from '/assets/icons/admin_panel_settings.png'
import login from '/assets/icons/login.png'
import logoutimg from '/assets/icons/logoutimg.png'
import { ModalForm } from '../ModalForm'
import { FormPost } from '../FormPost'
import { CreatePost } from '../../types'
import { useCreatePost } from '../../hooks/useCreatePost'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn, isAdmin, logout } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [postToEdit, setPostToEdit] = useState<CreatePost>({
    title: '',
    content: '',
    img: '',
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleModalForm = () => {
    setShowModal(true)
  }

  const createPostMutation = useCreatePost(postToEdit)
  async function handleCreatePost(newPost: CreatePost) {
    setPostToEdit(newPost)
  }

  useEffect(() => {
    if (postToEdit.title !== '') {
      createPostMutation.mutate()
      setPostToEdit({
        title: '',
        content: '',
        img: '',
      })
    }
  }, [postToEdit])

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-5">
        <Link
          href="/home"
          className="flex items-center ms-3 space-x-3 rtl:space-x-reverse"
        >
          <img src={logoHorinzontal} alt="Logo" className="w-60 md:w-56" />
        </Link>

        <button
          type="button"
          className="inline-flex items-center p-2 w-14 h-14 me-3 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
          onClick={toggleMenu}
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8">
            {isAdmin && (
              // <Link
              //   href="/home"
              <div
                className="flex gap-2 text-sm py-2 px-3 text-green-dark hover:text-gray-500 rounded md:bg-transparent md:p-0 items-center hover:cursor-pointer"
                onClick={toggleModalForm}
              >
                <img
                  src={newPost}
                  alt="Criar Publicação"
                  className="w-4.1 h-5"
                />
                Criar Publicação
                {/* </Link> */}
              </div>
            )}

            {isAdmin && (
              <Link
                href="/home"
                className="flex gap-2 text-sm py-2 px-3 text-green-dark hover:text-gray-500 rounded md:bg-transparent md:p-0 items-center"
              >
                <img
                  src={adminPanel}
                  alt="Área Administrativa"
                  className="w-4.1 h-5"
                />
                Área Administrativa
              </Link>
            )}

            {!isLoggedIn ? (
              <Link
                href="/login"
                className="flex gap-2 text-sm py-2 px-3 text-green-dark hover:text-gray-500 rounded md:bg-transparent md:p-0 items-center"
              >
                <img src={login} alt="Login" className="w-4.1 h-5" />
                Login
              </Link>
            ) : (
              <Link
                onClick={logout}
                href="/logout"
                className="flex gap-2 text-sm py-2 px-3 text-green-dark hover:text-gray-500 rounded md:bg-transparent md:p-0 items-center"
              >
                <img src={logoutimg} alt="Logout" className="w-4.1 h-5" />
                Logout
              </Link>
            )}
          </ul>
        </div>
      </div>
      <ModalForm isVisible={showModal} onClose={() => setShowModal(false)}>
        <FormPost postToEdit={postToEdit} handleCreatePost={handleCreatePost} />
      </ModalForm>
    </nav>
  )
}
