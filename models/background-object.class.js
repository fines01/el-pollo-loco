class BackgroundObject extends MovableObject {
    
    width = canvasWidth*2; 
    height = canvasHeight;

    constructor(imgPath, x, speedX, levelEndX){
        super().loadImage(imgPath);
        this.x = x;
        this.y = 0;
        this.speedX = speedX; //ev in Verhältnis zum momentanen speedX vom Character: speedXModifier * world.character.speedX
        // if(this.checkImgLoaded()) this.move(levelEndX);
    }
    
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