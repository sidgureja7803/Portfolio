import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaCheck } from 'react-icons/fa';

const FormInput = ({ label, name, type = 'text', value, onChange, error, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full bg-gray-800/50 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          rows="4"
          {...props}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full bg-gray-800/50 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          {...props}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

const ContactInfo = ({ icon: Icon, title, content, link, delay }) => {
  return (
    <motion.div
      className="flex items-start space-x-4 mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-white">{title}</h3>
        {link ? (
          <a 
            href={link} 
            className="text-gray-400 hover:text-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          <p className="text-gray-400">{content}</p>
        )}
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div ref={containerRef} className="min-h-screen py-20 px-4 relative">
      {/* Background elements */}
      <div className="blur-gradient-blue w-[400px] h-[400px] -top-[100px] -right-[100px] opacity-20" />
      <div className="blur-gradient-purple w-[400px] h-[400px] bottom-[10%] -left-[100px] opacity-30" />
      
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get In <span className="text-gradient">Touch</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient mx-auto rounded mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out through the form below or via my contact information.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50 h-full">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <ContactInfo 
                icon={FaEnvelope} 
                title="Email" 
                content="siddhant@example.com" 
                link="mailto:siddhant@example.com"
                delay={0.1}
              />
              
              <ContactInfo 
                icon={FaPhoneAlt} 
                title="Phone" 
                content="+1 (555) 123-4567" 
                link="tel:+15551234567"
                delay={0.2}
              />
              
              <ContactInfo 
                icon={FaMapMarkerAlt} 
                title="Location" 
                content="San Francisco, CA, USA" 
                delay={0.3}
              />
              
              {/* Map or Image */}
              <motion.div
                className="mt-10 overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-full h-64 bg-gray-700 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <FaMapMarkerAlt size={40} className="mx-auto mb-2 text-blue-500" />
                      <p>Map placeholder</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
              
              <AnimatePresence>
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-green-500/20 text-green-400 p-6 rounded-lg flex items-center mb-6"
                  >
                    <FaCheck size={24} className="mr-4" />
                    <div>
                      <h4 className="font-medium text-green-300">Message Sent!</h4>
                      <p>Thank you for reaching out. I'll get back to you soon.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit}
                    layout
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Your Name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="John Doe"
                        required
                      />
                      
                      <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    
                    <FormInput
                      label="Subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      error={errors.subject}
                      placeholder="Project Inquiry"
                      required
                    />
                    
                    <FormInput
                      label="Message"
                      name="message"
                      type="textarea"
                      value={formState.message}
                      onChange={handleChange}
                      error={errors.message}
                      placeholder="Tell me about your project..."
                      required
                    />
                    
                    <motion.button
                      type="submit"
                      className="mt-2 w-full py-3 px-6 rounded-lg bg-gradient text-white font-medium flex items-center justify-center disabled:opacity-70"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 