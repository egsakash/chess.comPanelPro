// Configuration constants
export const currentVersion = '1.0.0.5';

export function getRandomTacticalStrength() {
    const strengths = [
        'fork', 'pin', 'skewer', 'discovery', 'zwischenzug',
        'removing-defender', 'attraction'
    ];
    return strengths[Math.floor(Math.random() * strengths.length)];
}

export function getRandomTacticalWeakness() {
    const weaknesses = [
        'long-calculation', 'quiet-moves', 'backward-moves',
        'zugzwang', 'prophylaxis', 'piece-coordination'
    ];
    return weaknesses[Math.floor(Math.random() * weaknesses.length)];
}

export function getRandomOpenings(count, experimental = false) {
    // Placeholder function - would need implementation
    return ["e4", "d4", "c4"].slice(0, count);
}

export function getRandomResponses(opening, count) {
    // Placeholder function - would need implementation
    return ["e5", "c5", "e6"].slice(0, count);
} 