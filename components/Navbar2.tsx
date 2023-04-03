import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import { useState } from 'react'

export default function Navbar2() {
  const [isOpen, setIsOpen] = useState(true)
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
        
      </div>
      {/* Hamburger */}
      <div className='md:hidden block'>
        { !!!isOpen ? 
          (
            <button className='text-xl' onClick={() => setIsOpen(prev => !isOpen)}>
              <GiHamburgerMenu />
            </button>
            
          ) : 
          (
            <button className='text-xl absoulute top-[50%] right-[5%]' onClick={() => setIsOpen(prev => !isOpen)}>
              <GrClose className='bg-white' color='white'/>
            </button>
          )
        }
      </div>
      {/* Mobile version of navbar */}
      <div className={` md:hidden ${isOpen ? 'block-inline' : 'hidden'}`}>
        <ul className='absolute top-16 right-0  flex flex-col gap-y-3 bg-gray-800'>
          <li className='hover:bg-gray-600  p-5'>
            <Link href='/'>Home</Link>
          </li>
          <li className='hover:bg-gray-600   p-5'>
            <Link href='/new-post'>New Post</Link>
          </li>
          <li className='hover:bg-gray-600   p-5'>
            <button onClick={handleSignOut} className='text-md'>Sign Out</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
