import React, { useState } from 'react'
import { useCreatePost } from '../../hooks/useCreatePost'
import { useEditPost } from '../../hooks/userEditPost'
import { Post, EditPost } from '../../types'

interface FormPostProps {
  postToEdit?: Post
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

  const { mutate: createPost, status: createStatus } = useCreatePost()
  const { mutate: editPost, status: editStatus } = useEditPost()

  const isCreating = createStatus === 'pending'
  const isEditing = editStatus === 'pending'

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
        createPost({ title, content, img: newImage })
      }
      handleCloseModal()
    } catch (error) {
      console.error('Failed to submit post:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Conteúdo"
        required
      />
      <input type="file" onChange={handleChangeFile} />
      {preview && <img src={preview} alt="Preview" />}
      <button type="submit" disabled={isCreating || isEditing}>
        {postToEdit ? 'Editar' : 'Criar'}
      </button>
    </form>
  )
}
