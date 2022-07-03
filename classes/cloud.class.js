class Cloud extends BackgroundObject {
    
    y = -10;
    //x = 0;
    height = 320;
    width = canvasWidth;
    speedX = 0.15;

    constructor(imgPath, x, levelEndX){
        super().loadImage(imgPath);
        this.x = x;
        this.speedX = 0.09 + Math.random() * 0.11;
        //this.x = 200 + Math.random() * 500; // random number between 200 & 700
        //this.x = Math.random() * 1440; // 0r between 0 - 1440
        this.move(levelEndX); // or move()
    }

    move(levelEndX) {

        this.moveLeft();
        if (this.x < 0 - this.width) this.x = levelEndX; //move back into frame 2 ^⁼= amount of canvas-lengths for bgs // kein Zugr auf world.level.levelEndX, extra übergeben?
    }
}