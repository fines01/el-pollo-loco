class Coin extends CollectibleObject {

    width = 150;
    height = this.width;

    IMAGE_COIN = 'img/8.Coin/Moneda2.png' ;

    constructor(){
        super();
        //this.i = Math.floor(Math.random() * 2); // rand Integer between [0,] // i?
        this.loadImage(this.IMAGE_COIN);
    }

    
}