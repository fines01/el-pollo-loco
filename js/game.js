/* set global canvas variables: get css variables, remove string 'px' and save the numeric values. */
const root = document.documentElement;

let canvasWidth = getComputedStyle(root).getPropertyValue('--canvasWidth').replace('px', '') * 1;
let canvasHeight = getComputedStyle(root).getPropertyValue('--canvasHeight').replace('px', '') * 1;

let level, world, userIsOnMobileDevice;
let helpScreenMode = false;
let fullScreenMode = false;
let levelCounter = 1;
let maxLevels = 10;
let volumeModifier = 0.8;

/** Sets css variables and sets the default (first) level on pageload */
window.addEventListener('load', () => {
    initDeviceMode();
    bindTouchButtonEvents();
    level = setLevel();
    //toggleTouchButtons();
});

/** Sets css variables after a resize event of the window */
window.addEventListener('resize', (e) => {
    if (!document.fullscreenElement && fullScreenMode && !userIsOnMobileDevice) closeFullScreen(); // because Chrome does not fire a key event when using esc to leave fullscreen.
    initDeviceMode();
});

/** Binds key press events to control UI outside of the game logic */
// let bindKeypressEvents = 
window.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && !world && !helpScreenMode) beginGame();
    if (e.code == 'Enter' && world && world.gameOver && !world.gamePaused) restartGame();
    if (e.code == 'KeyP' && world && !helpScreenMode) togglePause();
    if (e.code == 'KeyF' && world) world.setDevMode();
    if (e.code == 'KeyH') toggleHelpScreen();
    if (e.code == 'KeyC') toggleTouchOption();
    if (e.code == 'KeyS' && !userIsOnMobileDevice && (!fullScreenMode || !document.fullscreenElement)) toggleFullScreen(); 
    if (e.code == 'Escape' && !userIsOnMobileDevice && (document.fullscreenElement)) toggleFullScreen();
});

/** Binds touchscreen button-press events to control UI */
function bindTouchButtonEvents() {
    getId('btn-pause').addEventListener('touchstart', (e) => {
        if (world && !helpScreenMode) togglePause();
    }, {
        passive: true
    });
    getId('help-icon').addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleHelpScreen();
    });
    getId('fullscreen-icon').addEventListener('touchstart', (e) => {
        toggleFullScreen();
    }, {
        passive: true
    });
}

/**
 * Checks the device mode (desktop or mobile) and initializes game accordingly
 */
function initDeviceMode() {
    userIsOnMobileDevice = checkIfUserIsOnMobileDevice();
    logDevice(); // Check
    setCanvasCssVars();
    if (!world) getId('screen-text-big').innerHTML = screenTextBigHTML();;
    toggleControlHelp();
    if (userIsOnMobileDevice) setFullScreenView();
    else toggleTouchButtons();
}

/**
 * Starts game after a given time
 * @param {number} ms - milliseconds of timeout until the game is started
 */
function beginGame(ms = 300) {
    getId('screen-text-big').classList.add('text-dive-animation');
    window.setTimeout(() => {
        startGame();
    }, ms);
}

/**
 * Sets HTML, creates an instance of World and
 * starts game-loop after a check if objects are fully loaded
 */
function startGame() {
    hide('start-screen', 'game-over-screen', 'loser-screen', 'screen-text-big', 'screen-text-small');
    show('canvas');
    if (userIsOnMobileDevice) show('key-panel-top', 'key-panel-bottom');
    else hide('key-panel-top', 'key-panel-bottom');
    world = new World();
    world.gameOver = false;
    if (world.checkWorldComplete()) world.run();
}

/**
 * Checks level and starts game with respective level
 * @todo [DECIDE:] pause jingles or only start new level after jugles ended? (note: 1 possibility has the downside that a new game is started 'accidentally' after hitting throw-Enter in a game)
 */
function restartGame() {
    if (world.winSound.ended || world.loseSound.ended) {
        checkLevel();
        startGame();
    }
}

/**
 * Adjusts the volume modifier to set sound volumes according to user input
 */
function adjustVolume() {
    let value = getId('volume-slider').value;
    volumeModifier = value * 0.01;
}

/**
 * Sets win screen HTML and plays win jingle, increases level - counter
 */
function setWinScreen() {
    let winText, levelText;
    let nextLevel = levelCounter + 1;
    [winText, levelText] = getId('screen-text-big', 'screen-text-small');
    if (levelCounter < maxLevels) levelText.innerHTML = screenTextSmallHTML(nextLevel);
    winText.classList.add('endscreen-text');
    winText.innerHTML = "YOU WON!";
    show('game-over-screen', 'screen-text-big', 'screen-text-small');
    hide('key-panel-top', 'key-panel-bottom')
    world.winSound.play();
}

/**
 * Sets loseer screen and plays loser jingle
 */
function setLoserScreen(reasonLost, missedCoins) {
    show('loser-screen', 'screen-text-small', 'screen-text-big');
    hide('key-panel-top', 'key-panel-bottom');
    getId('screen-text-small').innerHTML = screenTextSmallHTML();
    let loseText = getId('screen-text-big');
    loseText.classList.add('endscreen-text')
    world.loseSound.play();
    loseText.innerHTML = screenTextBigHTML(reasonLost, missedCoins);
}

/**
 * Sets level counter and instanciates a new level
 */
function checkLevel() { // rename?
    if (levelCounter < maxLevels && world.checkWin()) levelCounter++;
    else if (levelCounter == maxLevels && world.checkWin()) levelCounter = 1;
    level = setLevel(levelCounter);
}

/**
 * Toggles pause mode during game,
 * resets lastAnimationFrame when resuming game
 */
function togglePause() {
    world.gamePaused = !world.gamePaused;
    if (!world.gamePaused) {
        world.lastAnimationFrame = Date.now();
        world.run();
    }
}

/**
 * Toggles help screen, makes sure game is paused if help screen is on during game 
 * and game can't be started if help screen is on during start screen
 */
function toggleHelpScreen() {
    let actions = toggle('help-screen');
    if (world && !(actions[0] == 'show' && world.gamePaused)) togglePause();
    if (actions[0] == 'show') showHelpScreen();
    else closeHelpScreen();
}

/**
 * Shows the correct help screen for either desktop or mobile mode
 */
function showHelpScreen() {
    helpScreenMode = true;
    let helpScreenHTML;
    if (userIsOnMobileDevice) helpScreenHTML = mobileHelpScreenHTML();
    else helpScreenHTML = desktopHelpScreenHTML();
    getId('help-screen').innerHTML = helpScreenHTML;
}

/** */
function closeHelpScreen() {
    helpScreenMode = false;
    getId('help-screen').innerHTML = '';
}

/**
 * Toggles touchscreen options.
 * User can toggle options in case the device was not correctly recognized.
 */
function toggleTouchOption() {
    userIsOnMobileDevice = !userIsOnMobileDevice;
    if (helpScreenMode) showHelpScreen();
    toggleTouchButtons();
    if (!world) getId('screen-text-big').innerHTML = screenTextBigHTML();
    else getId('screen-text-small').innerHTML = screenTextSmallHTML();
}

/**
 * Checks device and game status and shows or hides game control touchbuttons accordingly
 */
function toggleTouchButtons() {
    if (world && userIsOnMobileDevice && !world.gameOver) show('key-panel-top', 'key-panel-bottom'); // and add margin-left to .btn-toggle-touch
    if (world && !userIsOnMobileDevice) hide('key-panel-top', 'key-panel-bottom');
}

/**
 * Shows the most important control buttons for the game on desktop devices
 */
function toggleControlHelp() {
    if (userIsOnMobileDevice) hide('control-help');
    else show('control-help');
}

/* --- ---responsiveness & full screen mode --- --- */

/**
 * Checks for inner height and width of screen and sets global CSS variables accordingly
 * @todo decide if full screen mode should be preserved on resize event as done here (eg when a mobile device is tilted)
 */
function setCanvasCssVars() {
    if (window.innerHeight <= canvasHeight && wideScreenAspectRatio()) setFullHeightScreen();
    else if (window.innerWidth <= canvasWidth) setFullWidthScreen();
    
    if (window.innerWidth > canvasWidth && window.innerHeight > canvasHeight && !fullScreenMode)
        closeFullScreen();
    else if (fullScreenMode && wideScreenAspectRatio()) setFullHeightScreen();
    else setFullWidthScreen();
}

/**
 * Sets global CSS custom properties (css variables) for full width canvas screens
 * by setting --canvasWidth to full screen width and keeping the ratio for --camvasHeight,
 * adapts the HTML view
 */
function setFullWidthScreen() {
    root.style.setProperty('--canvasWidth', document.documentElement.clientWidth + 'px');
    root.style.setProperty('--canvasHeight', document.documentElement.clientWidth / 1.5 + 'px');
    fullScreenMode = true;
    setFullWidthStyle();
}

/**
 * Adjusts the view for full screen mode
 */
function setFullWidthStyle() {
    let panelTop, panelBottom;
    getId('help-icon').classList.add('help-icon-fullscreen');
    document.getElementsByTagName('h1')[0].classList.add('d-none');
    [panelTop, panelBottom] = getId('key-panel-top', 'key-panel-bottom');
    panelTop.classList.add('panel-top-fullscreen')
    panelBottom.classList.add('panel-bottom-fullscreen'); // remove?
    if (window.innerWidth <= canvasWidth || window.innerHeight <= canvasHeight) hide('fullscreen-icon');
}

/**
 * Removes adjusted views for fullscreen mode
 */
function removeFullWidthStyle() {
    let panelTop, panelBottom;
    [panelTop, panelBottom] = getId('key-panel-top', 'key-panel-bottom');
    hide('key-panel-top', 'key-panel-bottom'); //if (!onMobileDevice)
    show('fullscreen-icon');
    getId('help-icon').classList.remove('help-icon-fullscreen'); //remove?
    document.getElementsByTagName('h1')[0].classList.remove('d-none');
    panelTop.classList.remove('panel-top-fullscreen')
    panelBottom.classList.remove('panel-bottom-fullscreen');
}

/**
 * Sets global CSS custom properties (css variables) for full height canvas screens
 * by setting --canvasHeight to full screen height,
 * adapts the HTML view
 */
function setFullHeightScreen() {
    root.style.setProperty('--canvasHeight', document.documentElement.clientHeight + 'px');
    root.style.setProperty('--canvasWidth', document.documentElement.clientWidth + 'px');
    setFullWidthStyle();
    fullScreenMode = true;
}

/**
 * Resets global CSS custom properties (css variables) to their initial standard values,
 * adapts HTML view
 */
function closeFullScreen() {
    if (window.innerWidth >= canvasWidth && window.innerHeight >= canvasHeight) {
        root.style.setProperty('--canvasWidth', canvasWidth + 'px');
        root.style.setProperty('--canvasHeight', canvasHeight + 'px');
    }
    fullScreenMode = false;
    removeFullWidthStyle();   
}

/**
 * Checks current fullscren mode and client screen dimensions, opens or closes full screen accordingly
 */
function toggleFullScreen() {

    if (!document.fullscreenElement && document.documentElement.requestFullscreen) { //fullScreenMode set in set..FullScreen() 
        document.documentElement.requestFullscreen().catch(err => console.log(err));
    }

    else if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
    }
    setFullScreenView();
}

function setFullScreenView() {
    if (!fullScreenMode && wideScreenAspectRatio()) setFullHeightScreen();
    else if (!fullScreenMode) setFullWidthScreen();
    else if (fullScreenMode && window.innerWidth > 720) closeFullScreen();
    toggleTouchButtons();
}

/**
 * Checks if the screen's width is too large compared to its height to open a full width screen
 * @returns {boolean}
 */
function wideScreenAspectRatio() {
    return (
        (window.innerHeight <= canvasHeight && window.innerWidth >= canvasWidth) || // checks against canvas dimensions
        window.innerHeight * 1.5 / window.innerWidth < 1 // checks hight to width ratio //NOTE: window.innerHeight / (window.innerWidth / 1.5) --> window.innerWidth/1.5 is the canvas height-to-width ratio
    );
}

/* --- --- helper functions --- --- */

/**
 * This function provides a shorthand for the Document method getElementById()
 * and allows to get multiple Elements in an array
 * @param  {...string} idNames 
 * @returns { (HTMLElement | HTMLElement[]) } 
 */
function getId(...idNames) {
    let htmlElements = [];
    for (let id of idNames) {
        htmlElements.push(document.getElementById(id));
    }
    if (htmlElements.length == 1) return htmlElements[0];
    else return htmlElements;
}

/**
 * Hides any number of passed HTML Elements
 * @param  {...string} elementIDs - id names of HTML Elements
 */
function hide(...elementIDs) {
    for (let elId of elementIDs) {
        let el = getId(elId);
        if (!el.classList.contains('d-none')) {
            el.classList.add('d-none');
        }
    }
}

/**
 * Shows any number of passed HTML Elements
 * @param  {...string} elementIDs - id names of HTML Elements
 */
function show(...elementIDs) {
    for (let elId of elementIDs) {
        let el = getId(elId);
        if (el.classList.contains('d-none')) {
            el.classList.remove('d-none');
        }
    }
}

/**
 * Toggles the view of any number of passed HTML Elements and 
 * returns an array containing the respective action (hide or show) performed on the elements
 * @param  {...string} elementIDs - id names of HTML Elements
 * @returns { string[] }
 */
function toggle(...elementIDs) {
    let actions = [];
    for (let elId of elementIDs) {
        let el = getId(elId);
        if (el.classList.contains('d-none')) {
            el.classList.remove('d-none');
            actions.push('show');
        } else {
            el.classList.add('d-none');
            actions.push('hide');
        }
    }
    return actions;
}