import { createFileRoute } from '@tanstack/react-router'
import { Intro } from '../../components/Intro'
import { ModalForm } from '../../components/ModalForm'
import { FormPost } from '../../components/FormPost'
import { PostsList } from '../../components/PostsList'
import { Post } from '../../types'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { useSearchPost } from '../../hooks/useSearchPost'

export const Route = createFileRoute('/Home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isAdmin } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [postToEdit, setPostToEdit] = useState<Post | null>(null)

  const { searchTerm, setSearchTerm, filteredPosts } = useSearchPost()

  return (
    <>
      <Intro
        title="ÚLTIMAS NOTÍCIAS"
        description="ACOMPANHE TUDO EM UM SÓ LUGAR"
      />

      <div className="max-w-screen-xl mx-auto pt-10 flex flex-wrap justify-center px-12">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar publicação..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-900"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112 4.5a7.5 7.5 0 014.65 12.15z"
              />
            </svg>
          </div>
        </div>
      </div>

      <ModalForm isVisible={showModal} onClose={() => setShowModal(false)}>
        {postToEdit && postToEdit._id ? (
          <FormPost
            postToEdit={postToEdit}
            handleCloseModal={() => setShowModal(false)}
          />
        ) : (
          <FormPost handleCloseModal={() => setShowModal(false)} />
        )}
      </ModalForm>
      <PostsList
        posts={filteredPosts} 
        searchTerm={searchTerm} 
        isAdmin={isAdmin}
        setPostToEdit={setPostToEdit}
        setShowModal={setShowModal}
      />
    </>
  )
}
