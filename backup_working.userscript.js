// ==UserScript==
// additional copyright/license info:
//© All Rights Reserved
//
//Chess.com Bot/Cheat © 2025 by GoodtimeswithEno
//
// ==UserScript
// @name         Chess.com Assistant Pro
// @namespace    GoodtimeswithEno
// @version      1.2.9.4
// @description  Chess.com Bot/Cheat that finds the best move!
// @author       GoodtmieswithEno
// @license      Chess.com Bot/Cheat © 2025 by GoodtimeswithEno, © All Rights Reserved
// @match       https://www.chess.com/play/*
// @match       https://www.chess.com/game/*
// @match       https://www.chess.com/puzzles/*
// @match       https://www.chess.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceText
// @grant       GM_registerMenuCommand
// @resource    stockfish.js        https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/9.0.0/stockfish.js
// @require     https://greasyfork.org/scripts/445697/code/index.js
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @run-at      document-start
// @liscense MIT

// @downloadURL https://update.greasyfork.org/scripts/530233/Chesscom%20BotCheata.user.js
// @updateURL https://update.greasyfork.org/scripts/530233/Chesscom%20BotCheata.meta.js
// ==/UserScript==

//Don't touch anything below unless you know what your doing!

const currentVersion = '1.2.9.3'; // Sets the current version

function main() {

    var stockfishObjectURL;
    var engine = document.engine = {};
    var myVars = document.myVars = {};
    myVars.autoMovePiece = false;
    myVars.autoRun = false;
    myVars.delay = 0.1;
    var myFunctions = document.myFunctions = {};

    myVars.playStyle = {
        aggressive: Math.random() * 0.5 + 0.3,  // 0.3-0.8 tendency for aggressive moves
        defensive: Math.random() * 0.5 + 0.3,   // 0.3-0.8 tendency for defensive moves
        tactical: Math.random() * 0.6 + 0.2,    // 0.2-0.8 tendency for tactical moves
        positional: Math.random() * 0.6 + 0.2   // 0.2-0.8 tendency for positional moves
    };

    myVars.preferredOpenings = [
        "e4", "d4", "c4", "Nf3"   // Just examples, could be expanded
    ].sort(() => Math.random() - 0.5); // Randomize the order

    stop_b = stop_w = 0;
    s_br = s_br2 = s_wr = s_wr2 = 0;
    obs = "";
    myFunctions.rescan = function(lev) {
        var ari = $("chess-board")
        .find(".piece")
        .map(function() {
            return this.className;
        })
        .get();
        jack = ari.map(f => f.substring(f.indexOf(' ') + 1));
        function removeWord(arr, word) {
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].replace(word, '');
            }
        }
        removeWord(ari, 'square-');
        jack = ari.map(f => f.substring(f.indexOf(' ') + 1));
        for (var i = 0; i < jack.length; i++) {
            jack[i] = jack[i].replace('br', 'r')
                .replace('bn', 'n')
                .replace('bb', 'b')
                .replace('bq', 'q')
                .replace('bk', 'k')
                .replace('bb', 'b')
                .replace('bn', 'n')
                .replace('br', 'r')
                .replace('bp', 'p')
                .replace('wp', 'P')
                .replace('wr', 'R')
                .replace('wn', 'N')
                .replace('wb', 'B')
                .replace('br', 'R')
                .replace('wn', 'N')
                .replace('wb', 'B')
                .replace('wq', 'Q')
                .replace('wk', 'K')
                .replace('wb', 'B')
        }
        str2 = "";
        var count = 0,
            str = "";
        for (var j = 8; j > 0; j--) {
            for (var i = 1; i < 9; i++) {
                (str = (jack.find(el => el.includes([i] + [j])))) ? str = str.replace(/[^a-zA-Z]+/g, ''): str = "";
                if (str == "") {
                    count++;
                    str = count.toString();
                    if (!isNaN(str2.charAt(str2.length - 1))) str2 = str2.slice(0, -1);
                    else {
                        count = 1;
                        str = count.toString()
                    }
                }
                str2 += str;
                if (i == 8) {
                    count = 0;
                    str2 += "/";
                }
            }
        }
        str2 = str2.slice(0, -1);
        //str2=str2+" KQkq - 0"
        color = "";
        wk = wq = bk = bq = "0";
        const move = $('vertical-move-list')
        .children();
        if (move.length < 2) {
            stop_b = stop_w = s_br = s_br2 = s_wr = s_wr2 = 0;
        }
        if (stop_b != 1) {
            if (move.find(".black.node:contains('K')")
                .length) {
                bk = "";
                bq = "";
                stop_b = 1;
                console.log('debug secb');
            }
        } else {
            bq = "";
            bk = "";
        }
        if (stop_b != 1)(bk = (move.find(".black.node:contains('O-O'):not(:contains('O-O-O'))")
                               .length) ? "" : "k") ? (bq = (move.find(".black.node:contains('O-O-O')")
                                                             .length) ? bk = "" : "q") : bq = "";
        if (s_br != 1) {
            if (move.find(".black.node:contains('R')")
                .text()
                .match('[abcd]+')) {
                bq = "";
                s_br = 1
            }
        } else bq = "";
        if (s_br2 != 1) {
            if (move.find(".black.node:contains('R')")
                .text()
                .match('[hgf]+')) {
                bk = "";
                s_br2 = 1
            }
        } else bk = "";
        if (stop_b == 0) {
            if (s_br == 0)
                if (move.find(".white.node:contains('xa8')")
                    .length > 0) {
                    bq = "";
                    s_br = 1;
                    console.log('debug b castle_r');
                }
            if (s_br2 == 0)
                if (move.find(".white.node:contains('xh8')")
                    .length > 0) {
                    bk = "";
                    s_br2 = 1;
                    console.log('debug b castle_l');
                }
        }
        if (stop_w != 1) {
            if (move.find(".white.node:contains('K')")
                .length) {
                wk = "";
                wq = "";
                stop_w = 1;
                console.log('debug secw');
            }
        } else {
            wq = "";
            wk = "";
        }
        if (stop_w != 1)(wk = (move.find(".white.node:contains('O-O'):not(:contains('O-O-O'))")
                               .length) ? "" : "K") ? (wq = (move.find(".white.node:contains('O-O-O')")
                                                             .length) ? wk = "" : "Q") : wq = "";
        if (s_wr != 1) {
            if (move.find(".white.node:contains('R')")
                .text()
                .match('[abcd]+')) {
                wq = "";
                s_wr = 1
            }
        } else wq = "";
        if (s_wr2 != 1) {
            if (move.find(".white.node:contains('R')")
                .text()
                .match('[hgf]+')) {
                wk = "";
                s_wr2 = 1
            }
        } else wk = "";
        if (stop_w == 0) {
            if (s_wr == 0)
                if (move.find(".black.node:contains('xa1')")
                    .length > 0) {
                    wq = "";
                    s_wr = 1;
                    console.log('debug w castle_l');
                }
            if (s_wr2 == 0)
                if (move.find(".black.node:contains('xh1')")
                    .length > 0) {
                    wk = "";
                    s_wr2 = 1;
                    console.log('debug w castle_r');
                }
        }
        if ($('.coordinates')
            .children()
            .first()
            .text() == 1) {
            str2 = str2 + " b " + wk + wq + bk + bq;
            color = "white";
        } else {
            str2 = str2 + " w " + wk + wq + bk + bq;
            color = "black";
        }
        //console.log(str2);
        return str2;
    }
    myFunctions.color = function(dat){
        response = dat;
        var res1 = response.substring(0, 2);
        var res2 = response.substring(2, 4);

        if(myVars.autoMove == true){
            myFunctions.movePiece(res1, res2);
        }
        isThinking = false;

        res1 = res1.replace(/^a/, "1")
            .replace(/^b/, "2")
            .replace(/^c/, "3")
            .replace(/^d/, "4")
            .replace(/^e/, "5")
            .replace(/^f/, "6")
            .replace(/^g/, "7")
            .replace(/^h/, "8");
        res2 = res2.replace(/^a/, "1")
            .replace(/^b/, "2")
            .replace(/^c/, "3")
            .replace(/^d/, "4")
            .replace(/^e/, "5")
            .replace(/^f/, "6")
            .replace(/^g/, "7")
            .replace(/^h/, "8");

        // Use custom highlight color if available
        const highlightColor = myVars.highlightColor || 'rgb(235, 97, 80)';

        $(board.nodeName)
            .prepend(`<div class="highlight square-${res2} bro" style="background-color: ${highlightColor}; opacity: 0.71;" data-test-element="highlight"></div>`)
            .children(':first')
            .delay(1800)
            .queue(function() {
            $(this)
                .remove();
        });
        $(board.nodeName)
            .prepend(`<div class="highlight square-${res1} bro" style="background-color: ${highlightColor}; opacity: 0.71;" data-test-element="highlight"></div>`)
            .children(':first')
            .delay(1800)
            .queue(function() {
            $(this)
                .remove();
        });
    }

    myFunctions.movePiece = function(from, to) {
        // Add human-like mouse movement and variable timing
        setTimeout(() => {
            // Calculate a realistic thinking time based on position complexity
            const moveComplexity = calculateMoveComplexity(from, to);
            const humanLikeDelay = calculateHumanLikeDelay(moveComplexity);

            setTimeout(() => {
                // Simulate a more organic mouse movement pattern
                simulateNaturalMouseMovement(from, to, () => {
                    // Only after movement simulation is complete, make the actual move
                    for (var each=0; each<board.game.getLegalMoves().length; each++) {
                        if(board.game.getLegalMoves()[each].from == from) {
                            if(board.game.getLegalMoves()[each].to == to) {
                                var move = board.game.getLegalMoves()[each];
                                board.game.move({
                                    ...move,
                                    promotion: move.promotion || 'q', // Default to queen for simplicity
                                    animate: true,
                                    userGenerated: true
                                });
                            }
                        }
                    }
                });
            }, humanLikeDelay);
        }, getRandomThinkingDelay());
    }

    function simulateNaturalMouseMovement(from, to, callback) {
        // This function would normally simulate realistic mouse movement
        // For simplicity here, we're just adding a delay
        // In a real implementation, this could use bezier curves to create realistic mouse paths

        // Simplified version just adds variable delays
        const movementTime = 300 + Math.random() * 700;
        setTimeout(callback, movementTime);
    }

    // Add these functions for more realistic timing
    function calculateMoveComplexity(from, to) {
        // Approximate complexity based on piece type, capture, check, etc.
        // Returns a value between 0 (simple) and 1 (complex)
        return Math.random() * 0.7 + 0.3; // Placeholder implementation
    }

    function calculateHumanLikeDelay(complexity) {
        // More complex positions take longer to think about
        const baseDelay = 500; // Base delay in ms
        const complexityFactor = 2500; // Max additional delay for complex positions
        return baseDelay + (complexity * complexityFactor * Math.random());
    }

    function getRandomThinkingDelay() {
        // Humans don't immediately start calculating
        return 300 + Math.random() * 700;
    }

    function parser(e) {
        if(e.data.includes('bestmove')) {
            const bestMove = e.data.split(' ')[1];

            // Sometimes make a "human-like" suboptimal move
            const shouldMakeHumanMove = Math.random() < getBlunderProbability();
            if (shouldMakeHumanMove && e.data.includes('ponder')) {
                // Try to extract alternative moves or generate a plausible suboptimal move
                const actualMove = generateHumanLikeMove(bestMove, e.data);
                console.log(`Using human-like move ${actualMove} instead of best move ${bestMove}`);
                myFunctions.color(actualMove);
            } else {
                console.log(bestMove);
                myFunctions.color(bestMove);
            }
            isThinking = false;
        }
    }

    function getBlunderProbability() {
        // Use custom blunder rate from slider if available
        const userBlunderRate = myVars.blunderRate !== undefined ? myVars.blunderRate : 0.05;

        // Make blunder probability vary based on multiple factors
        const gamePhase = estimateGamePhase();
        const timeRemaining = estimateTimeRemaining();
        const complexity = estimatePositionComplexity();

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
    }

    function estimateGamePhase() {
        // Estimate how far the game has progressed (0-40 approx)
        try {
            const moveList = $('vertical-move-list').children().length;
            return moveList / 2; // Rough estimate of move number
        } catch (e) {
            return 15; // Default to middle game
        }
    }

    function estimateTimeRemaining() {
        // Try to get the clock time if available
        try {
            const clockEl = document.querySelector('.clock-component');
            if (clockEl) {
                const timeText = clockEl.textContent;
                const minutes = parseInt(timeText.split(':')[0]);
                const seconds = parseInt(timeText.split(':')[1]);
                return minutes * 60 + seconds;
            }
        } catch (e) {}

        // Default value if clock can't be read
        return 180;
    }

    function estimatePositionComplexity() {
        // Calculate a complexity score between 0-1
        // This would ideally analyze the position for tactical elements
        return Math.random() * 0.8 + 0.2; // Placeholder
    }

    function generateHumanLikeMove(bestMove, engineData) {
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
                        for (let each=0; each<board.game.getLegalMoves().length; each++) {
                            if (board.game.getLegalMoves()[each].from === fromSquare &&
                                board.game.getLegalMoves()[each].to === newToFile + newToRank) {
                                return alternativeMove;
                            }
                        }
                    }
                }
            }
        }

        return bestMove;
    }

    myFunctions.reloadChessEngine = function() {
        console.log(`Reloading the chess engine!`);

        engine.engine.terminate();
        isThinking = false;
        myFunctions.loadChessEngine();
    }

    myFunctions.loadChessEngine = function() {
        if(!stockfishObjectURL) {
            stockfishObjectURL = URL.createObjectURL(new Blob([GM_getResourceText('stockfish.js')], {type: 'application/javascript'}));
        }
        console.log(stockfishObjectURL);
        if(stockfishObjectURL) {
            engine.engine = new Worker(stockfishObjectURL);

            engine.engine.onmessage = e => {
                parser(e);
            };
            engine.engine.onerror = e => {
                console.log("Worker Error: "+e);
            };

            engine.engine.postMessage('ucinewgame');
        }
        console.log('loaded chess engine');
    }

    var lastValue = 11;
    myFunctions.runChessEngine = function(depth) {
        // Add variable depth based on position type
        var fen = board.game.getFEN();
        var positionType = analyzePositionType(fen);
        var effectiveDepth = adjustDepthByPosition(depth, positionType);

        engine.engine.postMessage(`position fen ${fen}`);
        console.log('updated: ' + `position fen ${fen}`);
        isThinking = true;
        engine.engine.postMessage(`go depth ${effectiveDepth}`);
        lastValue = depth; // Keep original depth for UI display
    }

    function analyzePositionType(fen) {
        // Determine position type: opening, middlegame, endgame, tactical
        const piecesCount = fen.split(' ')[0].match(/[pnbrqkPNBRQK]/g).length;

        if (piecesCount > 25) return 'opening';
        if (piecesCount < 12) return 'endgame';
        return 'middlegame';
    }

    function adjustDepthByPosition(requestedDepth, positionType) {
        // Humans play more accurately in different phases
        if (positionType === 'opening' && Math.random() < 0.7) {
            // In openings, humans often play memorized moves
            return requestedDepth + Math.floor(Math.random() * 3);
        } else if (positionType === 'endgame' && Math.random() < 0.5) {
            // In endgames, calculation may be more/less precise
            return requestedDepth + (Math.random() < 0.5 ? -1 : 1);
        }

        // Occasionally randomize depth slightly
        return Math.max(1, requestedDepth + (Math.random() < 0.3 ? Math.floor(Math.random() * 3) - 1 : 0));
    }

    myFunctions.autoRun = function(lstValue){
        if(board.game.getTurn() == board.game.getPlayingAs()){
            myFunctions.runChessEngine(lstValue);
        }
    }

    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 81:
                myFunctions.runChessEngine(1);
                break;
            case 87:
                myFunctions.runChessEngine(2);
                break;
            case 69:
                myFunctions.runChessEngine(3);
                break;
            case 82:
                myFunctions.runChessEngine(4);
                break;
            case 84:
                myFunctions.runChessEngine(5);
                break;
            case 89:
                myFunctions.runChessEngine(6);
                break;
            case 85:
                myFunctions.runChessEngine(7);
                break;
            case 73:
                myFunctions.runChessEngine(8);
                break;
            case 79:
                myFunctions.runChessEngine(9);
                break;
            case 80:
                myFunctions.runChessEngine(10);
                break;
            case 65:
                myFunctions.runChessEngine(11);
                break;
            case 83:
                myFunctions.runChessEngine(12);
                break;
            case 68:
                myFunctions.runChessEngine(13);
                break;
            case 70:
                myFunctions.runChessEngine(14);
                break;
            case 71:
                myFunctions.runChessEngine(15);
                break;
            case 72:
                myFunctions.runChessEngine(16);
                break;
            case 74:
                myFunctions.runChessEngine(17);
                break;
            case 75:
                myFunctions.runChessEngine(18);
                break;
            case 76:
                myFunctions.runChessEngine(19);
                break;
            case 90:
                myFunctions.runChessEngine(20);
                break;
            case 88:
                myFunctions.runChessEngine(21);
                break;
            case 67:
                myFunctions.runChessEngine(22);
                break;
            case 86:
                myFunctions.runChessEngine(23);
                break;
            case 66:
                myFunctions.runChessEngine(24);
                break;
            case 78:
                myFunctions.runChessEngine(25);
                break;
            case 77:
                myFunctions.runChessEngine(26);
                break;
            case 187:
                myFunctions.runChessEngine(100);
                break;
        }
    };

    myFunctions.spinner = function() {
        if(isThinking == true){
            $('#thinking-indicator').addClass('active');
        }
        if(isThinking == false) {
            $('#thinking-indicator').removeClass('active');
        }
    }

    let dynamicStyles = null;

    function addAnimation(body) {
        if (!dynamicStyles) {
            dynamicStyles = document.createElement('style');
            dynamicStyles.type = 'text/css';
            document.head.appendChild(dynamicStyles);
        }

        dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
    }

    var loaded = false;
    myFunctions.loadEx = function(){
        try{
            var tmpStyle;
            var tmpDiv;
            board = $('chess-board')[0] || $('wc-chess-board')[0];
            myVars.board = board;

            var div = document.createElement('div')
            var content = `
            <div class="chess-bot-container">
                <div class="bot-header">
                    <div class="bot-logo">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M19,22H5V20H19V22M17,10C15.58,10 14.26,10.77 13.55,12H13V7H16V5H13V2H11V5H8V7H11V12H10.45C9.74,10.77 8.42,10 7,10A5,5 0 0,0 2,15A5,5 0 0,0 7,20H17A5,5 0 0,0 22,15A5,5 0 0,0 17,10M7,18A3,3 0 0,1 4,15A3,3 0 0,1 7,12A3,3 0 0,1 10,15A3,3 0 0,1 7,18M17,18A3,3 0 0,1 14,15A3,3 0 0,1 17,12A3,3 0 0,1 20,15A3,3 0 0,1 17,18Z" />
                        </svg>
                    </div>
                    <h3 class="bot-title">Chess.com Assistant Pro</h3>
                    <div id="thinking-indicator" class="thinking-indicator">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                    </div>
                </div>

                <div class="bot-tabs">
                    <button class="tab-button active" data-tab="main-settings">Main</button>
                    <button class="tab-button" data-tab="style-settings">Play Style</button>
                    <button class="tab-button" data-tab="advanced-settings">Advanced</button>
                </div>

                <div class="bot-tabs-content">
                    <div class="tab-content active" id="main-settings">
                        <div class="bot-info">
                            <div class="depth-card">
                                <p id="depthText" class="depth-display">Current Depth: <strong>11</strong></p>
                                <p class="key-hint">Press a key (Q-Z) to change depth</p>

                                <div class="depth-control">
                                    <label for="depthSlider">Depth/ELO:</label>
                                    <div class="slider-controls">
                                        <button class="depth-button" id="decreaseDepth">-</button>
                                        <input type="range" id="depthSlider" min="1" max="26" value="11" class="depth-slider">
                                        <button class="depth-button" id="increaseDepth">+</button>
                                    </div>
                                    <span id="depthValue">11</span>
                                </div>
                            </div>
                        </div>

                        <div class="bot-controls">
                            <div class="control-group">
                                <div class="control-item toggle-container">
                                    <input type="checkbox" id="autoRun" name="autoRun" class="toggle-input" value="false">
                                    <label for="autoRun" class="toggle-label">
                                        <span class="toggle-button"></span>
                                        <span class="toggle-text">Auto Run</span>
                                    </label>
                                </div>

                                <div class="control-item toggle-container">
                                    <input type="checkbox" id="autoMove" name="autoMove" class="toggle-input" value="false">
                                    <label for="autoMove" class="toggle-label">
                                        <span class="toggle-button"></span>
                                        <span class="toggle-text">Auto Move</span>
                                    </label>
                                </div>
                            </div>

                            <div class="control-group">
                                <div class="control-item slider-container">
                                    <label for="timeDelayMin">Min Delay (sec)</label>
                                    <input type="number" id="timeDelayMin" name="timeDelayMin" min="0.1" value="0.1" step="0.1" class="number-input">
                                </div>

                                <div class="control-item slider-container">
                                    <label for="timeDelayMax">Max Delay (sec)</label>
                                    <input type="number" id="timeDelayMax" name="timeDelayMax" min="0.1" value="1" step="0.1" class="number-input">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content" id="style-settings">
                        <div class="playStyle-controls">
                            <h4 class="settings-section-title">Playing Style Settings</h4>

                            <div class="style-slider-container">
                                <label for="aggressiveSlider">Aggressive Play:</label>
                                <input type="range" id="aggressiveSlider" min="1" max="10" value="5" class="style-slider">
                                <span id="aggressiveValue">5</span>
                            </div>

                            <div class="style-slider-container">
                                <label for="defensiveSlider">Defensive Play:</label>
                                <input type="range" id="defensiveSlider" min="1" max="10" value="5" class="style-slider">
                                <span id="defensiveValue">5</span>
                            </div>

                            <div class="style-slider-container">
                                <label for="tacticalSlider">Tactical Play:</label>
                                <input type="range" id="tacticalSlider" min="1" max="10" value="5" class="style-slider">
                                <span id="tacticalValue">5</span>
                            </div>

                            <div class="style-slider-container">
                                <label for="positionalSlider">Positional Play:</label>
                                <input type="range" id="positionalSlider" min="1" max="10" value="5" class="style-slider">
                                <span id="positionalValue">5</span>
                            </div>

                            <div class="style-slider-container">
                                <label for="blunderRateSlider">Blunder Rate:</label>
                                <input type="range" id="blunderRateSlider" min="0" max="10" value="2" class="style-slider">
                                <span id="blunderRateValue">2</span>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content" id="advanced-settings">
                        <div class="advanced-controls">
                            <h4 class="settings-section-title">Advanced Settings</h4>

                            <div class="control-item toggle-container">
                                <input type="checkbox" id="adaptToRating" name="adaptToRating" class="toggle-input" value="true" checked>
                                <label for="adaptToRating" class="toggle-label">
                                    <span class="toggle-button"></span>
                                    <span class="toggle-text">Adapt to opponent rating</span>
                                </label>
                            </div>

                            <div class="control-item toggle-container">
                                <input type="checkbox" id="useOpeningBook" name="useOpeningBook" class="toggle-input" value="true" checked>
                                <label for="useOpeningBook" class="toggle-label">
                                    <span class="toggle-button"></span>
                                    <span class="toggle-text">Use personalized openings</span>
                                </label>
                            </div>

                            <div class="highlight-color-picker">
                                <label for="highlightColor">Move highlight color:</label>
                                <input type="color" id="highlightColor" value="#eb6150" class="color-input">
                            </div>

                            <div class="opening-selection">
                                <label for="preferredOpeningSelect">Preferred Opening:</label>
                                <select id="preferredOpeningSelect" class="select-input">
                                    <option value="random">Random</option>
                                    <option value="e4">e4 (King's Pawn)</option>
                                    <option value="d4">d4 (Queen's Pawn)</option>
                                    <option value="c4">c4 (English)</option>
                                    <option value="Nf3">Nf3 (Réti)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bot-actions">
                    <button type="button" id="relEngBut" class="action-button primary-button" onclick="document.myFunctions.reloadChessEngine()">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
                        </svg>
                        Reload Engine
                    </button>

                    <button type="button" id="isBut" class="action-button secondary-button" onclick="window.confirm('Can I take you to the issues page?') ? document.location = 'https://github.com/Auzgame/userscripts/issues' : console.log('canceled')">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                        </svg>
                        Report Issue
                    </button>
                </div>
            </div>`;
            div.innerHTML = content;
            div.setAttribute('id','settingsContainer');

            board.parentElement.parentElement.appendChild(div);

            //Add CSS styles
            var botStyles = document.createElement('style');
            botStyles.innerHTML = `
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

                #settingsContainer {
                    background-color: #1e1e2e;
                    color: #cdd6f4;
                    border-radius: 12px;
                    padding: 20px;
                    margin-top: 15px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
                    font-family: 'Roboto', sans-serif;
                    max-width: 400px;
                    margin-left: auto;
                    margin-right: auto;
                    border: 1px solid #313244;
                }

                .chess-bot-container {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .bot-header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 5px;
                    position: relative;
                }

                .bot-logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #89b4fa;
                }

                .bot-title {
                    margin: 0;
                    color: #89b4fa;
                    font-size: 20px;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                }

                .thinking-indicator {
                    position: absolute;
                    right: 0;
                    display: none;
                    align-items: center;
                }

                .thinking-indicator.active {
                    display: flex;
                }

                .dot {
                    width: 8px;
                    height: 8px;
                    margin: 0 2px;
                    background-color: #89b4fa;
                    border-radius: 50%;
                    opacity: 0.6;
                }

                .dot1 {
                    animation: pulse 1.5s infinite;
                }

                .dot2 {
                    animation: pulse 1.5s infinite 0.3s;
                }

                .dot3 {
                    animation: pulse 1.5s infinite 0.6s;
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    50% {
                        transform: scale(1.3);
                        opacity: 1;
                    }
                }

                .bot-tabs {
                    display: flex;
                    gap: 2px;
                    margin-bottom: -15px;
                }

                .tab-button {
                    background-color: #313244;
                    color: #a6adc8;
                    border: none;
                    border-radius: 8px 8px 0 0;
                    padding: 8px 16px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s;
                    flex: 1;
                    text-align: center;
                }

                .tab-button:hover {
                    background-color: #45475a;
                    color: #cdd6f4;
                }

                .tab-button.active {
                    background-color: #45475a;
                    color: #cdd6f4;
                }

                .bot-tabs-content {
                    background-color: #45475a;
                    border-radius: 0 8px 8px 8px;
                    padding: 16px;
                }

                .tab-content {
                    display: none;
                }

                .tab-content.active {
                    display: block;
                }

                .settings-section-title {
                    margin-top: 0;
                    margin-bottom: 12px;
                    color: #89b4fa;
                    font-size: 16px;
                    font-weight: 500;
                    text-align: center;
                }

                .bot-info {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 5px;
                }

                .depth-card {
                    background-color: #313244;
                    border-radius: 8px;
                    padding: 12px 16px;
                    text-align: center;
                    width: 100%;
                    border: 1px solid #45475a;
                }

                .depth-display {
                    font-size: 16px;
                    margin: 0 0 5px 0;
                    font-weight: 400;
                }

                .depth-display strong {
                    color: #89b4fa;
                    font-weight: 600;
                }

                .key-hint {
                    font-size: 12px;
                    color: #a6adc8;
                    margin: 0;
                    font-weight: 300;
                }

                .bot-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .control-group {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .control-item {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .toggle-container {
                    position: relative;
                }

                .toggle-input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                    position: absolute;
                }

                .toggle-label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                }

                .toggle-button {
                    position: relative;
                    display: inline-block;
                    width: 40px;
                    height: 20px;
                    background-color: #45475a;
                    border-radius: 20px;
                    transition: all 0.3s;
                }

                .toggle-button:before {
                    content: '';
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: #cdd6f4;
                    top: 2px;
                    left: 2px;
                    transition: all 0.3s;
                }

                .toggle-input:checked + .toggle-label .toggle-button {
                    background-color: #89b4fa;
                }

                .toggle-input:checked + .toggle-label .toggle-button:before {
                    transform: translateX(20px);
                }

                .toggle-text {
                    font-size: 14px;
                }

                .slider-container {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .slider-container label {
                    font-size: 13px;
                    color: #a6adc8;
                }

                .number-input {
                    width: 100%;
                    background: #313244;
                    border: 1px solid #45475a;
                    border-radius: 6px;
                    color: #cdd6f4;
                    padding: 8px 10px;
                    font-size: 14px;
                    transition: border-color 0.3s;
                }

                .number-input:focus {
                    outline: none;
                    border-color: #89b4fa;
                }

                .bot-actions {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-top: 5px;
                }

                .action-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border: none;
                    border-radius: 8px;
                    padding: 10px 16px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .primary-button {
                    background-color: #89b4fa;
                    color: #1e1e2e;
                }

                .primary-button:hover {
                    background-color: #b4befe;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(137, 180, 250, 0.3);
                }

                .secondary-button {
                    background-color: #45475a;
                    color: #cdd6f4;
                }

                .secondary-button:hover {
                    background-color: #585b70;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(69, 71, 90, 0.3);
                }

                .action-button:active {
                    transform: translateY(0);
                }

                .depth-control {
                    margin-top: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .depth-control label {
                    font-size: 13px;
                    color: #a6adc8;
                }

                .slider-controls {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .depth-slider {
                    flex: 1;
                    height: 6px;
                    -webkit-appearance: none;
                    appearance: none;
                    background: #45475a;
                    border-radius: 3px;
                    outline: none;
                }

                .depth-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #89b4fa;
                    cursor: pointer;
                }

                .depth-slider::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #89b4fa;
                    cursor: pointer;
                }

                .depth-button {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #45475a;
                    color: #cdd6f4;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                    transition: background-color 0.2s;
                }

                .depth-button:hover {
                    background: #585b70;
                }

                #depthValue {
                    font-size: 14px;
                    font-weight: 500;
                    color: #89b4fa;
                    text-align: center;
                }
            `;
            document.head.appendChild(botStyles);

            //spinnerContainer
            var spinCont = document.createElement('div');
            spinCont.setAttribute('style','display:none;');
            spinCont.setAttribute('id','overlay');
            div.prepend(spinCont);

            //spinner
            var spinr = document.createElement('div')
            spinr.setAttribute('style',`
            margin: 0 auto;
            height: 40px;
            width: 40px;
            animation: rotate 0.8s infinite linear;
            border: 4px solid #89b4fa;
            border-right-color: transparent;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(137, 180, 250, 0.4);
            `);
            spinCont.appendChild(spinr);
            addAnimation(`@keyframes rotate {
                           0% {
                               transform: rotate(0deg);
                              }
                         100% {
                               transform: rotate(360deg);
                              }
                                           }`);
                                           $('#depthSlider').on('input', function() {
                                            const depth = parseInt($(this).val());
                                            $('#depthValue').text(depth);
                                            lastValue = depth;
                                            $('#depthText')[0].innerHTML = "Current Depth: <strong>" + depth + "</strong>";
                                        });

                                        $('#decreaseDepth').on('click', function() {
                                            const currentDepth = parseInt($('#depthSlider').val());
                                            if (currentDepth > 1) {
                                                const newDepth = currentDepth - 1;
                                                $('#depthSlider').val(newDepth).trigger('input');
                                            }
                                        });

                                        $('#increaseDepth').on('click', function() {
                                            const currentDepth = parseInt($('#depthSlider').val());
                                            if (currentDepth < 26) {
                                                const newDepth = currentDepth + 1;
                                                $('#depthSlider').val(newDepth).trigger('input');
                                            }
                                        });

                                        loaded = true;
        } catch (error) {console.log(error)}
    }


    function other(delay) {
        // Create more natural timing pattern based on game situation
        const gamePhase = estimateGamePhase();
        const positionComplexity = estimatePositionComplexity();

        // Apply more realistic timing adjustments
        let naturalDelay = delay;

        // Faster moves in openings
        if (gamePhase < 10) {
            naturalDelay *= (0.6 + Math.random() * 0.4);
        }

        // Slower in complex positions
        if (positionComplexity > 0.7) {
            naturalDelay *= (1 + Math.random() * 1.5);
        }

        // Add slight additional randomness
        naturalDelay *= (0.85 + Math.random() * 0.3);

        var endTime = Date.now() + naturalDelay;
        var timer = setInterval(()=>{
            if(Date.now() >= endTime){
                myFunctions.autoRun(getAdjustedDepth());
                canGo = true;
                clearInterval(timer);
            }
        },10);
    }

    function getAdjustedDepth() {
        // Occasionally vary search depth to mimic human inconsistency
        if (Math.random() < 0.2) {
            return Math.max(1, lastValue + (Math.random() < 0.5 ? -1 : 1));
        }
        return lastValue;
    }

    async function getVersion(){
        var GF = new GreasyFork; // set upping api
        var code = await GF.get().script().code(460208); // Get code
        var version = GF.parseScriptCodeMeta(code).filter(e => e.meta === '@version')[0].value; // filtering array and getting value of @version

        if(currentVersion !== version){
            while(true){
                alert('UPDATE THIS SCRIPT IN ORDER TO PROCEED!');
            }
        }
    }

    //Removed due to script being reported. I tried to make it so people can know when bug fixes come out. Clearly people don't like that.
    //getVersion();

    const waitForChessBoard = setInterval(() => {
        if(loaded) {
            board = $('chess-board')[0] || $('wc-chess-board')[0];
            myVars.autoRun = $('#autoRun')[0].checked;
            myVars.autoMove = $('#autoMove')[0].checked;
            let minDel = parseFloat($('#timeDelayMin')[0].value);
            let maxDel = parseFloat($('#timeDelayMax')[0].value);
            myVars.delay = Math.random() * (maxDel - minDel) + minDel;
            myVars.isThinking = isThinking;
            myFunctions.spinner();
            if(board.game.getTurn() == board.game.getPlayingAs()){myTurn = true;} else {myTurn = false;}
            $('#depthText')[0].innerHTML = "Current Depth: <strong>"+lastValue+"</strong>";
        } else {
            myFunctions.loadEx();
        }


        if(!engine.engine){
            myFunctions.loadChessEngine();
        }
        if(myVars.autoRun == true && canGo == true && isThinking == false && myTurn){
            //console.log(`going: ${canGo} ${isThinking} ${myTurn}`);
            canGo = false;
            var currentDelay = myVars.delay != undefined ? myVars.delay * 1000 : 10;
            other(currentDelay);
        }
    }, 100);
}

//Touching below may break the script

var isThinking = false
var canGo = true;
var myTurn = false;
var board;


window.addEventListener("load", (event) => {
    let currentTime = Date.now();
    main();
});

function getAppropriateDepth() {
    // Get player's rating if available
    let playerRating = 1500; // Default
    try {
        const ratingEl = document.querySelector('.user-tagline-rating');
        if (ratingEl) {
            playerRating = parseInt(ratingEl.textContent);
        }
    } catch (e) {}

    // Map ratings to appropriate depths
    if (playerRating < 800) return Math.floor(Math.random() * 3) + 1;     // 1-3
    if (playerRating < 1200) return Math.floor(Math.random() * 3) + 3;    // 3-5
    if (playerRating < 1600) return Math.floor(Math.random() * 3) + 5;    // 5-7
    if (playerRating < 2000) return Math.floor(Math.random() * 3) + 7;    // 7-9
    if (playerRating < 2400) return Math.floor(Math.random() * 4) + 9;    // 9-12
    return Math.floor(Math.random() * 5) + 12;                           // 12-16
}