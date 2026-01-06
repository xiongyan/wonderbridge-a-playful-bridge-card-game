import React from 'react';
import { useBridgeStore } from '@/store/useBridgeStore';
import { Button } from '@/components/ui/button';
import { Suit, SUITS } from '@/lib/bridgeUtils';
import { motion, AnimatePresence } from 'framer-motion';
export const BiddingPanel: React.FC = () => {
  const phase = useBridgeStore(s => s.phase);
  const turn = useBridgeStore(s => s.turn);
  const makeBid = useBridgeStore(s => s.makeBid);
  const passBid = useBridgeStore(s => s.passBid);
  if (phase !== 'bidding' || turn !== 'South') return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t-8 border-black p-6 z-50 flex flex-col items-center gap-6 shadow-[0_-10px_0_0_rgba(0,0,0,0.1)]"
      >
        <h3 className="text-2xl font-black uppercase tracking-tighter">Choose Your Contract</h3>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map(level => (
            <div key={level} className="flex flex-col gap-2">
              {([...SUITS, 'NT'] as (Suit | 'NT')[]).map(suit => (
                <Button
                  key={`${level}-${suit}`}
                  variant="outline"
                  className="border-2 border-black hover:bg-yellow-400 font-bold"
                  onClick={() => makeBid(level, suit)}
                >
                  {level}{suit === 'NT' ? 'NT' : suit[0]}
                </Button>
              ))}
            </div>
          ))}
        </div>
        <Button 
          variant="destructive" 
          size="lg" 
          className="w-full max-w-xs border-4 border-black font-black text-xl py-8"
          onClick={passBid}
        >
          PASS
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};