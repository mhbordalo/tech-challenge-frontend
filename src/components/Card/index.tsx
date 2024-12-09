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
    handleDeletePost?.(post._id)
  }

  const renderImage = () => {
    if (typeof img === 'string') {
      return <img className="w-full h-44" src={img} alt={`Imagem ${title}`} />
    } else if (img instanceof File) {
      return (
        <img
          className="w-full h-44"
          src={URL.createObjectURL(img)}
          alt={`Imagem ${title}`}
        />
      )
    } else {
      return (
        <img
          className="w-full h-44"
          src={imageNotAvailable}
          alt="Imagem não disponível"
        />
      )
    }
  }

  return (
    <div className="w-96 h-96 rounded overflow-hidden shadow-lg m-2 relative mb-5">
      {renderImage()}
      <div className="px-6">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 mr-2 mt-3">
          {author}
        </span>
        <div className="font-bold text-xl pt-2 pb-1">{title}</div>
        <p className="text-black text-base leading-none line-clamp-3">
          {content}
        </p>
      </div>

      {admin ? (
        <div className="px-6 pt-4 pb-2 flex justify-between">
          <Button
            size="lg"
            variant="warning"
            className="w-40"
            onClick={handleClickButtonEdit}
          >
            EDITAR
          </Button>
          <Button
            size="lg"
            variant="danger"
            className="w-40"
            onClick={handleClickButtonDelete}
          >
            EXCLUIR
          </Button>
        </div>
      ) : (
        <div className="absolute bottom-3 w-full px-6 pt-4 pb-2">
          <Button
            className="w-full"
            size="lg"
            variant="primary"
            onClick={() => console.log('read ', _id)}
          >
            LER PUBLICAÇÃO
          </Button>
        </div>
      )}
    </div>
  )
}
