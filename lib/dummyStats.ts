import { Game, UserStats, PlayerParticipation } from "@/types";
import { getGameDetails } from "./gameDetails";

// Simple hash function for deterministic stats
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Generate deterministic stats for a game based on its ID
function getStatsForGame(gameId: string): {
  scores: number;
  spikes: number;
  monsterBlocks: number;
  players: number;
} {
  const hash = hashString(gameId);
  
  // Use hash to generate consistent stats
  return {
    scores: 150 + (hash % 50), // 150-199 points
    spikes: 80 + (hash % 40), // 80-119 spikes
    monsterBlocks: 10 + (hash % 15), // 10-24 blocks
    players: 20 + (hash % 6), // 20-25 players
  };
}

// Calculate favorite opponent team (most frequently seen opponent)
function getFavoriteTeam(games: Game[]): string {
  const teamCounts: Record<string, number> = {};
  const EASTPOWER = "臺北伊斯特";
  
  games.forEach((game) => {
    // Only count opponent teams
    if (game.homeTeam !== EASTPOWER) {
      teamCounts[game.homeTeam] = (teamCounts[game.homeTeam] || 0) + 1;
    }
    if (game.awayTeam !== EASTPOWER) {
      teamCounts[game.awayTeam] = (teamCounts[game.awayTeam] || 0) + 1;
    }
  });
  
  if (Object.keys(teamCounts).length === 0) return "";
  
  return Object.entries(teamCounts).reduce((a, b) =>
    teamCounts[a[0]] > teamCounts[b[0]] ? a : b
  )[0];
}

// Abstraction for Phase 2 - can be replaced with real API call
export async function getStatsForGames(
  gameIds: string[],
  games: Game[]
): Promise<UserStats> {
  // Phase 1: Calculate dummy stats
  // Phase 2: Fetch from real database
  
  const selectedGames = games.filter((g) => gameIds.includes(g.id));
  const EASTPOWER = "臺北伊斯特";
  
  if (selectedGames.length === 0) {
    return {
      gamesAttended: 0,
      gamesWon: 0,
      totalHoursPlayed: 0,
      totalScores: 0,
      totalSpikes: 0,
      totalMonsterBlocks: 0,
      uniquePlayers: 0,
    };
  }
  
  // Games won by East Power (best of 5: win when our sets > opponent sets)
  const gamesWon = selectedGames.filter((game) => {
    if (game.homeScore == null || game.awayScore == null) return false;
    return game.isHome ? game.homeScore > game.awayScore : game.awayScore > game.homeScore;
  }).length;
  
  // Total hours played: ~1.5–2h per match; use sets played as proxy (each set ~25–30 min)
  const totalHoursPlayed = selectedGames.reduce((hours, game) => {
    const sets = (game.homeScore ?? 0) + (game.awayScore ?? 0) || 5; // default 5 sets if no result
    return hours + sets * 0.45; // ~27 min per set
  }, 0);
  
  // Calculate player participation and stats from game details
  const matchNumbers = selectedGames
    .map(g => g.matchNumber)
    .filter((num): num is number => num !== undefined);
  
  let totalScores = 0;
  let totalSpikes = 0;
  let totalMonsterBlocks = 0;
  let playerParticipation: PlayerParticipation[] = [];
  const uniquePlayerSet = new Set<string>();
  
  if (matchNumbers.length > 0) {
    try {
      const gameDetails = await getGameDetails(matchNumbers);
      
      // Aggregate player stats across all games - ONLY East Power players
      const playerMap = new Map<string, PlayerParticipation>();
      
      gameDetails.forEach((detail) => {
        // Only count stats for East Power players
        detail.players.forEach((player) => {
          const key = `${player.playerName}-${player.playerNumber}`;
          uniquePlayerSet.add(key);
          
          const existing = playerMap.get(key);
          
          if (existing) {
            existing.gamesPlayed += 1;
            existing.totalPoints = (existing.totalPoints || 0) + player.totalPoints;
            existing.totalSpikes = (existing.totalSpikes || 0) + player.attackPoints;
            existing.totalBlocks = (existing.totalBlocks || 0) + player.blockPoints;
          } else {
            playerMap.set(key, {
              playerName: player.playerName,
              playerNumber: player.playerNumber,
              position: player.position,
              gamesPlayed: 1,
              totalPoints: player.totalPoints,
              totalSpikes: player.attackPoints,
              totalBlocks: player.blockPoints,
            });
          }
          
          // Accumulate East Power totals
          totalScores += player.totalPoints;
          totalSpikes += player.attackPoints;
          totalMonsterBlocks += player.blockPoints;
        });
      });
      
      playerParticipation = Array.from(playerMap.values());
    } catch (error) {
      console.error("Failed to fetch player participation:", error);
      // Fallback: use game scores for East Power only
      selectedGames.forEach((game) => {
        // Only count East Power's score from the game result
        if (game.isHome && game.homeScore !== undefined && game.awayScore !== undefined) {
          // Estimate points per set (average 20-25 points per set)
          const sets = game.homeScore + game.awayScore;
          totalScores += sets * 22; // Approximate
        } else if (!game.isHome && game.awayScore !== undefined && game.homeScore !== undefined) {
          const sets = game.homeScore + game.awayScore;
          totalScores += sets * 22;
        }
      });
    }
  }
  
  const avgPointsPerGame = selectedGames.length > 0 
    ? Math.round(totalScores / selectedGames.length) 
    : 0;
  
  // Calculate favorite opponent team
  const favoriteTeam = getFavoriteTeam(selectedGames.filter(g => 
    g.homeTeam !== EASTPOWER && g.awayTeam !== EASTPOWER
  ));
  
  return {
    gamesAttended: selectedGames.length,
    gamesWon,
    totalHoursPlayed: Math.round(totalHoursPlayed * 10) / 10, // 1 decimal
    totalScores,
    totalSpikes,
    totalMonsterBlocks,
    uniquePlayers: uniquePlayerSet.size,
    avgPointsPerGame,
    favoriteTeam: favoriteTeam !== EASTPOWER ? favoriteTeam : undefined,
    playerParticipation,
  };
}
