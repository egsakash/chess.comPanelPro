// HTML templates for the UI components
export const mainTemplate = `
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

        <button type="button" id="isBut" class="action-button secondary-button" onclick="window.confirm('Can I take you to the issues page?') ? document.location = 'https://github.com/egsakash/chess.comPanelPro/issues' : console.log('canceled')">
            <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
            Report Issue
        </button>
    </div>
</div>`;

export const advancedSettingsTemplate = `
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

export const spinnerTemplate = `
<div style="display:none;" id="overlay">
    <div style="
        margin: 0 auto;
        height: 40px;
        width: 40px;
        animation: rotate 0.8s infinite linear;
        border: 4px solid #89b4fa;
        border-right-color: transparent;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(137, 180, 250, 0.4);
    "></div>
</div>
`; 