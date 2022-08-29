class Coin extends MovableObject {

    width = 120;
    height = this.width;
    initialWidth = this.width;
    initialHeight = this.height;
    IMAGE_COIN = 'img/8.Coin/Moneda2.png';
    // rotationAngle = 0;
    animationFPS = 3;
    animationFrameInterval = 1000 / this.animationFPS;
    animationFrameTimer = 0;
    
    /**
     * Creates a coin element
     * @param {number} levelEndX - x coordinate of level end
     */
    constructor(levelEndX){
        super();
        this.x = 300 + Math.random() * (levelEndX - 400);
        this.y = 50 + Math.random() * 275;
        this.loadImage(this.IMAGE_COIN);
        this.checkHitarea();
        this.collectSound = new Audio('audio/coin_collect.wav');
        this.collectSound.playbackRate = 1.5;
    }

    /**
     * Corrects the dimensions of an object 's actual hit area compared to the dimensions of its image element
     */
    checkHitarea() {
        this.imgY = this.y + 42;
        this.imgX = this.x + 42;
        this.imgWidth = this.width * 0.3;
        this.imgHeight = this.height * 0.3;
    }

    /**
     * Plays coin animation at defined frame interval, 
     * to be called in the checkAnimationFrameTime(dt) function
     */
    animate() {
        this.pulse(13);
    }

}