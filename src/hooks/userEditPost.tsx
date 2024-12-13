import { useState } from 'react';
import axios from 'axios';
import { EditPost } from '../types';

export function useEditPost() {
  const [isLoading, setIsLoading] = useState(false);

  const editPost = async (post: EditPost) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado.');

      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      if (post.img && post.img instanceof File) formData.append('img', post.img);

      await axios.patch(`https://tech-challenge-back-end.vercel.app/posts/${post._id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { editPost, isLoading };
}
