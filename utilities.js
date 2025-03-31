import { setupParser } from './parser.js';

export function setupUtilities(myVars) {
    const myFunctions = {};
    let stop_b = stop_w = 0;
    let s_br = s_br2 = s_wr = s_wr2 = 0;
    let obs = "";
    
    // Setup parser functions
    setupParser(myVars, myFunctions);
    
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
    };
    
    myFunctions.color = function(dat) {
        response = dat;
        var res1 = response.substring(0, 2);
        var res2 = response.substring(2, 4);

        // Check if automove is enabled and make the move
        if(myVars.autoMove === true){
            console.log(`Auto move enabled, moving from ${res1} to ${res2}`);
            myFunctions.movePiece(res1, res2);
        } else {
            console.log(`Auto move disabled, highlighting ${res1} to ${res2}`);
        }
        window.isThinking = false;

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

        $(window.board.nodeName)
            .prepend(`<div class="highlight square-${res2} bro" style="background-color: ${highlightColor}; opacity: 0.71;" data-test-element="highlight"></div>`)
            .children(':first')
            .delay(1800)
            .queue(function() {
            $(this)
                .remove();
        });
        $(window.board.nodeName)
            .prepend(`<div class="highlight square-${res1} bro" style="background-color: ${highlightColor}; opacity: 0.71;" data-test-element="highlight"></div>`)
            .children(':first')
            .delay(1800)
            .queue(function() {
            $(this)
                .remove();
        });
    };
    
    myFunctions.movePiece = function(from, to) {
        // Check if the move is legal before attempting to make it
        let isLegalMove = false;
        let moveObject = null;
        
        for (let each = 0; each < window.board.game.getLegalMoves().length; each++) {
            if (window.board.game.getLegalMoves()[each].from === from && 
                window.board.game.getLegalMoves()[each].to === to) {
                isLegalMove = true;
                moveObject = window.board.game.getLegalMoves()[each];
                break;
            }
        }
        
        if (!isLegalMove) {
            console.log(`Attempted illegal move: ${from} to ${to}`);
            return;
        }
        
        // Add a small delay before making the move to simulate human reaction time
        setTimeout(() => {
            try {
                // Make the actual move
                window.board.game.move({
                    ...moveObject,
                    promotion: moveObject.promotion || 'q', // Default to queen for simplicity
                    animate: true,
                    userGenerated: true
                });
                console.log(`Successfully moved from ${from} to ${to}`);
            } catch (error) {
                console.error("Error making move:", error);
            }
        }, 100 + Math.random() * 300); // Small random delay to appear more human-like
    };
    
    myFunctions.other = function(delay) {
        // Create more natural timing pattern based on game situation
        const gamePhase = myFunctions.estimateGamePhase();
        const positionComplexity = myFunctions.estimatePositionComplexity();

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
                myFunctions.autoRun(myFunctions.getAdjustedDepth());
                window.canGo = true;
                clearInterval(timer);
            }
        },10);
    };
    
    myFunctions.getAdjustedDepth = function() {
        // Get time remaining and adjust depth accordingly
        const timeRemaining = myFunctions.estimateTimeRemaining();
        const gamePhase = myFunctions.estimateGamePhase();
        const positionType = myFunctions.analyzePositionType(window.board.game.getFEN());
        const isPositionCritical = myFunctions.isPositionCriticalNow();
        
        // Base depth from slider
        let baseDepth = myVars.lastValue;
        
        // Time-based adjustments
        if (timeRemaining < 10) {
            return Math.floor(Math.random() * 3) + 1;
        } else if (timeRemaining < 30) {
            return Math.floor(Math.random() * 4) + 4;
        } else if (timeRemaining < 60) {
            return Math.floor(Math.random() * 7) + 6;
        } else if (timeRemaining < 120) {
            return Math.floor(Math.random() * 7) + 9;
        } else {
            if (!isPositionCritical && Math.random() < 0.07) {
                return Math.floor(Math.random() * 4) + 2;
            }
            return Math.floor(Math.random() * 9) + 11;
        }
    };
    
    myFunctions.analyzePositionType = function(fen) {
        // Determine position type: opening, middlegame, endgame, tactical
        const piecesCount = fen.split(' ')[0].match(/[pnbrqkPNBRQK]/g).length;

        if (piecesCount > 25) return 'opening';
        if (piecesCount < 12) return 'endgame';
        return 'middlegame';
    };
    
    myFunctions.isPositionCriticalNow = function() {
        // Determine if the current position is critical
        // This is a simplified implementation
        try {
            // Check if kings are under attack
            const inCheck = window.board.game.inCheck();
            
            // Check material balance (simplified)
            const fen = window.board.game.getFEN();
            const whiteMaterial = myFunctions.countMaterial(fen, true);
            const blackMaterial = myFunctions.countMaterial(fen, false);
            const materialDifference = Math.abs(whiteMaterial - blackMaterial);
            
            // Position is critical if in check or material is close
            return inCheck || materialDifference < 2;
        } catch (e) {
            return false;
        }
    };
    
    myFunctions.countMaterial = function(fen, isWhite) {
        // Simple material counting function
        const position = fen.split(' ')[0];
        let material = 0;
        
        const pieces = isWhite ? 'PNBRQK' : 'pnbrqk';
        const values = { 'P': 1, 'N': 3, 'B': 3, 'R': 5, 'Q': 9, 'K': 0, 
                         'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0 };
        
        for (let char of position) {
            if (pieces.includes(char)) {
                material += values[char];
            }
        }
        
        return material;
    };
    
    myFunctions.estimateGamePhase = function() {
        // Estimate how far the game has progressed (0-40 approx)
        try {
            const moveList = $('vertical-move-list').children().length;
            return moveList / 2; // Rough estimate of move number
        } catch (e) {
            return 15; // Default to middle game
        }
    };
    
    myFunctions.estimateTimeRemaining = function() {
        // Try to get the clock time if available
        let remainingTime = 600; // Default value if clock can't be read

        try {
            // Target the player's clock specifically
            const clockEl = document.querySelector('.clock-component.clock-bottom');
            
            if (clockEl) {
                const timeText = clockEl.textContent;
                if (timeText.includes(':')) {
                    const parts = timeText.split(':');
                    if (parts.length === 2) {
                        const minutes = parseInt(parts[0]);
                        const seconds = parseInt(parts[1]);
                        
                        // Check if parsing was successful
                        if (!isNaN(minutes) && !isNaN(seconds)) {
                            remainingTime = minutes * 60 + seconds;
                        } else {
                            console.log("Error parsing time:", timeText);
                        }
                    }
                } else {
                    // Handle single number format (e.g., just seconds)
                    const seconds = parseInt(timeText);
                    if (!isNaN(seconds)) {
                        remainingTime = seconds;
                    } else {
                        console.log("Error parsing time:", timeText);
                    }
                }
            } else {
                console.log("Clock element not found with selector '.clock-component.clock-bottom'");
            }
        } catch (e) {
            console.log("Error getting time remaining:", e);
        }

        console.log("Remaining time:", remainingTime);
        return remainingTime;
    };
    
    myFunctions.estimatePositionComplexity = function() {
        // Calculate a complexity score between 0-1
        // This would ideally analyze the position for tactical elements
        return Math.random() * 0.8 + 0.2; // Placeholder
    };
    
    myFunctions.saveSettings = function() {
        try {
            GM_setValue('autoRun', myVars.autoRun);
            GM_setValue('autoMove', myVars.autoMove);
            GM_setValue('timeDelayMin', $('#timeDelayMin').val());
            GM_setValue('timeDelayMax', $('#timeDelayMax').val());
            GM_setValue('depthValue', myVars.lastValue);
            GM_setValue('highlightColor', myVars.highlightColor);
            GM_setValue('playStyle', myVars.playStyle);
            GM_setValue('blunderRate', myVars.blunderRate);
            GM_setValue('adaptToRating', myVars.adaptToRating);
            GM_setValue('useOpeningBook', myVars.useOpeningBook);
            GM_setValue('preferredOpenings', myVars.preferredOpenings);
            GM_setValue('enableHotkeys', myVars.enableHotkeys);
            GM_setValue('randomizeTiming', myVars.randomizeTiming);
            GM_setValue('mouseMovementRealism', myVars.mouseMovementRealism);
            
            console.log("Settings saved successfully");
        } catch (error) {
            console.error("Error saving settings:", error);
        }
    };
    
    myFunctions.loadSettings = function() {
        try {
            myVars.autoRun = GM_getValue('autoRun', false);
            myVars.autoMove = GM_getValue('autoMove', false);
            myVars.lastValue = GM_getValue('depthValue', 11);
            myVars.highlightColor = GM_getValue('highlightColor', 'rgb(235, 97, 80)');
            myVars.blunderRate = GM_getValue('blunderRate', 0.05);
            myVars.adaptToRating = GM_getValue('adaptToRating', true);
            myVars.useOpeningBook = GM_getValue('useOpeningBook', true);
            myVars.preferredOpenings = GM_getValue('preferredOpenings', ["e4", "d4", "c4", "Nf3"]);
            myVars.enableHotkeys = GM_getValue('enableHotkeys', true);
            myVars.randomizeTiming = GM_getValue('randomizeTiming', true);
            myVars.mouseMovementRealism = GM_getValue('mouseMovementRealism', 0.7);
            
            // Load play style if it exists
            const savedPlayStyle = GM_getValue('playStyle', null);
            if (savedPlayStyle) {
                myVars.playStyle = savedPlayStyle;
            }
            
            console.log("Settings loaded successfully");
        } catch (error) {
            console.error("Error loading settings:", error);
        }
    };
    
    return myFunctions;
} 