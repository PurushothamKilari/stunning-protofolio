import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { Check, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <motion.section 
      id="services" 
      className="py-24 px-4 md:px-12 w-full max-w-7xl mx-auto relative z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
           <span className="text-accent text-xl">02.</span> My Services
        </h2>
        <p className="text-gray-400 font-mono text-sm max-w-xl">
          Specialized solutions tailored to your technical needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 flex flex-col hover:bg-white/5 ${
              service.recommended 
                ? 'bg-gradient-to-b from-white/10 to-black border-accent/50 shadow-[0_0_30px_rgba(0,240,255,0.1)]' 
                : 'bg-glass border-white/5 hover:border-white/20'
            }`}
          >
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{service.description}</p>
              </div>
              {service.recommended && (
                <div className="bg-accent text-black font-bold text-xs py-1 px-3 rounded-full uppercase tracking-wider">
                  Core
                </div>
              )}
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                  <div className="mt-0.5 min-w-[16px]">
                    <Check size={16} className="text-accent" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <a 
              href="#contact"
              className="group flex items-center justify-between w-full py-4 px-6 rounded-lg bg-white/5 border border-white/10 text-white font-bold tracking-wide transition-all hover:bg-white/10 hover:border-accent/50"
            >
              <span>Get a Quote</span>
              <ArrowRight size={18} className="text-accent transform group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Services;