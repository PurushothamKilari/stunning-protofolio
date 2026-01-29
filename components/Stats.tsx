import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Process Improvements Led', value: '40+' },
  { label: 'Cost Savings Delivered', value: '$1.8M+' },
  { label: 'Cycle Time Reduction', value: '83%' },
  { label: 'Defect Reduction Achieved', value: '95%+' },
];

const Stats: React.FC = () => {
  return (
    <section className="relative z-20 -mt-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-glass border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl flex flex-wrap justify-between items-center gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-1 min-w-[150px] text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-mono text-accent uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
