class World {

    canvas;
    ctx;
    camera_x = 0;
    collectedCoins = 0;
    collectedBottles = 0;
    throwableObjects = [];
    score = 0;
    gameTime = 0;
    maxGameTime = 30000; //ms
    gamePaused = false;
    gameOver = true;
    audioPaths = [
        //'audio/test/happy.mp3', // test music
        // 'audio/test/CH-AY-NA.ogg', // game music -test1
        'audio/it_takes_a_hero.wav', // game music
        'audio/countdown3.mp3', // countdown sound
        'audio/test/Win Jingle.wav', // win jingle
        'audio/test/Warp Jingle.wav', // lose jingle
    ]

    constructor(levelNo = 1) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.character = new Character(this);
        this.level = level; //setLevel(levelNo);
        this.endboss = this.level.enemies[this.level.enemies.length - 1];
        this.statusbars = [new StatusBar(-5, 'energy', 100), new StatusBar(20, 'coins', 0, 100 / this.level.amountCoins), new StatusBar(45, 'bottles', 0, 100 / this.level.amountBottles)];
        this.lastAnimationFrame = Date.now();
        this.setAudio();
        this.draw();
    }

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

    flipImage(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.x = obj.x * -1;
    }

    flipImageBack(obj) {
        obj.x = obj.x * -1;
        this.ctx.restore();
    }

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

    checkEnemyCollisions(enemy) {
        this.throwableObjects.forEach(throwableObj => {
            this.checkThrowableObjectCollision(throwableObj, enemy);
        });
        this.checkCharacterCollision(enemy);
    }

    checkCollectibleCollision(collectibleObject) {
        if (collectibleObject instanceof Coin && this.character.isColliding(collectibleObject)) {
            this.collectedCoins++; // refactor in collectItem(object, statusBarIndex, collectedItem) function)
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

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            this.checkEnemyCollisions(enemy);
        });
        this.level.collectibleObjects.forEach((collectible, index) => {
            this.checkCollectibleCollision(collectible);
        });
        //this.removeMarkedObjects();
        this.removeMarkedObjects2(this.level.collectibleObjects, this.throwableObjects, this.level.enemies);
    }

    removeMarkedObjects() {
        this.level.collectibleObjects = this.level.collectibleObjects.filter(collectible => !collectible.markedForDeletion);
        this.throwableObjects = this.throwableObjects.filter(throwableObj => !throwableObj.markedForDeletion);
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.markedForDeletion);
    }

    removeMarkedObjects2(...objArrs) {
        for (let i = 0; i < objArrs.length; i++) { // or for (arr of objArrs) !!
            objArrs[i].forEach( (obj,objIndex)=>{
                if (obj.markedForDeletion) objArrs[i].splice(objIndex,1);
            });
        }
    }

    checkThrowObjects() {
        if (this.character.canThrow(this.collectedBottles)) {
            this.character.keyboard.ENTER = false;
            this.throwBottle(); // return true or pass deltaTime
        }
    }

    // TD. redo?
    throwBottle() {
        // create new bottle
        let bottle = new Bottle();
        this.throwableObjects.push(bottle);
        // set throw-x 
        let bottleX;
        if (this.character.isReversed_x) bottleX = this.character.x;
        else bottleX = this.character.x + this.character.width * 0.5;
        // throw bottle
        bottle.throw(bottleX, this.character.y + 80);
        bottle.animateThrow(); //bottle.checkAnimationFrameTime(deltaTime); & remove animateThrow();
        // set game status-ui
        this.collectedBottles--;
        this.statusbars[2].setStatusbar(this.collectedBottles);
    }

    // check if images are fully loaded into imgCache in certain objects (only character and bg objects, as they take the longest)
    checkWorldComplete() {
        world.level.backgroundObjects.forEach(bgo => {
            if (!bgo.checkImgLoaded()) return false;
        });
        if (!world.character.checkImgLoaded()) return false;
        return true;
    }

    setGameOver() {
        setTimeout(() => {
            this.gameOver = true;
        }, 500);
        this.setGameOverScreen();
    }

    checkWin() {
        return (
            this.endboss.isDead() && 
            this.level.amountCoins <= this.collectedCoins // >= instead of === because of bug: smt 21 coins collected?
        );
    }

    setGameOverScreen() {
        if (this.checkWin() && this.gameOver ) setWinScreen();
        else if (this.gameOver) setLoserScreen();
    }

    setDevMode() {
        this.character.showHitbox = !this.character.showHitbox;
    }

    // as new enemies are being created during the game (always with showHitbox = false) maybe check and update during game
    checkDevMode() {
        let movableObjects = [...this.level.enemies, ...this.level.collectibleObjects, this.character];
        movableObjects.forEach(mo => {
            mo.showHitbox = this.character.showHitbox;
        });
    }

    checkCountdown() {
        if (this.statusbars[0].remainingTime == 10) this.gameMusic.playbackRate = 1.3;
        if (this.statusbars[0].remainingTime <= 3 && !this.gamePaused) this.countdownSound.play();
        if (this.gamePaused || this.gameOver) this.countdownSound.pause();
    }

    controlGameMusic() {
        if (this.gameOver || this.gamePaused) this.gameMusic.pause();
        else this.gameMusic.play();
    }

    checkGameStatus() {
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkCountdown();
        this.checkDevMode();
    }

    setDeltaTime(timeStamp) {
        let deltaTime = timeStamp - this.lastAnimationFrame;
        this.lastAnimationFrame = timeStamp;
        this.gameTime += deltaTime;
        if (this.gameTime > this.maxGameTime) this.setGameOver();
        return deltaTime;
    }

    updateEnemy(enemy, deltaTime) {
        enemy.checkAnimationFrameTime(deltaTime);
        if (!(enemy instanceof Endboss)) enemy.move();
        if (enemy instanceof Endboss && enemy.isDead()) {
            this.setGameOver();
        };
    }

    updateCharacter(deltaTime) {
        this.character.checkAnimationFrameTime(deltaTime);
        this.character.move();
        if (this.character.isDead()) this.setGameOver();
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
        this.updateCharacter(deltaTime);
        this.run();
    }

    run() {
        this.controlGameMusic();
        // game loop
        let self = this;
        if (!this.gameOver && !this.gamePaused) requestAnimationFrame(() => {
            let timeStamp = Date.now();
            self.updateGame(timeStamp);
        });
    }

}