import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import NoiseOverlay from './NoiseOverlay';
import mapBanner from '/Map.png';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  // Magnetic hover effect on letters
  useEffect(() => {
    if (!titleRef.current || !isLoaded) return;

    const letters = titleRef.current.querySelectorAll('.letter');
    const cleanup: (() => void)[] = [];

    letters.forEach((letter) => {
      const letterEl = letter as HTMLElement;
      let animation: gsap.core.Tween | null = null;

      const handleEnter = () => {
        if (animation) animation.kill();
        animation = gsap.to(letterEl, {
          y: -15,
          scale: 1.15,
          color: 'hsl(355, 82%, 56%)',
          duration: 0.4,
          ease: 'power3.out',
        });
      };

      const handleLeave = () => {
        if (animation) animation.kill();
        animation = gsap.to(letterEl, {
          y: 0,
          scale: 1,
          color: '',
          duration: 0.4,
          ease: 'power3.out',
        });
      };

      letterEl.addEventListener('mouseenter', handleEnter, { passive: true });
      letterEl.addEventListener('mouseleave', handleLeave, { passive: true });

      cleanup.push(() => {
        letterEl.removeEventListener('mouseenter', handleEnter);
        letterEl.removeEventListener('mouseleave', handleLeave);
        if (animation) animation.kill();
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, [isLoaded]);

  // Master timeline for entrance animations
  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        delay: 0.3,
        onComplete: () => setIsLoaded(true),
      });

      // Title letters animation
      const letters = titleRef.current?.querySelectorAll('.letter');
      gsap.set(letters, {
        opacity: 0,
        y: 120,
        rotateX: -90,
        scale: 0.6,
      });

      masterTl.to(letters, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.4,
        stagger: 0.06,
        ease: 'power4.out',
      });

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
        masterTl.to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.8'
        );
      }

      // Tagline animation with split characters
      if (taglineRef.current) {
        const taglineChars = taglineRef.current.querySelectorAll('.tagline-char');
        gsap.set(taglineChars, { opacity: 0, y: 20 });
        masterTl.to(
          taglineChars,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: 'power2.out',
          },
          '-=0.6'
        );
      }

      // CTA buttons animation
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('.cta-btn');
        gsap.set(buttons, { opacity: 0, y: 30, scale: 0.9 });
        masterTl.to(
          buttons,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.5)',
          },
          '-=0.4'
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const titleText = 'AMAZEBALLS';
  const taglineText = 'The Best the brand can get';

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a]"
    >
      {/* Background Layers */}

      {/* Map Background Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src={mapBanner}
          alt="Global Presence"
          className="w-full h-auto max-w-[90%] object-contain opacity-60"
        />
      </div>

      {/* Gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial-hero rounded-full blur-3xl opacity-60" />
      </div>

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-4 h-4 bg-primary rounded-full opacity-60"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[60%] left-[8%] w-3 h-3 bg-primary/70 rounded-full"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[15%] w-2 h-2 bg-primary/50 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Noise overlay */}
      <NoiseOverlay />

      {/* Main Content */}
      <motion.div
        style={{
          y,
          opacity,
          scale,
          filter: blur.get() > 0 ? `blur(${blur.get()}px)` : undefined,
        }}
        className="relative z-10 px-6 max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col items-center text-center">
          {/* Subtitle above title */}
          <div ref={subtitleRef} className="mb-6">
            <span className="text-xl md:text-3xl lg:text-4xl font-light text-foreground/70 tracking-wide">
              We Are
            </span>
          </div>

          {/* Main Title */}
          <div className="relative mb-8 w-full">
            {/* Glow effect behind text */}
            <div className="absolute inset-0 bg-primary/10 blur-[80px] -z-10 scale-150" />

            <h1
              ref={titleRef}
              className="relative font-bold leading-[0.85] tracking-tight whitespace-nowrap text-center"
              style={{
                perspective: '1500px',
                fontSize: 'clamp(2.5rem, 12vw, 12rem)',
              }}
            >
              {titleText.split('').map((letter, index) => (
                <span
                  key={index}
                  className={`letter inline-block cursor-pointer transition-colors duration-300 text-primary`}
                  style={{
                    fontFamily: "var(--font-heading)",
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Tagline with character animation */}
          <div ref={taglineRef} className="max-w-2xl mx-auto mb-12">
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
              {taglineText.split('').map((char, index) => (
                <span key={index} className="tagline-char inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <motion.a
              href="#services"
              className="cta-btn group relative px-10 py-5 bg-primary text-white rounded-full font-medium text-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {/* Glow */}
              <span className="absolute inset-0 bg-primary/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <span className="relative z-10 flex items-center gap-2">
                Explore Our Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>

            <motion.a
              href="#about"
              className="cta-btn group relative px-10 py-5 bg-transparent border-2 border-foreground/20 hover:border-primary text-foreground rounded-full font-medium text-lg overflow-hidden transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                Learn More
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Decorative lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
        <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
      </div>

      

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2"
            animate={{ borderColor: ['rgba(0,0,0,0.2)', 'rgba(230,57,70,0.5)', 'rgba(0,0,0,0.2)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-current rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
