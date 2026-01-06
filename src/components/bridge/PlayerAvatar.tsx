import React from 'react';
import { PlayerPosition } from '@/lib/bridgeUtils';
import { useBridgeStore } from '@/store/useBridgeStore';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
interface PlayerAvatarProps {
  position: PlayerPosition;
}
const PLAYER_COLORS: Record<PlayerPosition, string> = {
  South: 'bg-yellow-400',
  North: 'bg-green-400',
  East: 'bg-blue-400',
  West: 'bg-red-400',
};
export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ position }) => {
  const turn = useBridgeStore(s => s.turn);
  const isActive = turn === position;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        "w-16 h-16 rounded-full border-4 border-black flex items-center justify-center transition-all",
        PLAYER_COLORS[position],
        isActive ? "scale-110 shadow-[0_0_20px_rgba(255,255,0,0.5)] ring-4 ring-yellow-200" : "opacity-80"
      )}>
        <User className="w-8 h-8 text-black" />
      </div>
      <span className="font-bold text-sm bg-white px-3 py-1 rounded-full border-2 border-black">
        {position}
      </span>
      {isActive && (
        <span className="text-xs font-black animate-bounce text-yellow-600 uppercase tracking-widest">
          Thinking...
        </span>
      )}
    </div>
  );
};