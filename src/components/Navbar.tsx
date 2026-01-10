import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Sun, Moon, Volume2, VolumeX, Instagram, Facebook } from 'lucide-react';

// X (Twitter) logo component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import { useTheme } from '@/hooks/use-theme';
import useSoundEffects from '@/hooks/use-sound';
import logo from '@assets/logo.png';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/amaz.eballsservices?igsh=Yjd6ZzdyNWRhMHEz', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/share/17c55Yh3yQ/?mibextid=wwXIfr', label: 'Facebook' },
  { icon: XIcon, href: 'https://x.com/amazeballs4561?s=11', label: 'X' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { resolvedTheme, setTheme } = useTheme();
  const { playSound, isEnabled: isSoundEnabled, toggleSound } = useSoundEffects();

  const { scrollY } = useScroll();
  const navBackground = useTransform(scrollY, [0, 100], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']);
  const navBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(20px)']);

  const toggleTheme = () => {
    playSound('toggle');
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleClick = () => {
    playSound('click');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    playSound('click');
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3'
            : 'py-5'
        }`}
        style={{
          background: isScrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        }}
      >
        {/* Bottom border when scrolled */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="relative z-10 flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src={logo}
                alt="AMAZEBALLS Logo"
                className="relative h-9 w-9 md:h-10 md:w-10 object-contain"
              />
            </motion.div>
            <span className="text-2xl md:text-3xl font-bold tracking-tight">
              <span className="text-primary">AMAZE</span>
              <span className="text-primary">BALLS</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="relative px-4 py-2 text-sm font-medium transition-colors group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 + 0.3 }}
              >
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    activeSection === item.href.substring(1)
                      ? 'text-primary'
                      : 'text-foreground/60 group-hover:text-foreground'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active indicator */}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover background */}
                <span className="absolute inset-0 bg-foreground/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}

            {/* Divider */}
            <div className="w-px h-6 bg-border/50 mx-3" />

            {/* Social Links */}
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-full hover:bg-secondary/50 transition-colors group"
                aria-label={social.label}
              >
                <span className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <social.icon className="relative w-4 h-4 text-foreground/60 group-hover:text-primary transition-colors" />
              </motion.a>
            ))}

            {/* Divider */}
            <div className="w-px h-6 bg-border/50 mx-3" />

            {/* Sound Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                toggleSound();
                playSound('toggle');
              }}
              className="relative p-2.5 rounded-full bg-secondary/50 hover:bg-secondary transition-colors group"
              aria-label="Toggle sound"
            >
              <span className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              {isSoundEnabled ? (
                <Volume2 className="relative w-4 h-4 text-foreground" />
              ) : (
                <VolumeX className="relative w-4 h-4 text-foreground/60" />
              )}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="relative p-2.5 rounded-full bg-secondary/50 hover:bg-secondary transition-colors group"
              aria-label="Toggle theme"
            >
              <span className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={resolvedTheme}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  {resolvedTheme === 'dark' ? (
                    <Sun className="w-4 h-4 text-foreground" />
                  ) : (
                    <Moon className="w-4 h-4 text-foreground" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('#contact')}
              className="relative ml-3 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Get Started</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background/95 backdrop-blur-xl border-l border-border/20"
            >
              {/* Close button area */}
              <div className="absolute top-4 right-4">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex flex-col pt-24 px-8 h-full">
                {/* Nav Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`block py-4 text-3xl font-semibold transition-colors ${
                        activeSection === item.href.substring(1)
                          ? 'text-primary'
                          : 'text-foreground/60 hover:text-foreground'
                      }`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-sm text-primary/50 font-mono">0{index + 1}</span>
                        {item.label}
                      </span>
                    </motion.a>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-border/30" />

                {/* Bottom actions */}
                <div className="space-y-4">
                  {/* Theme Toggle */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={toggleTheme}
                    className="flex items-center gap-4 w-full py-3 text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {resolvedTheme === 'dark' ? (
                      <>
                        <Sun className="w-5 h-5" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </motion.button>

                  {/* Sound Toggle */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    onClick={() => {
                      toggleSound();
                      playSound('toggle');
                    }}
                    className="flex items-center gap-4 w-full py-3 text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {isSoundEnabled ? (
                      <>
                        <Volume2 className="w-5 h-5" />
                        <span>Sound On</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-5 h-5" />
                        <span>Sound Off</span>
                      </>
                    )}
                  </motion.button>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3 py-3"
                  >
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-white transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    onClick={() => handleNavClick('#contact')}
                    className="w-full mt-4 py-4 bg-primary text-primary-foreground rounded-full font-medium"
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
