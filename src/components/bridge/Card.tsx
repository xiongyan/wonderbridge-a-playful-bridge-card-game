import React from 'react';
import { motion } from 'framer-motion';
import { CardData, Suit } from '@/lib/bridgeUtils';
import { Club, Heart, Diamond, Spade } from 'lucide-react';
import { cn } from '@/lib/utils';
interface CardProps {
  card: CardData;
  onClick?: () => void;
  isDummy?: boolean;
  isFaceDown?: boolean;
  className?: string;
}
const SuitIcon = ({ suit, className }: { suit: Suit; className?: string }) => {
  switch (suit) {
    case 'Clubs': return <Club className={cn("fill-current", className)} />;
    case 'Hearts': return <Heart className={cn("fill-current text-red-500", className)} />;
    case 'Diamonds': return <Diamond className={cn("fill-current text-red-500", className)} />;
    case 'Spades': return <Spade className={cn("fill-current", className)} />;
  }
};
export const Card: React.FC<CardProps> = ({ card, onClick, isFaceDown, isDummy, className }) => {
  return (
    <motion.div
      layoutId={card.id}
      whileHover={onClick ? { y: -20, scale: 1.05 } : {}}
      onClick={onClick}
      className={cn(
        "relative w-20 h-28 sm:w-24 sm:h-36 rounded-xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer select-none flex flex-col justify-between p-2 overflow-hidden",
        isFaceDown && "bg-blue-400",
        className
      )}
    >
      {!isFaceDown ? (
        <>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold leading-none">{card.rank}</span>
            <SuitIcon suit={card.suit} className="w-4 h-4" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
             <SuitIcon suit={card.suit} className="w-16 h-16" />
          </div>
          <div className="flex flex-col items-center self-end rotate-180">
            <span className="text-xl font-bold leading-none">{card.rank}</span>
            <SuitIcon suit={card.suit} className="w-4 h-4" />
          </div>
        </>
      ) : (
        <div className="w-full h-full border-2 border-white/20 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/20" />
        </div>
      )}
    </motion.div>
  );
};