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
      <div className="max-w-screen-xl mx-auto pt-10 px-12">
        <div className="flex justify-center">
          <img
            src={typeof post?.img === 'string' ? post.img : undefined}
            className="w-full sm:max-w-[60%] md:max-w-[43%] lg:max-w-[35%] mb-4"
          />
        </div>
        <p className="mt-8 mb-11">{post?.content}</p>
      </div>
    </div>
  )
}
