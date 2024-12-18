import { useState, useEffect } from 'react'
import { Post } from '../types'

export const useSearchPost = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch('https://tech-challenge-back-end.vercel.app/posts')
        const data = await response.json()
        setPosts(data)
        setFilteredPosts(data)
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
      }
    }

    fetchAllPosts()
  }, [])

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [searchTerm, posts])

  return { searchTerm, setSearchTerm, filteredPosts }
}
