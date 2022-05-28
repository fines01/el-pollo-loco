// get css variables
// remove string 'px' and keep only the numeric values
// GN only inline setting of width and height in js?
const root = document.documentElement;
const canvasWidth = getComputedStyle(root).getPropertyValue('--canvasWidth').replace('px', '');
const canvasHeight = getComputedStyle(root).getPropertyValue('--canvasHeight').replace('px', '');
let world, keyboard;

function init() {
    // get an instance of the CanvasRenderingContext2D interface (provides 2d rendering context for the canvas element)
    //canvas = document.getElementById('canvas');
    // const ctx = canvas.getContext('2d'); // into class World
    world = new World();
}

// handle keypresses (class Keyboard?)
// window.addEventListener('keydown', (event) => {
//     console.log(event.key, event.code);
//     let keys = [];
// })

