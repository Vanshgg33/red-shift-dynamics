import { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import GlobalPresenceBanner from '@/components/GlobalPresenceBanner';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  // Initialize Lenis smooth scrolling
  useSmoothScroll(true);

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
      // Kill all ScrollTrigger instances and refresh
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.clearMatchMedia();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-background overflow-x-hidden"
    >
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <GlobalPresenceBanner />
        <Services />
        <Portfolio />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default Index;
