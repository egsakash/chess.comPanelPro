import { mainTemplate, advancedSettingsTemplate, spinnerTemplate } from './ui/html.js';
import { mainStyles, advancedStyles } from './ui/styles.js';

export function setupUI(myVars, myFunctions) {
    let dynamicStyles = null;

    function addAnimation(body) {
        if (!dynamicStyles) {
            dynamicStyles = document.createElement('style');
            dynamicStyles.type = 'text/css';
            document.head.appendChild(dynamicStyles);
        }

        dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
    }
    
    myFunctions.spinner = function() {
        if(window.isThinking == true){
            $('#thinking-indicator').addClass('active');
        }
        if(window.isThinking == false) {
            $('#thinking-indicator').removeClass('active');
        }
    };
    
    myFunctions.loadEx = function() {
        try {
            window.board = $('chess-board')[0] || $('wc-chess-board')[0];
            myVars.board = window.board;

            // Create container div
            var div = document.createElement('div');
            div.setAttribute('id', 'settingsContainer');
            
            // Add main template
            div.innerHTML = mainTemplate;
            
            // Add spinner
            div.prepend($(spinnerTemplate)[0]);
            
            // Append to DOM
            window.board.parentElement.parentElement.appendChild(div);

            // Add CSS styles
            var botStyles = document.createElement('style');
            botStyles.innerHTML = mainStyles + advancedStyles;
            document.head.appendChild(botStyles);

            // Add animation
            addAnimation(`@keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }`);
            
            // Add the extra settings section
            $('#advanced-settings .advanced-controls').append(advancedSettingsTemplate);
            
            // Load saved settings before applying them to the UI
            myFunctions.loadSettings();
            
            // Apply loaded settings to UI controls
            applySettingsToUI(myVars);
            
            myVars.loaded = true;
        } catch (error) {
            console.log(error);
        }
    };
    
    // Function to apply loaded settings to UI elements
    function applySettingsToUI(myVars) {
        // Apply toggle settings
        $('#autoRun').prop('checked', myVars.autoRun);
        $('#autoMove').prop('checked', myVars.autoMove);
        $('#adaptToRating').prop('checked', myVars.adaptToRating !== undefined ? myVars.adaptToRating : true);
        $('#useOpeningBook').prop('checked', myVars.useOpeningBook !== undefined ? myVars.useOpeningBook : true);
        $('#enableHotkeys').prop('checked', myVars.enableHotkeys !== undefined ? myVars.enableHotkeys : true);
        $('#randomizeTiming').prop('checked', myVars.randomizeTiming !== undefined ? myVars.randomizeTiming : true);
        
        // Apply numeric values
        $('#depthSlider').val(myVars.lastValue);
        $('#depthValue').text(myVars.lastValue);
        $('#depthText').html("Current Depth: <strong>" + myVars.lastValue + "</strong>");
        
        // Apply time delay values
        $('#timeDelayMin').val(GM_getValue('timeDelayMin', 0.1));
        $('#timeDelayMax').val(GM_getValue('timeDelayMax', 1));
        
        // Apply color settings
        if (myVars.highlightColor) {
            $('#highlightColor').val(myVars.highlightColor);
        }
        
        // Apply play style sliders
        if (myVars.playStyle) {
            // Calculate slider values from the normalized values in myVars.playStyle
            const aggressiveValue = Math.round(((myVars.playStyle.aggressive - 0.3) / 0.5) * 10);
            $('#aggressiveSlider').val(aggressiveValue);
            $('#aggressiveValue').text(aggressiveValue);
            
            const defensiveValue = Math.round(((myVars.playStyle.defensive - 0.3) / 0.5) * 10);
            $('#defensiveSlider').val(defensiveValue);
            $('#defensiveValue').text(defensiveValue);
            
            const tacticalValue = Math.round(((myVars.playStyle.tactical - 0.2) / 0.6) * 10);
            $('#tacticalSlider').val(tacticalValue);
            $('#tacticalValue').text(tacticalValue);
            
            const positionalValue = Math.round(((myVars.playStyle.positional - 0.2) / 0.6) * 10);
            $('#positionalSlider').val(positionalValue);
            $('#positionalValue').text(positionalValue);
        }
        
        // Apply blunder rate
        if (myVars.blunderRate !== undefined) {
            const blunderValue = Math.round(myVars.blunderRate * 10);
            $('#blunderRateSlider').val(blunderValue);
            $('#blunderRateValue').text(blunderValue);
        }
        
        // Apply mouse movement realism
        if (myVars.mouseMovementRealism !== undefined) {
            const movementValue = Math.round(myVars.mouseMovementRealism * 10);
            $('#mouseMovementSlider').val(movementValue);
            $('#mouseMovementSliderValue').text(movementValue);
        }
        
        // Apply preferred opening
        if (myVars.preferredOpenings && myVars.preferredOpenings.length === 1) {
            $('#preferredOpeningSelect').val(myVars.preferredOpenings[0]);
        }
        
        console.log("Settings applied to UI");
    }
    
    return myFunctions;
} 