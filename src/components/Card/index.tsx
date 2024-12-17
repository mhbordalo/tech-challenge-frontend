import { Link } from '@tanstack/react-router'
import { Post } from '../../types'
import { Button } from '../Button'
import imageNotAvailable from '/assets/images/image_not_available.png'

interface CardProps {
  post: Post
  admin?: boolean
  setPostToEdit?: React.Dispatch<React.SetStateAction<Post | null>>
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>
  handleDeletePost?: (_id: string) => void
}

export function Card({
  post,
  admin = false,
  setPostToEdit,
  setShowModal,
  handleDeletePost,
}: CardProps) {
  const { _id, author, title, content, img } = post

  function handleClickButtonEdit() {
    setPostToEdit?.(post)
    setShowModal?.(true)
  }

  function handleClickButtonDelete() {
    if (_id !== undefined && handleDeletePost) {
      handleDeletePost(_id)
    }
  }

  const renderImage = () => {
    if (typeof img === 'string') {
      return (
        <img
          className="w-full h-44 object-cover"
          src={img}
          alt={`Imagem ${title}`}
        />
      )
    } else if (img instanceof File) {
      return (
        <img
          className="w-full h-44 object-cover"
          src={URL.createObjectURL(img)}
          alt={`Imagem ${title}`}
        />
      )
    } else {
      return (
        <img
          className="w-full h-44 object-cover"
          src={imageNotAvailable}
          alt="Imagem não disponível"
        />
      )
    }
  }

  return (
    <div className="relative w-80 bg-white rounded-lg shadow-md overflow-hidden m-4 transition-all duration-500 hover:scale-105 hover:cursor-pointer">
      <Link to={`/Details/${post._id}`} key={post._id}>
        {renderImage()}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-700 mb-10 line-clamp-3 min-h-[4.5rem]">{content}</p>
          <p className="text-sm text-gray-500">Autor: {author}</p>
        </div>
      </Link>
      {admin && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <Button size="sm" variant="primary" onClick={handleClickButtonEdit}>
            Editar
          </Button>
          <Button size="sm" variant="danger" onClick={handleClickButtonDelete}>
            Excluir
          </Button>
        </div>
      )}
    </div>
  )
}
