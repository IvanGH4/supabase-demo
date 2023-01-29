import React, { useContext } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

import { supabase } from '@/lib/supabase-client';

import { AppContext } from '@/components/context';
import { UserContext } from '@/types/user';

const Navbar = () => {
  const { user, setUser } = useContext<UserContext>(AppContext);

  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  }

  return (
    <nav className='text-white p-5 shadow-sm shadow-white flex items-center justify-between'>
      <div>
        {user ? (
            <>
              <p>Logged in as: {user.email}</p>
              <button className='rounded-sm px-2 py-1 border border-white' onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link className='p-2 hover:text-green-600' href='/login'>Login</Link>
              <Link className='p-2 hover:text-green-600' href='/signup'>Sign up</Link>
            </>
          )}
        <Link className='p-2 hover:text-green-600' href='/chat'>Chat room</Link>
      </div>
      <div>
        <h1 className='font-bold text-green-500 text-2xl'>
          <Link href='/'>
            Supabase demo
          </Link>
        </h1>
      </div>
    </nav>
  )
}

export default Navbar
