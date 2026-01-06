import React from 'react';
import { useBridgeStore } from '@/store/useBridgeStore';
import { Card } from './Card';
import { PlayerPosition } from '@/lib/bridgeUtils';
import { AnimatePresence, motion } from 'framer-motion';
const POSITIONS: Record<PlayerPosition, string> = {
  South: "bottom-10 left-1/2 -translate-x-1/2",
  North: "top-10 left-1/2 -translate-x-1/2",
  East: "right-10 top-1/2 -translate-y-1/2",
  West: "left-10 top-1/2 -translate-y-1/2",
};
export const TrickArea: React.FC = () => {
  const currentTrick = useBridgeStore(s => s.currentTrick);
  return (
    <div className="relative w-64 h-64 sm:w-96 sm:h-96 bg-black/5 rounded-full border-4 border-dashed border-black/20 flex items-center justify-center">
      <AnimatePresence>
        {currentTrick.map(({ player, card }) => (
          <motion.div
            key={card.id}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`absolute ${POSITIONS[player]}`}
          >
            <Card card={card} className="w-16 h-24 sm:w-20 sm:h-28" />
          </motion.div>
        ))}
      </AnimatePresence>
      {currentTrick.length === 0 && (
        <span className="text-black/20 font-black text-2xl uppercase tracking-widest">
          Table
        </span>
      )}
    </div>
  );
};