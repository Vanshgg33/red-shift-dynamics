import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { 
  ArrowLeft, 
  Code, 
  Palette, 
  Smartphone, 
  Globe, 
  Rocket, 
  ShieldCheck,
  Check,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleField from '@/components/three/ParticleField';

const serviceDetails = {
  'ui-ux-design': {
    icon: Palette,
    title: 'UI/UX Design',
    subtitle: 'Creating stunning, intuitive interfaces',
    description: 'We craft beautiful, user-centered designs that captivate audiences and drive engagement. Our design process combines aesthetics with functionality to create memorable digital experiences.',
    features: [
      'User Research & Personas',
      'Information Architecture',
      'Wireframing & Prototyping',
      'Visual Design Systems',
      'Usability Testing',
      'Accessibility Compliance',
    ],
    process: [
      { step: 1, title: 'Discovery', description: 'Understanding your goals, users, and market landscape' },
      { step: 2, title: 'Research', description: 'User interviews, competitor analysis, and data gathering' },
      { step: 3, title: 'Design', description: 'Creating wireframes, mockups, and interactive prototypes' },
      { step: 4, title: 'Testing', description: 'Validating designs with real users and iterating' },
    ],
    caseStudies: [
      {
        title: 'HealthTech Dashboard Redesign',
        client: 'MediCare Plus',
        result: '45% increase in user engagement',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      },
      {
        title: 'E-commerce Mobile Experience',
        client: 'ShopFlow',
        result: '32% higher conversion rate',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      },
    ],
  },
  'web-development': {
    icon: Code,
    title: 'Web Development',
    subtitle: 'Building robust, scalable applications',
    description: 'We build powerful web applications using cutting-edge technologies. From simple landing pages to complex enterprise platforms, we deliver excellence in every line of code.',
    features: [
      'React/Next.js Development',
      'Node.js Backend Systems',
      'Database Architecture',
      'API Design & Integration',
      'Performance Optimization',
      'Security Implementation',
    ],
    process: [
      { step: 1, title: 'Planning', description: 'Technical architecture and sprint planning' },
      { step: 2, title: 'Development', description: 'Agile development with continuous integration' },
      { step: 3, title: 'Testing', description: 'Comprehensive QA and automated testing' },
      { step: 4, title: 'Deployment', description: 'Seamless deployment and monitoring setup' },
    ],
    caseStudies: [
      {
        title: 'SaaS Platform Development',
        client: 'TechStartup Inc',
        result: '10x scalability achieved',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      },
      {
        title: 'E-learning Platform',
        client: 'EduLearn',
        result: '100k+ active users',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
      },
    ],
  },
  'mobile-apps': {
    icon: Smartphone,
    title: 'Mobile Apps',
    subtitle: 'Native and cross-platform excellence',
    description: 'We create mobile applications that deliver seamless experiences across all devices. Whether iOS, Android, or cross-platform, we ensure stunning performance and user delight.',
    features: [
      'iOS Native Development',
      'Android Native Development',
      'React Native Apps',
      'Flutter Development',
      'App Store Optimization',
      'Push Notifications',
    ],
    process: [
      { step: 1, title: 'Strategy', description: 'Platform selection and feature prioritization' },
      { step: 2, title: 'Design', description: 'Mobile-first UI/UX design and prototyping' },
      { step: 3, title: 'Build', description: 'Native or cross-platform development' },
      { step: 4, title: 'Launch', description: 'App store submission and marketing' },
    ],
    caseStudies: [
      {
        title: 'Fitness Tracking App',
        client: 'FitLife',
        result: '500k+ downloads',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      },
      {
        title: 'Banking Mobile App',
        client: 'FinBank',
        result: '4.8 star rating',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      },
    ],
  },
  'digital-strategy': {
    icon: Globe,
    title: 'Digital Strategy',
    subtitle: 'Data-driven growth solutions',
    description: 'We develop comprehensive digital strategies that align with your business goals and drive measurable growth across all channels.',
    features: [
      'SEO Optimization',
      'Content Strategy',
      'Analytics Setup',
      'Conversion Optimization',
      'Social Media Strategy',
      'Marketing Automation',
    ],
    process: [
      { step: 1, title: 'Audit', description: 'Comprehensive analysis of current digital presence' },
      { step: 2, title: 'Strategy', description: 'Developing data-driven growth roadmap' },
      { step: 3, title: 'Execute', description: 'Implementing campaigns and optimizations' },
      { step: 4, title: 'Measure', description: 'Tracking KPIs and continuous improvement' },
    ],
    caseStudies: [
      {
        title: 'SEO Transformation',
        client: 'RetailMax',
        result: '300% organic traffic increase',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      },
      {
        title: 'Lead Generation Campaign',
        client: 'B2B Solutions',
        result: '150% more qualified leads',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
      },
    ],
  },
  'brand-identity': {
    icon: Rocket,
    title: 'Brand Identity',
    subtitle: 'Crafting memorable brands',
    description: 'We create distinctive brand identities that resonate with your audience and set you apart from the competition. From logos to complete brand systems.',
    features: [
      'Logo Design',
      'Brand Guidelines',
      'Visual Identity System',
      'Brand Strategy',
      'Packaging Design',
      'Brand Messaging',
    ],
    process: [
      { step: 1, title: 'Discovery', description: 'Understanding brand values and positioning' },
      { step: 2, title: 'Concept', description: 'Developing creative concepts and directions' },
      { step: 3, title: 'Design', description: 'Creating logo and visual identity system' },
      { step: 4, title: 'Deliver', description: 'Complete brand guidelines and assets' },
    ],
    caseStudies: [
      {
        title: 'Luxury Fashion Rebrand',
        client: 'Luxe Couture',
        result: '200% brand recognition increase',
        image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80',
      },
      {
        title: 'Tech Startup Branding',
        client: 'InnovateTech',
        result: 'Successful Series A funding',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
      },
    ],
  },
  'maintenance-support': {
    icon: ShieldCheck,
    title: 'Maintenance & Support',
    subtitle: '24/7 technical excellence',
    description: 'We keep your digital products running smoothly with ongoing maintenance, security updates, and round-the-clock technical support.',
    features: [
      '24/7 Technical Support',
      'Security Updates',
      'Performance Monitoring',
      'Bug Fixes & Patches',
      'Feature Enhancements',
      'Backup & Recovery',
    ],
    process: [
      { step: 1, title: 'Onboard', description: 'System audit and documentation' },
      { step: 2, title: 'Monitor', description: 'Proactive monitoring and alerting' },
      { step: 3, title: 'Maintain', description: 'Regular updates and optimizations' },
      { step: 4, title: 'Support', description: '24/7 response and issue resolution' },
    ],
    caseStudies: [
      {
        title: 'Enterprise Support Contract',
        client: 'Global Corp',
        result: '99.99% uptime achieved',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
      },
      {
        title: 'Security Overhaul',
        client: 'FinanceHub',
        result: 'Zero security incidents',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
      },
    ],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  const service = slug ? serviceDetails[slug as keyof typeof serviceDetails] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <ParticleField />
        
        <div className="container mx-auto px-6 relative z-10">
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl mb-8">
              <Icon className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {service.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {service.subtitle}
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={containerRef} className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            What's <span className="text-primary">Included</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 glass-card"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our <span className="text-primary">Process</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {service.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="glass-card p-6 h-full">
                  <div className="text-5xl font-bold text-primary/20 mb-4">
                    {String(step.step).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-border" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Case <span className="text-primary">Studies</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {service.caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group glass-card overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-muted-foreground">{study.client}</span>
                  <h3 className="text-xl font-bold mt-1 mb-3">{study.title}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {study.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how our {service.title.toLowerCase()} services can help transform your business.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
