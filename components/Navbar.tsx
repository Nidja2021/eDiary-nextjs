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
    router.push('/auth/login')
  }

  return (
    <div className='w-full py-5 bg-gray-800 text-white flex justify-between '>
      <div className='pl-3'>
        <h1>eDiary</h1>
      </div>
      <div>
        {
          status === 'authenticated' ? 
          (
            <div className='flex gap-x-5 pr-3'>
              <h1>Welcome, {userName}</h1>
              <Link href='/new-post'>New Post</Link>
              <button onClick={handleSignOut}>Sign Out</button>
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
