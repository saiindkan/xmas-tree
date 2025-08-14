import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from '../styles/PromoBar.module.css';

interface BouncyTextProps {
  children: ReactNode;
  delay?: number;
}

interface SparkleProps {
  index: number;
}

const SPARKLE_CHARS = ['❄️', '✨', '❆', '✧', '❅', '✺', '❉', '✵', '✦', '❋', '✼', '❁'];

const BouncyText = ({ children, delay = 0 }: BouncyTextProps) => (
  <motion.span
    initial={{ y: 20, opacity: 0 }}
    animate={{ 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        delay: delay
      }
    }}
    whileHover={{ 
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }}
    className="inline-block"
  >
    {children}
  </motion.span>
);

const Sparkle = ({ index }: SparkleProps) => (
  <motion.span 
    className={styles.sparkle}
    initial={{
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      scale: 0.5,
      opacity: 0
    }}
    animate={{
      x: ['0%', '100%'],
      y: ['0%', '100%'],
      opacity: [0, 0.8, 0],
      scale: [0.5, 1.2, 0.5],
      rotate: [0, 360]
    }}
    transition={{
      duration: 3 + Math.random() * 5,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'linear',
      delay: Math.random() * 5
    }}
    style={{
      fontSize: `${Math.random() * 20 + 10}px`,
    }}
  >
    {SPARKLE_CHARS[index % SPARKLE_CHARS.length]}
  </motion.span>
);

const PromoBar = () => {
  return (
    <div className={styles.promoBar}>
      <div className={styles.santaSleigh}>
        <div className={styles.reindeer} style={{ '--delay': '0.1s' } as React.CSSProperties}>🦌</div>
        <div className={styles.reindeer} style={{ '--delay': '0.2s' } as React.CSSProperties}>🦌</div>
        <div className={styles.reindeer} style={{ '--delay': '0.3s' } as React.CSSProperties}>🦌</div>
        <div className={styles.santa}>🎅</div>
        <div className={styles.sleigh}>🛷</div>
      </div>
      
      <Link href="/" className={styles.promoBarLink}>
        {/* Left Ribbon */}
        <div className={`${styles.ribbon} ${styles.ribbonLeft}`}>
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="md:w-14 md:h-14">
            <path d="M4 24 Q12 12 24 24 T44 24" stroke="#ffffff" strokeWidth="4" fill="none"/>
            <circle cx="8" cy="24" r="3" fill="#fef08a"/>
            <circle cx="40" cy="24" r="3" fill="#fef08a"/>
          </svg>
        </div>
        
        {/* Promo Text */}
        <div className={styles.promoContent}>
          <BouncyText delay={0.1}>
            <span className={styles.emojiLeft}>🎀</span>
          </BouncyText>
          
          <BouncyText delay={0.2}>
            <h1 className={styles.title}>
              INDIKAN <span className="text-green-100">XMAS TREES</span>
            </h1>
          </BouncyText>
          
          <BouncyText delay={0.3}>
            <span className={styles.emojiRight}>🎄</span>
          </BouncyText>
        </div>
        
        {/* Right Ribbon */}
        <div className={`${styles.ribbon} ${styles.ribbonRight}`}>
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="md:w-14 md:h-14">
            <path d="M44 24 Q36 36 24 24 T4 24" stroke="#ffffff" strokeWidth="4" fill="none"/>
            <circle cx="8" cy="24" r="3" fill="#fef08a"/>
            <circle cx="40" cy="24" r="3" fill="#fef08a"/>
          </svg>
        </div>
        
        {/* Animated Sparkles */}
        <div className={styles.sparklesContainer}>
          {Array.from({ length: 12 }).map((_, i) => (
            <Sparkle key={i} index={i} />
          ))}
        </div>
        
        {/* Remove edge glow effect */}
      </Link>
    </div>
  );
};

export default PromoBar;
