import { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import CursorFollower from '@/components/CursorFollower';
import ScrollProgress from '@/components/ScrollProgress';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Initialize smooth scroll animations
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.8 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
    });

    // Parallax effect for decorative elements
    gsap.utils.toArray('.parallax-element').forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-background overflow-x-hidden"
    >
      {/* Custom Cursor */}
      <CursorFollower />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Services />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default Index;
