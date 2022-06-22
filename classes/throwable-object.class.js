class ThrowableObject extends MovableObject {
    
    width = 100; //60
    height = 100; // 50
    groundLevelY = canvasHeight - this.width;
    //acceleration;

    constructor(x,y){
        super();
        this.loadImage('img/7.Marcadores/Icono/Botella.png');
        this.x = x;
        this.y = y;
        this.initialY = 370;
        // TEST
        this.throw();//100,350
    }

    // maybe apply some curve
    throw(){ // TODO: only one object should be thrown at a time & check throw-direction (if is reversed etc)
        this.speedY = 20;
        this.applyGravity();

        setInterval( () => {
            if (this.y < this.groundLevelY) this.x += 8;
        }, 25);
    }
}