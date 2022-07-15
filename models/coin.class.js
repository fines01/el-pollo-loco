class Coin extends CollectibleObject {

    width = 120;
    height = this.width;
    IMAGE_COIN = 'img/8.Coin/Moneda2.png';
    
    constructor(levelEndX){
        super();
        this.x = 300 + Math.random() * (levelEndX - 400);
        this.y = 50 + Math.random() * 275;
        this.loadImage(this.IMAGE_COIN);
        this.checkHitarea();
        this.collectSound = new Audio('audio/Picked Coin Echo.wav');
        this.collectSound.playbackRate = 1.5;
    }

    checkHitarea() {
        this.imgY = this.y + 42;//52;
        this.imgX = this.x + 42;//53;
        this.imgWidth = this.width * 0.3;
        this.imgHeight = this.height * 0.3;
    }

}