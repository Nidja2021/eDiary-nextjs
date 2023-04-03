import { Post } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface IPost {
  post: Post
}

export default function PostCard( { post }: IPost) {
  const router = useRouter()

  const splitDate = post.createdAt.toString().split('T')
  const time: string[] = splitDate[1].split('.')

  const handleUpdatePost = async () => {
    // console.log(post.text);
    router.push(`/post/${post.id}`)
    
  }

  const handleDeletePost = async () => {
    const response = await axios.delete(`http://localhost:3000/api/posts/${post.id}`)

    if (response.status === 200) router.push('/')
  }

  return (
    <div className='w-full h-auto flex  items-center flex-wrap gap-y-4 border-[1px] border-gray-800 p-4 md:w-2/3 md:flex-nowrap'>
      <div className='w-full flex justify-between md:w-1/2'>
        <h1>{ `${post.text.slice(0, 15)}...` }</h1>
        <h1>{ `${splitDate[0]} - ${time[0]}` }</h1>
      </div>
      <div className='w-full flex gap-x-5 md:w-1/2 md:justify-end'>
        <button className='w-[50%] bg-slate-800 text-white p-4 hover:bg-slate-600 md:w-1/3' onClick={handleUpdatePost}>Edit</button>
        <button className='w-[50%] bg-red-800 text-white p-4 hover:bg-red-600 md:w-1/3' onClick={handleDeletePost}>Delete</button>
      </div>
    </div>
  )
}
