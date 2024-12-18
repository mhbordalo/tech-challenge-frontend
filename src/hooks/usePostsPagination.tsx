import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Post } from '../types'

interface PostsResponse {
  posts: Post[]
  totalPages: number
}

export function usePostsPagination(page: number) {
  return useQuery<PostsResponse, Error>({
    queryKey: ['posts', page],
    queryFn: async () => {
      const response = await axios.get<PostsResponse>(
        `https://tech-challenge-back-end.vercel.app/posts/pagination?page=${page}`,
      )
      return response.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
