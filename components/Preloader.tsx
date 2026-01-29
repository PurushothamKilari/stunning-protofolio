import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  'INITIALIZING LEAN OPS CONSOLE...',
  'LOADING MODULES: [ LEAN, SIX SIGMA, EHS ]',
  'CONNECTING TO SHOP FLOOR DATA...',
  'IMPORTING KPI METRICS: OEE, FPY, DPMO...',
  'RUNNING VALUE STREAM DIAGNOSTICS...',
  'APPLYING DMAIC FRAMEWORK...',
  'CALIBRATING MINITAB & POWER BI DASHBOARDS...',
  'VALIDATING SAFETY & COMPLIANCE...',
  'SYSTEM READY: CONTINUOUS IMPROVEMENT ENABLED.'
];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [decryptedName, setDecryptedName] = useState('XXXXXXXX XXXXX');

  const fullText = 'MANOJ KUMAR';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Boot Logs Animation
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Progress Bar
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Decrypt Name Effect
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDecryptedName(
        fullText
          .split('')
          .map((letter, index) => {
            if (letter === ' ') return ' ';
            if (index < iterations) {
              return fullText[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join('')
      );

      if (iterations >= fullText.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    if (!isReady || isExiting) return;

    const handleInteraction = () => {
      triggerExit();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') triggerExit();
    };

    if (!isMobile) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.addEventListener('touchstart', handleInteraction);
      window.addEventListener('click', handleInteraction);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [isReady, isExiting, isMobile]);

  const triggerExit = () => {
    setIsExiting(true);
    setTimeout(onComplete, 800);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#000000] flex flex-col justify-between p-6 md:p-12 font-mono text-[#00f0ff] overflow-hidden selection:bg-[#00f0ff] selection:text-black"
      initial={{ opacity: 1 }}
      animate={
        isExiting
          ? { opacity: 0, scale: 1.1, filter: 'blur(20px)' }
          : { opacity: 1 }
      }
      transition={{ duration: 0.8 }}
    >
      {/* CRT Overlay */}
      <div className="scanline absolute inset-0 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)60%,rgba(0,50,0,0.2)100%)] z-10 pointer-events-none" />

      {/* Top Bar */}
      <div className="flex justify-between items-start z-30 opacity-80 text-xs md:text-sm">
        <div className="flex flex-col">
          <span>LEAN_OS v1.0.0</span>
          <span>PLANT_STATUS: ONLINE</span>
          <span>SAFETY_STATUS: GREEN</span>
        </div>
        <div className="text-right hidden md:block">
          <div>OEE: TARGET &gt; 90%</div>
          <div>FPY: IMPROVING</div>
          <div>DEFECT RATE: REDUCING...</div>
        </div>
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center flex-grow z-30">
        {/* Radar / Process Visual */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-12 rounded-full border border-[#00f0ff]/30 flex items-center justify-center bg-[#00f0ff]/5">
          <div className="absolute inset-0 rounded-full border border-[#00f0ff]/20 scale-75" />
          <div className="absolute inset-0 rounded-full border border-[#00f0ff]/10 scale-50" />
          <div className="absolute inset-0 w-full h-full animate-spin-slow bg-gradient-to-tr from-transparent via-[#00f0ff]/20 to-transparent rounded-full" />
          <div className="w-2 h-2 bg-[#00f0ff] rounded-full shadow-[0_0_10px_#00f0ff]" />
        </div>

        {/* Name */}
        <h1 className="text-3xl md:text-5xl font-black tracking-wider text-center text-white mix-blend-screen crt-flicker mb-2">
          {decryptedName}
        </h1>
        <p className="text-xs md:text-sm tracking-[0.35em] text-[#00f0ff]/70 mb-2 text-center">
          INDUSTRIAL ENGINEER • SIX SIGMA GREEN BELT
        </p>
        <p className="text-[0.6rem] md:text-xs tracking-[0.3em] text-[#00f0ff]/60 mb-10 text-center uppercase">
          Lean Manufacturing • Continuous Improvement • Quality • EHS • Data-Driven Decisions
        </p>

        {/* Interaction Prompt */}
        <AnimatePresence mode="wait">
          {isReady ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#00f0ff] text-black px-6 py-2 font-bold text-sm md:text-lg animate-pulse cursor-pointer hover:scale-105 transition-transform"
              onClick={triggerExit}
            >
              {isMobile ? '[ TAP TO ENTER PLANT CONSOLE ]' : '[ PRESS SPACE TO ENTER PLANT CONSOLE ]'}
            </motion.div>
          ) : (
            <div className="w-64 h-2 bg-[#00f0ff]/20 rounded-full overflow-hidden border border-[#00f0ff]/30">
              <motion.div
                className="h-full bg-[#00f0ff]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Logs */}
      <div className="h-32 w-full max-w-2xl mx-auto border-t border-[#00f0ff]/30 pt-4 z-30 hidden md:block">
        <div className="flex flex-col-reverse h-full overflow-hidden text-xs opacity-70">
          {logs.map((log, i) => (
            <div key={i} className="mb-1">
              <span className="mr-2 text-white/50">
                [{new Date().toLocaleTimeString()}]
              </span>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Logs (Simplified) */}
      <div className="md:hidden text-xs text-center opacity-50 z-30">
        {logs[logs.length - 1]}
      </div>
    </motion.div>
  );
};

export default Preloader;
