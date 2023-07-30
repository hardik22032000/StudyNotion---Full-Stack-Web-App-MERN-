import React from 'react';
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactForm = () => {
  return (
    <section className='pt-[50px] pb-[50px]'>
        <div className='flex flex-col justify-center mx-auto items-center'>
            <h1 className='text-3xl text-white font-inter font-semibold mb-4'>Get in Touch</h1>
            <p className=' text-richblack-400 mb-10 text-lg'>We’d love to here for you, Please fill out this form.</p>
        
            <ContactUsForm />
        
        </div>
    </section>
  )
}

export default ContactForm;
