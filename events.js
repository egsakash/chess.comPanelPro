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
    
    // Setup UI event handlers
    $(document).ready(function() {
        // Depth slider
        $(document).on('input', '#depthSlider', function() {
            const depth = parseInt($(this).val());
            $('#depthValue').text(depth);
            myVars.lastValue = depth;
            $('#depthText')[0].innerHTML = "Current Depth: <strong>" + depth + "</strong>";
            myFunctions.saveSettings();
        });

        // Depth buttons
        $(document).on('click', '#decreaseDepth', function() {
            const currentDepth = parseInt($('#depthSlider').val());
            if (currentDepth > 1) {
                const newDepth = currentDepth - 1;
                $('#depthSlider').val(newDepth).trigger('input');
            }
        });

        $(document).on('click', '#increaseDepth', function() {
            const currentDepth = parseInt($('#depthSlider').val());
            if (currentDepth < 26) {
                const newDepth = currentDepth + 1;
                $('#depthSlider').val(newDepth).trigger('input');
            }
        });

        // Tab switching
        $(document).on('click', '.tab-button', function() {
            $('.tab-button').removeClass('active');
            $(this).addClass('active');

            const tabId = $(this).data('tab');
            $('.tab-content').removeClass('active');
            $(`#${tabId}`).addClass('active');
        });

        // Style sliders
        $(document).on('input', '.style-slider', function() {
            const value = $(this).val();
            $(`#${this.id}Value`).text(value);

            // Update the myVars.playStyle object
            const styleType = this.id.replace('Slider', '');
            if (styleType === 'blunderRate') {
                myVars.blunderRate = parseFloat(value) / 10;
            } else if (myVars.playStyle && styleType in myVars.playStyle) {
                if (styleType === 'aggressive' || styleType === 'defensive') {
                    myVars.playStyle[styleType] = 0.3 + (parseFloat(value) / 10) * 0.5;
                } else {
                    myVars.playStyle[styleType] = 0.2 + (parseFloat(value) / 10) * 0.6;
                }
            }
            
            myFunctions.saveSettings();
        });

        // Toggle switches
        $(document).on('change', '#autoRun, #autoMove, #adaptToRating, #useOpeningBook, #enableHotkeys, #randomizeTiming', function() {
            const id = $(this).attr('id');
            myVars[id] = $(this).prop('checked');
            
            if (id === 'autoMove') {
                console.log(`Auto move set to: ${myVars.autoMove}`);
            }
            
            myFunctions.saveSettings();
        });

        // Color picker
        $(document).on('input', '#highlightColor', function() {
            myVars.highlightColor = $(this).val();
            myFunctions.saveSettings();
        });

        // Opening selection
        $(document).on('change', '#preferredOpeningSelect', function() {
            const selectedOpening = $(this).val();
            if (selectedOpening === 'random') {
                myVars.preferredOpenings = ["e4", "d4", "c4", "Nf3"].sort(() => Math.random() - 0.5);
            } else {
                myVars.preferredOpenings = [selectedOpening];
            }
            
            myFunctions.saveSettings();
        });

        // Mouse movement slider
        $(document).on('input', '#mouseMovementSlider', function() {
            const value = $(this).val();
            $('#mouseMovementSliderValue').text(value);
            myVars.mouseMovementRealism = parseFloat(value) / 10;
            
            myFunctions.saveSettings();
        });

        // Profile selection
        $(document).on('change', '#playingProfileSelect', function() {
            const profile = $(this).val();

            if (profile !== 'custom') {
                // Preset profiles with appropriate settings
                switch(profile) {
                    case 'beginner':
                        $('#depthSlider').val(3).trigger('input');
                        $('#blunderRateSlider').val(7).trigger('input');
                        $('#aggressiveSlider').val(Math.floor(3 + Math.random() * 5)).trigger('input');
                        $('#tacticalSlider').val(3).trigger('input');
                        break;
                    case 'intermediate':
                        $('#depthSlider').val(6).trigger('input');
                        $('#blunderRateSlider').val(5).trigger('input');
                        $('#tacticalSlider').val(5).trigger('input');
                        break;
                    case 'advanced':
                        $('#depthSlider').val(9).trigger('input');
                        $('#blunderRateSlider').val(3).trigger('input');
                        $('#tacticalSlider').val(7).trigger('input');
                        break;
                    case 'expert':
                        $('#depthSlider').val(12).trigger('input');
                        $('#blunderRateSlider').val(2).trigger('input');
                        $('#tacticalSlider').val(8).trigger('input');
                        $('#positionalSlider').val(8).trigger('input');
                        break;
                    case 'master':
                        $('#depthSlider').val(15).trigger('input');
                        $('#blunderRateSlider').val(1).trigger('input');
                        $('#tacticalSlider').val(9).trigger('input');
                        $('#positionalSlider').val(9).trigger('input');
                        break;
                }
                
                setTimeout(myFunctions.saveSettings, 100);
            }
        });

        // Time delay inputs
        $(document).on('change', '#timeDelayMin, #timeDelayMax', function() {
            myFunctions.saveSettings();
        });
    });
} 