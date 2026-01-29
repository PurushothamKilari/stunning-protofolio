import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:py-6 pointer-events-none`}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-500 ${
          isScrolled 
            ? 'bg-space/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl' 
            : 'bg-transparent p-0'
        }`}>
          {/* Logo */}
          <a href="#" className="relative group z-50 cursor-hover">
            <div className="font-bold text-xl tracking-tighter flex items-center gap-1">
              <span className="text-white">MANOJ</span>
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#00f0ff]" />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/5 rounded-full p-1.5 backdrop-blur-sm">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-6 py-2 text-sm font-mono text-gray-300 hover:text-white transition-colors cursor-hover z-10"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#contact"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-accent/10 border border-accent/20 hover:bg-accent/20 hover:border-accent text-accent rounded-lg text-xs font-mono font-bold tracking-wide transition-all cursor-hover"
            >
              HIRE ME <ArrowUpRight size={14} />
            </a>

            <button 
              onClick={toggleMenu}
              className="md:hidden relative z-50 p-2 text-white hover:text-accent transition-colors cursor-hover bg-white/5 rounded-lg border border-white/10"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center md:hidden"
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            <div className="flex flex-col items-center gap-8 z-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 hover:to-accent transition-all tracking-tighter cursor-hover"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="h-px w-24 bg-white/10 my-4" 
              />

              <motion.div 
                className="flex gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href="https://linkedin.com/in/vaigandladurgesh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors"><Linkedin size={28} /></a>
                <a href="https://github.com/Durgesh-Vaigandla/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors"><Github size={28} /></a>
                <a href="mailto:vvipdurgesh55@gmail.com" className="text-gray-400 hover:text-accent transition-colors"><Mail size={28} /></a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;