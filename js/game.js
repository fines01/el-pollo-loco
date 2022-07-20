// get css variables, remove string 'px' and keep only the numeric values (as str)
const root = document.documentElement;
let canvasWidth = getComputedStyle(root).getPropertyValue('--canvasWidth').replace('px', '')*1;
let canvasHeight = getComputedStyle(root).getPropertyValue('--canvasHeight').replace('px', '')*1;

let level, world;
let helpScreenMode = false;
let fullScreenMode = false;
let levelCounter = 1;
let maxLevels = 9;

function init() {
    setCanvasCssVars();
    level = setLevel();
}

window.addEventListener('resize', (e)=>{
    setCanvasCssVars();
});

//// binding key press events 
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

function beginGame( ms = 300){
    getId('screen-text-big').classList.add('text-dive-animation');
    window.setTimeout( ()=>{
        startGame();
    }, ms);
}

function startGame() {
    hide('start-screen', 'game-over-screen', 'loser-screen', 'screen-text-big', 'screen-text-small');
    show('canvas');
    world = new World();
    world.gameOver = false;
    if (world.checkWorldComplete()) world.run();
}

function restartGame() {
    world.winSound.pause();
    world.loseSound.pause();
    checkLevel(); 
    startGame(); // beginGame(235) and show Level w animation?
    console.log('Start Level ', levelCounter, '!'); // Todo: show level
}

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

function setLoserScreen(){
    show('loser-screen', 'screen-text-small');
    // loseJinglePlayPromise = 
    world.loseSound.play();
}

function checkLevel() { // rename
    if (levelCounter < maxLevels && world.checkWin()) levelCounter++;
    else if (levelCounter == maxLevels && world.checkWin()) levelCounter = 1 ;
    level = setLevel(levelCounter);
}

function togglePause() {
    world.gamePaused = !world.gamePaused;
    if (!world.gamePaused) {
        world.lastAnimationFrame = Date.now();
        world.run();
    }
}

function toggleHelpScreen(){
        let actions = toggle('help-screen');
        if (world && !(actions[0] == 'show' && world.gamePaused)) togglePause();
        if (actions[0] == 'show') helpScreenMode = true;
        else helpScreenMode = false;
}

// // RESPONSIVENESS & FULL SCREEN MODE

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

function openFullWidthScreen() {
    // set CSS variables
    root.style.setProperty('--canvasWidth', window.innerWidth + 'px');
    root.style.setProperty('--canvasHeight', window.innerWidth / 1.5 + 'px');
    // adapt views
    getId('help-note').classList.add('help-note-fullscreen');
    document.getElementsByTagName('h1')[0].classList.add('d-none');
    fullScreenMode = true;
}

function openFullHeightScreen() {
    root.style.setProperty('--canvasHeight', window.innerHeight + 'px');
    root.style.setProperty('--canvasWidth', window.innerHeight * 1.5 + 'px');
    // same as above --> refactor in function? (setFullScreenView() ?)
    getId('help-note').classList.add('help-note-fullscreen');
    document.getElementsByTagName('h1')[0].classList.add('d-none');
    fullScreenMode = true;
}

function closeFullScreen() {
    root.style.setProperty('--canvasWidth', canvasWidth + 'px');
    root.style.setProperty('--canvasHeight', canvasHeight + 'px');
    getId('help-note').classList.remove('help-note-fullscreen');
    document.getElementsByTagName('h1')[0].classList.remove('d-none');
    fullScreenMode = false;
}

// // HELPER FUNCTIONS 

function getId(...idNames){
    let htmlElements = [];
    for (let id of idNames) {
        htmlElements.push(document.getElementById(id));
    }
    if (htmlElements.length == 1)  return htmlElements[0];
    else return htmlElements;
}

function hide(...elements){
    for (let elId of elements) {
        let el = getId(elId);
        if (!el.classList.contains('d-none')) {
            el.classList.add('d-none');
        }
    }
}

function show(...elements) {
    for (let elId of elements) {
        let el = getId(elId);
        if (el.classList.contains('d-none')) {
            el.classList.remove('d-none');
        }
    }
}

function toggle(...elements){
    let actions = [];
    for (let elId of elements) {
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
