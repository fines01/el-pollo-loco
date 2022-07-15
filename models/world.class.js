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
        //'audio/test/happy.mp3', // game music
        'audio/it_takes_a_hero.wav', // game music
        'audio/countdown3.mp3' // countdown sound
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
        for (let i = 0; i < objects.length; i++) {
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
        [this.gameMusic, this.countdownSound] = this.character.createAudio(...this.audioPaths);
        this.countdownSound.volume = 0.4;
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
        if (this.character.isColliding(enemy) && !this.character.isHurt() && !this.character.isJumpingOn(enemy) && !enemy.isDead()) { // because dead enemies don't get removed immediately (for visual effects) // --> new check-function isCollidingWith() or isHitting() ??
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
            this.collectedCoins++;
            collectibleObject.collectSound.play();
            this.statusbars[1].setStatusbar(this.collectedCoins);
            collectibleObject.markedForDeletion = true;
        } else if (collectibleObject instanceof Bottle && this.character.isColliding(collectibleObject)) {
            collectibleObject.collectSound.play();
            collectibleObject.markedForDeletion = true;
            this.collectedBottles++;
            this.statusbars[2].setStatusbar(this.collectedBottles);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            this.checkEnemyCollisions(enemy);
        });
        this.level.collectibleObjects.forEach((collectible, index) => {
            this.checkCollectibleCollision(collectible);
        });
        // this.removeMarkedObjects2(this.level.collectibleObjects, this.throwableObjects, this.level.enemies);
        this.removeMarkedObjects();
    }

    // TODO fix
    // removeMarkedObjects2(...objArrs) {
    //     for (let i = 0; i < objArrs.length; i++) {
    //         objArrs[i] = objArrs[i].filter((obj) => !obj.markedForDeletion); // I don't actually change original arrays here
    //     }
    // }

    removeMarkedObjects() {
        //objArr = objArr.filter(obj => !obj.markedForDeletion); // gn - check 
        this.level.collectibleObjects = this.level.collectibleObjects.filter(collectible => !collectible.markedForDeletion);
        this.throwableObjects = this.throwableObjects.filter(throwableObj => !throwableObj.markedForDeletion);
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.markedForDeletion);
    }

    checkThrowObjects() {
        if (this.character.canThrow(this.collectedBottles)) {
            this.character.keyboard.ENTER = false;
            this.throwBottle(); // return true or pass deltaTime
        }
    }

    throwBottle() {
        let bottle = new Bottle();
        this.throwableObjects.push(bottle);
        let bottleX;
        if (this.character.isReversed_x) bottleX = this.character.x;
        else bottleX = this.character.x + this.character.width * 0.5;
        bottle.throw(bottleX, this.character.y + 80);
        this.collectedBottles--;
        this.statusbars[2].setStatusbar(this.collectedBottles);
        bottle.animateThrow(); //bottle.checkAnimationFrameTime(deltaTime); & remove animateThrow();
    }

    setGameOver() {
        setTimeout(() => {
            this.gameOver = true;
        }, 500);
        this.setGameOverScreen();
    }

    setGameOverScreen() { // BUG in case of (win at last sec? character dead msec after win?) shows all screens
        if (this.endboss.isDead() && this.level.amountCoins === this.collectedCoins) setWinScreen();
        else if (this.character.isDead()) setLoserScreen(); // params: energy left, missed coins, time left?
        else setLoserScreen();
    }

    setDevMode() {
        let movableObjects = [...this.level.enemies, ...this.level.collectibleObjects, this.character];
        movableObjects.forEach(mo => {
            //if (this.character.keyboard.F) {
            mo.showHitboxes = !mo.showHitboxes;
            console.log(mo, mo.showHitboxes);
            //}
        });
    }

    // checkDevMode() {
    //     let movableObjects = [...this.level.enemies, ...this.level.collectibleObjects, this.character];
    //     movableObjects.forEach(mo => {
    //         if (this.character.keyboard.F) {
    //             mo.showHitboxes = !mo.showHitboxes;
    //             console.log(mo, mo.showHitboxes);
    //         }
    //     });
    // }

    checkCountdown() {
        if (this.statusbars[0].remainingTime == 10) this.gameMusic.playbackRate = 1.15;
        if (this.statusbars[0].remainingTime == 3 && !this.gamePaused) this.countdownSound.play();
    }

    checkGameStatus() {
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkCountdown();
        //this.checkDevMode();
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
        this.checkGameStatus(); // for throw objects (checkThroeObjects)
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
        let self = this;
        if (!this.gameOver && !this.gamePaused) requestAnimationFrame(() => {
            let timeStamp = Date.now();
            self.updateGame(timeStamp);
        });
        // in game.js (TODO: continue playing countdownSound if in lastX sec after Pause)
        if (this.gameOver || this.gamePaused) {
            this.gameMusic.pause();
            this.countdownSound.pause();
        }
        else {
            this.gameMusic.play();
        }
    }

}