export interface Game {
  id: string;
  date: string; // ISO date string
  homeTeam: string;
  awayTeam: string;
  venue: string;
  round: number;
}

export interface UserStats {
  gamesAttended: number;
  totalScores: number;
  totalSpikes: number;
  totalMonsterBlocks: number;
  uniquePlayers: number;
  avgPointsPerGame?: number;
  favoriteTeam?: string;
}
