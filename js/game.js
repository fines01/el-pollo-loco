// get css variables, remove string 'px' and keep only the numeric values
const root = document.documentElement;
let canvasWidth = getComputedStyle(root).getPropertyValue('--canvasWidth').replace('px', '');
let canvasHeight = getComputedStyle(root).getPropertyValue('--canvasHeight').replace('px', '');

let level, world;
let helpScreenMode = false;
let fullScreenMode = false;

function init() {
    level = setLevel(1);
}

function setMobileCanvas() {
    if (window.innerWidth < canvasWidth) root.style.setProperty('--canvasWidth', window.innerWidth + 'px'); 
    if (window.innerHeight < canvasHeight) root.style.setProperty('--canvasHeight', window.innerHeight + 'px');
    if (window.innerWidth >= canvasWidth || window.innerHeight >= canvasHeight) closeFullScreen();
}

window.addEventListener('resize', (e)=>{
    if (!fullScreenMode) setMobileCanvas();
});

//let handleKeypresses = 
window.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && !world && !helpScreenMode) beginGame();
    if (e.code == 'Enter' && world && world.gameOver && !world.gamePaused) restartGame();
    if (e.code == 'KeyP' && world && !helpScreenMode) togglePause();
    if (e.code == 'KeyF' && world) world.setDevMode();
    if (e.code == 'KeyH') toggleHelpScreen();
    if (e.code == 'KeyS') openFullScreen();
    if (e.code == 'Escape') closeFullScreen();
});

function beginGame(){
    getId('screen-text-big').classList.add('text-dive-animation');
    window.setTimeout( ()=>{
        startGame();
    }, 300);
}

function restartGame(){
    // later: set level
    let levelNo = 1;
    level = setLevel(levelNo);
    startGame();
}

function startGame() {
    hide('start-screen', 'game-over-screen', 'loser-screen', 'screen-text-big', 'screen-text-small');
    show('canvas');
    world = new World();
    world.gameOver = false;
    if (world.checkWorldComplete()) world.run();
}

function setWinScreen(){
    let text = getId('screen-text-big');
    show('game-over-screen', 'screen-text-big', 'screen-text-small');
    text.innerHTML = "YOU WON!";
    text.classList.add('endscreen-text');
    world.winSound.play();
}

function setLoserScreen(){
    show('loser-screen', 'screen-text-small');
    world.loseSound.play();
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

function openFullScreen() {
    root.style.setProperty('--canvasWidth', window.innerWidth + 'px'); //canvasheight = canvasWidth/1.5 - keep ratio?
    root.style.setProperty('--canvasHeight', window.innerHeight + 'px');
    getId('help-note').classList.add('help-note-fullscreen');
    fullScreenMode = true;
}

function closeFullScreen() {
    root.style.setProperty('--canvasWidth', canvasWidth + 'px');
    root.style.setProperty('--canvasHeight', canvasHeight + 'px');
    getId('help-note').classList.remove('chelp-note-fullscreen');
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
