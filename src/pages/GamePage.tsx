import React, { useEffect } from 'react';
import { GameTable } from '@/components/bridge/GameTable';
import { useBridgeStore } from '@/store/useBridgeStore';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
export default function GamePage() {
  const deal = useBridgeStore(s => s.deal);
  const phase = useBridgeStore(s => s.phase);
  useEffect(() => {
    deal();
  }, [deal]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 min-h-screen flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="ghost" className="border-4 border-black hover:bg-accent">
              <Home className="mr-2" /> EXIT
            </Button>
          </Link>
          <h2 className="text-3xl font-black text-center tracking-tighter">WONDER BRIDGE</h2>
          <div className="w-24" />
        </div>
        <div className="flex-1 relative">
          <GameTable />
          {phase === 'summary' && (
             <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[100] backdrop-blur-md rounded-3xl">
                <div className="bg-white border-8 border-black p-12 rounded-3xl text-center transform -rotate-2">
                   <h2 className="text-6xl font-black mb-6 uppercase">Hand Over!</h2>
                   <Button 
                    size="lg" 
                    className="bg-yellow-400 text-black border-4 border-black font-black text-2xl px-12 py-8 hover:scale-110 transition-transform"
                    onClick={() => deal()}
                   >
                     PLAY AGAIN
                   </Button>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}