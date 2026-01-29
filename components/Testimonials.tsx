import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <motion.section 
      className="py-24 px-4 md:px-12 w-full max-w-6xl mx-auto relative z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Client Feedback</h2>
        <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, index) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-glass border border-white/5 p-8 rounded-2xl relative hover:border-white/10 transition-colors"
          >
            <Quote className="absolute top-8 right-8 text-white/10 w-8 h-8" />
            
            <p className="text-gray-300 italic mb-8 relative z-10">"{t.content}"</p>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-black font-bold text-sm">
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{t.name}</h4>
                <p className="text-accent text-xs font-mono">{t.role} @ {t.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Testimonials;