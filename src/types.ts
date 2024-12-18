export type Post = {
  _id?: string
  author: string
  title: string
  content: string
  img: string | File | null
}

export type EditPost = {
  _id?: string | undefined
  title: string
  content: string
  img: string | File | null
}

export type CreatePost = {
  title: string
  content: string
  img: string | File | null
}
export type PostsResponse = {
  posts: Post[]
  totalPages: number
}
