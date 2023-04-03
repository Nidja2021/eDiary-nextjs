import PostCard from '@/components/post/Post'
import { Post, PrismaClient } from '@prisma/client'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'

const Protected = ({ session, data } : IData): JSX.Element => {
  const { user } = session
  console.log('posts', data?.posts);
  
  return (
    <>
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <div>
        {!!data && data?.posts.map((post, index) => (
          <PostCard key={index} post={post}/>
        ))}
      </div>
    </div>
    </>
  )
}
  
export default Protected

interface IData {
    session: Session
    data: Post[]
}

export const getServerSideProps: GetServerSideProps<IData> = async (context) => {
  const prismaService = new PrismaClient()
  
  const session = await getSession(context)

  const response = await axios.get('http://localhost:3000/api/posts')
  const data = await response?.data
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  return {
    props: { session, data }
  }
}