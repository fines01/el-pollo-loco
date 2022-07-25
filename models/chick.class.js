class Chick extends Enemy {

    groundLevelY = 350;
    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_b sico/Versi¢n_pollito/1.Paso_derecho.png',
        'img/3.Secuencias_Enemy_b sico/Versi¢n_pollito/2.Centro.png',
        'img/3.Secuencias_Enemy_b sico/Versi¢n_pollito/3.Paso_izquierdo.png',
    ];
    IMAGE_DEAD = [
        'img/3.Secuencias_Enemy_b sico/Versi¢n_pollito/4.Muerte.png'
    ];
    
    /**
     * Creates a baby chick object
     * @param {number} levelEndX - x coordinate of level end
     */
    constructor(levelEndX){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * (levelEndX-300);
        this.y = this.groundLevelY;
        this.height = 55 + Math.random() * 20;
        this.width = this.height * 1.2;
        this.jumpHeight = Math.random() * 35;//(90 - this.height);
        this.speedX = (0.75 + Math.random() * 4) + this.speedModifier;
    }

}