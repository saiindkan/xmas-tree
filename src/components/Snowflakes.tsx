"use client";

import { useEffect, useState } from 'react';
import styles from '../styles/ChristmasTheme.module.css';

// Snowflake types for better type safety
interface Snowflake {
  id: number;
  left: string;
  animationDuration: string;
  delay: string;
  size: string;
  opacity: number;
  sway: string;
  swayDuration: string;
  symbol: string;
}

// Snowflake symbols
const SNOWFLAKE_SYMBOLS = ['❄', '❅', '❆', '•', '❃', '❉', '❋', '✻', '✼', '❄️'];

const Snowflakes = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Update window size on resize
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: document.body.scrollHeight,
      });
    };

    // Initial size
    updateSize();
    
    // Update on resize
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Create snowflakes
  useEffect(() => {
    // More snowflakes for larger screens
    const flakeCount = Math.min(100, Math.floor(window.innerWidth / 10));
    
    const newSnowflakes = Array(flakeCount).fill(0).map((_, i) => {
      const size = Math.random() * 12 + 3; // 3px to 15px
      const duration = 15 + Math.random() * 30; // 15s to 45s
      
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${duration}s`,
        delay: `${Math.random() * 15}s`, // Stagger the start
        size: `${size}px`,
        opacity: Math.random() * 0.7 + 0.3, // 0.3 to 1.0
        sway: `${(Math.random() - 0.5) * 100}px`, // Horizontal sway
        swayDuration: `${5 + Math.random() * 10}s`, // Sway duration
        symbol: SNOWFLAKE_SYMBOLS[Math.floor(Math.random() * SNOWFLAKE_SYMBOLS.length)],
      };
    });

    setSnowflakes(newSnowflakes);
  }, [windowSize]);

  // Custom styles for the snow container
  const snowContainerStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none' as const,
    zIndex: 1000,
    overflow: 'hidden',
  };

  return (
    <div style={snowContainerStyle}>
      {snowflakes.map((flake) => {
        // Create keyframe name for each snowflake for unique animations
        const animationName = `snowfall-${flake.id}`;
        
        // Create style tag for this snowflake's animation
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
          @keyframes ${animationName} {
            0% {
              transform: translateY(-10%) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: ${flake.opacity};
            }
            90% {
              opacity: ${flake.opacity};
            }
            100% {
              transform: translateY(100vh) translateX(${flake.sway});
              opacity: 0;
            }
          }
        `;
        
        // Add style to head
        if (typeof document !== 'undefined') {
          document.head.appendChild(styleTag);
        }

        return (
          <div
            key={flake.id}
            style={{
              position: 'absolute',
              left: flake.left,
              top: `-20px`,
              fontSize: flake.size,
              animation: `${animationName} ${flake.animationDuration} ${flake.delay} infinite linear`,
              willChange: 'transform, opacity',
              userSelect: 'none',
              pointerEvents: 'none',
              textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
              zIndex: 1000,
            }}
          >
            {flake.symbol}
          </div>
        );
      })}
    </div>
  );
};

export default Snowflakes;
