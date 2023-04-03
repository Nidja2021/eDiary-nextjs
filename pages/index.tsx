import Head from 'next/head'
import { Inter } from 'next/font/google'
import PostCard from '@/components/post/Post'
import { Post, PrismaClient } from '@prisma/client'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const Home = ({ session, data } : IData): JSX.Element => {

  return (
    <>
      <Head>
        <title>eDiary</title>
        {/* <meta charset="utf-8" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=' min-auto'>
      <h1 className='text-gray-800 font-bold text-[30px] text-center mt-5'>My eDiary</h1>
          <div className='flex flex-col-reverse justify-start items-center gap-y-5 mt-5 px-5'>
            {!!data && data?.posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
      </main>
    </>
  )
}

export default Home

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