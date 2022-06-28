class World {

    canvas;
    ctx;
    camera_x = 0;
    //keyboard = new Keyboard();//in mo
    
    //statusbar = new StatusBar();
    statusbars = [new StatusBar(0, 'energy', 100), new StatusBar(35, 'coins', 0), new StatusBar(70, 'bottles', 0)];
    character = new Pepe();
    level = level1;
    //collectibleObjects = [];
    collectedCoins = 0;
    collectedBottles = 0;
    throwableObjects = [];
    //collectedBottles = [ ];
    collectibleObjects = [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
    ];
    score = 0;

    gameOver = false;
   // animationFps = 20;

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

        this.addToMap(...this.level.backgroundObjects, ...this.collectibleObjects, ...this.level.enemies, this.character, ...this.throwableObjects);

        // Objects that should stay in place:
        this.ctx.translate(-this.camera_x,0);
        this.addToMap(...this.statusbars);
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
        // check enemy collisions
        this.level.enemies.forEach( enemy => {
            if (this.character.isJumpingOn(enemy) || enemy.isCollidingMultiple(0.5, ...this.throwableObjects)) {
                this.score++;
                this.character.receiveEnergy(); // renamed receivePoint()
                enemy.receiveHit();
            }
            else if (this.character.isColliding(enemy, 0.25) && !this.character.isHurt()) {
                this.character.receiveHit();
                this.statusbars[0].setPercentage(this.character.energy);
            }
        });
        // check coin collisions
        this.collectibleObjects.forEach((collectible, index) => {
            if ( collectible instanceof Coin && this.character.isColliding(collectible, 0.7)) { // correction-value of 0.5 because coinllectible is bigger than actual coin
                this.collectedCoins+=10; // 10 only for testing purposes // DRY
                this.statusbars[1].setPercentage(this.collectedCoins);
                collectible.markedForDeletion = true;
                console.log('coins: ', this.collectedCoins);
            }
            else if ( collectible instanceof ThrowableObject && this.character.isColliding(collectible, 0.5)){
                //let bottle = collectible;
                //this.throwableObjects.push( new ThrowableObject() );// else markedForDeletion = true and gets removed AS WELL
                collectible.markedForDeletion = true;
                this.collectedBottles++; // check later if this variable is still necessary
                this.statusbars[2].setPercentage(this.collectedBottles * 10); // * 10 for TESTING pps??
                console.log('bottles: ', this.collectedBottles);
            }
        });
        // check character collisions with collectible objects (bottles)
        // delete objects (TODO: maybe 'DRY' it --> in extra function etc)
        this.collectibleObjects = this.collectibleObjects.filter(collectible => !collectible.markedForDeletion);
        this.throwableObjects = this.throwableObjects.filter(throwableObj => !throwableObj.markedForDeletion);
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.markedForDeletion);

    }

        checkThrowObjects() {

            let isThrowing = false;

            if(this.character.keyboard.ENTER && !this.character.isHurt() && this.collectedBottles > 0 && !isThrowing) {
                
                    isThrowing = true;
                    let bottleX;
                    if (this.character.isReversed_x) bottleX = this.character.x ;
                    else bottleX = this.character.x + this.character.width * 0.5;
                    // test
                    // let index = this.throwableObjects.length - 1;
                    // let bottle = this.throwableObjects[index];
                    let bottle = new ThrowableObject();
                    this.throwableObjects.push(bottle);
                    bottle.throw(bottleX, this.character.y + 115);
                    // remove thrown object from throwableObjects: throw() function
                    // this.throwableObjects[index].markedForDeletion = true;
                    this.collectedBottles--;
                    this.character.keyboard.ENTER = false;
                    // console.log('bottles left: ', this.collectedBottles);
                    this.statusbars[2].setPercentage(this.collectedBottles * 10);

            }

        }

        run(){
            
            this.checkCollisions();
            this.checkThrowObjects();
            // this.addEnemies(); // in certain timeframe add new enemies (if enemies under certain number)
            
            let self = this;
            requestAnimationFrame(() => {
                self.run();
            });

        }

}
