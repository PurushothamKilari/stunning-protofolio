
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink, TrendingUp, Cpu, Zap, Globe, Code2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getIcon = () => {
      if (project.tech.some(t => t.includes('AI') || t.includes('Python'))) return <Cpu className="w-full h-full text-accent/20" />;
      if (project.category === 'Experimental') return <Zap className="w-full h-full text-secondary/20" />;
      if (project.category === 'Open Source') return <Code2 className="w-full h-full text-green-400/20" />;
      return <Globe className="w-full h-full text-accent/20" />;
  };

  return (
    <motion.div
      className="relative w-full md:w-[380px] h-[520px] cursor-hover perspective-1000"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="absolute inset-0 bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl group transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(0,240,255,0.1)] flex flex-col"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Abstract Backgrounds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/5 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/5 rounded-full blur-[80px]" />
            <div 
                className="absolute inset-0 opacity-[0.03]" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)', 
                    backgroundSize: '30px 30px' 
                }} 
            />
        </div>

        <div className="relative z-10 p-8 flex flex-col h-full">
            {/* Top Bar */}
            <div className="flex justify-between items-start mb-8">
                <span className={`px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest border ${
                    project.category === 'Experimental' ? 'border-secondary/30 text-secondary bg-secondary/5' : 'border-accent/30 text-accent bg-accent/5'
                }`}>
                    {project.category}
                </span>
                <div className="w-12 h-12 p-2 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                    {getIcon()}
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow">
                <h3 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-accent transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                </p>

                {project.impact && (
                    <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm group-hover:border-accent/20 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp size={14} className="text-green-400" />
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">Impact</span>
                        </div>
                        <p className="text-white text-sm font-medium">{project.impact}</p>
                    </div>
                )}
            </div>

            {/* Bottom */}
            <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-mono text-gray-500 px-2 py-1 rounded bg-white/5 border border-white/5">
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="text-[10px] font-mono text-gray-600 px-2 py-1">+ {project.tech.length - 3}</span>
                    )}
                </div>

                <a 
                    href={project.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group/btn text-white"
                >
                    <span className="text-sm font-bold font-mono group-hover/btn:text-accent transition-colors">LIVE DEMO</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/btn:bg-accent group-hover/btn:text-black transition-all">
                        <ExternalLink size={14} />
                    </div>
                </a>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectSpotlight: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <motion.section 
      id="work" 
      className="py-24 px-4 md:px-12 w-full max-w-7xl mx-auto relative z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
          <span className="text-accent text-xl">01.</span> Featured Work
        </h2>
        <div className="w-20 h-1 bg-accent mx-auto md:mx-0 rounded-full" />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center perspective-1000">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectSpotlight;
