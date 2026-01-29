import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MILESTONES } from '../constants';

const AboutTimeline: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-80%"]);

  return (
    <motion.div 
      ref={targetRef} 
      className="relative h-[300vh] bg-space hidden md:block"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 pl-12 pr-[50vw]">
            <div className="min-w-[400px] flex flex-col justify-center">
                 <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
                    <span className="text-accent text-2xl block mb-2 font-mono">04. Journey</span>
                    Experience &<br/> Education
                </h2>
                <p className="text-gray-400 font-mono text-sm max-w-xs">
                    Scroll right to explore my professional milestones and academic background.
                </p>
                <div className="mt-8 flex gap-2 text-white/20">
                     <span>→</span><span>→</span><span>→</span>
                </div>
            </div>

            {MILESTONES.map((milestone) => {
                 const isEducation = milestone.type === 'education';
                 return (
                    <div 
                        key={milestone.id}
                        className={`relative min-w-[400px] h-[400px] p-8 rounded-2xl border backdrop-blur-md flex flex-col justify-between group transition-all duration-300 hover:scale-105 ${
                            isEducation 
                            ? 'bg-secondary/5 border-secondary/20 hover:border-secondary/50' 
                            : 'bg-white/5 border-white/10 hover:border-accent/50'
                        }`}
                    >
                        <div className="absolute top-4 right-4 text-8xl font-black opacity-5 pointer-events-none select-none">
                            {milestone.year.split(' ')[0]}
                        </div>

                        <div>
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-6 ${
                                isEducation ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                            }`}>
                                {milestone.year}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{milestone.title}</h3>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                {milestone.description}
                            </p>
                        </div>
                        
                        <div className={`w-full h-1 mt-auto rounded-full ${
                            isEducation ? 'bg-secondary' : 'bg-accent'
                        }`} />
                    </div>
                 );
            })}
             <div className="min-w-[200px] flex items-center justify-center">
                 <div className="text-center">
                    <p className="text-white mb-4">What's Next?</p>
                    <a href="#contact" className="px-6 py-3 bg-accent text-black font-bold rounded-lg hover:bg-accent/80 transition-colors">
                        Hire Me
                    </a>
                 </div>
             </div>
        </motion.div>
      </div>
      
      {/* Mobile Fallback - Standard Vertical List */}
      <div className="md:hidden py-24 px-4">
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">
                <span className="text-accent text-xl block mb-1">04.</span>
                Experience & Education
            </h2>
            <p className="text-gray-400 text-sm">My professional journey.</p>
        </div>
        <div className="space-y-8">
            {MILESTONES.map((milestone) => (
                <div key={milestone.id} className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <span className="text-accent text-xs font-mono block mb-2">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400 text-sm">{milestone.description}</p>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutTimeline;