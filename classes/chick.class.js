class Chick extends Enemy {

    height = 75;
    width = 90;
    groundLevelY = 350;

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
        this.y = this.groundLevelY;
        this.speedX = 0.75 + Math.random() * 0.45;
        this.jumpHeight = Math.random() * 22;
        this.applyGravity();
        //this.animateChick();
        this.animateEnemies();
    }

}