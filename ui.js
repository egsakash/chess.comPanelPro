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
            var tmpStyle;
            var tmpDiv;
            window.board = $('chess-board')[0] || $('wc-chess-board')[0];
            myVars.board = window.board;

            var div = document.createElement('div');
            var content = `
            <div class="chess-bot-container">
                <div class="bot-header">
                    <div class="bot-logo">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M19,22H5V20H19V22M17,10C15.58,10 14.26,10.77 13.55,12H13V7H16V5H13V2H11V5H8V7H11V12H10.45C9.74,10.77 8.42,10 7,10A5,5 0 0,0 2,15A5,5 0 0,0 7,20H17A5,5 0 0,0 22,15A5,5 0 0,0 17,10M7,18A3,3 0 0,1 4,15A3,3 0 0,1 7,12A3,3 0 0,1 10,15A3,3 0 0,1 7,18M17,18A3,3 0 0,1 14,15A3,3 0 0,1 17,12A3,3 0 0,1 20,15A3,3 0 0,1 17,18Z" />
                        </svg>
                    </div>
                    <h3 class="bot-title">Panel Pro By @akashdeep</h3>
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
                                        <input type="range" id="depthSlider" min="1" max="21" value="11" class="depth-slider">
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

            window.board.parentElement.parentElement.appendChild(div);

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
                
                .advanced-section {
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid #313244;
                }

                .profile-selection {
                    margin-top: 15px;
                }

                .playStyle-controls, .advanced-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .style-slider-container {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .style-slider-container label {
                    font-size: 13px;
                    color: #cdd6f4;
                    width: 120px;
                }

                .style-slider {
                    flex: 1;
                    height: 6px;
                    -webkit-appearance: none;
                    appearance: none;
                    background: #313244;
                    border-radius: 3px;
                    outline: none;
                }

                .style-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #89b4fa;
                    cursor: pointer;
                }

                .style-slider-container span {
                    font-size: 14px;
                    font-weight: 500;
                    color: #89b4fa;
                    width: 20px;
                    text-align: center;
                }

                .highlight-color-picker {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-top: 10px;
                }

                .highlight-color-picker label {
                    font-size: 13px;
                    color: #cdd6f4;
                }

                .color-input {
                    -webkit-appearance: none;
                    width: 30px;
                    height: 30px;
                    border: none;
                    border-radius: 50%;
                    background: none;
                    cursor: pointer;
                }

                .color-input::-webkit-color-swatch {
                    border: none;
                    border-radius: 50%;
                    box-shadow: 0 0 0 2px #45475a;
                }

                .opening-selection {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-top: 10px;
                }

                .opening-selection label {
                    font-size: 13px;
                    color: #cdd6f4;
                }

                .select-input {
                    flex: 1;
                    background: #313244;
                    border: 1px solid #45475a;
                    border-radius: 6px;
                    color: #cdd6f4;
                    padding: 8px 10px;
                    font-size: 14px;
                    transition: border-color 0.3s;
                }

                .select-input:focus {
                    outline: none;
                    border-color: #89b4fa;
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
            
            // Add the extra settings section
            const extraSettings = `
            <div class="advanced-section">
                <div class="control-item toggle-container">
                    <input type="checkbox" id="enableHotkeys" name="enableHotkeys" class="toggle-input" checked>
                    <label for="enableHotkeys" class="toggle-label">
                        <span class="toggle-button"></span>
                        <span class="toggle-text">Enable keyboard shortcuts</span>
                    </label>
                </div>

                <div class="control-item toggle-container">
                    <input type="checkbox" id="randomizeTiming" name="randomizeTiming" class="toggle-input" checked>
                    <label for="randomizeTiming" class="toggle-label">
                        <span class="toggle-button"></span>
                        <span class="toggle-text">Randomize thinking time</span>
                    </label>
                </div>

                <div class="style-slider-container">
                    <label for="mouseMovementSlider">Mouse Movement Realism:</label>
                    <input type="range" id="mouseMovementSlider" min="1" max="10" value="7" class="style-slider">
                    <span id="mouseMovementSliderValue">7</span>
                </div>

                <div class="profile-selection">
                    <label for="playingProfileSelect">Playing Profile:</label>
                    <select id="playingProfileSelect" class="select-input">
                        <option value="custom">Custom Settings</option>
                        <option value="beginner">Beginner (≈800)</option>
                        <option value="intermediate">Intermediate (≈1200)</option>
                        <option value="advanced">Advanced (≈1600)</option>
                        <option value="expert">Expert (≈2000)</option>
                        <option value="master">Master (≈2400+)</option>
                    </select>
                </div>
            </div>
            `;

            $('#advanced-settings .advanced-controls').append(extraSettings);
            
            myVars.loaded = true;
        } catch (error) {
            console.log(error);
        }
    };
    
    return myFunctions;
} 