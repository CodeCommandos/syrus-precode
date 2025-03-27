/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/niveshmitra-logo-transparent.png';

const Welcome = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); 
    const navigationTimer = setTimeout(() => {
       navigate('/'); 
    }, 4000); 

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);  
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black overflow-hidden">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        
        <motion.img
          src={logo}
          alt="NiveshMitra Logo"
          className="w-80 h-auto mx-auto mb-8" 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <div className="flex justify-center flex-wrap">
          {['N', 'i', 'v', 'e', 's', 'h', 'M', 'i', 't', 'r', 'a'].map((char, index) => (
            <motion.span
              key={index}
              className="text-6xl font-bold text-white" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            >
              {char}
            </motion.span>
          ))}
        </div>
        <motion.p
          className="text-2xl text-gray-400 mt-6" 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
        >
          Empowering Smarter Investments
        </motion.p>
        <motion.div
          className="flex justify-center gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: 'easeInOut' }}
        >
          <div className="text-white text-6xl">📊</div> 
          <div className="text-white text-6xl">🔒</div>
          <div className="text-white text-6xl">🤝</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;