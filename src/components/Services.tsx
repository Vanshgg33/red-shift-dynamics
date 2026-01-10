import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Megaphone,
  Target,
  Tv,
  Share2,
  PenTool,
  Code,
  Search,
  Printer,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import WaveBackground from './three/WaveBackground';

const services = [
  {
    icon: Megaphone,
    title: 'Ad Campaigns',
    slug: 'ad-campaigns',
    description: 'Strategic advertising campaigns that capture attention and drive results. We create compelling ads that resonate with your target audience across all platforms.',
    features: ['Google Ads', 'Facebook Ads', 'Display Advertising', 'Retargeting'],
  },
  {
    icon: Target,
    title: 'Strategic Planning',
    slug: 'strategic-planning',
    description: 'Comprehensive business strategies tailored to your goals. We analyze market trends and competitors to position your brand for maximum growth.',
    features: ['Market Analysis', 'Competitor Research', 'Growth Strategy', 'ROI Planning'],
  },
  {
    icon: Tv,
    title: 'TV, Radio & Magazine Ads',
    slug: 'traditional-media-ads',
    description: 'Powerful traditional media advertising that reaches mass audiences. We create memorable commercials and print ads that leave lasting impressions.',
    features: ['TV Commercials', 'Radio Spots', 'Magazine Ads', 'Billboard Design'],
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    slug: 'social-media-management',
    description: 'Complete social media solutions to build your brand presence. We manage, create, and grow your social channels for maximum engagement.',
    features: ['Content Calendar', 'Community Management', 'Analytics', 'Influencer Marketing'],
  },
  {
    icon: PenTool,
    title: 'Content Creation',
    slug: 'content-creation',
    description: 'Engaging content that tells your brand story. From copywriting to video production, we create content that connects and converts.',
    features: ['Copywriting', 'Video Production', 'Photography', 'Graphic Design'],
  },
  {
    icon: Code,
    title: 'Web Development',
    slug: 'web-development',
    description: 'Custom websites and web applications built with cutting-edge technology. We deliver fast, responsive, and user-friendly digital experiences.',
    features: ['Custom Websites', 'E-commerce', 'Web Apps', 'CMS Development'],
  },
  {
    icon: Search,
    title: 'SEO, SEM & PPC',
    slug: 'seo-sem-ppc',
    description: 'Data-driven search marketing strategies to increase your visibility. We optimize your presence to rank higher and drive qualified traffic.',
    features: ['SEO Optimization', 'Google Ads', 'Keyword Research', 'Link Building'],
  },
  {
    icon: Printer,
    title: 'Printing & Design Solutions',
    slug: 'printing-design',
    description: 'Professional printing and design services for all your marketing materials. From business cards to banners, we deliver quality print solutions.',
    features: ['Business Cards', 'Brochures', 'Banners', 'Packaging Design'],
  },
  {
    icon: Users,
    title: 'Lead Nurturing',
    slug: 'lead-nurturing',
    description: 'Convert prospects into loyal customers with strategic lead nurturing. We build automated workflows that guide leads through your sales funnel.',
    features: ['Email Marketing', 'CRM Integration', 'Marketing Automation', 'Sales Funnels'],
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
          className={`p-8 h-full cursor-pointer overflow-hidden relative rounded-2xl shadow-lg transition-colors duration-300 ${
            isHovered ? 'bg-primary' : 'bg-white dark:bg-gray-900 border border-border'
          }`}
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
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-colors duration-300 ${
                isHovered ? 'bg-white/20' : 'bg-primary/10'
              }`}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <service.icon className={`w-8 h-8 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-primary'}`} />
            </motion.div>

            {/* Title */}
            <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-foreground'}`}>
              {service.title}
            </h3>

            {/* Description */}
            <p className={`mb-6 leading-relaxed transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-muted-foreground'}`}>
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
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
                    isHovered ? 'bg-white/20 text-white' : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {feature}
                </motion.span>
              ))}
            </div>

            {/* Learn More Link */}
            <motion.div
              className={`flex items-center gap-2 font-medium transition-colors duration-300 ${isHovered ? 'text-white' : 'text-primary'}`}
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
            We are committed to providing the best services to grow your business — online and offline
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
