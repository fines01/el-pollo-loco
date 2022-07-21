/* set global canvas variables: get css variables, remove string 'px' and save the numeric values. */
const root = document.documentElement;
let canvasWidth = getComputedStyle(root).getPropertyValue('--canvasWidth').replace('px', '')*1;
let canvasHeight = getComputedStyle(root).getPropertyValue('--canvasHeight').replace('px', '')*1;

let level, world;
let helpScreenMode = false;
let fullScreenMode = false;
let levelCounter = 1;
let maxLevels = 9;

/** sets css variables and default (first) level on load of page */
window.addEventListener('load', ()=>{
    setCanvasCssVars();
    level = setLevel();
});

/** sets css variables after a resize event of the window */
window.addEventListener('resize', (e)=>{
    setCanvasCssVars();
});

/** binds key press events to control the UI outside of the game */
// let handleKeypresses = 
window.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && !world && !helpScreenMode) beginGame();
    if (e.code == 'Enter' && world && world.gameOver && !world.gamePaused) restartGame();
    if (e.code == 'KeyP' && world && !helpScreenMode) togglePause();
    if (e.code == 'KeyF' && world) world.setDevMode();
    if (e.code == 'KeyH') toggleHelpScreen();
    if (e.code == 'KeyS' && !fullScreenMode) openFullWidthScreen();
    if (e.code == 'Escape' && fullScreenMode && window.innerWidth > 720) closeFullScreen();
});

/**
 * Starts game after a given time
 * @param {number} ms - milliseconds of timeout until the game is started
 */
function beginGame( ms = 300){
    getId('screen-text-big').classList.add('text-dive-animation');
    window.setTimeout( ()=>{
        startGame();
    }, ms);
}

/**
 * Sets HTML, creates an instance of the Class World and
 * starts game-loop after a check if objects are fully loaded
 */
function startGame() {
    hide('start-screen', 'game-over-screen', 'loser-screen', 'screen-text-big', 'screen-text-small');
    show('canvas');
    world = new World();
    world.gameOver = false;
    if (world.checkWorldComplete()) world.run();
}

/**
 * Pauses potentially running audios, checks level and
 * starts game with respective level
 */
function restartGame() {
    world.winSound.pause();
    world.loseSound.pause();
    checkLevel(); 
    startGame(); // beginGame(235) and show Level w animation?
}

/**
 * sets win screen HTML and plays win jungle, increases level - counter
 */
function setWinScreen(){
    let wonText = getId('screen-text-big');
    let levelText = getId('screen-text-small');
    let nextLevel = levelCounter+1;
    wonText.innerHTML = "YOU WON!";
    wonText.classList.add('endscreen-text');
    if (levelCounter < maxLevels) levelText.innerHTML= "Press Enter to Start Level " + nextLevel;
    show('game-over-screen', 'screen-text-big', 'screen-text-small');
    world.winSound.play();
}

/**
 * sets loseer screen and plays loser jingle
 */
function setLoserScreen(){
    show('loser-screen', 'screen-text-small');
    world.loseSound.play();
}

/**
 * sets level counter and instanciates a new level
 */
function checkLevel() { // rename?
    if (levelCounter < maxLevels && world.checkWin()) levelCounter++;
    else if (levelCounter == maxLevels && world.checkWin()) levelCounter = 1 ;
    level = setLevel(levelCounter);
}

/**
 * toggles pause mode during game  
 * and resets lastAnimationFrame when resuming game
 */
function togglePause() {
    world.gamePaused = !world.gamePaused;
    if (!world.gamePaused) {
        world.lastAnimationFrame = Date.now();
        world.run();
    }
}

/**
 * toggles help screen, sets helpscreenMode
 * to make sure game is paused if help screen is on during game 
 * and can't be started if help screen is on during start screen
 */
function toggleHelpScreen(){
        let actions = toggle('help-screen');
        if (world && !(actions[0] == 'show' && world.gamePaused)) togglePause();
        if (actions[0] == 'show') helpScreenMode = true;
        else helpScreenMode = false;
}

/* --- ---responsiveness & full screen mode --- --- */

/**
 * checks for inner height and width of screen and sets css variables accordingly
 */
function setCanvasCssVars() {
    if (window.innerWidth < canvasWidth)  {
        openFullWidthScreen();
    }
    else if (window.innerHeight < canvasHeight) {
        openFullHeightScreen();
    }
    if (window.innerWidth >= canvasWidth && window.innerHeight >= canvasHeight) {
        closeFullScreen();
    }
}

/**
 * sets global CSS custom properties (variables) for full width canvas screens
 * by setting --canvasWidth to full screen width and keeping the ratio for --camvasHeight
 * and adapts the HTML view
 */
function openFullWidthScreen() {
    // set CSS variables
    root.style.setProperty('--canvasWidth', window.innerWidth + 'px');
    root.style.setProperty('--canvasHeight', window.innerWidth / 1.5 + 'px');
    // adapt views
    getId('help-note').classList.add('help-note-fullscreen');
    document.getElementsByTagName('h1')[0].classList.add('d-none');
    fullScreenMode = true;
}

/**
 * sets global CSS custom properties (variables) for full height canvas screens
 * by setting --canvasHeight to full screen height and keeping the ratio for --camvasWidth
 * and adapts the HTML view
 */
function openFullHeightScreen() {
    root.style.setProperty('--canvasHeight', window.innerHeight + 'px');
    root.style.setProperty('--canvasWidth', window.innerHeight * 1.5 + 'px');
    // same as above --> refactor in function? (setFullScreenView() ?)
    getId('help-note').classList.add('help-note-fullscreen');
    document.getElementsByTagName('h1')[0].classList.add('d-none');
    fullScreenMode = true;
}

/**
 * resets global CSS custom properties (variables) to their initial standard values
 * and adapts HTML view
 */
function closeFullScreen() {
    root.style.setProperty('--canvasWidth', canvasWidth + 'px');
    root.style.setProperty('--canvasHeight', canvasHeight + 'px');
    getId('help-note').classList.remove('help-note-fullscreen');
    document.getElementsByTagName('h1')[0].classList.remove('d-none');
    fullScreenMode = false;
}

/* --- --- helper functions --- --- */

/**
 * this function provides a shorthand for the Document method getElementById()
 * and allows to get multiple Elements in an array
 * @param  {...string} idNames 
 * @returns { (HTMLElement | HTMLElements[]) } 
 */
function getId(...idNames){
    let htmlElements = [];
    for (let id of idNames) {
        htmlElements.push(document.getElementById(id));
    }
    if (htmlElements.length == 1)  return htmlElements[0];
    else return htmlElements;
}

/**
 * Hides any number of given HTML Elements
 * @param  {...string} elementIDs - id names of HTML Elements
 */
function hide(...elementIDs){
    for (let elId of elementIDs) {
        let el = getId(elId);
        if (!el.classList.contains('d-none')) {
            el.classList.add('d-none');
        }
    }
}

/**
 * Shows any number of given HTML Elements
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
 * toggles the view of any number of given HTML Elements and 
 * returns an array containing the respective action (hide or show) performed on the elements
 * @param  {...string} elementIDs - id names of HTML Elements
 * @returns { string[] }
 */
function toggle(...elementIDs){
    let actions = [];
    for (let elId of elementIDs) {
        let el = getId(elId);
        if (el.classList.contains('d-none')) { 
            el.classList.remove('d-none');
            actions.push('show');
        }
        else {
            el.classList.add('d-none');
            actions.push('hide');
        }
    }
    return actions;
}
