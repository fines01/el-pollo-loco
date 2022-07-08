class BackgroundObject extends MovableObject {
    
    width = canvasWidth*2; // world.canvas.width
    height = canvasHeight; // world.canvas.height

    constructor(imgPath, x, speedX, levelEndX){
        super().loadImage(imgPath);
        this.x = x;
        this.y = 0;
        this.speedX = speedX; //ev in Verhältnis zum momentanen speedX vom Character: speedXModifier * world.character.speedX
        this.move(levelEndX);

    }
    
    // move: add parallax effects when walking
    move(levelEndX) {
        if (!(this instanceof Cloud)){
            if(this.keyboard.RIGHT && world.character.isWalkingRight()){
                //if (this.x < -this.width) this.x = 0;
                this.moveLeft();
                this.isReversed_x = false;
            }
            if(this.keyboard.LEFT && world.character.isWalkingLeft()) {
                //if (this.x > this.width ) this.x = -this.width;
                this.moveRight();
                this.isReversed_x = false;
            }
        }
    }
    
}