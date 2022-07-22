class BackgroundObject extends MovableObject {
    
    width = canvasWidth*2; 
    height = canvasHeight;

    /**
     * Creates the background object
     * @todo remove parameter levelEndX or decide weather to redo move function
     * @param {string} imgPath - source of the background image
     * @param {number} x - x coordinate on the canvas
     * @param {number} speedX - speed of horizontal movement
     * @param {number} levelEndX - x corrdinate of end of level
     */
    constructor(imgPath, x, speedX, levelEndX){
        super().loadImage(imgPath);
        this.x = x;
        this.y = 0;
        this.speedX = speedX; //ev in Verhältnis zum momentanen speedX vom Character: speedXModifier * world.character.speedX
        // if(this.checkImgLoaded()) this.move(levelEndX);
    }
    
    /**
     * Moves the background object horizontally to create a parallax effect
     * @todo Decide weather to keep parameter levelEndX (used to move bg objects back into frame) or keep function like this
     * @param {number} levelEndX 
     */
    move(levelEndX) {
        if (!(this instanceof Cloud)){
            if(this.keyboard.RIGHT && world.character.isWalkingRight()){
                this.moveLeft();
                this.isReversed_x = false;
            }
            if(this.keyboard.LEFT && world.character.isWalkingLeft()) {
                this.moveRight();
                this.isReversed_x = false;
            }
        }
    }
    
}