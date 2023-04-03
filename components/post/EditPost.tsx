import { Post } from '@prisma/client'
import React from 'react'

interface IPost {
  post: Post
}

export default function EditPost({ post }: IPost) {
  const splitDate = post.createdAt.toString().split('T')
  const time: string[] = splitDate[1].split('.')

  return (
    <div className='w-[500px] h-auto flex justify-between items-center border-[1px] border-gray-800 p-4'>
      <div>
        <h1>{ post.text }</h1>
        <h1>{ `${splitDate[0]} - ${time[0]}` }</h1>
      </div>
      <div className='flex gap-x-5'>
        <button className='w-[5rem] bg-slate-800 text-white p-4 hover:bg-slate-600'>Edit</button>
        <button className='w-[5rem] bg-red-800 text-white p-4 hover:bg-red-600'>Delete</button>
      </div>
    </div>
  )
}
