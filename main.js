// Import all modules
import { currentVersion } from './config.js';
import { initializeVariables } from './variables.js';
import { setupEngine } from './engine.js';
import { setupUI } from './ui.js';
import { setupEventHandlers } from './events.js';
import { setupUtilities } from './utilities.js';

// Global variables
window.isThinking = false;
window.canGo = true;
window.myTurn = false;
window.board = null;

function main() {
    // Initialize all components
    const myVars = initializeVariables();
    const myFunctions = setupUtilities(myVars);
    
    // Load settings immediately after initializing utilities
    myFunctions.loadSettings();
    
    const engine = setupEngine(myVars, myFunctions);
    
    document.engine = engine;
    document.myVars = myVars;
    document.myFunctions = myFunctions;
    
    // Setup UI components
    setupUI(myVars, myFunctions, engine);
    
    // Setup event handlers
    setupEventHandlers(myVars, myFunctions, engine);
    
    console.log("Chess.com UltraX bot initialized with version:", currentVersion);
}

// Initialize on window load
window.addEventListener("load", (event) => {
    main();
});

// Main interval for checking game state
const waitForChessBoard = setInterval(() => {
    if (!document.myVars || !document.myFunctions) return;
    
    const myVars = document.myVars;
    const myFunctions = document.myFunctions;
    
    if (myVars.loaded) {
        window.board = $('chess-board')[0] || $('wc-chess-board')[0];
        myVars.autoRun = $('#autoRun')[0].checked;
        myVars.autoMove = $('#autoMove')[0].checked;
        
        let minDel = parseFloat($('#timeDelayMin')[0].value);
        let maxDel = parseFloat($('#timeDelayMax')[0].value);
        myVars.delay = Math.random() * (maxDel - minDel) + minDel;
        myVars.isThinking = window.isThinking;
        
        myFunctions.spinner();
        
        if (window.board.game.getTurn() == window.board.game.getPlayingAs()) {
            window.myTurn = true;
        } else {
            window.myTurn = false;
        }
        
        $('#depthText')[0].innerHTML = "Current Depth: <strong>" + myVars.lastValue + "</strong>";
    } else {
        myFunctions.loadEx();
    }

    if (!document.engine.engine) {
        myFunctions.loadChessEngine();
    }
    
    if (myVars.autoRun == true && window.canGo == true && window.isThinking == false && window.myTurn) {
        window.canGo = false;
        var currentDelay = myVars.delay != undefined ? myVars.delay * 1000 : 10;
        myFunctions.other(currentDelay);
    }
}, 100);
