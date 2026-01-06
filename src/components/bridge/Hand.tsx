import React from 'react';
import { Card } from './Card';
import { PlayerPosition, CardData } from '@/lib/bridgeUtils';
import { useBridgeStore } from '@/store/useBridgeStore';
interface HandProps {
  player: PlayerPosition;
}
export const Hand: React.FC<HandProps> = ({ player }) => {
  const hands = useBridgeStore(s => s.hands);
  const playCard = useBridgeStore(s => s.playCard);
  const turn = useBridgeStore(s => s.turn);
  const phase = useBridgeStore(s => s.phase);
  const dummy = useBridgeStore(s => s.dummy);
  const cards = hands[player] || [];
  const isSouth = player === 'South';
  const isDummy = player === dummy;
  const isFaceDown = !isSouth && !isDummy;
  const handleCardClick = (card: CardData) => {
    if (isSouth && turn === 'South' && phase === 'playing') {
      playCard('South', card);
    }
  };
  return (
    <div className="relative flex items-center justify-center h-48 w-full max-w-2xl mx-auto px-10">
      {cards.map((card, idx) => {
        const total = cards.length;
        const offset = (idx - (total - 1) / 2) * 30;
        const rotate = (idx - (total - 1) / 2) * 5;
        return (
          <div
            key={card.id}
            className="absolute transition-all duration-300 hover:z-50"
            style={{
              transform: `translateX(${offset}px) rotate(${rotate}deg)`,
              zIndex: idx,
            }}
          >
            <Card
              card={card}
              isFaceDown={isFaceDown}
              onClick={isSouth ? () => handleCardClick(card) : undefined}
            />
          </div>
        );
      })}
    </div>
  );
};