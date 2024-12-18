import { Dispatch, SetStateAction, useState } from 'react'
import { useCurrentPage } from '../../context/CurrentPage'
import { usePostsPagination } from '../../hooks/usePostsPagination'
import { useDeletePost } from '../../hooks/useDeletePost'
import { Card } from '../../components/Card'
import Pagination from '../../components/Pagination'
import { Post } from '../../types'
import Loader from '../Loader'
import { Modal } from '../Modal'
import { Button } from '../Button'

export function PostsList({
  posts,
  searchTerm,
  isAdmin,
  setPostToEdit,
  setShowModal,
}: {
  posts: Post[]
  searchTerm: string
  isAdmin: boolean
  setPostToEdit: Dispatch<SetStateAction<Post | null>>
  setShowModal: Dispatch<SetStateAction<boolean>>
}) {
  const { currentPage, setCurrentPage } = useCurrentPage()
  const { data, isLoading, isFetching, error } = usePostsPagination(currentPage)
  const { mutate: deletePostMutation } = useDeletePost()

  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const displayedPosts: Post[] = searchTerm
    ? posts
    : (data?.posts as Post[]) || []

  const totalPages = searchTerm ? 1 : data?.totalPages || 1

  const isLoadingInitialData = isLoading && !data

  async function handleDeletePost(id: string) {
    setPostIdToDelete(id)
    setIsDeleteModalOpen(true)
  }

  async function confirmDelete() {
    if (postIdToDelete) {
      deletePostMutation({ _id: postIdToDelete })
      setPostIdToDelete(null)
      setIsDeleteModalOpen(false)
    }
  }

  function cancelDelete() {
    setPostIdToDelete(null)
    setIsDeleteModalOpen(false)
  }

  if (isLoadingInitialData) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <div
        className={`max-w-screen-xl mx-auto py-10 flex flex-wrap justify-center ${
          isFetching ? 'opacity-50' : 'opacity-100'
        } transition-opacity duration-300`}
      >
        {displayedPosts.length ? (
          displayedPosts.map((post) => (
            <Card
              key={post._id}
              post={post}
              admin={isAdmin}
              setPostToEdit={setPostToEdit}
              setShowModal={setShowModal}
              handleDeletePost={() => post._id && handleDeletePost(post._id)}
            />
          ))
        ) : (
          <p className="text-gray-500">Nenhum post encontrado.</p>
        )}
      </div>

      {!searchTerm && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {isDeleteModalOpen && (
        <Modal onClose={cancelDelete}>
          <p className="mb-10">Tem certeza que deseja excluir este post?</p>
          <div className="flex justify-end space-x-2">
            <Button variant="primary" onClick={cancelDelete}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Excluir
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
