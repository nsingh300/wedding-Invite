
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function EnvelopeIntro({ onComplete }) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('invited')) {
      onComplete();
    }
  }, [onComplete]);

  const handleTap = () => {
    if (opened) return;

    setOpened(true);

    setTimeout(() => {
      sessionStorage.setItem('invited', 'true');
      onComplete();
    }, 2000);
  };

  return (
    <div
      onClick={handleTap}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#f5ece0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 9999,
      }}
    >
      <motion.img
        src="/envelope.png"
        alt="Wedding invitation envelope"
        animate={
          opened
            ? { y: 80, opacity: 0 }
            : { y: [0, -8, 0] }
        }
        transition={
          opened
            ? { duration: 1.5, ease: 'easeInOut' }
            : {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        style={{
          width: 'min(280px, 75vw)',
          height: 'auto',
          objectFit: 'contain',
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{
          marginTop: '24px',
          fontSize: '16px',
          color: '#7b5b45',
          letterSpacing: '2px',
          textAlign: 'center',
          fontFamily: 'serif',
        }}
      >
        {opened ? 'Opening your invitation...' : 'Tap to Open'}
      </motion.p>
    </div>
  );
}
