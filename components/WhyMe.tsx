import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart3, ShieldCheck } from 'lucide-react';

const WhyMe: React.FC = () => {
  const features = [
    {
      icon: <BarChart3 size={32} />,
      title: 'Data-Driven Problem Solving',
      description:
        'I don’t guess; I measure. From Pareto and trend analysis to hypothesis testing and control charts, I use data to identify true root causes and quantify impact before and after improvements.'
    },
    {
      icon: <Activity size={32} />,
      title: 'Proven Lean & Six Sigma Impact',
      description:
        'Reduced defects from 15% to 0.5% and 12% to 2%, cut cycle time by 83%, and delivered over $1.8M+ in savings using DMAIC, VSM, SMED, Kanban, and structured continuous improvement projects.'
    },
    {
      icon: <ShieldCheck size={32} />,
      title: 'Safety, Reliability & Sustainability',
      description:
        'NEBOSH IGC and EHS experience mean improvements never compromise safety or compliance. I design processes that are stable, repeatable, and easy for operators to sustain on the shop floor.'
    }
  ];

  return (
    <section className="py-24 px-4 md:px-12 w-full max-w-6xl mx-auto relative z-10">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Why Work With Me?</h2>
        <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto">
          Many engineers can talk tools. I focus on measurable outcomes: less waste, fewer defects, faster flow, and safer operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/10 hover:border-accent/20 transition-all duration-300 group"
          >
            <div className="mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyMe;
