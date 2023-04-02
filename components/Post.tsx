import { Post } from '@prisma/client'

interface IPost {
  post: Post
  user: string
}

export default function PostCard( { post, user }: IPost) {
  const splitDate = post.createdAt.toString().split('T')
  const time: string[] = splitDate[1].split('.')

  return (
    <div className='w-[200] h-auto border-[1px] border-gray-800 p-4'>
      <h1>{ user }</h1>
      <h1>{ post.text }</h1>
      <h1>{ `${splitDate[0]} - ${time[0]}` }</h1>
    </div>
  )
}
