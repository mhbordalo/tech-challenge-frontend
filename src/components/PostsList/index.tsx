import { Dispatch, SetStateAction } from 'react'
import { useCurrentPage } from '../../context/CurrentPage'
import { usePostsPagination } from '../../hooks/usePostsPagination'
import { Card } from '../../components/Card'
import Pagination from '../../components/Pagination'
import { Post } from '../../types'
import { Link } from '@tanstack/react-router'
import Loader from '../Loader'

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

  const filteredPosts = data?.posts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const isLoadingInitialData = isLoading && !data

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
            <Link to={`/Details/${post._id}`} key={post._id}>
              <Card
                key={post._id}
                post={post}
                admin={isAdmin}
                setPostToEdit={setPostToEdit}
                setShowModal={setShowModal}
                handleDeletePost={(id) => console.log('Deletando post:', id)}
              />
            </Link>
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
