/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Trophy, Music } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative">
      <div className="static-noise" />
      <div className="scanline" />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 text-center relative"
      >
        <h1 
          className="text-5xl md:text-7xl font-black tracking-tighter italic text-white neon-text-cyan mb-2 glitch-effect"
          data-text="NEON SNAKE"
        >
          NEON <span className="text-neon-pink neon-text-pink">SNAKE</span>
        </h1>
        <p className="text-neon-purple/80 font-mono text-sm tracking-[0.3em] uppercase animate-pulse">
          Arcade & Beats Edition [GLITCH_MODE: ON]
        </p>
      </motion.header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Panel: Stats */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 space-y-6"
        >
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 text-neon-green mb-4">
              <Trophy size={20} />
              <h2 className="text-xs font-bold tracking-widest uppercase">High Score</h2>
            </div>
            <div className="text-4xl font-mono font-bold text-white neon-text-green">
              {Math.max(score, 1240).toLocaleString()}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 text-neon-cyan mb-4">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <h2 className="text-xs font-bold tracking-widest uppercase">Current Score</h2>
            </div>
            <div className="text-5xl font-mono font-bold text-white neon-text-cyan">
              {score.toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* Center Panel: Game */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-6 flex justify-center"
        >
          <SnakeGame onScoreChange={setScore} />
        </motion.div>

        {/* Right Panel: Music */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 space-y-6"
        >
          <div className="flex items-center gap-3 text-neon-pink mb-2 px-2">
            <Music size={20} />
            <h2 className="text-xs font-bold tracking-widest uppercase">Now Playing</h2>
          </div>
          <MusicPlayer />
          
          <div className="p-4 rounded-xl bg-neon-purple/5 border border-neon-purple/20 text-[10px] font-mono text-neon-purple/60 leading-relaxed">
            SYSTEM_LOG: AUDIO_ENGINE_ACTIVE...<br/>
            SNAKE_CORE_LOADED...<br/>
            NEON_GRID_INITIALIZED...<br/>
            WAITING_FOR_INPUT...
          </div>
        </motion.div>
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple opacity-30" />
    </div>
  );
}
