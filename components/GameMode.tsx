import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Code, Book, Gamepad2, Volume2, VolumeX, ArrowRight, ArrowLeft, ArrowUp } from 'lucide-react';
import { PROJECTS, MILESTONES, SKILLS } from '../constants';

// --- Types ---
interface Entity { x: number; y: number; w: number; h: number; }
interface Player extends Entity { vx: number; vy: number; grounded: boolean; facingRight: boolean; isJumping: boolean; }
interface Block extends Entity { type: 'ground' | 'platform' | 'question' | 'wall'; data?: any; id?: string; touched?: boolean; color?: string; }
interface Collectible extends Entity { type: 'skill'; data: string; collected: boolean; color: string; floatOffset: number; }
interface MilestoneMarker extends Entity { data: any; passed: boolean; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number; }

// --- Audio System (Safe Singleton) ---
const AudioController = {
  ctx: null as AudioContext | null,
  init: () => {
    if (typeof window !== 'undefined' && !AudioController.ctx) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) AudioController.ctx = new AudioContext();
    }
  },
  play: (type: 'jump' | 'collect' | 'bump' | 'milestone', muted: boolean) => {
    if (muted || !AudioController.ctx) return;
    try {
      const t = AudioController.ctx.currentTime;
      const osc = AudioController.ctx.createOscillator();
      const gain = AudioController.ctx.createGain();
      osc.connect(gain);
      gain.connect(AudioController.ctx.destination);

      if (type === 'jump') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.linearRampToValueAtTime(300, t + 0.1);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.1);
        osc.start();
        osc.stop(t + 0.1);
      } else if (type === 'collect') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.1);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.2);
        osc.start();
        osc.stop(t + 0.2);
      } else if (type === 'bump') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, t);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.1);
        osc.start();
        osc.stop(t + 0.1);
      } else if (type === 'milestone') {
         osc.type = 'triangle';
         osc.frequency.setValueAtTime(440, t);
         osc.frequency.setValueAtTime(554, t + 0.1);
         osc.frequency.setValueAtTime(659, t + 0.2);
         gain.gain.setValueAtTime(0.1, t);
         gain.gain.linearRampToValueAtTime(0, t + 0.6);
         osc.start();
         osc.stop(t + 0.6);
      }
    } catch (e) { console.warn("Audio error", e); }
  }
};

const GameMode: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const [activeModal, setActiveModal] = useState<any>(null);
  const [modalType, setModalType] = useState<'project' | 'milestone' | null>(null);
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [gameMessage, setGameMessage] = useState<string | null>("PRESS ARROWS / WASD TO MOVE");
  
  // Game State
  const state = useRef({
    player: { x: 100, y: 300, w: 30, h: 40, vx: 0, vy: 0, grounded: false, facingRight: true, isJumping: false } as Player,
    camera: { x: 0 },
    keys: { left: false, right: false, up: false },
    level: { blocks: [] as Block[], collectibles: [] as Collectible[], milestones: [] as MilestoneMarker[], width: 0 },
    particles: [] as Particle[],
    lastTime: 0
  });

  // --- Level Generation ---
  useEffect(() => {
    AudioController.init();
    
    // Generate Level Layout
    const blocks: Block[] = [];
    const collectibles: Collectible[] = [];
    const milestones: MilestoneMarker[] = [];
    let cx = 0; // Cursor X

    // 1. Start Area
    blocks.push({ x: -200, y: 500, w: 1000, h: 100, type: 'ground' });
    cx = 800;

    // 2. Skills Section (Jumping puzzle)
    SKILLS.forEach((cat, i) => {
        // Platform
        blocks.push({ x: cx, y: 500 - (i % 2) * 100, w: 400, h: 40, type: 'platform' });
        
        // Skill Orbs on top
        cat.skills.forEach((skill, j) => {
            collectibles.push({
                type: 'skill',
                data: skill,
                x: cx + 50 + j * 60,
                y: 500 - (i % 2) * 100 - 80,
                w: 20, h: 20,
                collected: false,
                color: i === 0 ? '#00f0ff' : i === 1 ? '#7000ff' : '#00ff00',
                floatOffset: Math.random() * Math.PI * 2
            });
        });
        cx += 500;
    });

    // 3. Projects Section (Question Blocks)
    PROJECTS.filter(p => p.featured).forEach((proj, i) => {
        blocks.push({ x: cx, y: 500, w: 300, h: 100, type: 'ground' }); // floor
        
        // High platform with Q block
        blocks.push({ x: cx + 100, y: 300, w: 40, h: 40, type: 'question', data: proj, touched: false });
        blocks.push({ x: cx + 50, y: 300, w: 50, h: 20, type: 'platform' }); // helper
        blocks.push({ x: cx + 140, y: 300, w: 50, h: 20, type: 'platform' }); // helper
        
        cx += 400;
    });

    // 4. Milestones (Flagpoles)
    MILESTONES.forEach((m, i) => {
        blocks.push({ x: cx, y: 500, w: 400, h: 100, type: 'ground' });
        milestones.push({ x: cx + 200, y: 350, w: 10, h: 150, data: m, passed: false });
        cx += 400;
    });

    // Final Platform
    blocks.push({ x: cx, y: 500, w: 500, h: 100, type: 'ground' });

    state.current.level = { blocks, collectibles, milestones, width: cx + 500 };
    state.current.player.y = 400; // Reset spawn

    // Input Listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (['a', 'arrowleft'].includes(k)) state.current.keys.left = true;
    if (['d', 'arrowright'].includes(k)) state.current.keys.right = true;
    if (['w', 'arrowup', ' '].includes(k)) state.current.keys.up = true;
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (['a', 'arrowleft'].includes(k)) state.current.keys.left = false;
    if (['d', 'arrowright'].includes(k)) state.current.keys.right = false;
    if (['w', 'arrowup', ' '].includes(k)) state.current.keys.up = false;
  };

  // --- Physics & Logic ---
  const updatePhysics = (dt: number) => {
    if (activeModal) return; // Pause when reading

    const p = state.current.player;
    const k = state.current.keys;
    const level = state.current.level;

    // Horizontal Movement
    const SPEED = 0.5; // px per ms
    const FRICTION = 0.85;
    const ACCEL = 1.2;

    if (k.left) { p.vx -= ACCEL; p.facingRight = false; }
    if (k.right) { p.vx += ACCEL; p.facingRight = true; }
    
    p.vx *= FRICTION;
    p.x += p.vx;

    // Horizontal Collision
    checkCollisions(p, level.blocks, 'x');

    // Vertical Movement
    const GRAVITY = 0.6;
    const JUMP_FORCE = -14;

    p.vy += GRAVITY;
    p.y += p.vy;
    p.grounded = false;

    // Vertical Collision
    checkCollisions(p, level.blocks, 'y');

    // Jump
    if (k.up && p.grounded) {
        p.vy = JUMP_FORCE;
        p.grounded = false;
        p.isJumping = true;
        AudioController.play('jump', isMuted);
        spawnParticles(p.x + p.w/2, p.y + p.h, 5, '#fff');
    }

    // Camera Follow (Smooth damp)
    const targetCamX = p.x - window.innerWidth / 2 + p.w / 2;
    state.current.camera.x += (targetCamX - state.current.camera.x) * 0.1;

    // Collectibles
    level.collectibles.forEach(c => {
        if (!c.collected && rectIntersect(p, c)) {
            c.collected = true;
            setScore(s => s + 1);
            AudioController.play('collect', isMuted);
            setGameMessage(`COLLECTED: ${c.data}`);
            spawnParticles(c.x + c.w/2, c.y + c.h/2, 10, c.color);
            setTimeout(() => setGameMessage(null), 2000);
        }
    });

    // Milestones
    level.milestones.forEach(m => {
        if (!m.passed && p.x > m.x) {
            m.passed = true;
            setActiveModal(m.data);
            setModalType('milestone');
            AudioController.play('milestone', isMuted);
            spawnParticles(m.x, m.y, 20, '#ffd700');
        }
    });

    // Death zone
    if (p.y > 800) {
        p.x = 100; p.y = 300; p.vy = 0; // Respawn
        setGameMessage("SYSTEM RESET...");
        setTimeout(() => setGameMessage(null), 2000);
    }
  };

  const checkCollisions = (p: Player, blocks: Block[], axis: 'x' | 'y') => {
    for (const b of blocks) {
        if (rectIntersect(p, b)) {
            if (axis === 'x') {
                if (p.vx > 0) p.x = b.x - p.w;
                else if (p.vx < 0) p.x = b.x + b.w;
                p.vx = 0;
            } else {
                if (p.vy > 0) { // Landing
                    p.y = b.y - p.h;
                    p.grounded = true;
                    p.isJumping = false;
                    p.vy = 0;
                } else if (p.vy < 0) { // Hitting head
                    p.y = b.y + b.h;
                    p.vy = 0;
                    if (b.type === 'question' && !b.touched) {
                        b.touched = true;
                        setActiveModal(b.data);
                        setModalType('project');
                        AudioController.play('bump', isMuted);
                        spawnParticles(b.x + b.w/2, b.y + b.h, 8, '#00f0ff');
                    }
                }
            }
        }
    }
  };

  const rectIntersect = (r1: Entity, r2: Entity) => {
    return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y;
  };

  const spawnParticles = (x: number, y: number, count: number, color: string) => {
    for (let i = 0; i < count; i++) {
        state.current.particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 1.0,
            color,
            size: Math.random() * 4 + 2
        });
    }
  };

  // --- Render Loop ---
  const gameLoop = (time: number) => {
    const dt = (time - state.current.lastTime) / 16; // delta time
    state.current.lastTime = time;

    updatePhysics(dt);
    
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // Resize
            if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            // Clear
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            // Camera transform
            ctx.translate(-state.current.camera.x, 0);

            // Draw Background Grid (Parallax)
            ctx.strokeStyle = '#1a1a1a';
            ctx.lineWidth = 1;
            const camX = state.current.camera.x;
            const gridOffset = camX * 0.5; // Parallax factor
            for (let x = Math.floor(gridOffset / 100) * 100; x < camX + canvas.width + 100; x += 100) {
                ctx.beginPath(); ctx.moveTo(x - gridOffset + camX, 0); ctx.lineTo(x - gridOffset + camX, canvas.height); ctx.stroke();
            }

            // Draw Blocks
            state.current.level.blocks.forEach(b => {
                ctx.fillStyle = '#0a0a0a';
                ctx.strokeStyle = b.type === 'question' ? (b.touched ? '#555' : '#ffd700') : '#00f0ff';
                ctx.lineWidth = 2;
                ctx.shadowBlur = b.type === 'ground' ? 0 : 10;
                ctx.shadowColor = ctx.strokeStyle;
                
                ctx.fillRect(b.x, b.y, b.w, b.h);
                ctx.strokeRect(b.x, b.y, b.w, b.h);
                
                if (b.type === 'question') {
                    ctx.fillStyle = b.touched ? '#555' : '#ffd700';
                    ctx.font = 'bold 24px monospace';
                    ctx.textAlign = 'center';
                    ctx.fillText('?', b.x + b.w/2, b.y + 28);
                }
            });

            // Draw Collectibles
            state.current.level.collectibles.forEach(c => {
                if (c.collected) return;
                const floatY = Math.sin(time * 0.005 + c.floatOffset) * 5;
                ctx.fillStyle = c.color;
                ctx.shadowColor = c.color;
                ctx.shadowBlur = 15;
                ctx.beginPath();
                ctx.arc(c.x + c.w/2, c.y + c.h/2 + floatY, 8, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Milestones
            state.current.level.milestones.forEach(m => {
                ctx.fillStyle = m.passed ? '#00ff00' : '#444';
                ctx.fillRect(m.x, m.y, m.w, m.h);
                // Flag
                ctx.fillStyle = m.passed ? '#00ff00' : '#ff0000';
                ctx.beginPath();
                ctx.moveTo(m.x + m.w, m.y);
                ctx.lineTo(m.x + m.w + 40, m.y + 20);
                ctx.lineTo(m.x + m.w, m.y + 40);
                ctx.fill();
            });

            // Draw Particles
            state.current.particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                if (p.life > 0) {
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                    ctx.globalAlpha = 1;
                } else {
                    state.current.particles.splice(i, 1);
                }
            });

            // Draw Player
            const p = state.current.player;
            ctx.fillStyle = '#fff';
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = 10;
            ctx.fillRect(p.x, p.y, p.w, p.h);
            
            // Player Eye/Visor
            ctx.fillStyle = '#00f0ff';
            ctx.fillRect(p.facingRight ? p.x + 20 : p.x, p.y + 10, 10, 5);

            ctx.restore();
        }
    }
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#050505] overflow-hidden"
    >
        {/* HUD */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 pointer-events-none">
            <div className="bg-black/50 border border-white/10 p-2 rounded flex gap-4 pointer-events-auto">
                <div className="flex items-center gap-2">
                    <Trophy className="text-yellow-400" size={20} />
                    <span className="font-mono font-bold text-white text-xl">{score}</span>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-accent">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button onClick={onExit} className="text-red-500 hover:text-red-400">
                    <X size={20} />
                </button>
            </div>
        </div>

        {/* Game Message */}
        <AnimatePresence>
            {gameMessage && (
                <motion.div 
                    initial={{ y: -50, opacity: 0 }} animate={{ y: 50, opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute top-0 left-0 right-0 text-center z-10"
                >
                    <span className="bg-accent text-black font-bold px-6 py-2 rounded-full shadow-[0_0_20px_#00f0ff]">
                        {gameMessage}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Modal Overlay */}
        <AnimatePresence>
            {activeModal && (
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <div className="bg-[#0a0a0a] border border-accent p-8 rounded-xl max-w-lg w-full shadow-[0_0_40px_rgba(0,240,255,0.2)]">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold text-white uppercase">{modalType === 'project' ? activeModal.title : activeModal.title}</h2>
                            <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-white"><X /></button>
                        </div>
                        
                        {modalType === 'project' ? (
                            <>
                                <p className="text-gray-300 mb-4">{activeModal.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {activeModal.tech.map((t: string) => <span key={t} className="text-xs bg-white/10 px-2 py-1 rounded text-accent">{t}</span>)}
                                </div>
                                <a href={activeModal.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-accent text-black px-4 py-2 rounded font-bold hover:bg-white transition-colors">
                                    View Project <ArrowRight size={16} />
                                </a>
                            </>
                        ) : (
                            <>
                                <div className="text-accent font-mono text-sm mb-2">{activeModal.year}</div>
                                <p className="text-gray-300">{activeModal.description}</p>
                                <button onClick={() => setActiveModal(null)} className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 rounded text-white font-bold">CONTINUE RUNNING</button>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Mobile Controls */}
        <div className="absolute bottom-8 left-8 flex gap-4 md:hidden z-20">
            <button 
                className="w-16 h-16 bg-white/10 rounded-full border border-white/20 flex items-center justify-center active:bg-accent/20"
                onTouchStart={() => state.current.keys.left = true} onTouchEnd={() => state.current.keys.left = false}
            ><ArrowLeft className="text-white" /></button>
            <button 
                className="w-16 h-16 bg-white/10 rounded-full border border-white/20 flex items-center justify-center active:bg-accent/20"
                onTouchStart={() => state.current.keys.right = true} onTouchEnd={() => state.current.keys.right = false}
            ><ArrowRight className="text-white" /></button>
        </div>
        <div className="absolute bottom-8 right-8 md:hidden z-20">
            <button 
                className="w-20 h-20 bg-accent/20 rounded-full border border-accent flex items-center justify-center active:bg-accent/40"
                onTouchStart={() => state.current.keys.up = true} onTouchEnd={() => state.current.keys.up = false}
            ><ArrowUp className="text-white" size={32} /></button>
        </div>

        <canvas ref={canvasRef} className="block w-full h-full" />
    </motion.div>
  );
};

export default GameMode;