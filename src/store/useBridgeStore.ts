import { create } from 'zustand';
import { CardData, PlayerPosition, Suit, createDeck, shuffleDeck, getWinnerOfTrick, NEXT_PLAYER } from '@/lib/bridgeUtils';
interface GameState {
  hands: Record<PlayerPosition, CardData[]>;
  currentTrick: { player: PlayerPosition; card: CardData }[];
  phase: 'idle' | 'bidding' | 'playing' | 'summary';
  turn: PlayerPosition;
  dealer: PlayerPosition;
  contract: { level: number; suit: Suit | 'NT'; declarer: PlayerPosition } | null;
  tricksWon: Record<'NS' | 'EW', number>;
  dummy: PlayerPosition | null;
  deal: () => void;
  makeBid: (level: number, suit: Suit | 'NT') => void;
  passBid: () => void;
  playCard: (player: PlayerPosition, card: CardData) => void;
  nextTurn: () => void;
}
export const useBridgeStore = create<GameState>((set, get) => ({
  hands: { South: [], North: [], East: [], West: [] },
  currentTrick: [],
  phase: 'idle',
  turn: 'South',
  dealer: 'South',
  contract: null,
  tricksWon: { NS: 0, EW: 0 },
  dummy: null,
  deal: () => {
    const deck = shuffleDeck(createDeck());
    const hands = {
      South: deck.slice(0, 13).sort((a, b) => a.suit.localeCompare(b.suit)),
      West: deck.slice(13, 26),
      North: deck.slice(26, 39),
      East: deck.slice(39, 52),
    };
    set({ hands, phase: 'bidding', turn: 'South', currentTrick: [], tricksWon: { NS: 0, EW: 0 }, contract: null });
  },
  makeBid: (level, suit) => {
    set({ 
      contract: { level, suit, declarer: 'South' }, 
      phase: 'playing', 
      turn: 'West',
      dummy: 'North'
    });
  },
  passBid: () => {
    // Simplified for Phase 1: auto-start if someone passes or random logic
    const { contract } = get();
    if (!contract) {
       set({ contract: { level: 1, suit: 'Spades', declarer: 'South' }, phase: 'playing', turn: 'West', dummy: 'North' });
    }
  },
  playCard: (player, card) => {
    const { hands, currentTrick, phase, turn } = get();
    if (phase !== 'playing' || turn !== player) return;
    const newHand = hands[player].filter(c => c.id !== card.id);
    const newTrick = [...currentTrick, { player, card }];
    set(state => ({
      hands: { ...state.hands, [player]: newHand },
      currentTrick: newTrick,
      turn: NEXT_PLAYER[player]
    }));
    if (newTrick.length === 4) {
      setTimeout(() => {
        const winner = getWinnerOfTrick(newTrick, get().contract?.suit || 'NT');
        const team = (winner === 'South' || winner === 'North') ? 'NS' : 'EW';
        set(state => ({
          tricksWon: { ...state.tricksWon, [team]: state.tricksWon[team] + 1 },
          currentTrick: [],
          turn: winner
        }));
        const remainingCards = Object.values(get().hands).flat().length;
        if (remainingCards === 0) {
          set({ phase: 'summary' });
        }
      }, 1000);
    }
  },
  nextTurn: () => {
    const { turn, phase } = get();
    if (phase === 'playing' && turn !== 'South') {
      const hand = get().hands[turn];
      if (hand.length > 0) {
        get().playCard(turn, hand[0]);
      }
    }
  }
}));