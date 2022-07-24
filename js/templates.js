/**
 * 
 */
function desktopHelpScreenHTML() {
    return /*html*/ `
        <h4><span>ENTER</span> <span>Throw Bottle</span></h4>
        <h4><span>ARROW-UP or SPACE</span> <span>Jump</span></h4>
        <h4><span>ARROW-LEFT or ARROW-RIGHT</span> <span>Run</span></h4>
        <h4><span>P</span> <span>Pause Game</span></h4>
        <h4><span>H</span> <span>Toggle Helpscreen</span></h4>
        <h4 id="fullscreen-demo"><span>S / ESC</span> <span>Open / Close Full Screen</span></h4>
        <h4><span class="btn-toggle-touch">C</span> <span class="">Toggle Touchscreen Options</span></h4>
        <h6>Your device has been recognized as desktop device.</h6>
        <h3> COLLECT ALL <u>COINS</u> and destroy the endboss by hitting it with your collected bottles </h3>
        <h4 class="small-h"><span>F:</span> <span class="small-p">Activate Developer-Mode (show Hit Frames)</span></h4>
    `;
}

/**
 * 
 */
function mobileHelpScreenHTML() {
    return /*html*/`

    `;
}

function keyPanelTopHTML() {
    return /*html*/`
        <div class="panel-wrapper"></div>
        <div class="panel-wrapper">
            <img id="btn-pause" class="control-btn" src="img/icons/pause-1.ico" title="toggle pause" alt="pause button">
        </div>
    `;
}

function keypanelBottom() {
    return /*html*/ `
        <!-- keys left (right/left run) -->
         <div class="panel-wrapper">
            <img id="btn-left" class="control-btn" src="img/icons/left.ico" title="move left" alt="move left button">
            <img id="btn-right" class="control-btn" src="img/icons/right.ico" title="move-right" alt="move right button">
        </div>
        <!-- keys right (e.g. throw, jump) -->
         <div class="panel-wrapper">
            <img id="btn-jump" class="control-btn" src="img/icons/jump.ico" title="jump" alt="jump">
            <img id="btn-throw" class="control-btn" src="img/icons/throw.ico" title="throw bottle" alt="">
        </div>
    `;
}