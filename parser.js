export function setupParser(myVars, myFunctions) {
    myFunctions.parser = function(e) {
        if(e.data.includes('bestmove')) {
            const bestMove = e.data.split(' ')[1];
            
            // Extract multiple moves from engine analysis if available
            let alternativeMoves = [bestMove];
            try {
                if (e.data.includes('pv')) {
                    // Try to extract alternative moves from multiPV or previous info lines
                    const lines = e.data.split('\n')
                        .filter(line => line.includes(' pv '))
                        .map(line => {
                            const pvIndex = line.indexOf(' pv ');
                            return line.substring(pvIndex + 4).split(' ')[0];
                        });
                    
                    if (lines.length > 1) {
                        alternativeMoves = lines;
                    }
                }
            } catch (error) {
                console.log("Error extracting alternative moves", error);
            }
            
            // Decide whether to use best move or an alternative
            let moveToPlay = bestMove;
            const currentDepth = myVars.lastValue;
            
            // For higher depths, sometimes choose alternative moves
            if (currentDepth >= 15 && alternativeMoves.length > 1 && Math.random() < 0.35) {
                // Select a random move from top 5 (or fewer if not available)
                const maxIndex = Math.min(5, alternativeMoves.length);
                const randomIndex = Math.floor(Math.random() * (maxIndex - 1)) + 1; // Skip index 0 (best move)
                moveToPlay = alternativeMoves[randomIndex] || bestMove;
                console.log(`Using alternative move ${moveToPlay} instead of best move ${bestMove}`);
            } else if (Math.random() < myFunctions.getBlunderProbability()) {
                // Sometimes make a "human-like" suboptimal move
                moveToPlay = myFunctions.generateHumanLikeMove(bestMove, e.data);
                console.log(`Using human-like move ${moveToPlay} instead of best move ${bestMove}`);
            }
            
            myFunctions.color(moveToPlay);
            window.isThinking = false;
        }
    };
    
    myFunctions.getBlunderProbability = function() {
        // Use custom blunder rate from slider if available
        const userBlunderRate = myVars.blunderRate !== undefined ? myVars.blunderRate : 0.05;

        // Make blunder probability vary based on multiple factors
        const gamePhase = myFunctions.estimateGamePhase();
        const timeRemaining = myFunctions.estimateTimeRemaining();
        const complexity = myFunctions.estimatePositionComplexity();

        // Base probability comes from user settings
        let baseProb = userBlunderRate;

        // More likely to blunder in time pressure
        if (timeRemaining < 30) {
            baseProb += 0.1 * (1 - (timeRemaining / 30));
        }

        // More likely to blunder in complex positions
        if (complexity > 0.6) {
            baseProb += 0.05 * (complexity - 0.6) * 2;
        }

        // More likely to blunder in the endgame when tired
        if (gamePhase > 30) {
            baseProb += 0.03 * ((gamePhase - 30) / 10);
        }

        // Add randomness to make it unpredictable
        return Math.min(0.4, baseProb * (0.7 + Math.random() * 0.6));
    };
    
    myFunctions.generateHumanLikeMove = function(bestMove, engineData) {
        // Significantly enhance the human-like behavior
        // Sometimes choose 2nd, 3rd, or even 4th best moves
        if (engineData.includes('pv') && Math.random() < 0.4) {
            try {
                // Extract multiple lines from engine analysis
                const lines = engineData.split('\n')
                        .filter(line => line.includes(' pv '))
                        .map(line => {
                            const pvIndex = line.indexOf(' pv ');
                            return line.substring(pvIndex + 4).split(' ')[0];
                        });
                    
                    if (lines.length > 1) {
                    // Weight moves by their quality (prefer better moves, but sometimes choose worse ones)
                    const moveIndex = Math.floor(Math.pow(Math.random(), 2.5) * Math.min(lines.length, 4));
                    return lines[moveIndex] || bestMove;
                }
            } catch (e) {
                console.log("Error extracting alternative moves", e);
            }
        }

        // Occasionally make a typical human error based on common patterns
        if (Math.random() < 0.15) {
            // Approximate a plausible human move (e.g., moving to adjacent square)
            const fromSquare = bestMove.substring(0, 2);
            const toSquare = bestMove.substring(2, 4);

            // Simple adjustment - occasionally play a shorter move (undershoot)
            if (Math.random() < 0.7) {
                const files = "abcdefgh";
                const ranks = "12345678";
                const fromFile = fromSquare.charAt(0);
                const fromRank = fromSquare.charAt(1);
                const toFile = toSquare.charAt(0);
                const toRank = toSquare.charAt(1);

                // Calculate direction
                const fileDiff = files.indexOf(toFile) - files.indexOf(fromFile);
                const rankDiff = ranks.indexOf(toRank) - ranks.indexOf(fromRank);

                // Sometimes undershoot by one square
                if (Math.abs(fileDiff) > 1 || Math.abs(rankDiff) > 1) {
                    const newToFile = files[files.indexOf(fromFile) + (fileDiff > 0 ? Math.max(1, fileDiff-1) : Math.min(-1, fileDiff+1))];
                    const newToRank = ranks[ranks.indexOf(fromRank) + (rankDiff > 0 ? Math.max(1, rankDiff-1) : Math.min(-1, rankDiff+1))];

                    // Check if the new square is valid
                    if (newToFile && newToRank) {
                        const alternativeMove = fromSquare + newToFile + newToRank;
                        // Verify this is a legal move before returning
                        for (let each=0; each<window.board.game.getLegalMoves().length; each++) {
                            if (window.board.game.getLegalMoves()[each].from === fromSquare &&
                                window.board.game.getLegalMoves()[each].to === newToFile + newToRank) {
                                return alternativeMove;
                            }
                        }
                    }
                }
            }
        }

        return bestMove;
    };
} 