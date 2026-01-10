import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';

// X (Twitter) logo component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import logo from '@assets/logo.png';
import { ScrollReveal } from './ScrollReveal';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/amaz.eballsservices?igsh=Yjd6ZzdyNWRhMHEz', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/share/17c55Yh3yQ/?mibextid=wwXIfr', label: 'Facebook' },
  { icon: XIcon, href: 'https://x.com/amazeballs4561?s=11', label: 'X' },
];

const footerLinks = {
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Careers', href: '#' },
  ],
  support: [
    { label: 'Contact', href: '#contact' },
    { label: 'FAQ', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-100px' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Background Decorations */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <ScrollReveal animation="fadeUp" delay={0} className="lg:col-span-2">
            <a href="#home" className="inline-flex items-center gap-3 mb-8 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <img
                  src={logo}
                  alt="AMAZEBALLS Logo"
                  className="relative h-12 w-12 object-contain"
                />
              </motion.div>
              <span className="text-3xl font-bold tracking-tight">
                <span className="text-primary">AMAZE</span>
                <span className="text-primary">BALLS</span>
              </span>
            </a>

            <p className="text-white/60 max-w-md mb-8 leading-relaxed text-lg">
              We're a creative digital agency passionate about crafting extraordinary digital experiences. From stunning websites to powerful applications, we bring your vision to life.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: Mail, text: 'info@amazeballs.in', href: 'mailto:info@amazeballs.in' },
                { icon: Phone, text: '+91 82917 64287', href: 'tel:+918291764287' },
                { icon: MapPin, text: 'Flat No. 101, Jadhav Height, Plot No.17, Shilpa Co-op. Soc., Beltarodi road, Nagpur -15', href: '#' },
              ].map((item, index) => (
                <motion.a
                  key={item.text}
                  href={item.href}
                  className="flex items-center gap-4 text-white/60 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="group-hover:text-white transition-colors">{item.text}</span>
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          {/* Company Links */}
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Support Links */}
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Support
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        {/* Divider */}
        <div className="divider-elegant mb-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <p className="text-white/40 text-sm text-center md:text-left">
            © {new Date().getFullYear()} AMAZEBALLS. Crafted with passion.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all border border-white/5 hover:border-primary"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Scroll to Top */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-white/40 hover:text-primary transition-colors"
            whileHover={{ y: -3 }}
          >
            <span className="text-sm">Back to top</span>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
              <ArrowUp className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="text-[20vw] font-bold text-white/[0.02] leading-none tracking-tighter whitespace-nowrap">
          AMAZEBALLS
        </div>
      </div>
    </footer>
  );
};

export default Footer;
