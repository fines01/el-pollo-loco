class Coin extends CollectibleObject {

    width = 120;
    height = this.width;
    initialWidth = this.width;
    initialHeight = this.height;
    IMAGE_COIN = 'img/8.Coin/Moneda2.png';
    // rotationAngle = 0;
    
    /**
     * Creates a coin element and starts its animation
     * @todo animations for Coins, Bottles, Enemies (Chicken, Chicks) only need to be initialized when game starts, not when they are created (at instnciating level)
     * @param {number} levelEndX - x coordinate of level end
     */
    constructor(levelEndX){
        super();
        this.x = 300 + Math.random() * (levelEndX - 400);
        this.y = 50 + Math.random() * 275;
        this.loadImage(this.IMAGE_COIN);
        this.checkHitarea();
        this.collectSound = new Audio('audio/Picked Coin Echo.wav');
        this.collectSound.playbackRate = 1.5;
        this.animateCoin(); 
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
     * Plays coin animation
     * @todo remove setInterval function? Maybe animate all collectibles in CollectibleObject Class via checkAnimationTimeFrame()
     * mb if checkAnimationFrameTime() is moved to MovableObjects class CollectibleObject class can be removed
     */
    animateCoin() { // or animate all collectibles in CollectibleObject Class via checkAnimationTimeFrame
        setInterval(()=>{
            this.pulse(13);
        }, 1000/3);
    }

}