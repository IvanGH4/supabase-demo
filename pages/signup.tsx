import Form from '@/components/Form';

const Signup = () => {
  return (
    <article>
      <h2 className='font-bold text-2xl text-green-300 text-center mb-10'>
        Sign up
      </h2>
      <Form authType='signup' />
    </article>
  );
};

export default Signup;
