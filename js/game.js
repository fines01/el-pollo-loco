// get css variables
// remove string 'px' and keep only the numeric values
// Actually not necessary
const root = document.documentElement;
const canvasWidth = getComputedStyle(root).getPropertyValue('--canvasWidth').replace('px', '');
const canvasHeight = getComputedStyle(root).getPropertyValue('--canvasHeight').replace('px', '');

let world;

// function init() {
//     console.log('Hi! Press Enter to start the game!');
//    // world = new World();
// }

let handleKeypresses = window.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && !world) {
        getId('start-text').classList.add('text-dive-animation');
        window.setTimeout( ()=>{
        startGame();
    }, 400);
    }
    if (e.code == 'KeyP' && world){
        togglePause();
    }
});

function startGame() {
        hide('start-screen', 'game-over-screen', 'loser-screen', 'start-text');
        show('canvas');
        world = new World();
}

function togglePause() {
    world.gamePaused = !world.gamePaused;
    if (!world.gamePaused) world.run();
}

// OK LOL
// function showGameOverScreen(){
//     show('game-over-screen');
// }


// function pauseGame() {}


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
