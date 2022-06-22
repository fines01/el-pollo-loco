class ThrowableObject extends MovableObject {
    
    width = 100; //60
    height = 100; // 50
    groundLevelY = canvasHeight - this.width;
    initialY = 370;
    //acceleration;

    constructor(x,y){
        super();
        this.loadImage('img/7.Marcadores/Icono/Botella.png');
        this.x = x;
        this.y = y;
        // TEST
        this.throw();
    }

    // maybe apply some curve
    throw(){ // TODO: only one object should be thrown at a time & check throw-direction (if is reversed etc)
        this.speedY = 20;
        this.applyGravity();
        //this.throwing = true;
        console.log(world.character.isReversed_x);

        setInterval( () => {
            if (this.y < this.groundLevelY) {
                if (!world.character.isReversed_x) this.x += 8;
                if (world.character.isReversed_x) this.x -=8;
            }
        }, 1000/50);
    }
}