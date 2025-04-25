import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
    .send(
      'process.env.REACT_APP_SERVICE_ID', // e.g., 'service_xxx123'
      'process.env.REACT_APP_TEMPLATE_ID', // e.g., 'template_abc456'
      {
        name : form.name,
        email : form.email,
        message : form.message,
      },
      'process.env.REACT_APP_PUBLIC_KEY' // e.g., 'user_abcXYZ'
    )

    setTimeout(() => {
      setLoading(false);
      alert('Thank you. I will get back to you as soon as possible.');
      setForm({
        name: '',
        email: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 flex flex-col gap-8"
    >
      <label className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Name</span>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="What's your name?"
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
        />
      </label>
      <label className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="What's your email?"
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
        />
      </label>
      <label className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Message</span>
        <textarea
          rows="7"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="What do you want to say?"
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
        />
      </label>

      <button
        type="submit"
        className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default ContactForm; 