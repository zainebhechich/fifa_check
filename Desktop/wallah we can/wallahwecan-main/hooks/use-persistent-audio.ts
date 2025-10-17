"use client";
import { useEffect, useRef } from 'react';

// Global audio instance that persists across page changes
let globalAudio: HTMLAudioElement | null = null;
let isInitialized = false;

export const usePersistentAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create or reuse global audio instance
    if (!globalAudio && typeof window !== 'undefined') {
      globalAudio = new Audio('/spirit.mp3');
      globalAudio.loop = true;
      globalAudio.volume = 0.3;
      globalAudio.preload = 'auto';
    }

    audioRef.current = globalAudio;

    // Try to start playing if not already initialized
    if (!isInitialized && globalAudio) {
      isInitialized = true;
      
      const startAudio = async () => {
        try {
          await globalAudio!.play();
        } catch (error) {
          console.log('Autoplay prevented, will start on user interaction');
          
          // Add one-time listeners for user interaction
          const startOnInteraction = async () => {
            try {
              await globalAudio!.play();
              // Remove listeners after successful play
              document.removeEventListener('click', startOnInteraction);
              document.removeEventListener('touchstart', startOnInteraction);
              document.removeEventListener('keydown', startOnInteraction);
            } catch (e) {
              console.log('Failed to start audio');
            }
          };

          document.addEventListener('click', startOnInteraction, { once: true });
          document.addEventListener('touchstart', startOnInteraction, { once: true });
          document.addEventListener('keydown', startOnInteraction, { once: true });
        }
      };

      startAudio();
    }

    return () => {
      // Don't cleanup the global audio on unmount
      // This ensures it persists across page changes
    };
  }, []);

  return audioRef.current;
};
