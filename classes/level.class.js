class Level {
    
    //character;
    enemies = [];
    backgroundObjects = [];
    collectibleObjects = [];
    collectibles;
    world;

    constructor(amountHens, amountChicks, amountCoins, amountBottles, bgLengts) { // (enemies, bgo, smth)
        this.levelEndX = (bgLengts-1) * canvasWidth * 2;  
        this.addBackgroundObjects(bgLengts);
        this.addEnemies(amountHens, amountChicks);
        this.addCollectibles(amountCoins, amountBottles);
    }
    
    addBackgroundObjects(bgLengts){
        
        for (let i = -1; i <= bgLengts; i++){ // bg-lengths plus 2 extra (before and after actual level-area)
            let x = i * canvasWidth*2;
            let bgLayerObjects = [ 
                new Cloud('img/5.Fondo/Capas/4.nubes/1.png', x, this.levelEndX),
                new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/Completo.png', x+25, 0, this.levelEndX),
                new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/completo.png', x+15, 0.5, this.levelEndX),
                new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/completo.png', x, 1, this.levelEndX),
            ];
            this.backgroundObjects.push(...bgLayerObjects);
        }

    }

    addEnemies(amountHens, amountChicks){
        for (let i = 0; i < amountHens; i++){
            this.enemies.push(new Chicken(this.levelEndX));
        }
        for (let i = 0; i < amountChicks; i++) {
            this.enemies.push(new Chick(this.levelEndX));
        }
        this.enemies.push(new Endboss(this.levelEndX) );
    }

    // TODO/check: similar enough mb make one function instead
    addCollectibles(amountCoins, amountBottles) {
        for (let i = 0; i < amountCoins; i++){
            this.collectibleObjects.push(new Coin(this.levelEndX));
        }
        for (let i = 0; i < amountBottles; i++) {
            this.collectibleObjects.push(new ThrowableObject(this.levelEndX));
        }
    }

}