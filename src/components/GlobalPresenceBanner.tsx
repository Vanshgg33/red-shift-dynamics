import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import mapBanner from '@assets/mainBg.png';
import { ScrollReveal } from './ScrollReveal';

const GlobalPresenceBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.5, 0.7]);

  const stats = [
    { value: '50+', label: 'Countries Served' },
    { value: '200+', label: 'Global Clients' },
    { value: '24/7', label: 'Support Available' },
    { value: '99%', label: 'Uptime Guaranteed' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-0 overflow-hidden"
    >
      {/* Full-width banner container */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: imageY, scale: imageScale }}
        >
          <img
            src={mapBanner}
            alt="AMAZEBALLS Global Presence"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Gradient Overlays */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 z-10" />

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20" />

        {/* Content Overlay */}
        <div className="relative z-20 container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <ScrollReveal animation="fadeUp" delay={0}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium rounded-full mb-6 border border-primary/20">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                Worldwide Reach
              </span>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Trusted <span className="text-gradient-animated">Globally</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                From startups to enterprises, we've partnered with visionary brands across the globe to create digital experiences that transcend boundaries.
              </p>
            </ScrollReveal>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <ScrollReveal key={stat.label} animation="scale" delay={0.3 + index * 0.1}>
                  <motion.div
                    className="glass-card p-6 text-center group hover:border-primary/30 transition-colors"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <motion.span
                      className="block text-3xl md:text-4xl font-bold text-primary mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Animated particles/dots */}
        <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/40 rounded-full"
              style={{
                left: `${15 + i * 10}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceBanner;
