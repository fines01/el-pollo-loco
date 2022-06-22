class World {

    //canvas = document.getElementById('canvas');
    canvas;
    ctx;
    camera_x = 0;
    //keyboard = new Keyboard();//in mo
    statusbar = new StatusBar();
    character = new Pepe(); // in level: gn
    level = level1;
    throwableObjects = [];
    //collectibleObjects = [];
    coins = [
        new Coin(),
        new Coin(),
        new Coin(),
    ];

    constructor(){
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        //this.character = setCharacter() (zB?)
        this.draw();
        this.setWorld(); // set/connect world w movable object
        this.run();
    }

    setWorld(){
        this.character.world = this;
        //this.level.character.world = this;
    }

    draw() {
        // clear canvas/ delete old images
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        // 'Kamera-Ausschnitt' verschieben (Verschiebt Koordinatensystem/ Position an der 'gezeichnet' wird)
        this.ctx.translate(this.camera_x, 0); // translate(x,y) verändert Position des Canvas

        this.addToMap(...this.level.backgroundObjects, ...this.coins, ...this.level.enemies, this.character, ...this.throwableObjects);

        // Objects that should stay in place:
        this.ctx.translate(-this.camera_x,0);
        this.addToMap(this.statusbar);
        this.ctx.translate(this.camera_x,0);
        // End Objects that should stay in place

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
        this.level.enemies.forEach((enemy) => {
        
            if (this.character.isCollidingVertically(enemy)) {
                this.character.receivePoint();               
                //console.log('CRASH-Y: ', this.character.energy);
            }
            else if (this.character.isCollidingHorizonatlly(enemy)) {
                this.character.receiveHit();
                this.statusbar.setPercentage(this.character.energy);
                //console.log('CRASH-X, energy left:', this.level.character.energy); // Todo (maybe): for each enemy - only count one collision
            }
            
        });
    }

        checkThrowObjects() {
            if(this.character.keyboard.D) {
                let bottle = new ThrowableObject(this.character.x + this.character.width * 0.5, this.character.y + 115);
                this.throwableObjects.push(bottle);
            }
        }

        
        run(){
            
            this.checkCollisions();
            this.checkThrowObjects();
            
            let self = this;
            requestAnimationFrame(() => {
                self.run();
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


}