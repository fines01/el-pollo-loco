class World {

    canvas;
    ctx;
    camera_x = 0;
    //keyboard = new Keyboard();//in mo
    
    //statusbar = new StatusBar();
    statusbars = [new StatusBar(0, 'energy', 100), new StatusBar(35, 'coins', 0), new StatusBar(70, 'bottles', 20)];

    character = new Pepe(); // in level: gn
    level = level1;
    throwableObjects = [ ];
    //collectibleObjects = [];
    collectibleObjects = [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ];
    score = 0;
    collectedCoins = 0;

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
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpingOn(enemy) || enemy.isCollidingMultiple(0.5, ...this.throwableObjects)) {
                this.score++;
                this.character.receiveEnergy(); // renamed receivePoint()
                enemy.receiveHit();
            }
            else if (this.character.isColliding(enemy, 0.25) && !this.character.isHurt()) {
                this.character.receiveHit();
                this.statusbars[0].setPercentage(this.character.energy);
            }
        // check coin collisions
        this.collectibleObjects.forEach(coin => {
            if (this.character.isColliding(coin, 0.7)) { // correction-value of 0.5 because coin-img is bigger than actual coin
                this.collectedCoins+=10; // 10 only for testing purposes
                this.statusbars[1].setPercentage(this.collectedCoins);
                coin.markedForDeletion = true;
                console.log('coins: ', this.collectedCoins);
            }
        });
        // check character collisions with collectible objects (bottles)
        // delete objects (TODO: maybe DRY it --> in extra function etc)
        this.collectibleObjects = this.collectibleObjects.filter( coin => !coin.markedForDeletion);
        this.throwableObjects = this.throwableObjects.filter(coin => !coin.markedForDeletion);
        this.level.enemies = this.level.enemies.filter( enemy => !enemy.markedForDeletion);
        });
    }

        checkThrowObjects() {
            if(this.character.keyboard.ENTER && !this.character.isHurt()) { //
                let bottleX;
                if (this.character.isReversed_x) bottleX = this.character.x ;
                else bottleX = this.character.x + this.character.width * 0.5;
                let bottle = new ThrowableObject(bottleX, this.character.y + 115);
                this.throwableObjects.push(bottle);
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
