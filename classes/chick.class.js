class Chick extends MovableObject {

    height = 75;
    width = 90;
    groundLevel_y = 350;

    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_b sico/Versi¢n_pollito/1.Paso_derecho.png',
        'img/3.Secuencias_Enemy_b sico/Versi¢n_pollito/2.Centro.png',
        'img/3.Secuencias_Enemy_b sico/Versi¢n_pollito/3.Paso_izquierdo.png',
    ];
    IMAGE_DEAD = [
        'img/3.Secuencias_Enemy_b sico/Versi¢n_pollito/4.Muerte.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 1040;
        this.y = this.groundLevel_y;
        this.speedX = 0.75 + Math.random() * 0.45;
        this.jumpHeight = Math.random() * 22;
        this.applyGravity();
        this.animateChick();
    }

    // same as for all 'enemies' (for now: chick, chicken) --> maybe class Enemy? function animateEnemy()
    animateChick(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 90 / this.speedX); // 
        this.move();
    }
    
    // randomBounce(){
    //     Math.random() < 0.3 && !this.isAboveGround() && this.jump(); 
    //     Math.random() < 0.4 && this.moveLeft(); // makes it a bit more dynamic? maybe? (if moving left at all)
    // }
    
    move() {
        this.moveLeft();
        this.randomBounce();
        (this.x < 0 - this.width) && (this.x = 2 * canvasWidth); //move back into frame 2 ^⁼= amount of canvas-lengths for bgs
        let self = this;
            requestAnimationFrame(() => {
            self.move();
        });
    }

}