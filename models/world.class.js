class World {

    canvas;
    ctx;
    camera_x = 0;
    collectedCoins = 0;
    collectedBottles = 0;
    throwableObjects = [];
    score = 0;
    gameTime = 0;
    maxGameTime = 30000;
    gamePaused = false;
    gameOver = true;
    audioPaths = 
    [
        // 'audio/test/CH-AY-NA.ogg', // test
        'audio/it_takes_a_hero.wav', // game music
        'audio/countdown3.mp3', // countdown sound
        'audio/Win Jingle.wav', // win jingle
        'audio/Warp Jingle.wav', // lose jingle
    ]

    /**
     * @todo check perc setting of statusBar (s.50 lifeb)
     */
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.character = new Character(this);
        // this.volumeModifier = this.character.volumeModifier;
        this.level = level; //setLevel(levelNo);
        this.maxGameTime = this.level.maxGameTime;
        this.endboss = this.level.enemies[this.level.enemies.length - 1];
        this.statusbars = [new StatusBar(-5, 'energy', 100), new StatusBar(20, 'coins', 0, 100 / this.level.amountCoins), new StatusBar(45, 'bottles', 0, 100 / this.level.amountBottles)];
        this.lastAnimationFrame = Date.now();
        this.setAudio();
        this.draw();

        // start enemy and bg objects? move and animate
    }

    /**
     * Clears and draws objects on canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(...this.level.backgroundObjects, ...this.level.collectibleObjects, ...this.level.enemies, this.character, ...this.throwableObjects);
        //// Objects that should stay in place:
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(...this.statusbars);
        this.ctx.translate(this.camera_x, 0);
        //// End: Objects that should stay in place
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Adds any number of passed objects to the canvas & draws game status UI
     * @param  {...Object} objects 
     */
    addToMap(...objects) {
        for (let i = 0; i < objects.length; i++) { // for-of loop
            if (objects[i].isReversed_x) {
                this.flipImage(objects[i]);
            }
            objects[i].drawObject(this.ctx);
            objects[i].drawFrame(this.ctx);
            if (objects[i] instanceof StatusBar) objects[i].drawAmount(this.ctx)
            if (objects[i] instanceof StatusBar && i === 0) objects[i].drawGameTime(this.ctx, this.gameTime, this.maxGameTime);
            if (objects[i].isReversed_x) this.flipImageBack(objects[i]);
        }
    }

    /**
     * Flips an object horizontally on the canvas
     * @param {Object} obj 
     */
    flipImage(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.x = obj.x * -1;
    }

    /**
     * Restores a horizontally flipped object to its original state
     * @param {Object} obj 
     */
    flipImageBack(obj) {
        obj.x = obj.x * -1;
        this.ctx.restore();
    }

    /**
     * Creates Audio instances from given audio sources,
     * and sets audio properties of playback speed and volume.
     */
    setAudio() {
        [this.gameMusic, this.countdownSound, this.winSound, this.loseSound] = this.character.createAudio(...this.audioPaths);
        this.countdownSound.volume = 0.4;
        this.winSound.volume = 0.4;
        this.winSound.playbackRate = 1.5;
        this.loseSound.volume = 0.5;
        this.loseSound.playbackRate = 1.5;
        this.gameMusic.volume = 0.2;
        this.gameMusic.loop = true;
        this.gameMusic.play();
    }

    /**
     * 
     * @param {Object} throwableObj - instance of a throwable object
     * @param {Object} hitObj - instance of an object which is collidable with the throwable object
     */
    checkThrowableObjectCollision(throwableObj, hitObj) {
        if (hitObj.isColliding(throwableObj)) { // && isEnemy(hitObj)
            hitObj.scoreAgainstEnemy();
            throwableObj.animateSplash();
            if (hitObj instanceof Chicken) this.level.addNewEnemy('Hen')
            else if (hitObj instanceof Chick) this.level.addNewEnemy('Chick');
        }
        if(throwableObj.isOnGround()){
            throwableObj.animateSplash();
        }
    }

    /**
     * Checks character collisions with an enemy object and applies consequences
     * @param {Object} enemy 
     */
    checkCharacterCollision(enemy) {
        if (this.character.isHittingEnemy(enemy)){
            this.character.receiveHit();
            this.statusbars[0].setStatusbar(this.character.energy);
        } else if (this.character.isJumpingOn(enemy)) { //
            enemy.scoreAgainstEnemy();
            if (enemy instanceof Chicken) this.level.addNewEnemy('Hen')
            else if (enemy instanceof Chick) this.level.addNewEnemy('Chick');
        }
    }

    /**
     * Checks collisions of an enemy object and applies consequences
     * @param {Object} enemy 
     */
    checkEnemyCollisions(enemy) {
        this.throwableObjects.forEach(throwableObj => {
            this.checkThrowableObjectCollision(throwableObj, enemy);
        });
        this.checkCharacterCollision(enemy);
    }

    /**
     * Checks character collisions for a collectible object and applies consequences
     * @param {Object} collectibleObject 
     */
    checkCollectibleCollision(collectibleObject) {
        if (collectibleObject instanceof Coin && this.character.isColliding(collectibleObject)) {
            this.collectedCoins++; // refactor?
            this.statusbars[1].setStatusbar(this.collectedCoins);
            collectibleObject.markedForDeletion = true;
            collectibleObject.collectSound.play();
        } else if (collectibleObject instanceof Bottle && this.character.isColliding(collectibleObject)) {
            this.collectedBottles++;
            this.statusbars[2].setStatusbar(this.collectedBottles);
            collectibleObject.markedForDeletion = true;
            collectibleObject.collectSound.play();
        }
    }

    /**
     * Checks collisions of movable objects
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            this.checkEnemyCollisions(enemy);
        });
        this.level.collectibleObjects.forEach((collectible, index) => {
            this.checkCollectibleCollision(collectible);
        });
        this.removeMarkedObjects(this.level.collectibleObjects, this.throwableObjects, this.level.enemies);
        //this.removeMarkedObjects();
    }

    /**
     * Removes marked objects from passed arrays
     * @todo FIX (splice in forEach() ? )
     * @param  {...Objects} objArrs 
     */
    removeMarkedObjects(...objArrs) {
        for (let i = 0; i < objArrs.length; i++) {
            objArrs[i].forEach( (obj,objIndex)=>{
                if (obj.markedForDeletion) {
                    objArrs[i].splice(objIndex,1)
                };
            });
        }
    }

    /**
      * Removes marked objects from given arrays
      * @param  {...Objects} objArrs 
    */
    removeMarkedObjects2() {
        this.level.collectibleObjects = this.level.collectibleObjects.filter(collectible => !collectible.markedForDeletion);
        this.throwableObjects = this.throwableObjects.filter(throwableObj => !throwableObj.markedForDeletion);
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.markedForDeletion);
    }

    /**
     * Checks if character can throw a bottle and initializes the throw
     * @todo [REDO:] redo throw?
     */
    checkThrowObjects() {
        if (this.character.canThrow(this.collectedBottles)) {
            this.character.keyboard.ENTER = false;
            this.throwBottle(); // return true or pass deltaTime
        }
    }

   /**
    * Determines throw coordinates, creates a new throwable bottle object,
    * initializes throw and updates game status UI
    *  @todo [REDO:] redo throw
    */
    throwBottle() { // TD. (initialize throw bottle in setStartThrow() ?)
        // create new bottle
        let bottle = new Bottle();
        this.throwableObjects.push(bottle);
        // set throw-x 
        let bottleX;
        if (this.character.isReversed_x) bottleX = this.character.x;
        else bottleX = this.character.x + this.character.width * 0.5;
        // throw bottle
        bottle.setThrowStart(bottleX, this.character.y + 80);
        //bottle.animateThrow(); //bottle.checkAnimationFrameTime(deltaTime); & remove animateThrow();
        // set game status-ui
        this.collectedBottles--;
        this.statusbars[2].setStatusbar(this.collectedBottles);
    }

    /**
     * Checks if images are fully loaded into the imgCache
     * Note: Only checks character and background objects, as these usually take the longest when loading
     * @returns {boolean}
     */
    checkWorldComplete() {
        world.level.backgroundObjects.forEach(bgo => {
            if (!bgo.checkImgLoaded()) return false;
        });
        if (!world.character.checkImgLoaded()) return false;
        return true;
    }

    /**
     * Sets game over and shows game-over screen
     */
    setGameOver() {
        setTimeout(() => {
            this.gameOver = true;
        }, 500);
        this.setGameOverScreen();
    }

    /**
     * Checks for win conditions
     * @returns {boolean}
     */
    checkWin() {
        return (
            this.endboss.isDead() && 
            this.level.amountCoins <= this.collectedCoins // <= instead of === because of BUG: smt more coins collected?
        );
    }

    /**
     * Sets the correct end-screen & UI depending on the win status
     */
    setGameOverScreen() {
        if (this.checkWin() && this.gameOver ) setWinScreen();
        else if (this.gameOver) setLoserScreen();
    }

    /**
     * Toggles developer mode
     */
    setDevMode() {
        this.character.showHitbox = !this.character.showHitbox;
    }

    /**
     * Checks if developer mode is changed during the game & adjusts objects settings accordingly, 
     * as new enemies are being created during the game (with showHitbox = false per default)
     */
    checkDevMode() {
        let movableObjects = [...this.level.enemies, ...this.level.collectibleObjects];
        movableObjects.forEach(mo => {
            mo.showHitbox = this.character.showHitbox;
        });
    }

    /**
     * Checks remaining game time, adjusts game music playback rate and sets a countdown accordingly
     */
    checkRemainingTime() {
        if (this.statusbars[0].remainingTime == 10) this.gameMusic.playbackRate = 1.3;
        if (this.statusbars[0].remainingTime <= 3 && !this.gamePaused) this.countdownSound.play();
        if (this.gamePaused || this.gameOver) this.countdownSound.pause();
    }

    /**
     * Starts and stops game music according to the game satus
     */
    controlGameMusic() {
        if (this.gameOver || this.gamePaused) this.gameMusic.pause();
        else this.gameMusic.play();
    }

    /**
     * Contains checks which are performed during the game loop/runtime
     */
    checkGameStatus() {
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkRemainingTime();
        this.checkDevMode();
    }

    /**
     * Calculates and returns time in milliseconds between this and the last animation frame performed by resetAnimationFrame()
     * @param {number} timeStamp - timestamp of last animation frame
     * @returns {number} time difference in ms
     */
    setDeltaTime(timeStamp) {
        let deltaTime = timeStamp - this.lastAnimationFrame;
        this.lastAnimationFrame = timeStamp;
        this.gameTime += deltaTime;
        if (this.gameTime > this.maxGameTime) this.setGameOver();
        return deltaTime;
    }

    /**
     * Updates enemy movements and animations
     * @param {Object} enemy 
     * @param {number} deltaTime - timestamp of last animation frame
     */
    updateEnemy(enemy, deltaTime) {
        enemy.checkAnimationFrameTime(deltaTime);
        if (!(enemy instanceof Endboss)) enemy.move();
        if (enemy instanceof Endboss && enemy.isDead()) {
            this.setGameOver();
        };
    }

    /**
     * Updates character movements and animations
     * @param {number} deltaTime - timestamp of last animation frame
     */
    updateCharacter(deltaTime) {
        this.character.checkAnimationFrameTime(deltaTime);
        this.character.move();
        if (this.character.isDead()) this.setGameOver();
    }

    /**
     * Updates all object movements and animations on canvas
     * @param {number} deltaTime - timestamp of last animation frame
     */
    updateMovableObjects(deltaTime){
        // update objects on canvas
        this.level.backgroundObjects.forEach(bgo => {bgo.move();});
        this.level.enemies.forEach(enemy => {this.updateEnemy(enemy, deltaTime);});
        // instead of in throw()
        this.throwableObjects.forEach( obj => {obj.checkAnimationFrameTime(deltaTime);});
        this.level.collectibleObjects.forEach( obj=>{
           obj.checkAnimationFrameTime(deltaTime);
        });
        //animate throw objects or bottles & collectibles etc this.animateCollectibles();
        this.updateCharacter(deltaTime);
    }

    /**
     * Checks and updates game status, draws & updates objects on canvas accordingly
     * @param {number} timeStamp - timestamp of last animation frame
     */
    updateGame(timeStamp) {
        this.draw();
        this.checkGameStatus();
        let deltaTime = this.setDeltaTime(timeStamp);
        this.updateMovableObjects(deltaTime);
        this.run();
    }

    /**
     * Controls game music, creates and controls the game loop
     */
    run() {
        this.controlGameMusic();
        // create game loop
        let self = this;
        if (!this.gameOver && !this.gamePaused) requestAnimationFrame(() => {
            let timeStamp = Date.now();
            self.updateGame(timeStamp);
        });
    }

}