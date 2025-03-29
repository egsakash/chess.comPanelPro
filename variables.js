import { getRandomTacticalStrength, getRandomTacticalWeakness } from './config.js';

export function initializeVariables() {
    const myVars = {
        autoMovePiece: false,
        autoRun: false,
        delay: 0.1,
        loaded: false,
        lastValue: 11,
        
        playStyle: {
            aggressive: Math.random() * 0.5 + 0.3,  // 0.3-0.8 tendency for aggressive moves
            defensive: Math.random() * 0.5 + 0.3,   // 0.3-0.8 tendency for defensive moves
            tactical: Math.random() * 0.6 + 0.2,    // 0.2-0.8 tendency for tactical moves
            positional: Math.random() * 0.6 + 0.2   // 0.2-0.8 tendency for positional moves
        },
        
        preferredOpenings: [
            "e4", "d4", "c4", "Nf3"   // Just examples, could be expanded
        ].sort(() => Math.random() - 0.5), // Randomize the order
        
        playerFingerprint: GM_getValue('playerFingerprint', {
            favoredPieces: Math.random() < 0.5 ? 'knights' : 'bishops',
            openingTempo: Math.random() * 0.5 + 0.5, // 0.5-1.0 opening move speed
            tacticalAwareness: Math.random() * 0.4 + 0.6, // 0.6-1.0 tactical vision
            exchangeThreshold: Math.random() * 0.3 + 0.1, // When to accept exchanges
            attackingStyle: ['kingside', 'queenside', 'central'][Math.floor(Math.random() * 3)]
        }),
        
        tacticalProfile: GM_getValue('tacticalProfile', {
            strengths: [
                getRandomTacticalStrength(),
                getRandomTacticalStrength()
            ],
            weaknesses: [
                getRandomTacticalWeakness(),
                getRandomTacticalWeakness()
            ]
        }),
        
        psychologicalState: {
            confidence: 0.7 + Math.random() * 0.3,  // 0.7-1.0
            tiltFactor: 0,                         // 0-1, increases with blunders
            focus: 0.8 + Math.random() * 0.2,      // 0.8-1.0, decreases with time
            playTime: 0                            // tracks continuous play time
        }
    };
    
    // Save on first run
    if (!GM_getValue('playerFingerprint')) {
        GM_setValue('playerFingerprint', myVars.playerFingerprint);
    }
    
    // Save on first run
    if (!GM_getValue('tacticalProfile')) {
        GM_setValue('tacticalProfile', myVars.tacticalProfile);
    }
    
    return myVars;
} 