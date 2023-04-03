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

  const handleDeletePost = async () => {
    const response = await axios.delete(`http://localhost:3000/api/posts/${post.id}`)

    if (response.status === 200) router.push('/')
  }

  return (
    <div className='w-[500px] h-auto flex justify-between items-center border-[1px] border-gray-800 p-4'>
      <div>
        <h1>{ `${post.text.slice(0, 20)}...` }</h1>
        <h1>{ `${splitDate[0]} - ${time[0]}` }</h1>
      </div>
      <div className='flex gap-x-5'>
        <button className='w-[5rem] bg-slate-800 text-white p-4 hover:bg-slate-600' onClick={() => router.push(`/post/${post.id}`)}>Edit</button>
        <button className='w-[5rem] bg-red-800 text-white p-4 hover:bg-red-600' onClick={handleDeletePost}>Delete</button>
      </div>
    </div>
  )
}
