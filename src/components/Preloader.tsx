import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const overlayTopRef = useRef<HTMLDivElement>(null);
  const overlayBottomRef = useRef<HTMLDivElement>(null);

  const animateExit = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        setTimeout(onComplete, 100);
      }
    });

    // Fade out content first
    tl.to([titleRef.current, subtitleRef.current, counterRef.current?.parentElement, lineRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power3.inOut'
    });

    // Split curtain reveal
    tl.to(overlayTopRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut'
    }, '-=0.2');

    tl.to(overlayBottomRef.current, {
      yPercent: 100,
      duration: 1,
      ease: 'power4.inOut'
    }, '<');
  }, [onComplete]);

  // Counter animation
  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const startTime = Date.now();

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Eased progress for smoother feel
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const newCounter = Math.floor(easedProgress * 100);

      setCounter(newCounter);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Wait a moment then animate exit
        setTimeout(animateExit, 400);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [animateExit]);

  // Initial animations
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate title letters
      const titleLetters = titleRef.current?.querySelectorAll('.preloader-letter');
      const subtitleLetters = subtitleRef.current?.querySelectorAll('.preloader-letter');

      gsap.set([titleLetters, subtitleLetters], {
        y: 100,
        opacity: 0,
        rotateX: -80
      });

      gsap.set(lineRef.current, { scaleX: 0 });

      // Timeline for entrance
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(titleLetters, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.04,
        ease: 'power4.out'
      });

      tl.to(subtitleLetters, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out'
      }, '-=0.6');

      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut'
      }, '-=0.8');
    });

    return () => ctx.revert();
  }, []);

  const titleText = 'AMAZEBALLS';
  const subtitleText = 'CREATIVE STUDIO';

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Split curtain overlays */}
          <div
            ref={overlayTopRef}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#0a0a0a] z-10"
          />
          <div
            ref={overlayBottomRef}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0a0a0a] z-10"
          />

          {/* Main content layer */}
          <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Center content */}
            <div className="relative z-20 text-center px-6 w-full">
              {/* Main title */}
              <div
                ref={titleRef}
                className="overflow-hidden mb-4"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="flex justify-center whitespace-nowrap"
                  style={{ fontSize: 'clamp(2rem, 10vw, 8rem)' }}
                >
                  {titleText.split('').map((letter, index) => (
                    <span
                      key={index}
                      className={`preloader-letter inline-block font-bold tracking-tight text-primary`}
                      style={{
                        fontFamily: "var(--font-heading)",
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subtitle */}
              <div
                ref={subtitleRef}
                className="overflow-hidden mb-8"
                style={{ perspective: '500px' }}
              >
                <div className="flex justify-center gap-1">
                  {subtitleText.split('').map((letter, index) => (
                    <span
                      key={index}
                      className="preloader-letter inline-block text-sm md:text-base tracking-[0.3em] text-white/60 font-light"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress line */}
              <div className="relative w-64 md:w-80 mx-auto h-[1px] bg-white/10 mb-6 overflow-hidden">
                <div
                  ref={lineRef}
                  className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-primary via-primary to-primary/50 origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
                <motion.div
                  className="absolute inset-y-0 left-0 bg-primary"
                  style={{ width: `${counter}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Counter */}
              <div className="flex items-baseline justify-center gap-1 text-white/80">
                <span
                  ref={counterRef}
                  className="text-4xl md:text-5xl font-light tabular-nums"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {counter}
                </span>
                <span className="text-lg text-white/40">%</span>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/10" />
            <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white/10" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/10" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/10" />

            {/* Bottom text */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-[0.2em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Crafting Excellence
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
