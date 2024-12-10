import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { usePosts } from '../../hooks/usePosts'
import { Card } from '../../components/Card'
import { Intro } from '../../components/Intro'
import { ModalForm } from '../../components/ModalForm'
import { Post } from '../../types'
import { FormPost } from '../../components/FormPost'
import Pagination from '../../Pagination'

export const Route = createFileRoute('/Home/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: posts, isLoading, error } = usePosts()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [postToEdit, setPostToEdit] = useState<Post | null>(null)
  const [admin, setAdmin] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  useEffect(() => {
    const userIsAdmin = true
    setAdmin(userIsAdmin)
  }, [])
  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  if (isLoading) return <p>Carregando...</p>
  if (error instanceof Error) return <p>Erro: {error.message}</p>

  function handleDeletePost(_id: string) {
    console.log(`Deletar post com ID: ${_id}`)
  }

  function handleEditedPost(postEdited: Post) {
    console.log('Post editado:', postEdited)
  }

  const filteredPosts = posts?.filter((post: Post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
        {postToEdit && (
          <FormPost
            postToEdit={postToEdit}
            handleEditedPostList={handleEditedPost}
          />
        )}
      </ModalForm>

      <div className="max-w-screen-xl mx-auto py-10 flex flex-wrap justify-center">
        {filteredPosts?.length ? (
          filteredPosts.map((post: Post) => (
            <Card
              key={post._id}
              post={post}
              admin={admin}
              setPostToEdit={setPostToEdit}
              setShowModal={setShowModal}
              handleDeletePost={handleDeletePost}
            />
          ))
        ) : (
          <p className="text-gray-500">Nenhum post encontrado.</p>
        )}
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}
