// Main CSS styles for the UI
export const mainStyles = `
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

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
`;

// Additional styles for advanced components
export const advancedStyles = `
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