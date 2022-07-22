class Cloud extends BackgroundObject {
    
    y = -10;
    height = 320;
    width = canvasWidth*2;

    /**
     * Creates a cloud object
     * @todo remove levelEndX param?
     * @param {string} imgPath - image source of cloud object
     * @param {number} x - x coordinate on canvas
     * @param {number} levelEndX - x coordinate of level end
     */
    constructor(imgPath, x, levelEndX){
        super().loadImage(imgPath);
        this.x = x;
        this.speedX = 0.09 + Math.random() * 0.11;
    }

    /**
     * Moves the cloud object on the canvas,
     * when the object has been fully moved through, it is moved back into the frame
     * @param {number} levelEndX - x coordinate of level end
     */
    move(levelEndX) {
        this.moveLeft();
        if (this.x < 0 - this.width) this.x = levelEndX;
    }
}