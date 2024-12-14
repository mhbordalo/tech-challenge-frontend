import Loader from '../../components/Loader'
import { Intro } from '../../components/Intro'
import { Post } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/Details/$postId')({
  component: PostDetail,
  loader: async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      postId: params.postId,
    }
  },
  pendingComponent: () => <Loader />,
  errorComponent: () => <div>Post não encontrado!</div>,
})

function PostDetail() {
  const [post, setPost] = useState<Post | null>(null)

  const { postId } = Route.useLoaderData()

  useEffect(() => {
    async function fetchPostsById() {
      const response = await fetch(
        `https://tech-challenge-back-end.vercel.app/posts/${postId}`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch this post')
      }

      const data = await response.json()
      setPost(data)
    }
    fetchPostsById()
  }, [postId])
  console.log(postId)
  return (
    <div>
      <Intro title={post?.title} description={post?.author} />
      <p className="text-center w-[65.8%] mt-16 mb-11 mx-auto">
        {post?.content}
      </p>
      <img src={post?.img} className="justify-self-center max-w-[43%] mb-14" />
    </div>
  )
}
