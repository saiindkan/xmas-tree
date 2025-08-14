"use client";

import { useEffect, useState } from 'react';
import styles from '../styles/ChristmasTheme.module.css';

// Pixie dust particles for the cursor trail with different sparkle types
const PIXIE_DUST = [
  { char: '✨', color: 'text-yellow-200' },
  { char: '❄️', color: 'text-blue-100' },
  { char: '✦', color: 'text-pink-200' },
  { char: '✧', color: 'text-green-100' },
  { char: '✺', color: 'text-red-100' },
  { char: '❁', color: 'text-purple-200' },
  { char: '❉', color: 'text-cyan-100' },
  { char: '✵', color: 'text-yellow-100' }
];

const ChristmasCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<Array<{ 
    x: number; 
    y: number; 
    id: number; 
    element: typeof PIXIE_DUST[number];
    opacity: number;
    scale: number;
    rotation: number;
    delay: number;
    duration: number;
  }>>([]);
  const [trailId, setTrailId] = useState(0);

  // Hide default cursor and show our custom cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    document.body.style.overflowX = 'hidden';
    
    return () => {
      document.body.style.cursor = '';
      document.body.style.overflowX = '';
    };
  }, []);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add new position to trail with pixie dust (reduced trail length)
      if (Math.random() > 0.4) { // Only add new particles 60% of the time to reduce density
        setTrail(prevTrail => {
          const newTrail = [...prevTrail, { 
            x: e.clientX, 
            y: e.clientY, 
            id: trailId,
            element: PIXIE_DUST[Math.floor(Math.random() * PIXIE_DUST.length)],
            opacity: 0.8, // Slightly more visible
            scale: 0.3 + Math.random() * 0.5, // Slightly larger particles
            rotation: Math.random() * 360,
            delay: Math.random() * 0.1, // Minimal delay
            duration: 0.3 + Math.random() * 0.4 // Slightly longer duration (0.3-0.7s)
          }];
          return newTrail.slice(-10); // Fewer particles in trail (10 instead of 15)
        });
      }
      setTrailId(prevId => prevId + 1);
    };

    // Add event listeners
    window.addEventListener('mousemove', updatePosition);

    // No hover state changes needed, cursor is always a Christmas tree
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, [trailId]);

  // Clean up trail elements that are too old (slower cleanup for smoother trail)
  useEffect(() => {
    if (trail.length > 0) {
      const timer = setTimeout(() => {
        setTrail(prev => prev.slice(1));
      }, 100); // Slower cleanup for smoother trail (increased from 30ms to 100ms)
      return () => clearTimeout(timer);
    }
  }, [trail]);

  return (
    <>
      <div 
        className={styles.christmasCursor}
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.1s ease-out',
          fontSize: '24px',
          textShadow: '0 0 15px rgba(255, 255, 255, 0.9)',
          userSelect: 'none',
          filter: 'drop-shadow(0 0 5px rgba(75, 200, 0, 0.7))',
        }}
      >
        🎄
      </div>
      
      {/* Enhanced pixie dust trail effect with animations */}
      {trail.map((pos, index) => {
        const trailProgress = index / trail.length;
        const size = 12 + trailProgress * 15;
        
        return (
          <div
            key={`${pos.id}-${index}`}
            className={`${pos.element.color} absolute pointer-events-none will-change-transform`}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              fontSize: `${size}px`,
              zIndex: 9998,
              transform: `
                translate(-50%, -50%) 
                scale(${pos.scale * (1 - trailProgress * 0.6)}) 
                rotate(${pos.rotation}deg)
              `,
              opacity: pos.opacity * (1 - trailProgress * 0.9),
              animation: `
                float-${index} ${pos.duration}s ease-out ${pos.delay}s both,
                blink ${0.3 + Math.random() * 0.3}s ease-in-out infinite alternate
              `,
              filter: 'drop-shadow(0 0 4px currentColor)',
              textShadow: '0 0 8px currentColor',
            }}
          >
            {pos.element.char}
            <style jsx>{`
              @keyframes float-${index} {
                0% {
                  transform: 
                    translate(-50%, -50%) 
                    scale(1) 
                    rotate(${pos.rotation}deg);
                  opacity: 0.9;
                }
                100% {
                  transform: 
                    translate(
                      ${Math.sin(index * 0.5) * 30}px, 
                      -50px
                    ) 
                    scale(0.5) 
                    rotate(${pos.rotation + 180}deg);
                  opacity: 0;
                }
              }
              @keyframes blink {
                0%, 100% { opacity: 0.7; filter: brightness(1.2) drop-shadow(0 0 2px currentColor); }
                50% { opacity: 1; filter: brightness(1.5) drop-shadow(0 0 8px currentColor); }
              }
            `}</style>
          </div>
        );
      })}
    </>
  );
};

export default ChristmasCursor;
