import { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from '../types';

interface PostsResponse {
  posts: Post[];
  totalPages: number;
}

export function usePostsPagination(page: number) {
  const [data, setData] = useState<PostsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isPreviousData, setIsPreviousData] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setIsPreviousData(!!data); 
      setError(null);

      try {
        const response = await axios.get<PostsResponse>(
          `https://tech-challenge-back-end.vercel.app/posts/pagination?page=${page}`
        );
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
        setIsPreviousData(false); 
      }
    };

    fetchPosts();
  }, [page]);

  return { data, isLoading, error, isPreviousData };
}
