import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

async function fetchPosts() {
  const response = await axios.get(
    'https://tech-challenge-back-end.vercel.app/posts',
  )
  return response.data
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}
