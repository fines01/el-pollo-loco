class ThrowableObject extends CollectibleObject {
    
    width = 100; //60
    height = 100; // 50
    groundLevelY = canvasHeight - this.height;
    initialY = 370;
    //acceleration;

    //constructor(x, y) {
    constructor() {
        super();
        this.loadImage('img/7.Marcadores/Icono/Botella.png');
        // if (x) this.x = x;
        // if (y) this.y = y;
    }
    
    // maybe apply some curve
    throw(x, y){ // TODO: only one object should be thrown at a time & check throw-direction (if is reversed etc)
        this.x = x;
        this.y = y;
        this.speedY = 20;
        this.applyGravity();
        setInterval( () => {
            if (this.y < this.groundLevelY) {
                if (!world.character.isReversed_x) this.x += 8;
                if (world.character.isReversed_x) this.x -=8;
            } else {
                this.markedForDeletion = true;
            }
        }, 1000/60);
    }
}