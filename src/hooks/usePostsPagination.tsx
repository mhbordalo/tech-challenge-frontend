import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Post {
  _id: string
  title: string
  content: string
  img: string
  author: string
  // Adicione outros campos conforme necessário
}

interface PostsResponse {
  posts: Post[]
  totalPages: number
}

async function fetchPosts(page: number): Promise<PostsResponse> {
  const response = await axios.get(
    `https://tech-challenge-back-end.vercel.app/posts/pagination?page=${page}`,
  )
  return response.data
}

export function usePostsPagination(page: number) {
  return useQuery<PostsResponse, Error>({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page),
    staleTime: 5000, // Mantém os dados anteriores por 5 segundos
    keepPreviousData: true, // Mantém os dados anteriores enquanto novos dados estão sendo carregados
  })
}
