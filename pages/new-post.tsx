import TextEditor from '@/components/TextEditor'
import TextEditor2 from '@/components/TextEditor2'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { FormEventHandler, useState } from 'react'

export default function NewPost() {
  const [textValue, setTextValue] = useState('')
  const router = useRouter()

  const handleNewPost: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const response = await axios.post('http://localhost:3000/api/posts', { text: textValue})

    if (response.status === 201) router.push('/')
  }

  return (
    // <div className='w-full min-h-screen flex flex-col justify-center items-center gap-y-3'>
    //   <h1>New Post</h1>
    //   <form onSubmit={handleNewPost} className='flex flex-col'>
    //     <textarea 
    //       className='w-[1000px] h-[500px] border-[1px] p-4'
    //       onChange={({ target }) => setTextValue(target.value)}
    //     ></textarea>
        // <button 
        //   className='w-[30%] py-3 bg-gray-800 text-white'
        // >Submit</button>
    //   </form>
    // </div>

      // <div className='w-[100vw] min-h-full flex flex-col items-center justify-center mt-[10rem]'>
      //   <h1>New Post</h1>
      //   <TextEditor2 />
      //   <button 
      //     className='w-[10%] py-3 bg-gray-800 text-white self-end'
      //   >Submit</button>
      // </div>
      <TextEditor2 />
  )
}
