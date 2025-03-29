export function setupEngine(myVars, myFunctions) {
    const engine = {
        engine: null
    };
    
    myFunctions.loadChessEngine = function() {
        if(!engine.stockfishObjectURL) {
            engine.stockfishObjectURL = URL.createObjectURL(new Blob([GM_getResourceText('stockfish.js')], {type: 'application/javascript'}));
        }
        
        console.log(engine.stockfishObjectURL);
        
        if(engine.stockfishObjectURL) {
            engine.engine = new Worker(engine.stockfishObjectURL);

            engine.engine.onmessage = e => {
                myFunctions.parser(e);
            };
            
            engine.engine.onerror = e => {
                console.log("Worker Error: "+e);
            };

            engine.engine.postMessage('ucinewgame');
        }
        
        console.log('loaded chess engine');
    };
    
    myFunctions.reloadChessEngine = function() {
        console.log(`Reloading the chess engine!`);

        engine.engine.terminate();
        window.isThinking = false;
        myFunctions.loadChessEngine();
    };
    
    myFunctions.runChessEngine = function(depth) {
        // Get time-adjusted depth
        var adjustedDepth = myFunctions.getAdjustedDepth();
        
        // Get position type
        var fen = window.board.game.getFEN();
        var positionType = myFunctions.analyzePositionType(fen);
        
        // Log the depth adjustment
        console.log(`Original depth: ${depth}, Adjusted for time/position: ${adjustedDepth}`);
        
        engine.engine.postMessage(`position fen ${fen}`);
        console.log('updated: ' + `position fen ${fen}`);
        window.isThinking = true;
        
        // Use multipv for alternative moves when depth is high
        if (depth >= 15) {
            engine.engine.postMessage(`setoption name MultiPV value 5`);
        } else {
            engine.engine.postMessage(`setoption name MultiPV value 1`);
        }
        
        engine.engine.postMessage(`go depth ${adjustedDepth}`);
        myVars.lastValue = depth; // Keep original depth for UI display
    };
    
    myFunctions.autoRun = function(lstValue) {
        if(window.board.game.getTurn() == window.board.game.getPlayingAs()) {
            myFunctions.runChessEngine(lstValue);
        }
    };
    
    return engine;
} 