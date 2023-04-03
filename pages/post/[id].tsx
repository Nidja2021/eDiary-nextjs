import { Post } from '@prisma/client'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import UpdatePost from '@/components/post/UpdatePost'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function EditPost() {
  const [post, setPost] = useState({})
  const [isPostLoaded, setIsPostLoaded] = useState(false)
  const router = useRouter()

  const fetchPost = async () => {
    const { id } = router.query

    if (!id) {
      router.push('/')
      return
    }

    const response = await axios.get(`http://localhost:3000/api/posts/${id}`)
    setIsPostLoaded(prev => !isPostLoaded)
    setPost(response.data.post)
    // return response.data.post
   
  }

  useEffect(() => {
    fetchPost()
  }, [isPostLoaded])
    
  return (
    <UpdatePost post={post} />
    // <h1>ggsdgsd</h1>
  )
}

interface IPost {
  post: Post
}

export const getServerSideProps: GetServerSideProps<IPost> = async ({ params }) => {

  if (!params || !params.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const { id } = params

  const response = await axios.get(`http://localhost:3000/api/posts/${id}`)
  console.log(response.data.post);
  

  return {
    props: { post: response.data.post }
  }
}