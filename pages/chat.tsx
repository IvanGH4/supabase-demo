import React, { useContext } from 'react';
import { AppContext } from '@/components/context';
import { useRouter } from 'next/router';
import { UserContext } from '@/types/user';

const ChatRoom = () => {
  const { user } = useContext<UserContext>(AppContext);

  const router = useRouter();

  if (!user) router.push('/login');

  return <div className='text-white'>ChatRoom</div>;
};

export default ChatRoom;
