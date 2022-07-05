class Coin extends CollectibleObject {

    width = 120;
    height = this.width;

    IMAGE_COIN = 'img/8.Coin/Moneda2.png' ;

    constructor(levelEndX){
        super();
        this.x = 100 + Math.random() * (levelEndX - 100);
        this.y = 50 + Math.random() * 275;
        //this.i = Math.floor(Math.random() * 2); // rand Integer between [0,] // i?
        this.loadImage(this.IMAGE_COIN);
        // as sometimes  the actual image is much smaller than the size of the png file:
        this.checkHitareaDimensions();
    }

    checkHitareaDimensions() {
        this.imgY = this.y + 42;//52;
        this.imgX = this.x + 42;//53;
        this.imgWidth = this.width * 0.3;
        this.imgHeight = this.height * 0.3;
    }

}