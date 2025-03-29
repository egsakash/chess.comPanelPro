// Helper functions for mouse movement and bezier curves
export function getBezierPoint(t, p0, p1, p2, p3) {
    const cX = 3 * (p1.x - p0.x);
    const bX = 3 * (p2.x - p1.x) - cX;
    const aX = p3.x - p0.x - cX - bX;
    
    const cY = 3 * (p1.y - p0.y);
    const bY = 3 * (p2.y - p1.y) - cY;
    const aY = p3.y - p0.y - cY - bY;
    
    const x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
    const y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;
    
    return { x, y };
}

export function executeMouseMovement(points, index, delay, callback) {
    if (index >= points.length) {
        if (callback) callback();
        return;
    }
    
    // Simulate mouse movement
    const point = points[index];
    
    // In a real implementation, you would trigger actual mouse events
    // For our purposes, we'll just move to the next point
    setTimeout(() => {
        executeMouseMovement(points, index + 1, delay, callback);
    }, delay);
}

export function getSquarePosition(square) {
    // Convert chess notation (e.g., "e4") to screen coordinates
    // This is a simplified version - in reality, you'd need to get actual board coordinates
    const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = parseInt(square.charAt(1)) - 1;
    
    // Get board dimensions
    const boardRect = window.board.getBoundingClientRect();
    const squareSize = boardRect.width / 8;
    
    // Calculate center of the square
    const x = boardRect.left + (file + 0.5) * squareSize;
    const y = boardRect.top + (7 - rank + 0.5) * squareSize;
    
    return { x, y };
}

export function simulateNaturalMouseMovement(from, to, callback) {
    // Convert chess coordinates to screen positions
    const fromPos = getSquarePosition(from);
    const toPos = getSquarePosition(to);

    // Create a bezier curve path with a slight variance
    const controlPoint1 = {
        x: fromPos.x + (toPos.x - fromPos.x) * 0.3 + (Math.random() * 40 - 20),
        y: fromPos.y + (toPos.y - fromPos.y) * 0.1 + (Math.random() * 40 - 20)
    };

    const controlPoint2 = {
        x: fromPos.x + (toPos.x - fromPos.x) * 0.7 + (Math.random() * 40 - 20),
        y: fromPos.y + (toPos.y - fromPos.y) * 0.9 + (Math.random() * 40 - 20)
    };

    // Calculate movement duration based on distance
    const distance = Math.sqrt(Math.pow(toPos.x - fromPos.x, 2) + Math.pow(toPos.y - fromPos.y, 2));
    const baseDuration = 300 + Math.random() * 400;
    const movementDuration = baseDuration + distance * (0.5 + Math.random() * 0.5);

    // Create array of points along path
    const steps = 15 + Math.floor(distance / 30);
    const points = [];

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        points.push(getBezierPoint(t, fromPos, controlPoint1, controlPoint2, toPos));
    }

    // Execute the movement with variable speed
    executeMouseMovement(points, 0, movementDuration / steps, callback);
} 