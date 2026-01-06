export type Suit = 'Spades' | 'Hearts' | 'Diamonds' | 'Clubs';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
export type PlayerPosition = 'South' | 'North' | 'East' | 'West';
export interface CardData {
  suit: Suit;
  rank: Rank;
  id: string;
}
export const SUITS: Suit[] = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
export const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const RANK_VALUE: Record<Rank, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 11, 'Q': 12, 'K': 13, 'A': 14
};
export function createDeck(): CardData[] {
  const deck: CardData[] = [];
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      deck.push({ suit, rank, id: `${rank}-${suit}` });
    });
  });
  return deck;
}
export function shuffleDeck(deck: CardData[]): CardData[] {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}
export function getWinnerOfTrick(trick: { player: PlayerPosition; card: CardData }[], trumpSuit: Suit | 'NT'): PlayerPosition {
  const leadCard = trick[0].card;
  const leadSuit = leadCard.suit;
  let winningPlay = trick[0];
  for (let i = 1; i < trick.length; i++) {
    const currentPlay = trick[i];
    const currentCard = currentPlay.card;
    const winningCard = winningPlay.card;
    const isCurrentTrump = currentCard.suit === trumpSuit;
    const isWinningTrump = winningCard.suit === trumpSuit;
    if (isCurrentTrump && !isWinningTrump) {
      winningPlay = currentPlay;
    } else if (isCurrentTrump && isWinningTrump) {
      if (RANK_VALUE[currentCard.rank] > RANK_VALUE[winningCard.rank]) {
        winningPlay = currentPlay;
      }
    } else if (!isWinningTrump && currentCard.suit === leadSuit) {
      if (RANK_VALUE[currentCard.rank] > RANK_VALUE[winningCard.rank]) {
        winningPlay = currentPlay;
      }
    }
  }
  return winningPlay.player;
}
export const NEXT_PLAYER: Record<PlayerPosition, PlayerPosition> = {
  South: 'West',
  West: 'North',
  North: 'East',
  East: 'South',
};