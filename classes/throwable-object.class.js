class ThrowableObject extends CollectibleObject {
    
    width = 80;
    height = 80;
    groundLevelY = canvasHeight - this.height;
    initialY = 370;
    //acceleration;

    constructor(levelEndX) {
        super();
        this.x = 200 + Math.random() * (levelEndX - 250);
        this.y = 50 + Math.random() * 275;
        this.loadImage('img/7.Marcadores/Icono/Botella.png');
        this.checkHitarea();
    }

    checkHitarea() {
        this.imgY = this.y + 8;
        this.imgX = this.x + 31;
        this.imgWidth = this.width * 0.22;
        this.imgHeight = this.height * 0.78;
    }
    
    // maybe apply some curve
    throw(x, y){
        this.x = x;
        this.y = y;
        this.speedY = 20;
        // TODO: remove interval function
        setInterval( () => {
            this.checkHitarea();
            this.applyGravity();
            if (this.y < this.groundLevelY) {
                if (!world.character.isReversed_x) this.x += 16;
                if (world.character.isReversed_x) this.x -= 16;
            } else {
                this.markedForDeletion = true;
            }
        }, 1000/60);
    }
}