class BackgroundObject extends MovableObject {
    
    width = canvasWidth;
    height = canvasHeight;
    //x = 0;
    // img; // in DrawableObject

    constructor(imgPath, x){
        super().loadImage(imgPath);
        this.x = x;
        this.y = 480 - this.height;
    }
}