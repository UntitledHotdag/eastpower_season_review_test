export interface Game {
  id: string;
  date: string; // ISO date string
  homeTeam: string;
  awayTeam: string;
  venue: string;
  round: number;
  matchNumber?: number;
  homeScore?: number;
  awayScore?: number;
  isHome?: boolean; // true if 臺北伊斯特 is home team
}

export interface UserStats {
  gamesAttended: number;
  gamesWon: number;
  totalHoursPlayed: number;
  totalScores: number;
  totalSpikes: number;
  totalMonsterBlocks: number;
  uniquePlayers: number;
  avgPointsPerGame?: number;
  favoriteTeam?: string;
  playerParticipation?: PlayerParticipation[];
}

export interface PlayerParticipation {
  playerName: string;
  playerNumber: string;
  position: string;
  gamesPlayed: number;
  totalPoints?: number;
  totalSpikes?: number;
  totalBlocks?: number;
}

export interface GameDetail {
  matchNumber: number;
  date: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  homeScore: number;
  awayScore: number;
  setScores: number[]; // [home1, away1, home2, away2, ...]
  players: PlayerGameStats[];
}

export interface PlayerGameStats {
  playerName: string;
  playerNumber: string;
  position: string;
  attackPoints: number;
  blockPoints: number;
  servePoints: number;
  totalPoints: number;
}
