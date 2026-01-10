import { useCallback, useRef, useState, useEffect } from 'react';

// Sound effect types
type SoundType = 'click' | 'hover' | 'success' | 'toggle' | 'whoosh';

// Sound URLs - using simple web audio synthesis for performance
const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('soundEnabled') !== 'false';
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('soundEnabled', String(isEnabled));
  }, [isEnabled]);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!isEnabled) return;

    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      switch (type) {
        case 'click':
          oscillator.frequency.setValueAtTime(800, now);
          oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.05);
          gainNode.gain.setValueAtTime(0.1, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
          oscillator.start(now);
          oscillator.stop(now + 0.05);
          break;

        case 'hover':
          oscillator.frequency.setValueAtTime(600, now);
          oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.03);
          gainNode.gain.setValueAtTime(0.03, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
          oscillator.start(now);
          oscillator.stop(now + 0.03);
          break;

        case 'success':
          oscillator.frequency.setValueAtTime(523.25, now); // C5
          gainNode.gain.setValueAtTime(0.1, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          oscillator.start(now);
          oscillator.stop(now + 0.2);

          // Second note
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.frequency.setValueAtTime(659.25, now + 0.1); // E5
          gain2.gain.setValueAtTime(0.1, now + 0.1);
          gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          osc2.start(now + 0.1);
          osc2.stop(now + 0.3);
          break;

        case 'toggle':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(440, now);
          oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.08);
          gainNode.gain.setValueAtTime(0.06, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
          oscillator.start(now);
          oscillator.stop(now + 0.08);
          break;

        case 'whoosh':
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(100, now);
          oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.15);
          gainNode.gain.setValueAtTime(0.02, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          oscillator.start(now);
          oscillator.stop(now + 0.15);
          break;
      }
    } catch (e) {
      // Audio not supported or blocked
    }
  }, [isEnabled, getAudioContext]);

  const toggleSound = useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);

  return {
    playSound,
    isEnabled,
    toggleSound,
  };
};

export default useSoundEffects;
