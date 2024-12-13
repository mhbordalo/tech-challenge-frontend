import { useState } from 'react';
import axios from 'axios';
import { CreatePost } from '../types';

export function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);

  const createPost = async (post: CreatePost) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado.');

      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      if (post.img && post.img instanceof File) formData.append('img', post.img);

      await axios.post('https://tech-challenge-back-end.vercel.app/posts/', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { createPost, isLoading };
}
