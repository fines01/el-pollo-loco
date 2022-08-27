class Chicken extends Enemy {

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

    /**
     * Creates a chicken object
     * @param {number} levelEndX - x coordinate of level end
     */
    constructor(levelEndX) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * (levelEndX-400);
        this.y = 340 - Math.random() * 9; 
        this.groundLevelY = this.y;
        this.speedX = 1 + Math.random() * 3 + this.speedModifier;
        this.jumpHeight = Math.random() * 7;
    }

}