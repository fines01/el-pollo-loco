class BackgroundObject extends MovableObject {
    
    width = canvasWidth*2; // world.canvas.width
    height = canvasHeight; // world.canvas.height

    // IMAGES_LAYERS = [
    //     'img/5.Fondo/Capas/3.Fondo3/Completo.png',
    //     'img/5.Fondo/Capas/2.Fondo2/completo.png',
    //     'img/5.Fondo/Capas/1.suelo-fondo1/completo.png'
    // ];

    constructor(imgPath, x, speedX, levelEndX){
        super().loadImage(imgPath);
        this.x = x;
        this.y = 0;
        this.speedX = speedX;
        this.move(levelEndX);

    }
    
    // move: add parallax effects when walking TODO. fix (parallax) backgrounds
    move(levelEndX) {
        
        if (!(this instanceof Cloud)){
            if(this.keyboard.RIGHT && world.character.isWalkingRight()){ // if character.isWalkingRight()
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