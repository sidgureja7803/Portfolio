import React from 'react';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <div className="py-10 xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <div className="flex-[0.75] bg-black-100 p-8 rounded-2xl shadow-md">
        <p className="text-sm text-secondary uppercase tracking-wider">Get in touch</p>
        <h3 className="text-white font-black text-4xl md:text-5xl">Contact.</h3>
        <ContactForm />
      </div>

      <div className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] bg-tertiary rounded-2xl flex items-center justify-center p-8 shadow-md">
        <div className="w-full h-full flex flex-col items-start justify-center">
          <h4 className="text-white font-bold text-2xl mb-4">Let's Connect</h4>
          <p className="text-secondary text-lg mb-6">
            Feel free to reach out for collaborations, opportunities, or just a friendly chat about technology.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white">siddhantgureja39@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-white">Patiala, Punjab, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 