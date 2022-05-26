class Chicken extends MovableObject {

    y = 343;
    height = 90;
    width = 95;

    IMAGES_WALKING = [
         'img/3.Secuencias_Enemy_b sico/Versi¢n_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
         'img/3.Secuencias_Enemy_b sico/Versi¢n_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
         'img/3.Secuencias_Enemy_b sico/Versi¢n_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png',
    ];

    // speedX = 0.3;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = 200 + Math.random() * 1040; // * levelEnd_x  - 200
        this.y = 330 + Math.random() * 25; // rand. number between 330 & 355
        this.speedX = 0.15 + Math.random() * 0.45;
        this.loadImages(this.IMAGES_WALKING);
        this.animateChicken();
    }

    animateChicken() {
        // setInterval( () => {
            this.playAnimation(this.IMAGES_WALKING);
        // }, 150);
        this.move();
        console.log(this.speedX);
    }
        
    move(){
        this.moveLeft();
        (this.x < 0 - this.width) && (this.x = 2 * canvasWidth); //move back into frame 2 ^⁼= amount of canvas-lengths for bgs
        let self = this;
        requestAnimationFrame( () => {
            self.move();
        });
    }

}