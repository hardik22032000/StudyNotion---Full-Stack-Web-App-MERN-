import React from 'react';
import signupImg from "../assets/Images/signup.webp";
import Template from '../components/common/SignUpLoginTemplate';
import { useSelector } from 'react-redux';
import Spinner  from '../components/common/Spinner';

const Signup = () => {

  const {loading} = useSelector((state) => state.auth);

  return (
    <div className='h-full flex justify-center items-center mt-20'>
      {
        loading ? <Spinner />
        : (
          <Template
          title="Join the millions learning to code with StudyNotion for free"
          desc1="Build skills for today, tomorrow, and beyond."
          desc2="Education to future-proof your career."
          image={signupImg}
          formtype="signup"
          />
        )
      }
    </div>
  )
}

export default Signup;