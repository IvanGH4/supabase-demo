import Form from '@/components/Form';

const Login = () => {
  return (
    <article>
      <h2 className='font-bold text-2xl text-green-300 text-center mb-10'>
        Login
      </h2>
      <Form authType='login' />
    </article>
  );
};

export default Login;
