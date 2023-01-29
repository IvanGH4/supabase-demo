import React, { useContext, useState } from 'react';

import { supabase } from '@/lib/supabase-client';
import { AppContext } from './context';
import { UserContext } from '@/types/user';

const MessageForm = () => {
  const { user } = useContext<UserContext>(AppContext);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      setError(false);
      // @ts-ignore
      const username = user?.email?.match(/^(.*?)@/)[1];
      const { error } = await supabase.from('messages').insert([
        {
          text: message,
          username,
        },
      ]);

      setMessage('');

      if (error) {
        setError(true);
        return;
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <form
      className='flex flex-col gap-2 max-w-[25%] mx-auto p-4 border border-green-500'
      onSubmit={(e) => e.preventDefault()}
    >
      <textarea
        className='p-2 bg-white text-white bg-opacity-20 rounded-sm'
        placeholder='Write your message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className='p-2 text-white border border-white rounded-sm hover:bg-white hover:text-black transition'
        onClick={handleSubmit}
      >
        Send
      </button>
      {error && (
        <p className='text-red-500 font-bold'>
          Something went wrong, try again.
        </p>
      )}
    </form>
  );
};

export default MessageForm;
