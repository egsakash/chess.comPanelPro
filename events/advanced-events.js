export function setupAdvancedEventHandlers(myVars, myFunctions) {
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
} 