import { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Megaphone,
  Target,
  Tv,
  Share2,
  PenTool,
  Code,
  Search,
  Printer,
  Users,
  Check,
  ArrowRight,
  Star,
  TrendingUp,
  Award,
  Clock,
  Zap,
  Shield,
  ChevronDown,
  Quote,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const serviceDetails = {
  'ad-campaigns': {
    icon: Megaphone,
    title: 'Ad Campaigns',
    subtitle: 'Strategic advertising that drives results',
    description: 'We create powerful advertising campaigns that capture attention and convert audiences. Our data-driven approach ensures maximum ROI across all digital and traditional platforms.',
    longDescription: 'In today\'s competitive landscape, standing out requires more than just visibility—it demands strategic, targeted advertising that speaks directly to your ideal customers. Our ad campaign services combine creative excellence with data-driven precision to deliver campaigns that not only capture attention but drive measurable business results. From initial strategy to ongoing optimization, we manage every aspect of your advertising to ensure maximum return on your investment.',
    features: [
      { name: 'Google Ads Management', description: 'Search, display, and shopping campaigns optimized for conversions' },
      { name: 'Facebook & Instagram Ads', description: 'Targeted social campaigns with compelling creative' },
      { name: 'Display Advertising', description: 'Programmatic display across premium publisher networks' },
      { name: 'Retargeting Campaigns', description: 'Re-engage visitors who showed interest in your brand' },
      { name: 'Video Ad Production', description: 'Engaging video content for YouTube and social platforms' },
      { name: 'Performance Analytics', description: 'Real-time dashboards and detailed reporting' },
    ],
    benefits: [
      { icon: TrendingUp, title: 'Increased ROI', description: 'Average 340% return on ad spend for our clients' },
      { icon: Target, title: 'Precise Targeting', description: 'Reach your ideal customers with laser-focused precision' },
      { icon: Zap, title: 'Fast Results', description: 'Start seeing results within the first 30 days' },
      { icon: Shield, title: 'Brand Safety', description: 'Your ads appear only in brand-safe environments' },
    ],
    process: [
      { step: 1, title: 'Research & Discovery', description: 'Deep dive into your business, audience, and competitors to identify opportunities' },
      { step: 2, title: 'Strategy Development', description: 'Create comprehensive campaign strategy with targeting, messaging, and budget allocation' },
      { step: 3, title: 'Creative Production', description: 'Design compelling ad creatives, write persuasive copy, and produce video content' },
      { step: 4, title: 'Launch & Optimize', description: 'Deploy campaigns, monitor performance, and continuously optimize for better results' },
    ],
    tools: ['Google Ads', 'Meta Business Suite', 'Google Analytics', 'SEMrush', 'Hotjar', 'Tableau'],
    stats: [
      { value: '340%', label: 'Average ROAS' },
      { value: '50M+', label: 'Ad Impressions' },
      { value: '2.5x', label: 'Conversion Lift' },
      { value: '150+', label: 'Campaigns Managed' },
    ],
    faqs: [
      { question: 'What is the minimum budget for ad campaigns?', answer: 'We work with budgets starting from $1,000/month for small businesses and scale up based on your goals. We recommend a minimum of $2,500/month for optimal results.' },
      { question: 'How long before I see results?', answer: 'Most clients start seeing initial results within 2-4 weeks. However, campaigns typically reach optimal performance after 60-90 days of data collection and optimization.' },
      { question: 'Which platforms do you advertise on?', answer: 'We manage campaigns across Google Ads, Facebook, Instagram, LinkedIn, Twitter, TikTok, YouTube, and programmatic display networks. We recommend platforms based on your target audience.' },
      { question: 'Do you provide creative services?', answer: 'Yes! Our in-house creative team designs all ad creatives, writes copy, and produces video content as part of our full-service offering.' },
    ],
    testimonials: [
      { name: 'Sarah Johnson', role: 'Marketing Director', company: 'TechVentures Inc', content: 'Their ad campaigns transformed our lead generation. We saw a 300% increase in qualified leads within the first quarter.', rating: 5 },
      { name: 'Michael Chen', role: 'CEO', company: 'E-Shop Global', content: 'The ROI we\'ve achieved is incredible. They truly understand e-commerce advertising and deliver results consistently.', rating: 5 },
    ],
    caseStudies: [
      { title: 'E-commerce Ad Campaign', client: 'Fashion Retailer', result: '340% ROAS achieved', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', description: 'Scaled monthly revenue from $50K to $200K through strategic Facebook and Google Shopping campaigns.' },
      { title: 'App Install Campaign', client: 'FinTech Startup', result: '50k+ installs in 30 days', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', description: 'Achieved cost per install of $0.80 through optimized creative testing and audience targeting.' },
    ],
    relatedServices: ['strategic-planning', 'social-media-management', 'content-creation'],
  },
  'strategic-planning': {
    icon: Target,
    title: 'Strategic Planning',
    subtitle: 'Data-driven business strategies',
    description: 'We develop comprehensive business strategies tailored to your goals. Through market analysis and competitor research, we position your brand for sustainable growth.',
    longDescription: 'Success in today\'s dynamic market requires more than intuition—it demands strategic clarity backed by data. Our strategic planning services provide the roadmap your business needs to navigate challenges and capitalize on opportunities. We combine deep market insights with practical business acumen to create strategies that are both ambitious and achievable.',
    features: [
      { name: 'Market Analysis', description: 'Comprehensive research on market size, trends, and opportunities' },
      { name: 'Competitor Research', description: 'In-depth analysis of competitor strategies and positioning' },
      { name: 'SWOT Analysis', description: 'Identify strengths, weaknesses, opportunities, and threats' },
      { name: 'Growth Strategy', description: 'Actionable roadmap for sustainable business growth' },
      { name: 'ROI Planning', description: 'Financial modeling and investment prioritization' },
      { name: 'KPI Development', description: 'Define and track metrics that matter most' },
    ],
    benefits: [
      { icon: TrendingUp, title: 'Clear Direction', description: 'Know exactly where you\'re going and how to get there' },
      { icon: Target, title: 'Resource Optimization', description: 'Focus investments on highest-impact initiatives' },
      { icon: Zap, title: 'Faster Growth', description: 'Accelerate growth with strategic clarity' },
      { icon: Shield, title: 'Risk Mitigation', description: 'Identify and prepare for potential challenges' },
    ],
    process: [
      { step: 1, title: 'Discovery & Assessment', description: 'Understand your business, goals, challenges, and current market position' },
      { step: 2, title: 'Research & Analysis', description: 'Conduct market research, competitor analysis, and internal assessment' },
      { step: 3, title: 'Strategy Development', description: 'Create comprehensive strategic roadmap with clear priorities' },
      { step: 4, title: 'Implementation Support', description: 'Guide execution and provide ongoing strategic consultation' },
    ],
    tools: ['Tableau', 'Power BI', 'Google Analytics', 'SEMrush', 'Brandwatch', 'Statista'],
    stats: [
      { value: '200%', label: 'Avg Revenue Growth' },
      { value: '85%', label: 'Strategy Success Rate' },
      { value: '45%', label: 'Cost Reduction' },
      { value: '100+', label: 'Strategies Delivered' },
    ],
    faqs: [
      { question: 'How long does strategic planning take?', answer: 'A comprehensive strategic plan typically takes 4-8 weeks to develop, depending on the complexity of your business and market.' },
      { question: 'Do you help with implementation?', answer: 'Yes! We offer ongoing strategic consultation and can provide hands-on support for strategy implementation.' },
      { question: 'What industries do you work with?', answer: 'We work across various industries including technology, e-commerce, healthcare, finance, manufacturing, and professional services.' },
      { question: 'How often should strategy be reviewed?', answer: 'We recommend quarterly strategy reviews and annual comprehensive reassessments to ensure alignment with market changes.' },
    ],
    testimonials: [
      { name: 'David Williams', role: 'Founder', company: 'GrowthTech Solutions', content: 'Their strategic insights helped us identify a new market segment that now accounts for 40% of our revenue.', rating: 5 },
      { name: 'Lisa Park', role: 'COO', company: 'InnovateCo', content: 'The clarity and direction we gained from their strategic planning was transformational for our business.', rating: 5 },
    ],
    caseStudies: [
      { title: 'Market Expansion Strategy', client: 'Tech Solutions Ltd', result: '200% revenue growth', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80', description: 'Identified and executed expansion into three new market segments within 18 months.' },
      { title: 'Digital Transformation', client: 'Manufacturing Co', result: '45% cost reduction', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', description: 'Redesigned operations and implemented digital solutions to streamline processes.' },
    ],
    relatedServices: ['ad-campaigns', 'seo-sem-ppc', 'lead-nurturing'],
  },
  'traditional-media-ads': {
    icon: Tv,
    title: 'TV, Radio & Magazine Ads',
    subtitle: 'Traditional media with modern impact',
    description: 'We create compelling traditional media advertisements that reach mass audiences. From TV commercials to radio spots and print ads, we deliver memorable campaigns.',
    longDescription: 'While digital marketing dominates conversations, traditional media remains a powerful force for brand building and mass reach. Our traditional media services combine the proven effectiveness of TV, radio, and print advertising with modern creative approaches and measurement techniques. We help brands create memorable campaigns that resonate across generations and demographics.',
    features: [
      { name: 'TV Commercial Production', description: 'From concept to broadcast-ready commercials' },
      { name: 'Radio Spot Creation', description: 'Engaging audio ads that capture attention' },
      { name: 'Magazine Ad Design', description: 'Stunning print creatives for premium publications' },
      { name: 'Billboard Advertising', description: 'High-impact outdoor advertising campaigns' },
      { name: 'Newspaper Campaigns', description: 'Strategic print placements for local and national reach' },
      { name: 'Media Buying & Planning', description: 'Strategic placement for maximum impact' },
    ],
    benefits: [
      { icon: TrendingUp, title: 'Mass Reach', description: 'Reach millions of viewers across demographics' },
      { icon: Award, title: 'Brand Credibility', description: 'Traditional media builds trust and authority' },
      { icon: Zap, title: 'Emotional Impact', description: 'Create memorable, emotional connections' },
      { icon: Shield, title: 'Proven Results', description: 'Decades of proven advertising effectiveness' },
    ],
    process: [
      { step: 1, title: 'Concept Development', description: 'Creative concept development, scripting, and storyboarding' },
      { step: 2, title: 'Production', description: 'Professional video/audio production with top-tier talent' },
      { step: 3, title: 'Media Planning', description: 'Strategic media buying and scheduling for optimal reach' },
      { step: 4, title: 'Measurement', description: 'Campaign tracking and effectiveness analysis' },
    ],
    tools: ['Adobe Premiere Pro', 'Pro Tools', 'Adobe InDesign', 'Nielsen', 'Comscore', 'Kantar'],
    stats: [
      { value: '35%', label: 'Brand Awareness Lift' },
      { value: '10M+', label: 'Viewers Reached' },
      { value: '500+', label: 'Commercials Produced' },
      { value: '25+', label: 'Industry Awards' },
    ],
    faqs: [
      { question: 'How much does a TV commercial cost?', answer: 'TV commercial production ranges from $10,000 for basic spots to $500,000+ for national campaigns. We create solutions for various budgets.' },
      { question: 'Is traditional media still effective?', answer: 'Absolutely! TV reaches 85% of adults daily, and combined with digital, traditional media delivers 60% higher ROI than digital alone.' },
      { question: 'How do you measure traditional media ROI?', answer: 'We use brand lift studies, media mix modeling, and attribution analysis to measure the impact of traditional media campaigns.' },
      { question: 'Can you handle media buying?', answer: 'Yes, we provide full-service media buying and planning, negotiating the best rates and placements for your campaigns.' },
    ],
    testimonials: [
      { name: 'Robert Martinez', role: 'Brand Director', company: 'Consumer Goods Inc', content: 'Our TV campaign generated more brand awareness in 3 months than we achieved in 2 years of digital-only marketing.', rating: 5 },
      { name: 'Amanda Thompson', role: 'Owner', company: 'Regional Auto Group', content: 'The radio campaign brought in customers from 50 miles away. Traditional media still works!', rating: 5 },
    ],
    caseStudies: [
      { title: 'National TV Campaign', client: 'Consumer Brand', result: '35% brand awareness lift', image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80', description: 'Created award-winning 30-second spot that aired during prime time across major networks.' },
      { title: 'Radio Ad Campaign', client: 'Local Business', result: '150% increase in foot traffic', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80', description: 'Developed catchy jingle and strategic daypart scheduling for maximum local reach.' },
    ],
    relatedServices: ['ad-campaigns', 'content-creation', 'printing-design'],
  },
  'social-media-management': {
    icon: Share2,
    title: 'Social Media Management',
    subtitle: 'Building your social presence',
    description: 'Complete social media solutions to build and grow your brand presence. We manage, create content, and engage your audience across all major platforms.',
    longDescription: 'Social media is where your customers spend their time, share their opinions, and discover new brands. Our comprehensive social media management services ensure your brand not only has a presence but thrives in the social landscape. From content creation to community management, we handle every aspect of your social media to build authentic connections with your audience.',
    features: [
      { name: 'Content Calendar Planning', description: 'Strategic content planning aligned with business goals' },
      { name: 'Community Management', description: '24/7 engagement and response management' },
      { name: 'Influencer Marketing', description: 'Partner with influencers who align with your brand' },
      { name: 'Social Analytics', description: 'Detailed reporting and performance insights' },
      { name: 'Paid Social Campaigns', description: 'Targeted advertising across social platforms' },
      { name: 'Crisis Management', description: 'Rapid response protocols for reputation protection' },
    ],
    benefits: [
      { icon: TrendingUp, title: 'Audience Growth', description: 'Build engaged follower communities' },
      { icon: MessageCircle, title: 'Brand Engagement', description: 'Create meaningful conversations with customers' },
      { icon: Zap, title: 'Real-time Marketing', description: 'Capitalize on trends and moments' },
      { icon: Shield, title: 'Reputation Management', description: 'Monitor and protect your brand online' },
    ],
    process: [
      { step: 1, title: 'Audit & Strategy', description: 'Analyze current presence and develop platform-specific strategies' },
      { step: 2, title: 'Content Creation', description: 'Create engaging content tailored to each platform' },
      { step: 3, title: 'Publishing & Engagement', description: 'Consistent posting and active community management' },
      { step: 4, title: 'Analysis & Optimization', description: 'Track performance and continuously improve' },
    ],
    tools: ['Hootsuite', 'Sprout Social', 'Canva', 'Later', 'Brandwatch', 'Creator Studio'],
    stats: [
      { value: '500%', label: 'Avg Follower Growth' },
      { value: '10M+', label: 'Engagements Generated' },
      { value: '85%', label: 'Client Retention' },
      { value: '50+', label: 'Brands Managed' },
    ],
    faqs: [
      { question: 'Which social platforms should I be on?', answer: 'It depends on your audience. We analyze your target demographics and recommend platforms where they are most active and engaged.' },
      { question: 'How often should I post?', answer: 'Frequency varies by platform. We typically recommend 1-2 posts daily on Twitter, 1 post daily on Instagram, and 3-5 posts weekly on LinkedIn.' },
      { question: 'Do you respond to comments and messages?', answer: 'Yes! Our community management includes responding to comments, messages, and mentions within agreed SLAs.' },
      { question: 'Can you work with our existing content?', answer: 'Absolutely! We can repurpose and optimize existing content while also creating new material as needed.' },
    ],
    testimonials: [
      { name: 'Jennifer Lee', role: 'Marketing Manager', company: 'Lifestyle Brands Co', content: 'They turned our dormant Instagram into a thriving community of 100K engaged followers in just 8 months.', rating: 5 },
      { name: 'Chris Anderson', role: 'Founder', company: 'SaaS Startup', content: 'Our LinkedIn presence went from zero to generating 30% of our leads. Incredible transformation!', rating: 5 },
    ],
    caseStudies: [
      { title: 'Instagram Growth Campaign', client: 'Lifestyle Brand', result: '500% follower growth', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80', description: 'Built engaged community from 10K to 60K followers with user-generated content strategy.' },
      { title: 'B2B LinkedIn Strategy', client: 'SaaS Company', result: '300% increase in leads', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', description: 'Positioned founders as thought leaders, generating qualified B2B leads consistently.' },
    ],
    relatedServices: ['content-creation', 'ad-campaigns', 'lead-nurturing'],
  },
  'content-creation': {
    icon: PenTool,
    title: 'Content Creation',
    subtitle: 'Stories that connect and convert',
    description: 'Engaging content that tells your brand story. From copywriting to video production, we create content that resonates with your audience and drives action.',
    longDescription: 'Content is the currency of the digital age. It\'s how brands tell their stories, educate their audiences, and build lasting relationships. Our content creation services span the full spectrum of media—from compelling copy to stunning visuals to engaging video. Every piece we create is strategically designed to serve your business goals while providing genuine value to your audience.',
    features: [
      { name: 'Copywriting', description: 'Persuasive copy for websites, ads, and marketing materials' },
      { name: 'Video Production', description: 'Professional video content from concept to final cut' },
      { name: 'Photography', description: 'Brand photography, product shots, and lifestyle images' },
      { name: 'Graphic Design', description: 'Visual content for digital and print applications' },
      { name: 'Blog Writing', description: 'SEO-optimized articles that drive organic traffic' },
      { name: 'Email Content', description: 'Engaging email campaigns that convert' },
    ],
    benefits: [
      { icon: TrendingUp, title: 'Increased Engagement', description: 'Content that captures attention and drives action' },
      { icon: Award, title: 'Brand Authority', description: 'Position your brand as an industry leader' },
      { icon: Zap, title: 'SEO Benefits', description: 'Quality content improves search rankings' },
      { icon: Shield, title: 'Consistent Voice', description: 'Unified brand messaging across channels' },
    ],
    process: [
      { step: 1, title: 'Strategy & Brief', description: 'Define content goals, audience, and key messages' },
      { step: 2, title: 'Creation', description: 'Develop content with your brand voice and objectives in mind' },
      { step: 3, title: 'Review & Refine', description: 'Collaborative feedback and quality assurance' },
      { step: 4, title: 'Delivery & Distribution', description: 'Final delivery with distribution recommendations' },
    ],
    tools: ['Adobe Creative Suite', 'Final Cut Pro', 'Figma', 'Grammarly', 'Hemingway', 'Lumen5'],
    stats: [
      { value: '2M+', label: 'Content Views' },
      { value: '180%', label: 'Traffic Increase' },
      { value: '1000+', label: 'Pieces Created' },
      { value: '95%', label: 'Client Satisfaction' },
    ],
    faqs: [
      { question: 'What types of content do you create?', answer: 'We create all types of content including blog posts, social media content, videos, infographics, whitepapers, case studies, email campaigns, and more.' },
      { question: 'How do you ensure brand consistency?', answer: 'We develop comprehensive brand guidelines and content style guides at the start of engagement to ensure consistency across all content.' },
      { question: 'What\'s your turnaround time?', answer: 'Turnaround varies by content type. Blog posts take 3-5 days, videos 2-4 weeks, and social content can be turned around in 24-48 hours.' },
      { question: 'Do you handle content strategy?', answer: 'Yes! We develop comprehensive content strategies including editorial calendars, topic research, and distribution plans.' },
    ],
    testimonials: [
      { name: 'Mark Stevens', role: 'VP Marketing', company: 'Tech Innovations', content: 'Their video content has become our most effective marketing asset. Views and conversions exceeded all expectations.', rating: 5 },
      { name: 'Sarah Mitchell', role: 'Content Lead', company: 'E-commerce Brand', content: 'The blog content they created increased our organic traffic by 180% in just 6 months. Incredible ROI!', rating: 5 },
    ],
    caseStudies: [
      { title: 'Brand Video Series', client: 'Tech Startup', result: '2M+ views achieved', image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80', description: 'Created 12-part video series that went viral and established brand as industry thought leader.' },
      { title: 'Content Marketing Campaign', client: 'E-commerce Brand', result: '180% organic traffic increase', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', description: 'Developed comprehensive blog strategy with 50+ SEO-optimized articles.' },
    ],
    relatedServices: ['social-media-management', 'seo-sem-ppc', 'printing-design'],
  },
  'web-development': {
    icon: Code,
    title: 'Web Development',
    subtitle: 'Custom digital experiences',
    description: 'We build custom websites and web applications using cutting-edge technology. Fast, responsive, and user-friendly digital experiences that drive results.',
    longDescription: 'Your website is often the first impression potential customers have of your business. We build digital experiences that don\'t just look great—they perform. Our development team combines technical excellence with user-centered design to create websites and applications that engage visitors, drive conversions, and scale with your business.',
    features: [
      { name: 'Custom Website Development', description: 'Bespoke websites tailored to your specific needs' },
      { name: 'E-commerce Solutions', description: 'Full-featured online stores with seamless checkout' },
      { name: 'Web Applications', description: 'Complex web apps with advanced functionality' },
      { name: 'CMS Development', description: 'Easy-to-manage content management systems' },
      { name: 'API Integration', description: 'Connect with third-party services and platforms' },
      { name: 'Performance Optimization', description: 'Lightning-fast loading and optimal user experience' },
    ],
    benefits: [
      { icon: Zap, title: 'Lightning Fast', description: 'Optimized for speed and performance' },
      { icon: Shield, title: 'Secure & Reliable', description: 'Built with security best practices' },
      { icon: TrendingUp, title: 'Conversion Focused', description: 'Designed to turn visitors into customers' },
      { icon: Clock, title: 'Future-Proof', description: 'Scalable architecture that grows with you' },
    ],
    process: [
      { step: 1, title: 'Discovery & Planning', description: 'Requirements gathering, technical architecture, and project roadmap' },
      { step: 2, title: 'Design', description: 'UI/UX design, wireframing, and interactive prototypes' },
      { step: 3, title: 'Development', description: 'Agile development with regular demos and feedback' },
      { step: 4, title: 'Launch & Support', description: 'Deployment, training, and ongoing maintenance' },
    ],
    tools: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    stats: [
      { value: '250%', label: 'Sales Increase' },
      { value: '99.9%', label: 'Uptime' },
      { value: '200+', label: 'Sites Launched' },
      { value: '<2s', label: 'Load Time' },
    ],
    faqs: [
      { question: 'What technologies do you use?', answer: 'We specialize in React, Next.js, Node.js, and modern web technologies. We select the best stack based on your specific requirements.' },
      { question: 'How long does website development take?', answer: 'Simple websites take 4-6 weeks, while complex web applications can take 3-6 months. We provide detailed timelines during discovery.' },
      { question: 'Do you provide hosting and maintenance?', answer: 'Yes! We offer managed hosting, security updates, performance monitoring, and ongoing maintenance packages.' },
      { question: 'Can you redesign my existing website?', answer: 'Absolutely! We can modernize your existing site while preserving SEO equity and improving performance.' },
    ],
    testimonials: [
      { name: 'Tom Richardson', role: 'CTO', company: 'FinTech Solutions', content: 'The web application they built handles millions of transactions flawlessly. Their technical expertise is exceptional.', rating: 5 },
      { name: 'Emily Watson', role: 'E-commerce Director', company: 'Retail Brand', content: 'Our new e-commerce site increased online sales by 250%. The investment paid for itself in 3 months.', rating: 5 },
    ],
    caseStudies: [
      { title: 'E-commerce Platform', client: 'Retail Brand', result: '250% increase in online sales', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', description: 'Built high-performance e-commerce platform with advanced inventory and order management.' },
      { title: 'SaaS Dashboard', client: 'FinTech Company', result: '10x user engagement', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', description: 'Developed intuitive analytics dashboard that transformed user experience and retention.' },
    ],
    relatedServices: ['seo-sem-ppc', 'content-creation', 'strategic-planning'],
  },
  'seo-sem-ppc': {
    icon: Search,
    title: 'SEO, SEM & PPC',
    subtitle: 'Dominate search results',
    description: 'Data-driven search marketing strategies to increase your visibility. We optimize your presence to rank higher and drive qualified traffic to your business.',
    longDescription: 'When potential customers search for products or services like yours, being found is everything. Our search marketing services combine the long-term power of SEO with the immediate impact of paid search to ensure your business appears when and where it matters most. We use data and proven methodologies to drive qualified traffic that converts into customers.',
    features: [
      { name: 'On-Page SEO', description: 'Optimize content, meta tags, and site structure' },
      { name: 'Technical SEO', description: 'Site speed, mobile optimization, and crawlability' },
      { name: 'Link Building', description: 'Build authoritative backlinks to boost rankings' },
      { name: 'Google Ads Management', description: 'Strategic PPC campaigns for immediate visibility' },
      { name: 'Keyword Research', description: 'Identify high-value keywords for your business' },
      { name: 'Local SEO', description: 'Dominate local search results and Google Maps' },
    ],
    benefits: [
      { icon: TrendingUp, title: 'Higher Rankings', description: 'Achieve first-page rankings for target keywords' },
      { icon: Target, title: 'Qualified Traffic', description: 'Attract visitors actively searching for your services' },
      { icon: Zap, title: 'Measurable Results', description: 'Clear ROI tracking and reporting' },
      { icon: Clock, title: 'Long-term Value', description: 'SEO provides compounding returns over time' },
    ],
    process: [
      { step: 1, title: 'Audit & Analysis', description: 'Comprehensive technical and content SEO audit' },
      { step: 2, title: 'Strategy Development', description: 'Keyword targeting, content strategy, and campaign planning' },
      { step: 3, title: 'Implementation', description: 'On-page optimization, content creation, and campaign setup' },
      { step: 4, title: 'Monitor & Optimize', description: 'Continuous tracking, reporting, and improvement' },
    ],
    tools: ['SEMrush', 'Ahrefs', 'Google Search Console', 'Screaming Frog', 'Moz', 'Google Ads'],
    stats: [
      { value: '#1', label: 'Rankings Achieved' },
      { value: '400%', label: 'Traffic Increase' },
      { value: '150+', label: 'Keywords Ranked' },
      { value: '50+', label: 'Clients Served' },
    ],
    faqs: [
      { question: 'How long does SEO take to show results?', answer: 'SEO is a long-term strategy. Initial improvements appear in 3-6 months, with significant results typically achieved within 6-12 months.' },
      { question: 'What\'s the difference between SEO and PPC?', answer: 'SEO improves organic rankings over time, while PPC provides immediate visibility through paid ads. We recommend a combined approach for best results.' },
      { question: 'Do you guarantee rankings?', answer: 'No ethical SEO company can guarantee specific rankings. We guarantee our methodology, effort, and consistent improvement in your search visibility.' },
      { question: 'How do you measure success?', answer: 'We track rankings, organic traffic, conversions, and ROI. You receive monthly reports with clear metrics and insights.' },
    ],
    testimonials: [
      { name: 'James Mitchell', role: 'Partner', company: 'Law Firm LLC', content: 'We now rank #1 for over 50 high-value keywords. The leads we get from organic search are our best converting.', rating: 5 },
      { name: 'Patricia Lopez', role: 'Marketing Director', company: 'Healthcare Provider', content: 'Our PPC campaigns deliver consistent patient inquiries at a cost per acquisition that works for our business.', rating: 5 },
    ],
    caseStudies: [
      { title: 'SEO Transformation', client: 'Legal Firm', result: '#1 ranking for 50+ keywords', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80', description: 'Comprehensive SEO strategy that positioned firm as top search result in competitive legal market.' },
      { title: 'PPC Campaign', client: 'Healthcare Provider', result: '400% increase in conversions', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80', description: 'Optimized Google Ads campaigns achieving $15 cost per patient inquiry.' },
    ],
    relatedServices: ['ad-campaigns', 'content-creation', 'web-development'],
  },
  'printing-design': {
    icon: Printer,
    title: 'Printing & Design Solutions',
    subtitle: 'Professional print materials',
    description: 'Professional printing and design services for all your marketing materials. From business cards to banners, we deliver high-quality print solutions.',
    longDescription: 'In a digital world, physical marketing materials stand out. Our printing and design services deliver premium quality print materials that make lasting impressions. From elegant business cards to eye-catching banners, we handle design, production, and delivery with meticulous attention to quality and detail.',
    features: [
      { name: 'Business Cards', description: 'Premium cards that make memorable first impressions' },
      { name: 'Brochures & Flyers', description: 'Informative materials for marketing and sales' },
      { name: 'Banners & Signage', description: 'Large format printing for events and displays' },
      { name: 'Packaging Design', description: 'Product packaging that sells on the shelf' },
      { name: 'Corporate Stationery', description: 'Letterheads, envelopes, and branded materials' },
      { name: 'Marketing Collateral', description: 'Catalogs, presentations, and sales materials' },
    ],
    benefits: [
      { icon: Award, title: 'Premium Quality', description: 'High-quality materials and printing techniques' },
      { icon: Zap, title: 'Fast Turnaround', description: 'Quick production without sacrificing quality' },
      { icon: Target, title: 'Brand Consistency', description: 'Perfect color matching across all materials' },
      { icon: Shield, title: 'Full Service', description: 'Design, print, and delivery all in one' },
    ],
    process: [
      { step: 1, title: 'Consultation', description: 'Understand requirements, quantity, and specifications' },
      { step: 2, title: 'Design', description: 'Create designs aligned with your brand guidelines' },
      { step: 3, title: 'Proof & Approval', description: 'Review proofs and make final adjustments' },
      { step: 4, title: 'Print & Deliver', description: 'High-quality production and timely delivery' },
    ],
    tools: ['Adobe InDesign', 'Adobe Illustrator', 'Photoshop', 'Pantone Matching', 'HP Indigo', 'Offset Press'],
    stats: [
      { value: '1M+', label: 'Items Printed' },
      { value: '48hr', label: 'Rush Available' },
      { value: '99%', label: 'Quality Rate' },
      { value: '500+', label: 'Clients Served' },
    ],
    faqs: [
      { question: 'What\'s your minimum order quantity?', answer: 'Minimum orders vary by product. Business cards start at 100, while large format items have no minimum. Contact us for specific requirements.' },
      { question: 'Can you match our brand colors exactly?', answer: 'Yes! We use Pantone color matching to ensure precise color reproduction across all print materials.' },
      { question: 'Do you offer eco-friendly options?', answer: 'Absolutely! We offer recycled papers, soy-based inks, and sustainable printing options for environmentally conscious clients.' },
      { question: 'What\'s the turnaround time?', answer: 'Standard turnaround is 5-7 business days. Rush options available for 24-48 hour delivery on most products.' },
    ],
    testimonials: [
      { name: 'Karen White', role: 'Office Manager', company: 'Law Firm Partners', content: 'The quality of our business cards and stationery exceeds expectations. Clients always comment on how professional they look.', rating: 5 },
      { name: 'Steven Brown', role: 'Marketing Manager', company: 'Food & Beverage Co', content: 'Our new packaging design increased sales by 60%. The shelf appeal is incredible!', rating: 5 },
    ],
    caseStudies: [
      { title: 'Corporate Branding Package', client: 'Law Firm', result: 'Complete brand identity suite', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80', description: 'Designed and produced comprehensive stationery set including business cards, letterheads, and presentation folders.' },
      { title: 'Product Packaging Design', client: 'Food & Beverage Co', result: '60% increase in shelf appeal', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80', description: 'Complete packaging redesign that transformed brand presence in retail environments.' },
    ],
    relatedServices: ['content-creation', 'traditional-media-ads', 'strategic-planning'],
  },
  'lead-nurturing': {
    icon: Users,
    title: 'Lead Nurturing',
    subtitle: 'Convert prospects to customers',
    description: 'Convert prospects into loyal customers with strategic lead nurturing. We build automated workflows that guide leads through your sales funnel effectively.',
    longDescription: 'Not every lead is ready to buy immediately—but with the right nurturing, they will be. Our lead nurturing services create automated, personalized journeys that keep your brand top of mind, build trust over time, and guide prospects toward purchase decisions. We combine marketing automation expertise with compelling content to turn cold leads into loyal customers.',
    features: [
      { name: 'Email Marketing', description: 'Personalized email campaigns that convert' },
      { name: 'Marketing Automation', description: 'Sophisticated automation workflows' },
      { name: 'CRM Integration', description: 'Seamless connection with your sales systems' },
      { name: 'Lead Scoring', description: 'Identify and prioritize your hottest leads' },
      { name: 'Drip Campaigns', description: 'Automated sequences for different buyer stages' },
      { name: 'Sales Funnel Optimization', description: 'Maximize conversion at every stage' },
    ],
    benefits: [
      { icon: TrendingUp, title: 'Higher Conversions', description: 'Nurtured leads convert at 47% higher rates' },
      { icon: Clock, title: 'Shorter Sales Cycles', description: 'Move leads through funnel faster' },
      { icon: Zap, title: 'Automation Efficiency', description: 'Scale personalization without adding staff' },
      { icon: Target, title: 'Better Lead Quality', description: 'Sales team focuses on ready-to-buy leads' },
    ],
    process: [
      { step: 1, title: 'Journey Mapping', description: 'Map customer journey and identify nurture opportunities' },
      { step: 2, title: 'Segmentation', description: 'Create segments based on behavior and characteristics' },
      { step: 3, title: 'Automation Setup', description: 'Build workflows, create content, and configure triggers' },
      { step: 4, title: 'Optimize & Scale', description: 'Test, measure, and improve nurture programs' },
    ],
    tools: ['HubSpot', 'Marketo', 'Salesforce', 'Mailchimp', 'ActiveCampaign', 'Zapier'],
    stats: [
      { value: '85%', label: 'SQL Increase' },
      { value: '47%', label: 'Higher Conversions' },
      { value: '33%', label: 'Lower CAC' },
      { value: '40%', label: 'Revenue Lift' },
    ],
    faqs: [
      { question: 'What CRM systems do you work with?', answer: 'We work with all major CRMs including Salesforce, HubSpot, Pipedrive, Zoho, and custom solutions. We can also help you select and implement a CRM.' },
      { question: 'How long until we see results?', answer: 'Initial nurture campaigns launch within 2-4 weeks. Significant impact on conversions typically shows within 60-90 days.' },
      { question: 'Do you write the email content?', answer: 'Yes! Our content team creates all nurture content including emails, landing pages, and downloadable resources.' },
      { question: 'How do you measure success?', answer: 'We track email engagement, lead progression, conversion rates, and ultimately revenue attributed to nurture campaigns.' },
    ],
    testimonials: [
      { name: 'Daniel Kim', role: 'Sales Director', company: 'Software Company', content: 'Our sales team now receives 3x more qualified leads. The automation has transformed how we manage our pipeline.', rating: 5 },
      { name: 'Rachel Green', role: 'E-commerce Manager', company: 'Online Retailer', content: 'The email automation has increased our repeat purchase rate by 40%. It\'s like having an extra salesperson working 24/7.', rating: 5 },
    ],
    caseStudies: [
      { title: 'B2B Lead Nurture Program', client: 'Software Company', result: '85% increase in SQLs', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', description: 'Implemented multi-touch nurture program that transformed marketing-qualified leads into sales opportunities.' },
      { title: 'E-commerce Email Automation', client: 'Online Retailer', result: '40% boost in repeat purchases', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80', description: 'Created post-purchase and win-back automation sequences driving significant revenue lift.' },
    ],
    relatedServices: ['ad-campaigns', 'content-creation', 'social-media-management'],
  },
};

// Get all services for related services display
const allServices = Object.entries(serviceDetails).map(([slug, service]) => ({
  slug,
  title: service.title,
  icon: service.icon,
}));

// FAQ Accordion Component
const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => (
  <motion.div className="border-b border-border last:border-0">
    <button
      onClick={onClick}
      className="w-full py-5 flex items-center justify-between text-left hover:text-primary transition-colors"
    >
      <span className="font-semibold text-lg pr-8">{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-5 h-5 flex-shrink-0" />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-muted-foreground leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const service = slug ? serviceDetails[slug as keyof typeof serviceDetails] : null;


  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
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
  const relatedServiceData = service.relatedServices.map(s => allServices.find(as => as.slug === s)).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6 relative z-10">
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl mb-8">
                <Icon className="w-10 h-10 text-primary" />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {service.title}
              </h1>

              <p className="text-xl text-primary font-medium mb-6">
                {service.subtitle}
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {service.longDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+917020498625"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-semibold hover:bg-secondary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Us</span>
                </a>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {service.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our <span className="text-primary">{service.title}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver results that matter for your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 text-center hover:border-primary/50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={containerRef} className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What's <span className="text-primary">Included</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive services designed to deliver results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-primary">Process</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven methodology for delivering exceptional results
            </p>
          </motion.div>

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
                  <div className="text-6xl font-bold text-primary/20 mb-4">
                    {String(step.step).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tools & <span className="text-primary">Technologies</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We use industry-leading tools to deliver the best results
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {service.tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-6 py-3 bg-secondary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Case <span className="text-primary">Studies</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real results we've achieved for our clients
            </p>
          </motion.div>

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
                  <p className="text-muted-foreground text-sm mb-4">{study.description}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    {study.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Client <span className="text-primary">Testimonials</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What our clients say about our {service.title.toLowerCase()} services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {service.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 relative"
              >
                <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about our {service.title.toLowerCase()} services
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass-card p-8"
          >
            {service.faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Related <span className="text-primary">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore other services that complement {service.title.toLowerCase()}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedServiceData.map((related, index) => {
              if (!related) return null;
              const RelatedIcon = related.icon;
              return (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/services/${related.slug}`}
                    className="glass-card p-6 flex items-center gap-4 hover:border-primary/50 transition-colors block"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <RelatedIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">{related.title}</h3>
                      <span className="text-sm text-primary">Learn more →</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our {service.title.toLowerCase()} services can help you achieve your goals.
              Get in touch for a free consultation.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="mailto:contact@webornet.com"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-full font-semibold hover:bg-secondary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Email Us</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
              <a href="tel:+917020498625" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                <span>+91-7020498625</span>
              </a>
              <a href="mailto:contact@webornet.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span>contact@webornet.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
