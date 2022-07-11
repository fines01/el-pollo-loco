class Cloud extends BackgroundObject {
    
    y = -10;
    height = 320;
    width = canvasWidth*2;

    constructor(imgPath, x, levelEndX){
        super().loadImage(imgPath);
        this.x = x;
        this.speedX = 0.09 + Math.random() * 0.11;
    }

    move(levelEndX) {
        this.moveLeft();
        if (this.x < 0 - this.width) this.x = levelEndX; //move back into frame 
    }
}