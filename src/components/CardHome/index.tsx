import { PostContent } from '../../types'
import { Button } from '../Button'

interface CardHomeProps {
  postContent: PostContent
  admin?: boolean
}

export default function CardHome({
  postContent,
  admin = false,
}: CardHomeProps) {
  const {id, name, title, text, imageUrl, imageAlt } = postContent

  function handleClickButtonRead() {
    console.log('read ', id)
  }

  function handleClickButtonEdit() {
    console.log('edit ', id)
  }

  function handleClickButtonDelete() {
    console.log('delete ', id)
  }




  return (
    <div className="w-96 h-96 rounded overflow-hidden shadow-lg m-2 relative ">
      <img className="w-full h-44" src={imageUrl} alt={imageAlt} />
      <div className="px-6">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs  text-gray-700 mr-2 mt-3">
          {name}
        </span>
        <div className="font-bold text-xl pt-2 pb-1">{title}</div>
        <p className="text-black text-base leading-none line-clamp-3">{text}</p>
      </div>

      {admin ? (
        <div className="px-6 pt-4 pb-2 flex justify-between">
          <Button size="lg" variant="warning" className='w-40' onClick={handleClickButtonEdit}>
            EDITAR
          </Button>
          <Button size="lg" variant="danger" className='w-40' onClick={handleClickButtonDelete}>
            EXCLUIR
          </Button>
        </div>
      ) : (
        <div className="absolute bottom-3 w-full px-6 pt-4 pb-2">
          <Button className="w-full" size="lg" variant="primary" onClick={handleClickButtonRead}>
            LER PUBLICAÇÃO
          </Button>
        </div>
      )}
    </div>
  )
}
