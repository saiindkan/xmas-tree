"use client";

import { useState, useEffect, useRef } from 'react';
import styles from '../styles/MusicPlayer.module.css';

// Array of royalty-free Christmas piano music tracks
const CHRISTMAS_TRACKS = [
  {
    title: 'Silent Night',
    artist: 'Christmas Piano',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    title: 'Jingle Bells',
    artist: 'Holiday Piano',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    title: 'Deck the Halls',
    artist: 'Christmas Piano',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

const ChristmasMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  // Close player when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (playerRef.current && !playerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(CHRISTMAS_TRACKS[currentTrackIndex].src);
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrackIndex]);
  
  // Handle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        // Unmute and restore previous volume
        audioRef.current.volume = previousVolume > 0 ? previousVolume : 0.5;
        setVolume(previousVolume > 0 ? previousVolume : 0.5);
      } else {
        // Mute and store current volume
        setPreviousVolume(volume);
        audioRef.current.volume = 0;
        setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };
  
  // Handle track change
  const changeTrack = (direction: 'next' | 'prev') => {
    if (audioRef.current) {
      audioRef.current.pause();
      const newIndex = direction === 'next' 
        ? (currentTrackIndex + 1) % CHRISTMAS_TRACKS.length
        : (currentTrackIndex - 1 + CHRISTMAS_TRACKS.length) % CHRISTMAS_TRACKS.length;
      
      setCurrentTrackIndex(newIndex);
      setIsPlaying(false);
    }
  };
  
  const currentTrack = CHRISTMAS_TRACKS[currentTrackIndex];
  
  // Auto-play when component mounts
  useEffect(() => {
    if (audioRef.current) {
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (err) {
          console.log('Auto-play was prevented:', err);
        }
      };
      
      // Try to play on user interaction
      const handleFirstInteraction = () => {
        playAudio();
        document.removeEventListener('click', handleFirstInteraction);
      };
      
      document.addEventListener('click', handleFirstInteraction);
      return () => document.removeEventListener('click', handleFirstInteraction);
    }
  }, [currentTrackIndex]);

  return (
    <div 
      ref={playerRef}
      className={`${styles.musicPlayer} ${isExpanded ? styles.expanded : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
    >
      {/* Compact View */}
      <button 
        className={styles.speakerButton}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Minimize player' : 'Music player'}
      >
        {isPlaying ? '🛷' : '❄️'}
      </button>
      
      {/* Expanded View */}
      <div className={styles.musicPlayerContent}>
        <div className={styles.musicInfo}>
          <div className={styles.musicTitle}>{currentTrack.title}</div>
          <div className={styles.musicArtist}>{currentTrack.artist}</div>
        </div>
        
        <div className={styles.musicControls}>
          <button 
            onClick={() => changeTrack('prev')}
            className={styles.musicButton}
            aria-label="Previous track"
            title="Previous track"
          >
            ⏮
          </button>
          
          <button 
            onClick={togglePlayPause}
            className={styles.musicButton}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶️'}
          </button>
          
          <button 
            onClick={() => changeTrack('next')}
            className={styles.musicButton}
            aria-label="Next track"
            title="Next track"
          >
            ⏭
          </button>
        </div>
        
        <div className={styles.volumeControl}>
          <button 
            onClick={toggleMute}
            className={styles.volumeButton}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : volume > 0.5 ? '🔊' : volume > 0 ? '🔉' : '🔈'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className={styles.volumeSlider}
            aria-label="Volume control"
          />
        </div>
      </div>
    </div>
  );
};

export default ChristmasMusicPlayer;
