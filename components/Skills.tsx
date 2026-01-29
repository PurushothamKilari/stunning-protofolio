import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <motion.section 
      className="py-24 px-4 md:px-12 w-full max-w-6xl mx-auto relative z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span className="text-accent text-xl">05.</span> Tech Stack & Expertise
        </h2>
        <p className="text-gray-400 font-mono text-sm">Tools I use to solve problems.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SKILLS.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-glass border border-white/5 rounded-xl p-8 hover:border-accent/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{category.level}</h3>
              <div className={`w-2 h-2 rounded-full ${
                category.level === 'Advanced' ? 'bg-accent shadow-[0_0_10px_#00f0ff]' : 
                category.level === 'Intermediate' ? 'bg-secondary shadow-[0_0_10px_#7000ff]' : 'bg-green-400 shadow-[0_0_10px_#4ade80]'
              }`} />
            </div>
            
            <p className="text-gray-400 text-sm mb-6 font-mono min-h-[60px]">
              "{category.context}"
            </p>

            <div className="flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-gray-200 hover:bg-white/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;