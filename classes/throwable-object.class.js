class ThrowableObject extends CollectibleObject {
    
    width = 90; //60
    height = 90; // 50
    groundLevelY = canvasHeight - this.height;
    initialY = 370;
    //acceleration;

    //constructor(x, y) {
    constructor(levelEndX) {
        super();
        //if (levelEndX) {
            this.x = 100 + Math.random() * (levelEndX - 100);
            this.y = 50 + Math.random() * 275;
        //}
        this.loadImage('img/7.Marcadores/Icono/Botella.png');
        this.checkHitarea();
        // if (x) this.x = x;
        // if (y) this.y = y;
    }

    checkHitarea() {
        this.imgY = this.y + 8;
        this.imgX = this.x + 35;
        this.imgWidth = this.width * 0.22;
        this.imgHeight = this.height * 0.78;
    }
    
    // maybe apply some curve
    throw(x, y){
        this.x = x;
        this.y = y;
        this.speedY = 20;
        this.applyGravity();
        
        setInterval( () => {

            this.checkHitarea();

            if (this.y < this.groundLevelY) {
                if (!world.character.isReversed_x) this.x += 8;
                if (world.character.isReversed_x) this.x -=8;
            } else {
                this.markedForDeletion = true;
            }
        }, 1000/60);
    }
}