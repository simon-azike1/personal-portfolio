import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '/Images/logo.png';
import { useI18n } from '../../context/I18nContext';

const Loading = () => {
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demo purposes
    // In a real app, this would be controlled by actual data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.6, ease: "backOut" }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative w-16 h-16 flex items-center justify-center bg-accent-primary/10 rounded-full">
<motion.img
             src={logo}
             alt="SimZik Logo"
             className="w-12 h-12"
             animate={{ scale: [0.7, 1.3, 0.7] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           />
          <div className="absolute inset-0 rounded-full border-2 border-accent-primary/20 animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;