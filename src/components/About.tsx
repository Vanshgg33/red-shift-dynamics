import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from 'framer-motion';
import { Zap, Target, Users, Award } from 'lucide-react';
import ScrollScene3D from './three/ScrollScene3D';
import { ScrollReveal, LineReveal } from './ScrollReveal';

const stats = [
  { icon: Zap, value: '150+', label: 'Projects Completed', color: 'from-red-500/20 to-orange-500/20' },
  { icon: Target, value: '98%', label: 'Client Satisfaction', color: 'from-primary/20 to-pink-500/20' },
  { icon: Users, value: '50+', label: 'Team Members', color: 'from-rose-500/20 to-red-500/20' },
  { icon: Award, value: '25+', label: 'Awards Won', color: 'from-orange-500/20 to-primary/20' },
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isInView = useInView(textRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Track scroll progress for 3D scene
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden section-premium"
    >
      {/* Section number decoration */}
      <span className="section-number select-none">01</span>

      {/* 3D Scroll-Synced Objects */}
      <ScrollScene3D scrollProgress={scrollProgress} className="opacity-60" />

      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[80px]" />
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-32 h-32 border border-primary/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Horizontal line decorations */}
      <div className="absolute top-1/2 left-0 w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/2 right-0 w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          style={{ rotateX }}
        >
          {/* Left Content */}
          <div ref={textRef}>
            <ScrollReveal animation="fadeUp" delay={0}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                About Us
              </span>
            </ScrollReveal>

            <div className="text-mask mb-6">
              <LineReveal delay={0.1}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  We Create{' '}
                  <span className="text-gradient-animated">Digital Excellence</span>
                </h2>
              </LineReveal>
            </div>

            <ScrollReveal animation="fadeUp" delay={0.2}>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At AMAZEBALLS, we're not just another digital agency – we're your creative partners in building extraordinary digital experiences. Our team of passionate designers, developers, and strategists work together to transform your vision into reality.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.3}>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                With years of experience and a portfolio of successful projects, we've mastered the art of creating websites and applications that not only look stunning but also deliver exceptional user experiences and measurable results.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.4}>
              <div className="flex flex-wrap gap-3">
                {['Innovation First', 'User-Centric', 'Result Driven'].map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-4 py-2 bg-secondary/50 backdrop-blur-sm text-secondary-foreground rounded-full text-sm font-medium border border-border/50 hover:border-primary/30 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, index) => (
              <ScrollReveal
                key={stat.label}
                animation="scale"
                delay={0.2 + index * 0.1}
              >
                <motion.div
                  className="card-premium glass-card p-6 md:p-8 text-center group"
                  whileHover={{ y: -8 }}
                  data-cursor="expand"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                  <motion.div
                    className="relative inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-7 h-7 text-primary" />
                  </motion.div>

                  <motion.h3
                    className="relative text-3xl md:text-4xl font-bold text-foreground mb-2"
                    initial={{ scale: 1 }}
                  >
                    {stat.value}
                  </motion.h3>

                  <p className="relative text-sm text-muted-foreground">{stat.label}</p>

                  {/* Decorative corner */}
                  <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <ScrollReveal animation="fadeUp" delay={0.5}>
          <div className="mt-24 text-center max-w-4xl mx-auto">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-2xl" />

              <blockquote className="relative glass-card p-8 md:p-12">
                {/* Quote marks */}
                <span className="absolute top-4 left-6 text-6xl text-primary/20 font-serif leading-none">"</span>

                <p className="text-xl md:text-2xl italic text-foreground/90 leading-relaxed pt-4">
                  Our mission is simple: to push the boundaries of what's possible in digital design and create experiences that leave lasting impressions.
                </p>

                <footer className="mt-6 flex items-center justify-center gap-3">
                  <div className="w-12 h-px bg-primary/30" />
                  <span className="text-base font-semibold text-primary">
                    The AMAZEBALLS Team
                  </span>
                  <div className="w-12 h-px bg-primary/30" />
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
