"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Play,
  Search,
  BarChart3,
  Globe,
  Linkedin,
  MessageSquare,
  Rocket,
  Users,
  Building2,
  Sparkles,
  ChevronRight,
  Quote,
  Menu,
  X,
  Bot,
  Workflow,
  Instagram,
  Twitter,
  ExternalLink,
} from "lucide-react";

// Brand colors
const brand = {
  ivory: "#f2ede0",
  deepBlue: "#0b1c2d",
  gold: "#c9a24d",
  ivoryLight: "#f8f6f0",
  ivoryDark: "#e8e2d4",
  deepBlueLight: "#1a3a52",
  goldLight: "#d4b56e",
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

// Navigation Component - &Fold style with pill-shaped background
function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "ABOUT" },
    { href: "#services", label: "OFFERINGS" },
    { href: "#approach", label: "JOURNAL" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-full px-4 md:px-8 py-3 shadow-lg flex items-center gap-4 md:gap-8">
        <Link href="/" className="relative z-10">
          <Image
            src="/Feel your presence.png"
            alt="Feel Your Presence"
            width={140}
            height={40}
            className="h-8 md:h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-widest text-deep-blue/70 hover:text-deep-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#contact"
          className="hidden md:flex items-center justify-center bg-[#9a8174] text-white text-xs font-medium tracking-wider px-5 py-2.5 rounded-full hover:bg-[#8a7164] transition-colors"
        >
          GET STARTED
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-10 p-1"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-widest text-deep-blue/70 hover:text-deep-blue transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center bg-[#9a8174] text-white text-xs font-medium tracking-wider px-5 py-2.5 rounded-full"
              >
                GET STARTED
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// Floating Badge Component
function FloatingBadge({
  children,
  variant = "gold",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "gold" | "muted" | "outline";
  delay?: number;
  className?: string;
}) {
  const variants: Record<string, { bg: string; text: string }> = {
    gold: { bg: "#e8c872", text: brand.deepBlue },
    muted: { bg: "#9a8174", text: "#fff" },
    outline: { bg: brand.ivoryLight, text: brand.deepBlue },
  };
  const style = variants[variant];

  return (
    <motion.span
      initial={{ opacity: 0, y: 15, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute px-4 py-2 rounded-full text-[10px] md:text-xs font-semibold tracking-widest uppercase whitespace-nowrap shadow-sm ${className}`}
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      <motion.span
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="block"
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

// Hero Section with GSAP ScrollTrigger
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const headline = headlineRef.current;
    const pill = pillRef.current;
    const overlay = overlayRef.current;
    const overlayText = overlayTextRef.current;

    if (!section || !headline || !pill || !overlay || !overlayText) return;

    // Create main timeline with pin
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%",
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Phase 1 (0 - 0.25): Pill scrolls up to top 1.1%, headline scrolls up
    tl.to(pill, {
      top: "1.1%",
      ease: "power2.out",
      duration: 0.25,
    }, 0);

    tl.to(headline, {
      y: "-100vh",
      ease: "none",
      duration: 0.25,
    }, 0);

    // Phase 2 (0.25 - 0.5): Pill expands with 1.1% margins on all sides
    tl.to(pill, {
      top: "1.1%",
      left: "1.1%",
      right: "1.1%",
      height: "97.8vh",
      borderRadius: 24,
      ease: "power2.inOut",
      duration: 0.25,
    }, 0.25);

    // Phase 3 (0.5 - 0.65): Overlay fades in, text appears
    tl.to(overlay, {
      opacity: 1,
      duration: 0.1,
    }, 0.5);

    tl.fromTo(overlayText, {
      opacity: 0,
      y: 80,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.15,
    }, 0.55);

    // Phase 4 (0.8 - 1): Text scrolls up and fades out
    tl.to(overlayText, {
      y: -100,
      opacity: 0,
      duration: 0.2,
    }, 0.8);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ivory h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-ivory" />

      {/* Initial Headline with Floating Badges */}
      <div
        ref={headlineRef}
        className="absolute inset-x-0 top-0 z-10 pt-28 md:pt-32"
      >
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center relative py-6">
            {/* Floating Badges */}
            <FloatingBadge
              variant="gold"
              delay={0.4}
              className="-top-2 left-1/2 -translate-x-1/2 md:left-[42%]"
            >
              Strategy
            </FloatingBadge>

            <FloatingBadge
              variant="muted"
              delay={0.6}
              className="top-[50%] -right-8 md:-right-[5%]"
            >
              GCC Expansion
            </FloatingBadge>

            <FloatingBadge
              variant="outline"
              delay={0.8}
              className="bottom-0 left-[10%] md:left-[20%]"
            >
              Automation
            </FloatingBadge>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-normal leading-[1.1] tracking-tight"
              style={{ color: brand.deepBlue, fontFamily: "var(--font-display)" }}
            >
              <span className="block">Visibility that converts,</span>
              <span className="block">growth that lasts<span style={{ color: brand.gold }}>.</span></span>
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Expanding Pill Container */}
      <div
        ref={pillRef}
        className="absolute overflow-hidden"
        style={{
          height: "50vh",
          top: "45vh",
          left: "9%",
          right: "9%",
          borderRadius: 200,
        }}
      >
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110"
          >
            <source
              src="https://framerusercontent.com/assets/gdWI7cVwY4SoFk1YRU2JfZLC8.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Dark overlay for text */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/30"
          style={{ opacity: 0 }}
        />

        {/* Overlay Text Content */}
        <div
          ref={overlayTextRef}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ opacity: 0 }}
        >
          <span
            className="inline-block px-5 py-2.5 rounded-lg text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-6 md:mb-8 text-white"
            style={{ backgroundColor: "rgba(154, 129, 116, 0.95)" }}
          >
            Why I Stay
          </span>

          <h2
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-center leading-[1.1] tracking-tight text-white px-6"
          >
            <span className="block" style={{ fontFamily: "var(--font-display)" }}>
              Because presence
            </span>
            <span className="block mt-1 md:mt-2" style={{ fontFamily: "var(--font-display)" }}>
              changes everything<span style={{ color: brand.gold }}>.</span>
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}

// Who We Work With Section
function WhoWeWorkWithSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const audiences = [
    {
      icon: Users,
      title: "Founders & Personal Brands",
      description: "Building thought leadership and personal presence",
    },
    {
      icon: Rocket,
      title: "Startups & Growing Businesses",
      description: "Scaling with structure and sustainable systems",
    },
    {
      icon: Building2,
      title: "D2C & Service Brands",
      description: "Creating visibility that drives conversions",
    },
    {
      icon: Globe,
      title: "Teams Expanding Globally",
      description: "Entering GCC & international markets with clarity",
    },
  ];

  return (
    <section ref={ref} className="section-padding bg-ivory-light relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-[0.03]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="section-header"
        >
          <motion.span variants={fadeInUp} className="section-label">
            Who We Work With
          </motion.span>
          <motion.h2 variants={fadeInUp} className="section-title">
            Built for people who are meant to be seen
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-description">
            If you serve with intent, we help you scale with clarity.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {audiences.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="card hover-lift text-center p-8"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${brand.gold}15` }}
              >
                <item.icon size={28} style={{ color: brand.gold }} />
              </div>
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-sm opacity-70">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// What Makes Us Different Section
function DifferentiatorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const differentiators = [
    {
      title: "Presence-first strategy",
      description: "We build trust before traffic. Your presence becomes an asset, not a cost.",
    },
    {
      title: "Structured, scalable frameworks",
      description: "Systems teams can actually follow. Growth that compounds over time.",
    },
    {
      title: "Opportunity-driven execution",
      description: "We don't just execute—we uncover opportunities and simplify growth.",
    },
    {
      title: "Long-term thinking",
      description: "No short-term hacks. We build foundations that last beyond campaigns.",
    },
  ];

  return (
    <section ref={ref} className="section-padding bg-deep-blue relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: brand.gold }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5 blur-3xl"
        style={{ backgroundColor: brand.ivory }} />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: brand.gold }}
            >
              What Makes Us Different
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mb-6"
              style={{ color: brand.ivory }}
            >
              We don't chase traffic.
              <br />
              <span style={{ color: brand.gold }}>We build presence.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg mb-8"
              style={{ color: brand.ivory, opacity: 0.8 }}
            >
              Most growth focuses on spending more. We focus on building systems that work smarter.
              Your presence becomes an asset—not a cost.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 text-lg font-medium group"
                style={{ color: brand.gold }}
              >
                Explore our approach
                <ChevronRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Cards */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-4"
          >
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="p-6 rounded-2xl transition-all duration-300 hover:translate-x-2"
                style={{ backgroundColor: `${brand.ivory}08`, borderLeft: `3px solid ${brand.gold}` }}
              >
                <h4 className="text-lg font-semibold mb-2" style={{ color: brand.ivory }}>
                  {item.title}
                </h4>
                <p className="text-sm" style={{ color: brand.ivory, opacity: 0.7 }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Automation Section
function AutomationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const automations = [
    {
      icon: MessageSquare,
      title: "WhatsApp Automation",
      description: "Lead nurturing, sales flows & retention systems",
    },
    {
      icon: Instagram,
      title: "Instagram & LinkedIn DMs",
      description: "Outreach and engagement on autopilot",
    },
    {
      icon: Workflow,
      title: "CRM & Funnel Automation",
      description: "Seamless lead capture to conversion flows",
    },
    {
      icon: Bot,
      title: "AI Agents",
      description: "Support, lead qualification & business development",
    },
  ];

  const benefits = [
    "Lower acquisition costs",
    "Faster response & conversions",
    "Scalable growth without increasing ad spend",
  ];

  return (
    <section ref={ref} className="section-padding bg-ivory relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />

      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="section-header"
        >
          <motion.span variants={fadeInUp} className="section-label">
            Smart Growth
          </motion.span>
          <motion.h2 variants={fadeInUp} className="section-title">
            Growth that doesn't depend only on ads
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-description">
            We design personalized automations and AI agents tailored to your business needs—so
            your brand works even when you don't.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {automations.map((item) => (
            <motion.div
              key={item.title}
              variants={scaleIn}
              className="card-elevated hover-lift group"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors group-hover:bg-gold/20"
                style={{ backgroundColor: `${brand.deepBlue}08` }}
              >
                <item.icon size={26} style={{ color: brand.deepBlue }} />
              </div>
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm opacity-70">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Results Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="p-8 rounded-3xl text-center"
          style={{ backgroundColor: brand.deepBlue }}
        >
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: brand.gold }}>
            Result
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2" style={{ color: brand.ivory }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: brand.gold }} />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Service Card Visual Component
function ServiceVisual({ type }: { type: string }) {
  if (type === "seo") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-ivory to-ivory-light rounded-3xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
            <Search size={16} className="text-gold" />
          </div>
          <span className="text-sm font-medium text-deep-blue/60">Search Console</span>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-deep-blue/50">Impressions</span>
            <span className="text-sm font-semibold text-deep-blue">+147%</span>
          </div>
          <div className="h-2 bg-deep-blue/10 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-gold to-gold-light rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-deep-blue/50">Click Rate</span>
            <span className="text-sm font-semibold text-deep-blue">+89%</span>
          </div>
          <div className="h-2 bg-deep-blue/10 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-gold to-gold-light rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-deep-blue/50">Rankings</span>
            <span className="text-sm font-semibold text-gold">Top 10</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "marketing") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-ivory to-ivory-light rounded-3xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
            <BarChart3 size={16} className="text-gold" />
          </div>
          <span className="text-sm font-medium text-deep-blue/60">Campaign Dashboard</span>
        </div>
        <div className="flex-1 flex items-end gap-2 pb-4">
          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
            <div key={i} className="flex-1 bg-deep-blue/10 rounded-t-lg relative" style={{ height: `${height}%` }}>
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gold to-gold-light rounded-t-lg transition-all duration-500"
                style={{ height: `${height * 0.7}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-deep-blue/50">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    );
  }

  if (type === "web") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-ivory to-ivory-light rounded-3xl p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 h-6 bg-deep-blue/5 rounded-full px-3 flex items-center">
            <span className="text-[10px] text-deep-blue/40">yoursite.com</span>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
          <div className="h-4 w-24 bg-deep-blue/10 rounded mb-3" />
          <div className="h-3 w-full bg-deep-blue/5 rounded mb-2" />
          <div className="h-3 w-4/5 bg-deep-blue/5 rounded mb-4" />
          <div className="flex gap-2">
            <div className="h-8 px-4 bg-gold rounded-full flex items-center justify-center">
              <span className="text-[10px] font-medium text-deep-blue">Get Started</span>
            </div>
            <div className="h-8 px-4 bg-deep-blue/10 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-ivory to-ivory-light rounded-3xl p-4 flex flex-col">
        <div className="flex-1 bg-deep-blue rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-deep-blue-light to-deep-blue" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center">
              <Play size={24} fill="white" className="text-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gold rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1 h-12 bg-deep-blue/10 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

// Individual Service Panel Component
function ServicePanel({
  service,
  isReversed
}: {
  service: { title: string; description: string; visual: string };
  isReversed: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="h-screen flex items-center justify-center bg-white"
    >
      <div className={`container-custom w-full flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-center gap-12 md:gap-24`}>
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 max-w-xl"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-[3.5rem] font-normal leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {service.title}
          </h2>
          <p className="text-base md:text-lg text-deep-blue/70 leading-relaxed">
            {service.description}
          </p>
        </motion.div>

        {/* Visual Card */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex-1 w-full max-w-xl h-[350px] md:h-[500px]"
        >
          <ServiceVisual type={service.visual} />
        </motion.div>
      </div>
    </div>
  );
}

// Services Section - Clean two-column layout with GSAP snap
function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "SEO & Search Visibility",
      description: "Strategic SEO that builds organic traffic over time. We focus on sustainable rankings, not quick fixes—helping your brand become discoverable to the right audience through content, technical optimization, and authority building.",
      visual: "seo",
    },
    {
      title: "Performance Marketing",
      description: "Data-driven campaigns on Google and Meta that actually convert. We optimize for ROI, not vanity metrics—targeting the right people with messaging that moves them to action.",
      visual: "marketing",
    },
    {
      title: "Web Development & UX/UI",
      description: "Beautiful, high-converting websites built for growth. From landing pages to full platforms, we create digital experiences that look stunning and drive results.",
      visual: "web",
    },
    {
      title: "Video Editing & Motion",
      description: "Scroll-stopping content that captures attention. From social reels to brand films, we craft visual stories that resonate with your audience and amplify your message.",
      visual: "video",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const panels = gsap.utils.toArray<HTMLElement>(".service-panel");

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        end: "bottom top",
        snap: {
          snapTo: 1,
          duration: { min: 0.2, max: 0.5 },
          delay: 0,
          ease: "power1.inOut",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && (trigger.vars.trigger as HTMLElement).classList?.contains("service-panel")) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative">
      {services.map((service, index) => (
        <div key={service.title} className="service-panel">
          <ServicePanel
            service={service}
            isReversed={index % 2 === 1}
          />
        </div>
      ))}
    </section>
  );
}

// Video Reels Section
function VideoReelsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Placeholder reels - replace with actual influencer content
  const reels = [
    { id: 1, thumbnail: "/api/placeholder/270/480", name: "Creator 1", handle: "@creator1" },
    { id: 2, thumbnail: "/api/placeholder/270/480", name: "Creator 2", handle: "@creator2" },
    { id: 3, thumbnail: "/api/placeholder/270/480", name: "Creator 3", handle: "@creator3" },
    { id: 4, thumbnail: "/api/placeholder/270/480", name: "Creator 4", handle: "@creator4" },
    { id: 5, thumbnail: "/api/placeholder/270/480", name: "Creator 5", handle: "@creator5" },
  ];

  return (
    <section ref={ref} className="section-padding bg-deep-blue relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="section-header"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: brand.gold }}
          >
            Influencer Content
          </motion.span>
          <motion.h2 variants={fadeInUp} style={{ color: brand.ivory }}>
            Creators we've worked with
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg max-w-2xl mx-auto mt-4"
            style={{ color: brand.ivory, opacity: 0.7 }}
          >
            Real content from real influencers driving real results.
          </motion.p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {reels.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="reel-card flex-shrink-0 w-[220px] md:w-[270px] snap-center group"
              >
                {/* Placeholder for video thumbnail */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: brand.deepBlueLight }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${brand.gold}90` }}
                    >
                      <Play size={28} fill={brand.deepBlue} style={{ color: brand.deepBlue }} />
                    </div>
                  </div>
                </div>
                {/* Creator Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-semibold text-white">{reel.name}</p>
                  <p className="text-sm text-white/70">{reel.handle}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 bottom-6 w-20 bg-gradient-to-r from-deep-blue to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-6 w-20 bg-gradient-to-l from-deep-blue to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      quote: "This finally feels clear. We know where to focus now.",
      author: "Startup Founder",
      role: "D2C Brand, UAE",
      avatar: "S",
    },
    {
      quote: "Growth doesn't feel overwhelming anymore. They actually care.",
      author: "Marketing Director",
      role: "Travel Agency, Nigeria",
      avatar: "M",
    },
    {
      quote: "This feels aligned with how we want to build. Service before scale.",
      author: "CEO",
      role: "Supplements Brand, GCC",
      avatar: "C",
    },
  ];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-padding bg-ivory relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-noise" />

      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="section-header"
        >
          <motion.span variants={fadeInUp} className="section-label">
            What Clients Say
          </motion.span>
          <motion.h2 variants={fadeInUp} className="section-title">
            After working with us, people say
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="testimonial-card relative hover-lift"
            >
              <Quote
                size={40}
                className="absolute top-6 right-6 opacity-10"
                style={{ color: brand.gold }}
              />
              <p className="text-xl mb-8 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: brand.deepBlue, color: brand.ivory }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm opacity-60">{testimonial.role}</p>
                </div>
              </div>
              {/* LinkedIn badge */}
              <div className="absolute bottom-6 right-6">
                <Linkedin size={20} style={{ color: brand.deepBlueLight }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Our Approach Section
function ApproachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { number: "01", title: "Clarify your value", description: "We understand your unique strengths and position." },
    { number: "02", title: "Structure your growth", description: "Systems and frameworks that scale sustainably." },
    { number: "03", title: "Train teams", description: "Spot opportunities and refine processes." },
    { number: "04", title: "Build systems", description: "Improvements that compound every day." },
  ];

  return (
    <section
      id="approach"
      ref={ref}
      className="section-padding bg-ivory-light relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="section-label">
              Our Approach
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-6">
              Simple. Structured.
              <br />
              <span style={{ color: brand.gold }}>Intentional.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg mb-8 opacity-80">
              Growth should feel aligned—not overwhelming. We build foundations, not just campaigns.
            </motion.p>
          </motion.div>

          {/* Right Column - Steps */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="flex gap-6 items-start group"
              >
                <span
                  className="text-4xl font-bold transition-colors group-hover:text-gold"
                  style={{ color: `${brand.deepBlue}20` }}
                >
                  {step.number}
                </span>
                <div>
                  <h4 className="text-xl font-semibold mb-1">{step.title}</h4>
                  <p className="opacity-70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding bg-deep-blue relative overflow-hidden"
    >
      {/* Background Elements */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: brand.gold }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-6"
            style={{ color: brand.ivory }}
          >
            Ready to build a presence that works for you?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl mb-10"
            style={{ color: brand.ivory, opacity: 0.8 }}
          >
            Let's create visibility, systems, and growth that last.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="mailto:hello@feelyourpresence.com" className="btn btn-gold group">
              Let's Work Together
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="https://calendly.com"
              target="_blank"
              className="btn border-2 border-ivory/30 hover:border-ivory hover:bg-ivory/10"
              style={{ color: brand.ivory }}
            >
              Book a Call
              <ExternalLink size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: "SEO", href: "#" },
      { label: "Performance Marketing", href: "#" },
      { label: "Web Development", href: "#" },
      { label: "Video Production", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Approach", href: "#approach" },
      { label: "Case Studies", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
    social: [
      { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
      { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
      { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    ],
  };

  return (
    <footer className="bg-ivory border-t" style={{ borderColor: `${brand.deepBlue}10` }}>
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Image
              src="/Feel your presence.png"
              alt="Feel Your Presence"
              width={200}
              height={55}
              className="h-12 w-auto mb-6"
            />
            <p className="text-lg mb-6 max-w-md opacity-80">
              Visibility that converts. Growth that lasts.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-deep-blue hover:text-ivory"
                  style={{ backgroundColor: `${brand.deepBlue}08` }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: `${brand.deepBlue}10` }}
        >
          <p className="text-sm opacity-60">
            © {currentYear} Feel Your Presence. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm opacity-60">
            <Link href="#" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <WhoWeWorkWithSection />
      <DifferentiatorSection />
      <AutomationSection />
      <VideoReelsSection />
      <TestimonialsSection />
      <ApproachSection />
      <CTASection />
      <Footer />
    </main>
  );
}
