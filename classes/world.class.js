class World {

    canvas;
    ctx;
    camera_x = 0;
    collectedCoins = 0;
    collectedBottles = 0;
    throwableObjects = [];
    score = 0;
    // animationFps = 20; // 25 or 20
    // for controlling animation fps with requestAnimationTime()
    lastAnimationFrame = 0;
    gameOver = false;
    
    constructor() {
        this.canvas = document.getElementById('canvas');
         // get an instance of the CanvasRenderingContext2D interface (provides 2d rendering context for the canvas element)
        this.ctx = this.canvas.getContext('2d');
        this.character = new Character(this);
        this.level = level1;
        this.level.world = this;
        // this.coinsRatio = (100 / this.level.amountCoins);
        // this.bottlesRatio = (100 / this.level.amountBottles);
        this.statusbars = [new StatusBar(-5, 'energy', 100), new StatusBar(20, 'coins', 0, 100 / this.level.amountCoins), new StatusBar(45, 'bottles', 0, 100 / this.level.amountBottles)];
        this.draw();
        this.run();
    }

    draw() {
        // clear canvas/ delete old images
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 'Kamera-Ausschnitt' verschieben (Verschiebt Koordinatensystem/ Position an der 'gezeichnet' wird)
        this.ctx.translate(this.camera_x, 0); // translate(x,y) verändert Position des Canvas

        this.addToMap(...this.level.backgroundObjects, ...this.level.collectibleObjects, ...this.level.enemies, this.character, ...this.throwableObjects);

        // Objects that should stay in place:
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(...this.statusbars);
        this.ctx.translate(this.camera_x, 0);
        // End Objects that should stay in place

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
            if (objects[i] instanceof StatusBar) objects[i].drawUI(this.ctx);
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

    checkCollisions() {
        // check enemy collisions
        this.level.enemies.forEach(enemy => {
            // check character collisions with collectible objects (bottles)
            this.throwableObjects.forEach(throwableObj => {
                if (enemy.isColliding(throwableObj)) {
                    enemy.scoreAgainstEnemy();
                    if (enemy instanceof Chicken) this.level.addNewEnemy('Hen')
                    else this.level.addNewEnemy('Chick');
                }
            });
            if (this.character.isColliding(enemy) && !this.character.isHurt() && !this.character.isJumpingOn(enemy)) {
                this.character.receiveHit();
                this.statusbars[0].setStatusbar(this.character.energy);
            } else if (this.character.isJumpingOn(enemy)) { //
                enemy.scoreAgainstEnemy();
                if (enemy instanceof Chicken) this.level.addNewEnemy('Hen')
                else this.level.addNewEnemy('Chick');
            }
            enemy.receivedHit = false;
        });
        // check coin collisions
        this.level.collectibleObjects.forEach((collectible, index) => {
            if (collectible instanceof Coin && this.character.isColliding(collectible)) {
                this.collectedCoins++; 
                this.statusbars[1].setStatusbar(this.collectedCoins);
                collectible.markedForDeletion = true;
            } else if (collectible instanceof ThrowableObject && this.character.isColliding(collectible)) {
                collectible.markedForDeletion = true;
                this.collectedBottles++; 
                this.statusbars[2].setStatusbar(this.collectedBottles);
            }
        });
        // delete objects (TODO: 'DRY' )
        this.level.collectibleObjects = this.level.collectibleObjects.filter(collectible => !collectible.markedForDeletion);
        this.throwableObjects = this.throwableObjects.filter(throwableObj => !throwableObj.markedForDeletion);
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.markedForDeletion);
    }

    checkThrowObjects() {
        let isThrowing = false;
        if (this.character.keyboard.ENTER && !this.character.isHurt() && this.collectedBottles > 0 && !isThrowing) {
            isThrowing = true;
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

    checkGameStatus(){
        if (this.gameOver){
            // stop game, show game-over screen, show scores?
        }
    }

    checkDevMode() {
        let movableObjects = [...this.level.enemies, ...this.level.collectibleObjects, this.character];
        movableObjects.forEach( mo => {
            if (this.character.keyboard.F){
                mo.showHitboxes = !mo.showHitboxes;
            }
        });
    }

    updateGame(timeStamp) {

        this.draw();
        // check conditions
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkDevMode();
        this.checkGameStatus();

        // // ANIMATIONS
        // // for controlling animation-fps (needs lower fps ob about 20-25) withhin requestAnimationFrame()
        let deltaTime = timeStamp - this.lastAnimationFrame; //ms
        this.lastAnimationFrame = timeStamp;
       
        // update bg objects & clouds: move
        this.level.backgroundObjects.forEach(bgo => {
            bgo.move();
        })
        // update enemies
        this.level.enemies.forEach(enemy => {
            // animate enemies
            enemy.checkAnimationFrameTime(deltaTime);
            // move enemies
            if (!(enemy instanceof Endboss)) enemy.move();
        });
        // update character: move
        this.character.move();
        // update character: animate
        this.character.checkAnimationFrameTime(deltaTime);

        // // Todo: also animations from:
        // // movable-objects: applyGravity()
        // // throwable-objects: throw() 

        // //if !gameOver
        //requestAnimationFrame(this.updateGame);
        this.run();

    }

    run() {
        //if !gameOver
        let self = this; // now access to self in updateGame() callback-function (wo extra passing it?)
        //requestAnimationFrame(this.updateGame); // requestAnimationFrame() function: async, 1.determines/sets possible fps & 2. auto-generates a timestamp and automatically passes it to the callback! ('this' is not accessible in callback?!)
        requestAnimationFrame( ()=> { // need to do it like that, so that 'this' is accessible in function updateGame()
            let timeStamp = Date.now();
            self.updateGame(timeStamp);
        });
    }

}