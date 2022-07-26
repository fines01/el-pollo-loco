/** 
 * @returns {string} - HTML string
 */
function desktopHelpScreenHTML() {
    return /*html*/ `
        <h4><span>ENTER</span> <span>Throw Bottle</span></h4>
        <h4><span>ARROW-UP or SPACE</span> <span>Jump</span></h4>
        <h4><span>ARROW-LEFT or ARROW-RIGHT</span> <span>Run</span></h4>
        <h4><span>P</span> <span>Pause Game</span></h4>
        <h4><span>H</span> <span>Toggle Helpscreen</span></h4>
        <h4 id="fullscreen-demo"><span>S / ESC</span> <span>Open / Close Full Screen</span></h4>
        <h4><span class="btn-toggle-touch" onclick="toggleTouchOption()" ontouchstart="toggleTouchOption()">C</span> <span class="">Toggle Touchscreen Options</span></h4>
        <h6>Your device has been recognized as a desktop device.</h6>
        <h3> COLLECT ALL <u>COINS</u> and destroy the endboss by hitting it with your collected bottles </h3>
        <h4 id="dev-demo" class="small-h"><span>F:</span> <span class="small-p">Activate Developer-Mode (show Hit Frames)</span></h4>
    `;
}

/** 
 * @returns {string} - HTML string
 */
function mobileHelpScreenHTML() {
    return /*html*/`
        <h4><img src="img/icons/throw.ico"><span>Throw Bottle</span></h4>
        <h4><img src="img/icons/jump.ico"> <span>Jump</span></h4>
        <h4><span><img src="img/icons/left.ico"><img src="img/icons/right.ico"></span> <span>Run</span></h4>
        <h4><img src="img/icons/pause-1.ico"> <span>Pause Game</span></h4>
        <h4> <img src="img/icons/help-white.ico" class="helpscreen-icon"> <span>Toggle Helpscreen</span></h4>
        <h4 id="fullscreen-demo"> <img src="img/icons/fullscreen.ico"> <span>Open / Close Full Screen</span></h4>
        <h4><span class="btn-toggle-touch btn-toggle-white" onclick="toggleTouchOption()" ontouchstart="toggleTouchOption()">C</span> <span class="">Toggle Touchscreen Options</span></h4>
        <h6>Your device has been recognized as a mobile device.</h6>
        <h3> COLLECT ALL <u>COINS</u> and destroy the endboss by hitting it with your collected bottles </h3>
    `;
}

/** 
 * Checks level and if user is on a touch device, returns the corresponding HTML.
 * @returns {string} - HTML string
 */
function screenTextSmallHTML(nextLevel = false ) {
    if ( !userIsOnMobileDevice && !nextLevel) return 'Press ENTER to restart Level ' + levelCounter;
    else if (userIsOnMobileDevice && !nextLevel) return '<img id="btn-start ontouchstart="restartGame()" src="img/icons/play-yellow-1.ico"> Restart Level ' + levelCounter;
    else if ( !userIsOnMobileDevice && nextLevel) return 'Press ENTER to Start Level ' + nextLevel;
    else if (userIsOnMobileDevice && nextLevel) return '<img id="btn-start" src="img/icons/play-yellow-1.ico" ontouchstart="restartGame()"> Start Level ' + nextLevel;
}

/** 
 * Checks if user is on a touch or desktop device, returns the corresponding HTML.
 * @returns {string} - HTML string
 */
function screenTextBigHTML() {
    if(!userIsOnMobileDevice) return'Press ENTER to begin!';
    else return '<img id="btn-start" src="img/icons/play-sb.ico" ontouchstart="beginGame()"> Start Game!'
}

/** 
 * Checks if user is on a touch or desktop device, returns the corresponding HTML.
 * @returns {string} - HTML string
 */
function endScreenTextSmallHTML() {
    if (!userIsOnMobileDevice) return 'YOU WON ALL LEVELS! ENTER to start again';
    else return 'YOU WON ALL LEVELS! <img src=""> Start again';
}

// function keyPanelTopHTML() {
//     return /*html*/ `
//         <div class="panel-wrapper"></div>
//         <div class="panel-wrapper">
//             <img id="btn-pause" class="control-btn" src="img/icons/pause-1.ico" title="toggle pause" alt="pause button">
//         </div>
//     `;
// }

// function keypanelBottomHTML() {
//     return /*html*/ `
//         <!-- keys left (right/left run) -->
//          <div class="panel-wrapper">
//             <img id="btn-left" class="control-btn" src="img/icons/left.ico" title="move left" alt="move left button">
//             <img id="btn-right" class="control-btn" src="img/icons/right.ico" title="move-right" alt="move right button">
//         </div>
//         <!-- keys right (e.g. throw, jump) -->
//          <div class="panel-wrapper">
//             <img id="btn-jump" class="control-btn" src="img/icons/jump.ico" title="jump" alt="jump">
//             <img id="btn-throw" class="control-btn" src="img/icons/throw.ico" title="throw bottle" alt="">
//         </div>
//     `;
// }


