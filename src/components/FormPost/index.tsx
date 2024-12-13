import { useState } from 'react';
import { Button } from '../Button';
import { CreatePost, EditPost } from '../../types';
import { useCreatePost } from '../../hooks/useCreatePost'; 
import { useEditPost } from '../../hooks/userEditPost'; 
import { toast } from 'react-toastify';

interface FormPostProp {
  postToEdit?: EditPost; 
  handleCloseModal: () => void;
}

export function FormPost({ postToEdit, handleCloseModal }: FormPostProp) {
  const [title, setTitle] = useState(postToEdit?.title || '');
  const [content, setContent] = useState(postToEdit?.content || '');
  const [image, setImage] = useState<File | null | string>(postToEdit?.img || null);
  const [preview, setPreview] = useState<string | null>(
    typeof postToEdit?.img === 'string' ? postToEdit.img : null
  );

  const { createPost, isLoading: isCreating } = useCreatePost(); // Hook de criação
  const { editPost, isLoading: isEditing } = useEditPost(); // Hook de edição

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newImage = image || postToEdit?.img || null;

    try {
      if (postToEdit) {
        // Atualiza 
        const updatedPost: EditPost = { ...postToEdit, title, content, img: newImage };
        await editPost(updatedPost);
        toast.success('Publicação atualizada com sucesso!');
      } else {
        // Cria 
        const newPost: CreatePost = { title, content, img: newImage };
        await createPost(newPost);
        toast.success('Publicação criada com sucesso!');
      }
      handleCloseModal();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar publicação.');
    }
  };

  return (
    <div className="max-full bg-white rounded-lg">
      <h2 className="text-base text-black font-semibold mb-4">
        {postToEdit ? 'Editar Publicação' : 'Nova Publicação'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm text-black font-semibold mb-2">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm text-black font-semibold mb-2">
            Conteúdo
          </label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm text-black font-semibold mb-2">
            Adicionar Imagem
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChangeFile}
            className="w-full border rounded-lg text-gray-700 text-xs bg-gray-200 file:bg-black-light file: font-normal file:text-white file:text-xs file:me-4 file:py-2 file:px-4 file:w-48 file:hover:bg-grey-dark file:transition file:cursor-pointer"
          />
          {preview && (
            <div className="flex justify-center mt-2">
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover" />
            </div>
          )}
        </div>
        <Button
          size="lg"
          type="submit"
          className="w-full"
          disabled={isCreating || isEditing}
        >
          {isCreating || isEditing ? 'Salvando...' : postToEdit ? 'Atualizar' : 'Publicar'}
        </Button>
      </form>
    </div>
  );
}
