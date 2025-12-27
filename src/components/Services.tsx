import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Palette, 
  Smartphone, 
  Globe, 
  Rocket, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import WaveBackground from './three/WaveBackground';

const services = [
  {
    icon: Palette,
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    description: 'Creating stunning, intuitive interfaces that captivate users and drive engagement. We blend aesthetics with functionality for optimal user experiences.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
  },
  {
    icon: Code,
    title: 'Web Development',
    slug: 'web-development',
    description: 'Building robust, scalable web applications using cutting-edge technologies. From simple websites to complex platforms, we deliver excellence.',
    features: ['React/Next.js', 'Node.js', 'Database Design', 'API Integration'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    slug: 'mobile-apps',
    description: 'Native and cross-platform mobile applications that deliver seamless experiences across all devices with stunning performance.',
    features: ['iOS Development', 'Android Development', 'React Native', 'Flutter'],
  },
  {
    icon: Globe,
    title: 'Digital Strategy',
    slug: 'digital-strategy',
    description: 'Comprehensive digital strategies that align with your business goals and drive measurable growth across all channels.',
    features: ['SEO Optimization', 'Content Strategy', 'Analytics', 'Conversion Optimization'],
  },
  {
    icon: Rocket,
    title: 'Brand Identity',
    slug: 'brand-identity',
    description: 'Crafting memorable brand identities that resonate with your audience and set you apart from the competition.',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
  },
  {
    icon: ShieldCheck,
    title: 'Maintenance & Support',
    slug: 'maintenance-support',
    description: 'Keeping your digital products running smoothly with ongoing maintenance, updates, and 24/7 technical support.',
    features: ['24/7 Support', 'Security Updates', 'Performance Optimization', 'Bug Fixes'],
  },
];

const ServiceCard = ({
  service,
  index,
  isActive,
}: {
  service: typeof services[0];
  index: number;
  isActive: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative min-w-[300px] md:min-w-[400px] p-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/services/${service.slug}`}>
        <motion.div
          className="glass-card p-8 h-full cursor-pointer overflow-hidden relative"
          whileHover={{ y: -10 }}
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovered
              ? 'perspective(1000px) rotateY(5deg) rotateX(5deg)'
              : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/0 rounded-2xl opacity-0 blur-xl"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <service.icon className="w-8 h-8 text-primary" />
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {service.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {service.features.map((feature, i) => (
                <motion.span
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
                >
                  {feature}
                </motion.span>
              ))}
            </div>

            {/* Learn More Link */}
            <motion.div
              className="flex items-center gap-2 text-primary font-medium"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 420;
      const newIndex = direction === 'left' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(services.length - 1, currentIndex + 1);
      
      setCurrentIndex(newIndex);
      scrollRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden bg-secondary/30"
    >
      {/* 3D Wave Background */}
      <WaveBackground />
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-primary/3 rounded-full blur-3xl translate-x-1/2" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6"
          >
            Our Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            What We <span className="text-primary">Offer</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            From concept to launch, we provide end-to-end digital solutions tailored to your unique needs
          </motion.p>
        </div>

        {/* Services Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-secondary transition-colors hidden md:flex"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-secondary transition-colors hidden md:flex"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </motion.button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar"
          >
            {services.map((service, index) => (
              <div key={service.title} className="snap-start">
                <ServiceCard
                  service={service}
                  index={index}
                  isActive={index === currentIndex}
                />
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {services.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  scrollRef.current?.scrollTo({
                    left: index * 420,
                    behavior: 'smooth',
                  });
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'bg-border hover:bg-muted-foreground'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
