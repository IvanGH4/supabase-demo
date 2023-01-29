import React, { useContext } from 'react';
import { AppContext } from '@/components/context';
import { useRouter } from 'next/router';
import { UserContext } from '@/types/user';
import MessageForm from '@/components/MessageForm';
import Messages from '@/components/Messages';

const ChatRoom = () => {
  const { user } = useContext<UserContext>(AppContext);

  const router = useRouter();

  if (!user) router.push('/login');

  return <div className='text-white'>
    <MessageForm />
    <Messages />
  </div>;
};

export default ChatRoom;
