
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ThreeHero from './components/ThreeHero';
import ProjectSpotlight from './components/ProjectSpotlight';
import ProjectArchive from './components/ProjectArchive';
import AboutTimeline from './components/AboutTimeline';
import Skills from './components/Skills';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import Preloader from './components/Preloader';
import TechTicker from './components/TechTicker';
import WhyMe from './components/WhyMe';
import { PROJECTS } from './constants';
import { Github, Linkedin, Mail } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const featuredProjects = PROJECTS.filter(p => p.featured).slice(0, 3);
  const archiveProjects = PROJECTS; 

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (isLoading) return;

        // Don't trigger if user is typing in an input
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

        switch(e.key) {
            case '1':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case '2':
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '3':
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '4':
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '5':
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading]);

  return (
    <div className="bg-space min-h-screen text-gray-200 selection:bg-accent/30 selection:text-white">
      
      <AnimatePresence mode="wait">
        {isLoading && (
            <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
          <Navbar />

          <main>
            {/* Hero Section */}
            <ThreeHero />
            
            {/* Trust Signals - Overlaps Hero Bottom */}
            <Stats />

            {/* Tech Ticker - Immediate Authority (Logos) */}
            <TechTicker />

            {/* Content Wrapper with background gradient fade */}
            <div className="relative z-10 pt-24 space-y-12 md:space-y-24">
                
                {/* Work - Proof of competence first */}
                <ProjectSpotlight projects={featuredProjects} />
                
                {/* Services - What I offer */}
                <Services />

                {/* Why Me - Business Value Proposition */}
                <WhyMe />

                {/* Process - How we work together */}
                <Process />
                
                {/* Social Proof - Trust building */}
                <Testimonials />
                
                {/* About & Skills - Deeper dive */}
                <div id="about">
                  <AboutTimeline />
                  <Skills />
                </div>

                {/* The Big Archive - For those digging deeper */}
                <div id="archive">
                   <ProjectArchive projects={archiveProjects} />
                </div>
                
                {/* FAQ - Pre-empting objections */}
                <FAQ />

                {/* CTA - The Final Conversion Step */}
                <Contact />
                
            </div>
          </main>

          {/* Footer */}
          <footer className="py-12 px-6 text-center text-gray-600 font-mono text-xs relative z-10 bg-[#050505] border-t border-white/5 mt-24">
            <div className="flex justify-center gap-6 mb-8">
                <a 
                  href="https://linkedin.com/in/vaigandladurgesh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-accent transition-all hover:scale-110 cursor-hover border border-white/5"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://github.com/Durgesh-Vaigandla/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-accent transition-all hover:scale-110 cursor-hover border border-white/5"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="mailto:manojchundru5@gmail.com" 
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-accent transition-all hover:scale-110 cursor-hover border border-white/5"
                >
                  <Mail size={20} />
                </a>
            </div>
            <p className="uppercase tracking-widest">Designed & Built by Manoj Kumar</p>
            <p className="mt-2 text-gray-700">© {new Date().getFullYear()} All Rights Reserved.</p>
          </footer>
      </div>
    </div>
  );
};

export default App;
