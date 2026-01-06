import React, { useEffect } from 'react';
import { Hand } from './Hand';
import { PlayerAvatar } from './PlayerAvatar';
import { TrickArea } from './TrickArea';
import { BiddingPanel } from './BiddingPanel';
import { useBridgeStore } from '@/store/useBridgeStore';
export const GameTable: React.FC = () => {
  const turn = useBridgeStore(s => s.turn);
  const nextTurn = useBridgeStore(s => s.nextTurn);
  const phase = useBridgeStore(s => s.phase);
  const tricksWon = useBridgeStore(s => s.tricksWon);
  const contract = useBridgeStore(s => s.contract);
  useEffect(() => {
    if (turn !== 'South' && phase === 'playing') {
      const timer = setTimeout(() => {
        nextTurn();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [turn, phase, nextTurn]);
  return (
    <div className="relative w-full h-[85vh] flex flex-col items-center justify-between p-4 overflow-hidden bg-[#4ECDC4]/20 rounded-3xl border-8 border-black">
      {/* Header Info */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
         <div className="bg-white border-4 border-black p-3 rounded-xl font-black text-sm">
            CONTRACT: {contract ? `${contract.level}${contract.suit}` : 'BIDDING...'}
         </div>
         <div className="bg-white border-4 border-black p-3 rounded-xl font-black text-sm">
            TRICKS: NS {tricksWon.NS} - EW {tricksWon.EW}
         </div>
      </div>
      {/* North */}
      <div className="flex flex-col items-center">
        <PlayerAvatar position="North" />
        <Hand player="North" />
      </div>
      {/* Middle: West - Table - East */}
      <div className="flex-1 w-full flex items-center justify-between px-4 sm:px-12">
        <div className="flex flex-col items-center gap-4">
          <PlayerAvatar position="West" />
          <div className="w-20 h-32 hidden md:block">
            <Hand player="West" />
          </div>
        </div>
        <TrickArea />
        <div className="flex flex-col items-center gap-4">
          <PlayerAvatar position="East" />
          <div className="w-20 h-32 hidden md:block">
            <Hand player="East" />
          </div>
        </div>
      </div>
      {/* South */}
      <div className="flex flex-col items-center w-full">
        <Hand player="South" />
        <PlayerAvatar position="South" />
      </div>
      <BiddingPanel />
    </div>
  );
};