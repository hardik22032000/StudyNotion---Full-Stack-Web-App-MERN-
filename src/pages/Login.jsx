import React from 'react';
import Template from '../components/common/SignUpLoginTemplate';
import loginImg from "../assets/Images/login.webp";
import { useSelector } from 'react-redux';
import Spinner  from '../components/common/Spinner';

const Login = () => {

  const {loading} = useSelector((state) => state.auth);

  return (
    <div className='h-full flex lg:flex-row justify-center items-center mt-20'>
    {
      loading ? <Spinner />
      : (
        <Template
          title="Welcome Back"
          desc1="Build skills for today, tomorrow, and beyond."
          desc2="Education to future-proof your career."
          image={loginImg}
          formtype="login"
        />
        )
    }
    </div>
  )
}

export default Login;