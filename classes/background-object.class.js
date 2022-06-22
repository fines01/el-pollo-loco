class BackgroundObject extends MovableObject {
    
    width = canvasWidth;
    height = canvasHeight;
    //x = 0;
    // img; // in DrawableObject

    constructor(imgPath, x, speedX){
        super().loadImage(imgPath);
        this.x = x;
        this.y = 480 - this.height;
        this.speedX = speedX;
        this.move();
    }

    // move: add parallax effects when walking TODO. fix (parallax) backgrounds
    move() {

        if (!(this instanceof Cloud)){
            if(this.keyboard.RIGHT){
                this.moveLeft();
                this.isReversed_x = false;
                // (this.x + this.width < 0) && (this.x = world.level.levelEnd_x);
            }
            if(this.keyboard.LEFT) {
                this.moveRight();
                this.isReversed_x = false;
                // (this.x + this.width > world.level.levelEnd_x ) && (this.x = 0 - this.width);
            }
        }

        let self = this;
        requestAnimationFrame( ()=>{
            self.move();
        });
    }
    
}