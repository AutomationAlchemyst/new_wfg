import { ArrowRight, Play, Activity, Layers, Cpu, Zap, Lock, Search, Code, Rocket, ShieldCheck, BarChart3, Globe } from 'lucide-react';
import balangLogo from './assets/balang-kepalang-logo.jpg';
import athImage from './assets/ath-thaariq.jpg';
import hafizImage from './assets/hafiz.jpg';
import meatheadLogo from './assets/meathead-logo.jpg';

export const SITE_CONTENT = {
  hero: {
    badge: "WORK SMARTER, NOT HARDER",
    title: {
      glitch: "Chaos",
      italic: "to",
      main: "Calm."
    },
    description: "WorkFlowGuys specializes in Business Process Automation and Custom AI Solutions. We replace operational friction with intelligent systems, allowing you to scale your business without increasing overhead.",
    cta: "Get Your Free Automation Audit",
    secondaryCta: "Explore Our Solutions"
  },
  trust: {
    label: "TRUSTED BY INNOVATORS AT",
    logos: [
      { name: "TechCorp", logo: "https://cdn.brandfetch.io/id6_8_8_8/theme/dark/logo.svg?c=1bf00143051522c05ad1" },
      { name: "GlobalSystems", logo: "https://cdn.brandfetch.io/id6_8_8_8/theme/dark/logo.svg?c=1bf00143051522c05ad1" },
      { name: "FutureDynamics", logo: "https://cdn.brandfetch.io/id6_8_8_8/theme/dark/logo.svg?c=1bf00143051522c05ad1" },
      { name: "NexusAI", logo: "https://cdn.brandfetch.io/id6_8_8_8/theme/dark/logo.svg?c=1bf00143051522c05ad1" },
      { name: "QuantumSolutions", logo: "https://cdn.brandfetch.io/id6_8_8_8/theme/dark/logo.svg?c=1bf00143051522c05ad1" }
    ]
  },
  stats: {
    label: "HOURS SAVED FOR OUR CLIENTS:",
    initialValue: 1775,
    updateInterval: 3000
  },
  services: {
    title: "The Architecture of Efficiency",
    description: "We build scalable, AI-driven automation systems that work 24/7. Our custom workflows are designed to reduce manual errors and maximize operational velocity.",
    items: [
      {
        id: "core-intelligence",
        title: "Smart Lead Handling",
        subtitle: "Never Miss a Lead",
        description: "Automatically sort and qualify every potential client instantly. No more manual data entry.",
        tags: ["AI Integration", "CRM Sync"],
        icon: Cpu,
        className: "md:col-span-2"
      },
      {
        id: "velocity",
        title: "Instant Speed",
        subtitle: "Zero Delays",
        description: "From signed contract to welcome email in seconds. Give your clients a perfect first impression.",
        icon: Zap,
        className: "md:row-span-2",
        showTimer: true
      },
      {
        id: "custom-dev",
        title: "Custom Solutions",
        subtitle: "Built For You",
        description: "We build custom software to solve your specific business problems, powered by AI.",
        icon: Layers
      },
      {
        id: "security",
        title: "Total Security",
        subtitle: "Safe & Private",
        description: "Your data is yours. We use top-tier security to keep your business information safe.",
        icon: Lock
      }
    ]
  },
  process: {
    title: "How It Works",
    steps: [
      {
        id: "audit",
        title: "We Review Your Business",
        description: "We look at how you work today and find where you are wasting time on repetitive tasks.",
        icon: Search
      },
      {
        id: "architecture",
        title: "We Build Your Plan",
        description: "We design a custom system that fits your business perfectly.",
        icon: Code
      },
      {
        id: "deployment",
        title: "We Turn It On",
        description: "We set everything up quickly so you can start saving time immediately.",
        icon: Rocket
      },
      {
        id: "optimization",
        title: "We Keep Improving",
        description: "We make sure everything keeps running smoothly and helps you grow.",
        icon: BarChart3
      }
    ]
  },
  roi: {
    title: "See How Much You Can Save",
    description: "Find out how many hours and dollars you could save every week by automating your work.",
    metrics: [
      { label: "Team Size", min: 1, max: 100, step: 1, unit: "people" },
      { label: "Hours Wasted / Week", min: 1, max: 40, step: 1, unit: "hours" }
    ]
  },
  testimonials: [
    {
      quote: "WorkFlowGuys made our daily work so much easier. We save time every single day and our business runs smoother than ever.",
      author: "Andy Idris",
      title: "Founder at Balang Kepalang",
      logo: balangLogo
    },
    {
      quote: "They built a system that does the hard work for us, very fast. Now we can help new customers in minutes instead of hours.",
      author: "Nadirah Abdullah",
      title: "Founder at Teeny Tiny Botanicals",
      logo: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/eyWRKQZPxy2Qy0rH0QO8/media/6758360bb1300cb2615ed961.png"
    }
  ],
  caseStudy: {
    badge: "Success Story",
    title: "MeatHead",
    accent: ".ai",
    description: "The ultimate AI-powered companion for Keto & Fitness. MeatHead features a personalized dashboard, AI Recipe Genie, and intelligent workout planning built with Next.js and Firebase.",
    stats: [
      { label: "AI Insights", value: "Real-time" },
      { label: "Tech Stack", value: "Next.js" }
    ],
    cta: "Request a Demo",
    link: "#audit",
    image: meatheadLogo
  },
  faq: {
    title: "Common Questions",
    items: [
      {
        question: "How does AI automation improve my business ROI?",
        answer: "AI automation increases ROI by reducing manual labor costs, eliminating human error, and accelerating response times. Our clients typically see a significant reduction in operational overhead within the first 90 days."
      },
      {
        question: "Is my business data safe with your AI systems?",
        answer: "Yes. We prioritize data security and privacy. All our custom AI solutions use enterprise-grade encryption and comply with global data protection standards. Your data is never used to train public models."
      },
      {
        question: "Will your automation tools work with my existing software?",
        answer: "Absolutely. We specialize in seamless integrations. Our systems connect with popular CRMs, email platforms, and project management tools like Salesforce, HubSpot, Slack, and more via secure APIs."
      },
      {
        question: "Do you provide ongoing support after deployment?",
        answer: "Yes. We offer comprehensive post-deployment support and optimization. We ensure your automated workflows continue to perform at peak efficiency as your business scales."
      }
    ]
  },
  insights: {
    title: "Strategic Insights",
    items: [
      {
        title: "The ROI of AI: Beyond the Hype",
        category: "Strategy",
        date: "Dec 15, 2024",
        link: "#"
      },
      {
        title: "Building Resilient AI Infrastructures",
        category: "Engineering",
        date: "Dec 10, 2024",
        link: "#"
      }
    ]
  },
  philosophy: {
    title: "Meet The Team",
    quote: "Your business should serve your life, not the other way around.",
    cta: "Book Your Free Audit",
    team: [
      {
        role: "The Builder",
        name: "Ath Thaariq",
        description: "Ath Thaariq builds the systems that do the work, so you don't have to.",
        side: "left",
        image: athImage
      },
      {
        role: "The Visionary",
        name: "Hafiz",
        description: "Hafiz ensures the technology actually helps people live better lives.",
        side: "right",
        image: hafizImage
      }
    ]
  }
};
