import React, { FormEventHandler, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Login() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" })
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false
    })

    if (res?.ok) router.push('/')
    else {
      alert(res?.error)
      router.reload()
    }
    
  }

  return (
    <div className='min-h-screen  flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <h1 className='text-center text-[25px] mb-5'>Login</h1>
        <div className='w-[20rem] flex flex-col gap-y-4 border-[2px] border-gray-500 rounded-[10px] p-4'>
          <input 
            type="text" 
            placeholder='Enter your email...' 
            className='w-full p-3 border-[1px] border-gray-500 rounded-[10px]'
            value={userInfo.email}
            onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
          />
          <input 
            type="password" 
            placeholder='Enter your password...' 
            className='w-full p-3 border-[1px] border-gray-500 rounded-[10px]' 
            value={userInfo.password}
            onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
          />
          <button className='w-full p-3 font-bold bg-gray-800 text-white rounded-[10px] hover:bg-gray-700  '>Login</button>

          <Link href='/auth/register'>
            <div className='text-gray-800 hover:text-gray-500 text-[16px]'>
              You want to register?
            </div>
          </Link>
        </div>
        
      </form>
    </div>
  )
}
