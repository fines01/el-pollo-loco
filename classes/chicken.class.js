class Chicken extends MovableObject {

    height = 90;
    width = 95;
    
    IMAGES_WALKING = [
         'img/3.Secuencias_Enemy_b sico/Versi¢n_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
         'img/3.Secuencias_Enemy_b sico/Versi¢n_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
         'img/3.Secuencias_Enemy_b sico/Versi¢n_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png',
    ];

    IMAGE_DEAD = [
        'img/3.Secuencias_Enemy_b sico/Versi¢n_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png'
    ];

    // speedX = 0.3;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = 200 + Math.random() * 1040; // * levelEnd_x  - 200
        this.y = 340 - Math.random() * 9; 
        this.groundLevel_y = this.y;
        this.speedX = 1 + Math.random() * 0.5;
        this.loadImages(this.IMAGES_WALKING);
        this.jumpHeight = Math.random() * 5;
        this.applyGravity();
        this.animateChicken();
    }

    animateChicken() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 90 / this.speedX); // 
        this.move();
        //console.log('chicken start:',this.x, 'speed:',this.speedX);
    }
        
    move(){
        this.moveLeft();
        this.randomBounce();
        (this.x < 0 - this.width) && (this.x = 2 * canvasWidth); //move back into frame 2 ^⁼= amount of canvas-lengths for bgs
        let self = this;
        requestAnimationFrame( () => {
            self.move();
        });
    }

}