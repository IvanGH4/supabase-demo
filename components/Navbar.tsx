import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { supabase } from '@/lib/supabase-client';

import { AppContext } from '@/components/context';
import { UserContext } from '@/types/user';

const Navbar = () => {
  const { user, setUser } = useContext<UserContext>(AppContext);

  const router = useRouter();

  const currentRoute = router.asPath.replace('/', '');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const getLinkStyles = (href: string) =>
    `p-2 hover:text-green-600 ${
      currentRoute === href ? 'text-green-600' : 'text-white'
    }`;

  return (
    <nav className='text-white p-5 shadow-sm shadow-white flex items-center justify-between'>
      <div>
        {user ? (
          <>
            <p className='mb-2'>
              <span className='text-green-500'>Logged in as:</span> {user.email}</p>
            <button
              className='rounded-md px-2 py-1 border border-white hover:border-green-500'
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link className={getLinkStyles('login')} href='/login'>
              Login
            </Link>
            <Link className={getLinkStyles('signup')} href='/signup'>
              Sign up
            </Link>
          </>
        )}
        <Link className={getLinkStyles('chat')} href='/chat'>
          Chat room
        </Link>
      </div>
      <div>
        <h1 className='font-bold text-green-500 text-2xl'>
          <Link href='/'>Supabase demo</Link>
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
