import { useState } from 'react'
import { Button } from '../Button'
import { CreatePost, EditPost } from '../../types'

interface FormPostProp {
  postToEdit: EditPost
  handleEditedPostList?: (post: EditPost) => void
  handleCreatePost?: (post: CreatePost) => void
}

export function FormPost({
  postToEdit,
  handleEditedPostList,
  handleCreatePost,
}: FormPostProp) {
  //const [post, setPost] = useState(postToEdit)
  const [titleEdited, setTitleEdited] = useState(postToEdit.title)
  const [contentEdited, setContentEdited] = useState(postToEdit.content)
  const [image, setImage] = useState<File | null | string>(null)
  const [preview, setPreview] = useState<string | null>(null)

  function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()

    let newImage
    if (image === null) {
      newImage = postToEdit.img
    } else {
      newImage = image
    }

    if (handleEditedPostList) {
      const newPost = {
        id: postToEdit._id,
        title: titleEdited,
        content: contentEdited,
        img: newImage,
      }
      handleEditedPostList(newPost)
    }

    if (handleCreatePost) {
      const newPost = {
        title: titleEdited,
        content: contentEdited,
        img: newImage,
      }
      handleCreatePost(newPost)
    }
  }

  return (
    <div className="max-full bg-white rounded-lg ">
      <h2 className="text-base text-black font-semibold mb-4">
        Nova Publicação
      </h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm text-black font-semibold mb-2"
          ></label>
          <input
            type="text"
            name="title"
            value={titleEdited}
            onChange={(e) => setTitleEdited(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-black text-sm font-semibold mb-2"
          >
            Conteúdo
          </label>
          <textarea
            name="content"
            value={contentEdited}
            onChange={(e) => setContentEdited(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          ></textarea>
        </div>
        <div className="mb-5">
          <label className="block text-black text-sm font-semibold mb-2">
            Adicionar Imagem do Post
          </label>

          <input
            type="file"
            name="image"
            onChange={handleChangeFile}
            className="w-full border rounded-lg text-gray-700 text-xs bg-gray-200 file:bg-black-light file: font-normal file:text-white file:text-xs file:me-4 file:py-2 file:px-4 file:w-48 file:hover:bg-grey-dark file:transition file:cursor-pointer"
          />
          {preview && (
            <div className=" flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="mb-4 w-32 h-32 object-cover"
              />
            </div>
          )}
        </div>
        <Button
          size="lg"
          onClick={handleSubmit}
          className="w-full"
          id="wrapper"
        >
          PUBLICAR
        </Button>
      </form>
    </div>
  )
}
