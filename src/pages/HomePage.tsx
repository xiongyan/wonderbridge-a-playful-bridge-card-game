import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Trophy, BookOpen } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { motion } from 'framer-motion';
export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFE66D] text-black p-4 relative overflow-hidden">
      <ThemeToggle />
      {/* Decorative floating shapes */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 w-64 h-64 border-[16px] border-black/10 rounded-full"
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-[#FF6B6B] border-8 border-black rounded-3xl rotate-12"
      />
      <div className="text-center space-y-12 relative z-10 max-w-4xl">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-[#4ECDC4] border-8 border-black p-6 rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
            >
              <Sparkles className="w-20 h-20 text-white" />
            </motion.div>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85]">
            Wonder<br />
            <span className="text-[#FF6B6B]">Bridge</span>
          </h1>
          <p className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-black/60">
            Classic Cards, Supercharged Fun!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/game">
            <Button
              size="lg"
              className="bg-[#FF6B6B] text-white text-3xl font-black py-10 px-12 rounded-3xl border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              PLAY NOW!
            </Button>
          </Link>
          <div className="flex gap-4">
            <Button variant="outline" className="border-4 border-black p-8 rounded-2xl bg-white font-black text-xl hover:bg-gray-50">
              <BookOpen className="mr-2" /> RULES
            </Button>
            <Button variant="outline" className="border-4 border-black p-8 rounded-2xl bg-white font-black text-xl hover:bg-gray-50">
              <Trophy className="mr-2" /> SCORES
            </Button>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-8 font-black uppercase tracking-tighter opacity-30">
        Created for Wonder Builders
      </footer>
    </div>
  );
}