export function setupStyleEventHandlers(myVars, myFunctions) {
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
} 