import { useQuery } from '@tanstack/react-query'

async function fetchPosts() {
  const response = await fetch('https://tech-challenge-back-end.vercel.app/posts');
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}