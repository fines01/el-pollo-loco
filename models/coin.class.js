class Coin extends CollectibleObject {

    width = 120;
    height = this.width;
    initialWidth = this.width;
    initialHeight = this.height;
    IMAGE_COIN = 'img/8.Coin/Moneda2.png';

    rotationAngle = 0;
    
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

    checkHitarea() {
        this.imgY = this.y + 42;
        this.imgX = this.x + 42;
        this.imgWidth = this.width * 0.3;
        this.imgHeight = this.height * 0.3;
    }

    animateCoin() { // or animate all collectibles in CollectibleObject Class via checkAnimationTimeFrame
        setInterval(()=>{
            this.pulse(13);
        }, 1000/3);
    }

}