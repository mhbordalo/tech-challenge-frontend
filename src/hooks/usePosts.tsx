import { useQuery } from '@tanstack/react-query';

async function fetchPosts() {
  const response = await fetch('postsMock.json'); 
  if (!response.ok) {
    throw new Error('Erro ao buscar os posts');
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