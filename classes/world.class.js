class World {

    //canvas = document.getElementById('canvas');
    canvas;
    ctx;
    camera_x = 0;
    //level = level1;
    levelEnd_x = 2*canvasWidth; //in level1

    enemies = [ new Chicken(),  ];
    character = new Pepe();
    keyboard = new Keyboard();
    // TEST:
    movableObject = new MovableObject(); // to connect World with MovableObject ???

    backgroundObjects = [
        new Cloud('img/5.Fondo/Capas/4.nubes/1.png',0),
        //new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png',0),
        // 720
        new Cloud('img/5.Fondo/Capas/4.nubes/2.png', 720),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 720),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 720),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 720),

        new Cloud('img/5.Fondo/Capas/4.nubes/1.png', 1440),
        // new Cloud('img/5.Fondo/Capas/4.nubes/1.png', 0),
        // wieder wh mit 720 * 2 etc. --> besser lösen/wh
    ]; // into level --> level1

    constructor(){
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.draw();
        this.setWorld(); // set/connect world w movable object
        this.run();
    }

    setWorld(){
        //this.movableObject.world = this; // connect World with MO Class, st that properties like camera_x are available there ????? TEST
        this.character.world = this;
    }

    draw() {
        // clear canvas/ delete old images
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        // 'Kamera-Ausschnitt' verschieben (Verschiebt Koordinatensystem/ Position an der 'gezeichnet' wird)
        this.ctx.translate(this.camera_x, 0); // translate(x,y) verändert Position des Canvas

        this.addToMap(...this.backgroundObjects, ...this.enemies, this.character);

        //'Kameraauschnitt' zurückverschieben
        this.ctx.translate(- this.camera_x, 0);

        // 'Kamera-Ausschnitt' zurückverschieben
        //this.ctx.translate(-this.camera_x, 0);

        let self = this;
        // fkt wird asynchron ausgeführt: sobald drawImage fertig ausgeführt wurde
        requestAnimationFrame( () => {
            self.draw();
        });
    }

    addToMap(...objects){
        for(let i = 0; i < objects.length; i++){
            if(objects[i].isReversed_x){
                this.flipImage(objects[i]);
            }
            objects[i].drawObject(this.ctx);
            objects[i].drawFrame(this.ctx);
            // if isReversed: wieder resetten, dh Spiegelung wieder rückgängig machen nach draw()
            if (objects[i].isReversed_x) {
                this.flipImageBack(objects[i]);
            }
        }
    }
    // into one function via spread operator?
    addObjectsToMap(objects){
        objects.forEach( o => {
            this.addToMap(o);
        });
    }

    flipImage(obj){
        this.ctx.save();
        // 1.: Bild verschieben
        this.ctx.translate(obj.width, 0);
        // 2.: Bild spiegeln an y-Achse:
        this.ctx.scale(-1,1);
        // 3.: x-Achse spiegeln/umdrehen, s.d. das Objekt an der richtigen Stelle eingesetzt wird.
        obj.x = obj.x * -1;
    }

    flipImageBack(obj){
        obj.x = obj.x * -1;
        this.ctx.restore();
    }

    checkCollisions(){
        this.enemies.forEach((enemy) => {
        
            if (this.character.isCollidingVertically(enemy)) {
                this.character.receivePoint();               
                console.log('CRASH Y: ');
            }
            else if (this.character.isCollidingHorizonatlly(enemy)) {
                this.character.receiveHit();
                console.log('CRASH X-energy left:', this.character.energy); // Todo (maybe): for each enemy - only count one collision
            }
            
        });

        // let collided = false;
        // for (let i = 0; i < this.enemies.length; i++ ){
        //     let enemy = this.enemies[i];
        //     if( !collided && this.character.isCollidingHorizonatlly(enemy)){
        //         collided = true;
        //         console.log('CRASH X: ');
        //         if(collided){ break; }
        //     }
        // }

        // let self=this;
        // requestAnimationFrame( ()=>{
        //     self.checkCollisions();
        // });
    }

    run(){

        this.checkCollisions();

        let self = this;
        requestAnimationFrame(() => {
            self.run();
        });
    }
}