import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music2, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: "Cyberpunk Dreams",
    artist: "AI Synth",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "#00f3ff"
  },
  {
    id: 2,
    title: "Neon Nights",
    artist: "Digital Pulse",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "#ff00ff"
  },
  {
    id: 3,
    title: "Retro Future",
    artist: "Glitch Master",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "#39ff14"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />
      
      <div className="flex items-center gap-4 mb-6 relative">
        <div 
          className="w-16 h-16 rounded-lg flex items-center justify-center bg-black/40 border relative overflow-hidden"
          style={{ borderColor: currentTrack.color, boxShadow: `0 0 10px ${currentTrack.color}44` }}
        >
          <Music2 size={32} style={{ color: currentTrack.color }} className="relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse" />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-lg font-bold truncate text-white tracking-tight">{currentTrack.title}</h3>
          <p className="text-sm text-white/50 truncate font-mono uppercase tracking-widest">{currentTrack.artist}</p>
        </div>
        {isPlaying && (
          <div className="flex gap-1 items-end h-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 16, 8, 16, 4], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                className="w-1 rounded-full"
                style={{ backgroundColor: currentTrack.color }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ 
            width: `${progress}%`, 
            backgroundColor: currentTrack.color,
            boxShadow: `0 0 8px ${currentTrack.color}`
          }}
        />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <button onClick={prevTrack} className="text-white/70 hover:text-white transition-colors hover:scale-110">
            <SkipBack size={24} />
          </button>
          <button 
            onClick={togglePlay}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-black hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          >
            {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
          </button>
          <button onClick={nextTrack} className="text-white/70 hover:text-white transition-colors hover:scale-110">
            <SkipForward size={24} />
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-white/40">
          <Volume2 size={18} />
          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-white/40 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
