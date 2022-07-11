// get css variables
// remove string 'px' and keep only the numeric values
// Actually not necessary
const root = document.documentElement;
const canvasWidth = getComputedStyle(root).getPropertyValue('--canvasWidth').replace('px', '');
const canvasHeight = getComputedStyle(root).getPropertyValue('--canvasHeight').replace('px', '');

let level, world;

function init() {
    level = setLevel(1);
}

let handleKeypresses = window.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && !world) {
        getId('screen-text-big').classList.add('text-dive-animation');
        window.setTimeout( ()=>{
            startGame();
        }, 300);
    }
    if (e.code == 'Enter' && world && world.gameOver) {
        level = setLevel(1);
        startGame();
    }
    if (e.code == 'KeyP' && world){
        togglePause();
    }
});

function startGame() {
    hide('start-screen', 'game-over-screen', 'loser-screen', 'screen-text-big', 'screen-text-small');
    show('canvas');
    // level = setLevel();
    world = new World();
    world.gameOver = false;
    if (world.character.checkImgLoaded()) world.run();
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
}

function setLoserScreen(){
    show('loser-screen', 'screen-text-small');
}

function setHelpScreen(){}


// HELPER FUNCTIONS 

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
