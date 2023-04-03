import { Post } from '@prisma/client'
import axios from 'axios'
import UpdatePost from '@/components/post/UpdatePost'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IPost } from '@/types/interfaces'

export default function EditPost() {
  const [post, setPost] = useState<IPost | (() => IPost)>()
  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      const { id } = router.query
      const response = await axios.get(`http://localhost:3000/api/posts/${id}`)
      setPost(response.data.post)
    }
    fetchPost()
  }, [])
    
  return (
    <UpdatePost post={post}/>
  )
}
