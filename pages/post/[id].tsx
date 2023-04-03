import { Post } from '@prisma/client'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useRouter } from 'next/router'
import React, { FormEventHandler, useState } from 'react'

export default function EditPost({ post }: IPost) {
  const [textValue, setTextValue] = useState(post.text)
  const router = useRouter()

  const splitDate = post.createdAt.toString().split('T')
  

  const handleNewPost: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const response = await axios.put(`http://localhost:3000/api/posts/${post.id}`, { text: textValue})

    if (response.status === 200) router.push('/')
  }
  
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center gap-y-3'>
      <h1 className='font-bold text-[24px]'>{`Date: ${splitDate[0]}`}</h1>
      <form onSubmit={handleNewPost} className='flex flex-col'>
        <textarea 
          className='w-[1000px] h-[500px] border-[1px] p-4'
          value={textValue}
          onChange={({ target }) => setTextValue(target.value)}
        ></textarea>
        <button 
          className='w-[20%] py-3 bg-gray-800 text-white self-end'
        >Submit</button>
      </form>
      
    </div>
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