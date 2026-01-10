import { useState, useRef, forwardRef } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ExternalLink, ArrowUpRight } from 'lucide-react';
import { ScrollReveal, LineReveal } from './ScrollReveal';

const categories = ['All', 'Web Design', 'Mobile Apps', 'Branding', 'UI/UX'];

const projects = [
  {
    id: 1,
    title: 'TechFlow Dashboard',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    description: 'A comprehensive analytics dashboard for tech startups with real-time data visualization.',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    link: '#',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 2,
    title: 'FitLife Mobile App',
    category: 'Mobile Apps',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    description: 'A fitness tracking app with personalized workout plans and nutrition guidance.',
    technologies: ['React Native', 'Firebase', 'Redux', 'HealthKit'],
    link: '#',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: 3,
    title: 'Luxe Brand Identity',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80',
    description: 'Complete brand identity design for a luxury fashion retailer.',
    technologies: ['Illustrator', 'Photoshop', 'Figma'],
    link: '#',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 4,
    title: 'EcoShop E-commerce',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    description: 'Sustainable marketplace with carbon footprint tracking for eco-conscious shoppers.',
    technologies: ['Next.js', 'Stripe', 'Tailwind', 'Prisma'],
    link: '#',
    color: 'from-teal-500/20 to-green-500/20',
  },
  {
    id: 5,
    title: 'HealthCare UX Redesign',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    description: 'Complete UX overhaul for a healthcare management platform.',
    technologies: ['Figma', 'Protopie', 'User Research'],
    link: '#',
    color: 'from-red-500/20 to-orange-500/20',
  },
  {
    id: 6,
    title: 'Fintech Banking App',
    category: 'Mobile Apps',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    description: 'Modern mobile banking experience with AI-powered insights.',
    technologies: ['Flutter', 'Python', 'TensorFlow', 'AWS'],
    link: '#',
    color: 'from-indigo-500/20 to-violet-500/20',
  },
];

const ProjectCard = forwardRef<
  HTMLDivElement,
  {
    project: (typeof projects)[0];
    onClick: () => void;
    index: number;
  }
>(({ project, onClick, index }, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl card-premium"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      data-cursor="expand"
      data-cursor-text="View"
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
      />

      <div className="aspect-[4/3] overflow-hidden relative">
        {/* Loading Skeleton */}
        {!isLoaded && <div className="absolute inset-0 skeleton" />}

        {/* Image with parallax effect */}
        <motion.img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          animate={{
            scale: isHovered ? 1.15 : 1,
            filter: isHovered ? 'brightness(0.7)' : 'brightness(1)',
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20"
          animate={{ opacity: isHovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6 z-30"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: isHovered ? 0 : 10,
          opacity: 1,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Category pill */}
        <motion.span
          className="inline-block w-fit px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium rounded-full mb-3 border border-primary/20"
          animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {project.category}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="text-xl md:text-2xl font-bold text-white mb-2"
          animate={{ x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>

        {/* View project link */}
        <motion.div
          className="flex items-center gap-2 text-white/80"
          animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <span className="text-sm">View Project</span>
          <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.3 }}>
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Corner decoration */}
      <motion.div
        className="absolute top-4 right-4 w-10 h-10 border border-white/20 rounded-full flex items-center justify-center z-30"
        animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUpRight className="w-4 h-4 text-white" />
      </motion.div>

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 border-2 border-primary/50 rounded-2xl z-40 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const LightboxModal = ({
  project,
  onClose,
}: {
  project: (typeof projects)[0] | null;
  onClose: () => void;
}) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5 text-white" />
        </motion.button>

        {/* Image */}
        <div className="aspect-video overflow-hidden rounded-t-2xl relative">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4"
          >
            {project.category}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl md:text-4xl font-bold mb-4"
          >
            {project.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mb-6 leading-relaxed text-lg"
          >
            {project.description}
          </motion.p>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-8"
          >
            <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="px-4 py-2 bg-secondary/50 text-secondary-foreground text-sm font-medium rounded-full border border-border/50"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            href={project.link}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View Live Project</span>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const filteredProjects =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden section-premium"
    >
      {/* Section number decoration */}
      <span className="section-number select-none">03</span>

      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />
      </motion.div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fadeUp">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Our Work
            </span>
          </ScrollReveal>

          <div className="text-mask mb-6">
            <LineReveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Featured <span className="text-gradient-animated">Projects</span>
              </h2>
            </LineReveal>
          </div>

          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of successful projects that showcase our expertise and creativity
            </p>
          </ScrollReveal>
        </div>

        {/* Filter Tabs */}
        <ScrollReveal animation="fadeUp" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                  activeCategory === category
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background */}
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full"
                  initial={false}
                  animate={{
                    opacity: activeCategory === category ? 1 : 0,
                    scale: activeCategory === category ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-secondary rounded-full"
                  initial={false}
                  animate={{
                    opacity: activeCategory === category ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <LightboxModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
