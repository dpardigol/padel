export const calculateElo = (player1Elo, player2Elo, result) => {
    const kFactor = 32;
    const expectedScore1 = 1 / (1 + Math.pow(10, (player2Elo - player1Elo) / 400));
    const expectedScore2 = 1 - expectedScore1;
  
    const score1 = result === "player1" ? 1 : 0;
    const score2 = 1 - score1;
  
    const newPlayer1Elo = player1Elo + kFactor * (score1 - expectedScore1);
    const newPlayer2Elo = player2Elo + kFactor * (score2 - expectedScore2);
  
    return { newPlayer1Elo, newPlayer2Elo };
  };