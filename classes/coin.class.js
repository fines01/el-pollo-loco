class Coin extends CollectibleObject {

    width = 150;
    height = this.width;

    IMAGE_COIN = 'img/8.Coin/Moneda2.png' ;

    constructor(){
        super();
        this.i = Math.floor(Math.random() * 2); // rand Integer between [0,1]
        this.loadImage(this.IMAGE_COIN);
        //place randomly between y [50, 325] & x [0, levelEnd_x -200]
        this.x = Math.random() * (2*canvasWidth-500);
        this.y = 50 + Math.random() * 275;
    }

    
}