export function setupUIEventHandlers(myVars, myFunctions) {
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
} 