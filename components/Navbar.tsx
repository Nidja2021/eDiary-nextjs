import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar() {
  const { status, data } = useSession()
  const router = useRouter()

  const userName = !!data && data?.user.name.charAt(0).toUpperCase() + data?.user.name.slice(1)

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className='w-full py-5 bg-gray-800 text-white flex justify-between px-10'>
      <div className='pl-3'>
        <Link href='/'>eDiary</Link>
      </div>
      <div>
        {
          status === 'authenticated' ? 
          (
            <div className='flex gap-x-5 pr-3'>
              <h1 className='text-md'>Welcome, {userName}</h1>
              <Link href='/' className='text-md'>Home</Link>
              <Link href='/new-post' className='text-md'>New Post</Link>
              <button onClick={handleSignOut} className='text-md'>Sign Out</button>
            </div>
          ) : 
          (
            <div className='pr-3'>
              <Link href='/auth/login'>Login</Link>
            </div>
          )
        }
      </div>
    </div>
  )
}
