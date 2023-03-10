import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { supabase } from '@/lib/supabase-client';
import { Message } from '@/types/message';
import { UserContext } from '@/types/user';
import { AppContext } from './context';

const Messages = () => {
  const { user } = useContext<UserContext>(AppContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState(false);

  const bottomElement = useRef<HTMLDivElement>(null);

  const handleNewMessage = (newMessage: Message) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        setError(false);
        const { data, error } = await supabase
          .from('messages')
          .select()
          .order('id', { ascending: true });

        if (error) {
          setError(true);
          return;
        }
        setMessages(data);
      } catch (error) {
        setError(true);
      }
    };

    const subscribeToMessages = async () => {
      await getMessages();
      supabase
        .channel('any')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'messages' },
          (payload) => {
            handleNewMessage(payload.new as Message);
          }
        )
        .subscribe();
    };

    subscribeToMessages();

    return () => {
      supabase.removeAllChannels();
    };
  }, []);

  useEffect(() => {
    bottomElement.current?.scrollIntoView();
  }, [messages]);

  const dateFormatter = () => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    // @ts-ignore
    return new Intl.DateTimeFormat('en-US', options);
  };

  if (error)
    return (
      <p className='text-red-500 font-semibold'>Error retrieving messages</p>
    );

  if (!messages.length)
    return <p className='text-white'>No messages yet. Send the first one!</p>;

  return (
    <section className='p-10'>
      <div className='flex flex-col gap-5 max-w-xl mx-auto'>
        <h2 className='text-white font-bold text-2xl mb-10'>Messages</h2>
        <article className='rounded-lg max-h-[400px] overflow-auto p-5 shadow-[0_0_15px_5px_rgba(255,255,255,0.1)] shadow-white messsages-box'>
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`my-2 ${
                message.user_id === user?.id
                  ? 'text-right text-blue-500'
                  : 'text-left text-green-500'
              }`}
            >
              <small className='text-gray-500'>
                {dateFormatter().format(new Date(message.created_at))}
              </small>
              <h4 className='text-lg font-semibold'>{message.username}</h4>
              <p className='text-green-300'>{message.text}</p>
            </div>
          ))}
          <div ref={bottomElement} />
        </article>
      </div>
    </section>
  );
};

export default Messages;
