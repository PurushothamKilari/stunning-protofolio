import React, { useState, useMemo } from 'react';
import { Project, FilterType } from '../types';
import { FILTERS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectArchiveProps {
  projects: Project[];
}

const ProjectArchive: React.FC<ProjectArchiveProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState<string>(FilterType.ALL);

  const filteredProjects = useMemo(() => {
    if (activeFilter === FilterType.ALL) return projects;
    
    return projects.filter(p => {
        if (activeFilter === 'React') return p.tech.includes('React') || p.tech.includes('ReactJS');
        if (activeFilter === 'Next.js') return p.tech.includes('Next.js');
        if (activeFilter === 'AI/ML') return p.tech.includes('AI/ML');
        if (activeFilter === 'Three.js') return p.tech.includes('Three.js') || p.tech.includes('WebGL');
        return true;
    });
  }, [projects, activeFilter]);

  return (
    <motion.section 
      className="py-24 px-4 md:px-12 w-full max-w-6xl mx-auto relative z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="text-accent text-xl">06.</span> Project Archive
          </h2>
          <p className="text-gray-400 font-mono text-sm">Reviewing database entries...</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-300 cursor-hover border ${
                activeFilter === filter 
                  ? 'bg-accent/10 border-accent text-accent' 
                  : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full overflow-x-auto bg-glass rounded-xl border border-white/5 backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 font-mono text-xs uppercase tracking-wider">
              <th className="p-6">Project</th>
              <th className="p-6 hidden md:table-cell">Built With</th>
              <th className="p-6 hidden sm:table-cell">Link</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="p-6 font-semibold text-white group-hover:text-accent transition-colors">
                    {project.title}
                  </td>
                  <td className="p-6 hidden md:table-cell">
                    <div className="flex gap-2 flex-wrap">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs text-gray-400 px-2 py-1 rounded bg-white/5">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs text-gray-500 py-1">+ {project.tech.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-6 hidden sm:table-cell">
                    <a 
                      href={project.link || '#'} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-accent cursor-hover transition-colors inline-flex items-center gap-1"
                    >
                      View <ArrowUpRight size={14} />
                    </a>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center text-gray-500 font-mono">
            No projects found for filter: {activeFilter}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ProjectArchive;