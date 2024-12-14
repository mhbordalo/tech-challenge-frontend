import { useState } from 'react'
import { CreatePost, EditPost, Post } from '../../types'
import { useCreatePost } from '../../hooks/useCreatePost'
import { useEditPost } from '../../hooks/userEditPost'
import { Button } from '../Button'
import { toast } from 'react-toastify'

interface FormPostProps {
  postToEdit?: Post | null
  handleCloseModal: () => void
}

export function FormPost({ postToEdit, handleCloseModal }: FormPostProps) {
  const [title, setTitle] = useState(postToEdit?.title || '')
  const [content, setContent] = useState(postToEdit?.content || '')
  const [image, setImage] = useState<File | null>(
    postToEdit?.img instanceof File ? postToEdit.img : null,
  )
  const [preview, setPreview] = useState<string | null>(
    typeof postToEdit?.img === 'string' ? postToEdit.img : null,
  )

  const { mutate: createPost, isLoading: isCreating } = useCreatePost()
  const { mutate: editPost, isLoading: isEditing } = useEditPost()

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newImage = image || postToEdit?.img || null

    try {
      if (postToEdit && postToEdit._id) {
        const updatedPost: EditPost = {
          _id: postToEdit._id,
          title,
          content,
          img: newImage,
        }
        editPost(updatedPost)
      } else {
        const newPost: CreatePost = {
          title,
          content,
          img: newImage,
        }
        createPost(newPost)
      }
      handleCloseModal()
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar publicação.')
    }
  }

  return (
    <div className="max-full bg-white rounded-lg">
      <h2 className="text-base text-black font-semibold mb-4">
        {postToEdit ? 'Editar Publicação' : 'Nova Publicação'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm text-black font-semibold mb-2"
          >
            Título
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm text-black font-semibold mb-2"
          >
            Conteúdo
          </label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="image-upload"
            className="block text-sm text-black font-semibold mb-2 cursor-pointer"
          >
            Imagem
          </label>
          <input
            type="file"
            id="image-upload"
            name="image"
            accept="image/*"
            onChange={handleChangeFile}
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className="inline-block px-4 py-2 bg-green-dark text-white rounded-lg hover:bg-green-light transition-colors cursor-pointer"
          >
            Escolher Imagem
          </label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-full h-44 object-cover rounded"
            />
          )}
        </div>
        <Button
          size="lg"
          type="submit"
          className="w-full"
          disabled={isCreating || isEditing}
        >
          {isCreating || isEditing
            ? 'Salvando...'
            : postToEdit
              ? 'Atualizar'
              : 'Publicar'}
        </Button>
      </form>
    </div>
  )
}
