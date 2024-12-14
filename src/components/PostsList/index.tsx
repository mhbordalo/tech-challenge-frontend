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
  searchTerm,
  isAdmin,
  setPostToEdit,
  setShowModal,
}: {
  searchTerm: string
  isAdmin: boolean
  setPostToEdit: Dispatch<SetStateAction<Post | null>>
  setShowModal: Dispatch<SetStateAction<boolean>>
}) {
  const { currentPage, setCurrentPage } = useCurrentPage()
  const { data, isLoading, isFetching, error } = usePostsPagination(currentPage)
  const { mutate: deletePostMutation, isLoading: isDeleting } = useDeletePost()

  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const filteredPosts = data?.posts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
        {filteredPosts?.length ? (
          filteredPosts.map((post) => (
            <Card
              key={post._id}
              post={post}
              admin={isAdmin}
              setPostToEdit={setPostToEdit}
              setShowModal={setShowModal}
              handleDeletePost={handleDeletePost}
            />
          ))
        ) : (
          <p className="text-gray-500">Nenhum post encontrado.</p>
        )}

        {isFetching && (
          <p className="text-gray-500 mt-4">Atualizando posts...</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />

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
