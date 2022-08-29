class Level {
    
    backgroundObjects = [];
    enemies = [];
    collectibleObjects = [];
    collectibles;

    /**
     * Instanciates a new level
     * @param {number} amountHens - number of enemies of type Chicken
     * @param {number} amountChicks - number of enemies of type Chick
     * @param {number} amountCoins - number of collectible coins
     * @param {number} amountBottles - number of collectible bottles
     * @param {number} bgLengts - defines horizontal length of level
     * @param {number} maxGameTime - maximum game time in ms
     */
    constructor(amountHens, amountChicks, amountCoins, amountBottles, bgLengts, maxGameTime) {
        this.levelEndX = (bgLengts-1) * canvasWidth * 2;
        this.amountHens = amountHens;
        this.amountChicks = amountChicks;
        this.amountCoins = amountCoins;
        this.amountBottles = amountBottles;
        this.maxGameTime = maxGameTime;
        this.addBackgroundObjects(bgLengts);
        this.addEnemies(amountHens, amountChicks);
        this.addCollectibles(amountCoins, amountBottles);
    }
    
    /**
     * Instanciates one background layer set per passed number of bgLayers and stores them in an array 'backgroundObjects'
     * @param {number} bgLengts - defines horizontal length of level
     */
    addBackgroundObjects(bgLengts){
        for (let i = -1; i <= bgLengts; i++){
            let x = i * canvasWidth*2;
            let cw = canvasWidth;
            let bgLayerObjects = [ 
                new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/Completo.png', x+25, 0, this.levelEndX),
                new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/completo.png', x+15, 0.5, this.levelEndX),
                new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/completo.png', x, 1.3, this.levelEndX),
                new Cloud('img/5.Fondo/Capas/4.nubes/Completo.png', x+50, this.levelEndX),
            ];
            this.backgroundObjects.push(...bgLayerObjects);     
        }
    }

    /**
     * Instanciates a set of enemies and one endboss and stores them in an array 'enemies'.
     * @param {number} amountHens - amount of enemies of type Chicken
     * @param {number} amountChicks - amount of enemies of type Chick
     */
    addEnemies(amountHens, amountChicks){
        for (let i = 0; i < amountHens; i++){
            this.enemies.push(new Chicken(this.levelEndX));
        }
        for (let i = 0; i < amountChicks; i++) {
            this.enemies.push(new Chick(this.levelEndX));
        }
        this.enemies.push(new Endboss(this.levelEndX) );
    }

    /**
     * Instanciates a set of collectible objects and stores them in an array 'collectibleObjects'
     * @param {number} amountCoins - amount of collectible coins
     * @param {number} amountBottles - amount of collectible bottles
     */
    addCollectibles(amountCoins, amountBottles) {
        for (let i = 0; i < amountCoins; i++){
            this.collectibleObjects.push(new Coin(this.levelEndX));
        }
        for (let i = 0; i < amountBottles; i++) {
            this.collectibleObjects.push(new Bottle(this.levelEndX, false));
        }
    }

    /**
     * Creates new enemies during the game and places them randomly on the canvas,
     * to keep the amount of enemies constant
     * @param {string} enemyType - determines the type of enemy
     */
    addNewEnemy(enemyType){
        if (this.enemies.length < this.amountChicks + this.amountHens){
            if (enemyType === 'Hen'){
                let chicken = new Chicken(this.levelEndX);
                //chicken.x = this.levelEndX+250;
                this.enemies.push(chicken);
            }
            if (enemyType === 'Chick') {
                let chick = new Chick(this.levelEndX);
                //chick.x = this.levelEndX+250;
                this.enemies.push(chick);
            }
        }
    }

}