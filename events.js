import { setupUIEventHandlers } from './events/ui-events.js';
import { setupStyleEventHandlers } from './events/style-events.js';
import { setupAdvancedEventHandlers } from './events/advanced-events.js';

export function setupEventHandlers(myVars, myFunctions, engine) {
    // Keyboard event handler
    document.onkeydown = function(e) {
        if (!myVars.enableHotkeys) return;
        
        switch (e.keyCode) {
            case 81: myFunctions.runChessEngine(1); break;
            case 87: myFunctions.runChessEngine(2); break;
            case 69: myFunctions.runChessEngine(3); break;
            case 82: myFunctions.runChessEngine(4); break;
            case 84: myFunctions.runChessEngine(5); break;
            case 89: myFunctions.runChessEngine(6); break;
            case 85: myFunctions.runChessEngine(7); break;
            case 73: myFunctions.runChessEngine(8); break;
            case 79: myFunctions.runChessEngine(9); break;
            case 80: myFunctions.runChessEngine(10); break;
            case 65: myFunctions.runChessEngine(11); break;
            case 83: myFunctions.runChessEngine(12); break;
            case 68: myFunctions.runChessEngine(13); break;
            case 70: myFunctions.runChessEngine(14); break;
            case 71: myFunctions.runChessEngine(15); break;
            case 72: myFunctions.runChessEngine(16); break;
            case 74: myFunctions.runChessEngine(17); break;
            case 75: myFunctions.runChessEngine(18); break;
            case 76: myFunctions.runChessEngine(19); break;
            case 90: myFunctions.runChessEngine(20); break;
            case 88: myFunctions.runChessEngine(21); break;
            case 67: myFunctions.runChessEngine(22); break;
            case 86: myFunctions.runChessEngine(23); break;
            case 66: myFunctions.runChessEngine(24); break;
            case 78: myFunctions.runChessEngine(25); break;
            case 77: myFunctions.runChessEngine(26); break;
            case 187: myFunctions.runChessEngine(100); break;
        }
    };
    
    // Setup UI event handlers when document is ready
    $(document).ready(function() {
        setupUIEventHandlers(myVars, myFunctions);
        setupStyleEventHandlers(myVars, myFunctions);
        setupAdvancedEventHandlers(myVars, myFunctions);
    });
} 