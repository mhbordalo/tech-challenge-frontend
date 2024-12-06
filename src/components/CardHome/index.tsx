import { Post } from '../../types';
import { Button } from '../Button';
import imageNotAvailable from '/assets/images/image_not_available.png';

interface CardHomeProps {
  post: Post;
  admin?: boolean;
  seTpostToEdit: React.Dispatch<React.SetStateAction<Post>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeletePost: (id: number) => void
}

export default function CardHome({
  post,
  admin = false,
  seTpostToEdit,
  setShowModal,
  handleDeletePost
}: CardHomeProps) {
  const { id, name, title, content, image } = post;

  function handleClickButtonRead() {
    console.log('read ', id);
  }

  function handleClickButtonEdit() {
    seTpostToEdit(post);
    setShowModal(true);
  }

  function handleClickButtonDelete() {
    handleDeletePost(post.id)

    console.log('delete ', id);
  }

  const renderImage = () => {
    if (typeof image === 'string') {
      return <img className="w-full h-44" src={image} alt={`imagem ${title}`} />;
    } else if (image instanceof File) {
      return <img className="w-full h-44" src={URL.createObjectURL(image)} alt={`imagem ${title}`} />;
    } else {
      return <img className="w-full h-44" src={imageNotAvailable} alt={`imagem not found`} />;
    }
  };

  return (
    <div className="w-96 h-96 rounded overflow-hidden shadow-lg m-2 relative ">
      {renderImage()}
      <div className="px-6">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 mr-2 mt-3">
          {name}
        </span>
        <div className="font-bold text-xl pt-2 pb-1">{title}</div>
        <p className="text-black text-base leading-none line-clamp-3">{content}</p>
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
  );
}