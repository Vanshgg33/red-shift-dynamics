import { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const CursorFollower = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'button' | 'text' | 'link'>('default');
  const [cursorText, setCursorText] = useState('');

  // Main cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring followers
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Outer ring with more lag
  const ringConfig = { damping: 20, stiffness: 200, mass: 0.8 };
  const ringX = useSpring(cursorX, ringConfig);
  const ringY = useSpring(cursorY, ringConfig);

  // Trail with even more lag
  const trailConfig = { damping: 15, stiffness: 120, mass: 1 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  // Scale based on state
  const dotScale = useMotionValue(1);
  const ringScale = useMotionValue(1);
  const smoothDotScale = useSpring(dotScale, { damping: 20, stiffness: 300 });
  const smoothRingScale = useSpring(ringScale, { damping: 15, stiffness: 200 });

  // Rotation for visual interest
  const rotation = useTransform(smoothX, (x) => x * 0.02);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Check for different element types
    const isButton = target.closest('button, .btn-hero, .btn-outline-hero, .cta-btn');
    const isLink = target.closest('a');
    const isLetter = target.classList.contains('letter') || target.closest('.letter');
    const isCard = target.closest('.glass-card, .glass-card-glow, [data-cursor="expand"]');
    const cursorLabel = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');

    if (cursorLabel) {
      setCursorText(cursorLabel);
      setCursorState('text');
      dotScale.set(3);
      ringScale.set(2);
    } else if (isButton) {
      setCursorState('button');
      setCursorText('');
      dotScale.set(2);
      ringScale.set(2.5);
    } else if (isLink) {
      setCursorState('link');
      setCursorText('');
      dotScale.set(1.5);
      ringScale.set(2);
    } else if (isLetter) {
      setCursorState('hover');
      setCursorText('');
      dotScale.set(1.8);
      ringScale.set(1.5);
    } else if (isCard) {
      setCursorState('hover');
      setCursorText('');
      dotScale.set(1.5);
      ringScale.set(1.8);
    } else {
      setCursorState('default');
      setCursorText('');
      dotScale.set(1);
      ringScale.set(1);
    }
  }, [dotScale, ringScale]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnter]);

  // Hide on mobile/touch devices
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  const isActive = cursorState !== 'default';

  return (
    <>
      {/* Trail glow - outermost layer */}
      <motion.div
        className="fixed pointer-events-none z-[9995] mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isVisible ? 0.3 : 0 }}
      >
        <motion.div
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(230, 57, 70, 0.15) 0%, transparent 70%)',
            scale: smoothRingScale,
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9996]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          rotate: rotation,
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full border border-primary/30"
          style={{ scale: smoothRingScale }}
          animate={{
            borderColor: isActive ? 'rgba(230, 57, 70, 0.6)' : 'rgba(230, 57, 70, 0.3)',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Inner dot with glow */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        {/* Glow layer */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ scale: smoothDotScale }}
        >
          <div
            className="w-8 h-8 rounded-full blur-md"
            style={{
              background: 'radial-gradient(circle, rgba(230, 57, 70, 0.4) 0%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* Main dot */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{ scale: smoothDotScale }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{
              backgroundColor: isActive ? '#E63946' : '#E63946',
            }}
            style={{
              boxShadow: '0 0 10px rgba(230, 57, 70, 0.6), 0 0 20px rgba(230, 57, 70, 0.3)',
            }}
          />

          {/* Text label */}
          {cursorText && (
            <motion.span
              className="absolute whitespace-nowrap text-[10px] font-medium tracking-wider uppercase text-white"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              style={{ marginTop: '-2px' }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Additional decorative ring for button hover */}
      {cursorState === 'button' && (
        <motion.div
          className="fixed pointer-events-none z-[9997]"
          style={{
            x: ringX,
            y: ringY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full border border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{
              borderStyle: 'dashed',
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default CursorFollower;
