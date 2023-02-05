export default function Home() {
  return (
    <>
      <main className='p-5'>
        <h2 className='text-blue-600 text-4xl font-semibold mb-5'>
          Supabase demo app
        </h2>
        <p className='text-white text-2xl max-w-[800px]'>
          Testing Supabase{' '}
          <a
            href='https://supabase.com/docs/guides/realtime'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-700 hover:underline'
          >
            Real Time feature
          </a>{' '}
          by building a chat room app that supports multiple users and listens
          for database changes and updates the messages list in real time.
        </p>
      </main>
    </>
  );
}
