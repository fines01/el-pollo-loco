// get css variables
// remove string 'px' and keep only the numeric values
// Actually necessary?
const root = document.documentElement;
const canvasWidth = getComputedStyle(root).getPropertyValue('--canvasWidth').replace('px', '');
const canvasHeight = getComputedStyle(root).getPropertyValue('--canvasHeight').replace('px', '');

let level, world;

function init() {
    level = setLevel(1);
}

let handleKeypresses = window.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && !world) beginGame();
    if (e.code == 'Enter' && world && world.gameOver) restartGame();
    if (e.code == 'KeyP' && world) togglePause();
    if (e.code == 'KeyF' && world) world.setDevMode();
    if (e.code == 'KeyH') toggleHelpScreen();
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

function togglePause() {
    world.gamePaused = !world.gamePaused;
    if (!world.gamePaused) {
        world.lastAnimationFrame = Date.now();
        world.run();
    }
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

function toggleHelpScreen(){
        let actions = toggle('help-screen');
        if (world) togglePause();
        // if (!world || world.gameOver && actions[0] == 'show') hide('screen-text-big', 'screen-text-small');
        // if (!world && actions[0] == 'hide') show ('screen-text-big');
        // if (world && world.gameOver && actions[0] == 'hide') show('screen-text-small');
}

// // HELPER FUNCTIONS 

function getId(...idNames){
    let htmlElements = [];
    for(let i = 0; i < idNames.length; i++){
        htmlElements.push(document.getElementById(idNames[i]));
    }
    if (htmlElements.length == 1)  return htmlElements[0];
    else return htmlElements;
}

function hide(...elements){
    for (let i = 0; i < elements.length; i++){
        let el = getId(elements[i]);
        if (!el.classList.contains('d-none')){
            el.classList.add('d-none');
        }
    }
}

function show(...elements) {
     for (let i = 0; i < elements.length; i++) {
        let el = getId(elements[i]);
        if (el.classList.contains('d-none')) {
            el.classList.remove('d-none');
        }
    }
}

function toggle(...elements){
    let actions = [];
    for (let i = 0; i < elements.length; i++) {
        let el = getId(elements[i]);
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
