class World {

    canvas;
    ctx;
    camera_x = 0;
    collectedCoins = 0;
    collectedBottles = 0;
    throwableObjects = [];
    score = 0;
    gameTime = 0;
    maxGameTime = 30000; //in ms
    // for controlling animation fps with requestAnimationTime()
    // animationFps = 20; // 25 or 20
    gamePaused = false;
    gameOver = true;
    
    constructor(levelNo = 1) {
        this.canvas = document.getElementById('canvas');
        // get an instance of the CanvasRenderingContext2D interface (provides 2d rendering context for the canvas element)
        this.ctx = this.canvas.getContext('2d');
        this.character = new Character(this);
        this.level = level; //setLevel(levelNo);
        this.endboss = this.level.enemies[this.level.enemies.length-1];
        this.statusbars = [new StatusBar(-5, 'energy', 100), new StatusBar(20, 'coins', 0, 100 / this.level.amountCoins), new StatusBar(45, 'bottles', 0, 100 / this.level.amountBottles)];
        this.lastAnimationFrame = Date.now();
        this.draw();
        //this.run();
    }

    draw() {
        // clear canvas/ delete old images
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 'Kamera-Ausschnitt' verschieben (Verschiebt Koordinatensystem/ Position an der 'gezeichnet' wird)
        this.ctx.translate(this.camera_x, 0); // translate(x,y) verändert Position des Canvas
        this.addToMap(...this.level.backgroundObjects, ...this.level.collectibleObjects, ...this.level.enemies, this.character, ...this.throwableObjects);
        //// Objects that should stay in place:
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(...this.statusbars);
        this.ctx.translate(this.camera_x, 0);
        //// End Objects that should stay in place
        //'Kameraauschnitt' zurückverschieben
        this.ctx.translate(-this.camera_x, 0);

    }

    addToMap(...objects) {
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].isReversed_x) {
                this.flipImage(objects[i]);
            }
            objects[i].drawObject(this.ctx);
            objects[i].drawFrame(this.ctx);
            if (objects[i] instanceof StatusBar) {objects[i].drawAmount(this.ctx)};
            if (objects[i] instanceof StatusBar && i === 0) objects[i].drawGameTime(this.ctx, this.gameTime, this.maxGameTime);
            // if isReversed: wieder resetten, dh Spiegelung wieder rückgängig machen nach draw()
            if (objects[i].isReversed_x) {
                this.flipImageBack(objects[i]);
            }
        }
    }

    // into one function via spread operator?
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    flipImage(obj) {
        this.ctx.save();
        // 1.: Bild verschieben
        this.ctx.translate(obj.width, 0);
        // 2.: Bild spiegeln an y-Achse:
        this.ctx.scale(-1, 1);
        // 3.: x-Achse spiegeln/umdrehen, s.d. das Objekt an der richtigen Stelle eingesetzt wird.
        obj.x = obj.x * -1;
    }

    flipImageBack(obj) {
        obj.x = obj.x * -1;
        this.ctx.restore();
    }

    checkThrowableObjectsCollision(throwableObj, hitObj) {
        if (hitObj.isColliding(throwableObj)) { // && isEnemy(hitObj)
            hitObj.scoreAgainstEnemy();
            if (hitObj instanceof Chicken) this.level.addNewEnemy('Hen')
            else if (hitObj instanceof Chick) this.level.addNewEnemy('Chick');
        }
    }

    checkCharacterCollision(enemy) {
        if (this.character.isColliding(enemy) && !this.character.isHurt() && !this.character.isJumpingOn(enemy)) {
            this.character.receiveHit();
            this.statusbars[0].setStatusbar(this.character.energy);
        } else if (this.character.isJumpingOn(enemy)) { //
            enemy.scoreAgainstEnemy();
            if (enemy instanceof Chicken) this.level.addNewEnemy('Hen')
            else this.level.addNewEnemy('Chick');
        }
    }

    checkEnemyCollisions(enemy) {
        // check enemy collisions with throwable objects
        this.throwableObjects.forEach(throwableObj => {
            this.checkThrowableObjectsCollision(throwableObj, enemy);
        });
        // check enemy collisions with character
        this.checkCharacterCollision(enemy);
        enemy.receivedHit = false;
    }

    checkCollectibleCollisions(collectibleObject) {
         if (collectibleObject instanceof Coin && this.character.isColliding(collectibleObject)) {
             this.collectedCoins++;
             this.statusbars[1].setStatusbar(this.collectedCoins);
             collectibleObject.markedForDeletion = true;
         } else if (collectibleObject instanceof ThrowableObject && this.character.isColliding(collectibleObject)) {
             collectibleObject.markedForDeletion = true;
             this.collectedBottles++;
             this.statusbars[2].setStatusbar(this.collectedBottles);
         }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy,index) => {
            this.checkEnemyCollisions(enemy);
        });
        this.level.collectibleObjects.forEach((collectible, index) => {
            this.checkCollectibleCollisions(collectible);
        });
        // this.removeMarkedObjects2(this.level.collectibleObjects, this.throwableObjects, this.level.enemies); // doesn't work, why ???
        this.removeMarkedObjects();
    }
    
    removeMarkedObjects2(...objArrs){
        for( let i = 0; i < objArrs.length; i++ ) {
            objArrs[i] = objArrs[i].filter( (obj) => !obj.markedForDeletion );
        }
    }

    removeMarkedObjects(){
        //objArr = objArr.filter(obj => !obj.markedForDeletion); // gn - check 
        this.level.collectibleObjects = this.level.collectibleObjects.filter(collectible => !collectible.markedForDeletion);
        this.throwableObjects = this.throwableObjects.filter(throwableObj => !throwableObj.markedForDeletion);
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.markedForDeletion);
    }

    checkThrowObjects() {
        //let isThrowing = false;
        if (this.character.keyboard.ENTER && !this.character.isHurt() && this.collectedBottles > 0) {// && !isThrowing) {
            //isThrowing = true; // Sinn wäre, dass nicht mehrere Flaschen glz geworfen werden können
            let bottleX;
            if (this.character.isReversed_x) bottleX = this.character.x;
            else bottleX = this.character.x + this.character.width * 0.5;
            let bottle = new ThrowableObject();
            this.throwableObjects.push(bottle);
            bottle.throw(bottleX, this.character.y + 80);
            this.collectedBottles--;
            this.character.keyboard.ENTER = false;
            this.statusbars[2].setStatusbar(this.collectedBottles);
        }
    }
    
    setGameOver() {
        setTimeout( ()=>{
            this.gameOver = true;
        },500);
        this.setGameOverScreen();
    }

    setGameOverScreen() {
        // do game-over stuff (set game over screens)
            if (this.character.isDead()) setLoserScreen(); // params: energy left, missed coins, time left?
            else if(this.endboss.isDead() && this.level.amountCoins === this.collectedCoins)  setWinScreen();
            else setLoserScreen(); // determine reason: "you missed x coins" or "you ran out of time"
    }

    checkDevMode() {
        let movableObjects = [...this.level.enemies, ...this.level.collectibleObjects, this.character];
        movableObjects.forEach( mo => {
            if (this.character.keyboard.F){
                mo.showHitboxes = !mo.showHitboxes;
            }
        });
    }

    checkGameStatus() {
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkDevMode();
    }

    // // for controlling animation-fps (needs lower fps ob about 20-25) withhin requestAnimationFrame() & updateGameTime
    setDeltaTime(timeStamp) {
        let deltaTime = timeStamp - this.lastAnimationFrame; //ms // reset lastAnimationFrame to NOW after pause (else time passed in pause is subtracted as well)
        this.lastAnimationFrame = timeStamp;
        // update game time
        this.gameTime += deltaTime;
        // check time game over condition
        if (this.gameTime > this.maxGameTime) this.setGameOver();
        return deltaTime;
    }

    updateEnemy(enemy, deltaTime) {
        // animate enemies
        enemy.checkAnimationFrameTime(deltaTime);
        // move enemies
        if (!(enemy instanceof Endboss)) enemy.move();
        if (enemy instanceof Endboss && enemy.isDead()) {
            this.setGameOver();
        };
    }

    updateCharacter(deltaTime) {
        // update character: move
        this.character.move();
        // update character: animate
        this.character.checkAnimationFrameTime(deltaTime);
        // check character game-over condition
        if (this.character.isDead()) this.setGameOver();
        // // Todo: movable-objects: applyGravity()
    }

    updateGame(timeStamp) {
        this.draw();
        this.checkGameStatus();
        let deltaTime = this.setDeltaTime(timeStamp);  
        this.level.backgroundObjects.forEach(bgo => {
            bgo.move();
        });
        this.level.enemies.forEach(enemy => {
            this.updateEnemy(enemy, deltaTime);
        });
        this.updateCharacter(deltaTime),
        this.run();
    }

    run() {
        let self = this;
        if(!this.gameOver && !this.gamePaused) requestAnimationFrame( ()=> { 
            let timeStamp = Date.now();
            self.updateGame(timeStamp);
        });
    }

}