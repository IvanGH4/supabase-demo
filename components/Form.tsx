import React, { useContext, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useRouter } from 'next/router';

import { AppContext } from '@/components/context';
import { UserContext } from '@/types/user';

interface Props {
  authType: 'login' | 'signup';
}

const Form = ({ authType }: Props) => {
  const { setUser } = useContext<UserContext>(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (authType === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userCredentials.email,
          password: userCredentials.password,
        });
        // @ts-ignore
        setUser(data.user);

        if (error) {
          setError(true);
          return;
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: userCredentials.email,
          password: userCredentials.password,
        });
        // @ts-ignore
        setUser(data.user);

        if (error) {
          setError(true);
          return;
        }
      }
      router.push('/');
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className='text-green-400'>Loading...</p>;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='flex flex-col gap-2 max-w-[25%] mx-auto p-4 border border-green-500'
    >
      <input
        className='p-2 bg-white text-white bg-opacity-20 rounded-sm'
        type='email'
        placeholder='Email'
        onChange={(e) =>
          setUserCredentials({ ...userCredentials, email: e.target.value })
        }
      />
      <input
        className='p-2 mb-2 bg-white text-white bg-opacity-20 rounded-sm'
        type='password'
        placeholder='Password'
        onChange={(e) =>
          setUserCredentials({ ...userCredentials, password: e.target.value })
        }
      />
      <button
        className='p-2 text-white border border-white rounded-sm hover:bg-white hover:text-black transition'
        onClick={handleSubmit}
      >
        {authType === 'login' ? 'Login' : 'Sign up'}
      </button>
      {error && (
        <p className='text-red-500 font-bold'>
          Something went wrong, try again.
        </p>
      )}
    </form>
  );
};

export default Form;
