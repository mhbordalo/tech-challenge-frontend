import { Dispatch, SetStateAction, useState } from 'react'
import { useCurrentPage } from '../../context/CurrentPage'
import { usePostsPagination } from '../../hooks/usePostsPagination'
import { useDeletePost } from '../../hooks/useDeletePost'
import { Card } from '../../components/Card'
import Pagination from '../../components/Pagination'
import { Post } from '../../types'
import Loader from '../Loader'
import { toast } from 'react-toastify'

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
  const { data, isLoading, isPreviousData } = usePostsPagination(currentPage)
  const { deletePost } = useDeletePost()
  const [posts, setPosts] = useState<Post[]>(data?.posts || [])

  const filteredPosts = data?.posts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const isLoadingInitialData = isLoading && !data

  async function handleDeletePost(id: string) {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir este post?',
    )
    if (!confirmed) return
    await deletePost({ _id: id })
    toast.success('Post excluído com sucesso!')
    // Atualize a lista de posts após a exclusão
    const updatedPosts = posts.filter((post) => post._id !== id)
    // Atualize o estado com os posts atualizados
    setPosts(updatedPosts)
  }

  return (
    <>
      <div
        className={`max-w-screen-xl mx-auto py-10 flex flex-wrap justify-center ${
          isPreviousData ? 'opacity-50' : 'opacity-100'
        } transition-opacity duration-300`}
      >
        {isLoadingInitialData ? (
          <Loader />
        ) : filteredPosts?.length ? (
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

        {isLoading && !isLoadingInitialData && (
          <p className="text-gray-500 mt-4">Carregando novos posts...</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  )
}
