class Level {
    
    backgroundObjects = [];
    enemies = [];
    collectibleObjects = [];
    collectibles;

    constructor(amountHens, amountChicks, amountCoins, amountBottles, bgLengts) {
        this.levelEndX = (bgLengts-1) * canvasWidth * 2;
        this.amountHens = amountHens;
        this.amountChicks = amountChicks;
        this.amountCoins = amountCoins;
        this.amountBottles = amountBottles;
        this.addBackgroundObjects(bgLengts);
        this.addEnemies(amountHens, amountChicks);
        this.addCollectibles(amountCoins, amountBottles);
    }
    
    addBackgroundObjects(bgLengts){
        for (let i = -1; i <= bgLengts; i++){
            let x = i * canvasWidth*2;
            let cw = canvasWidth;
            let bgLayerObjects = [ 
                new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/Completo.png', x+25, 0, this.levelEndX),
                new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/completo.png', x+15, 0.5, this.levelEndX),
                new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/completo.png', x, 1, this.levelEndX),
                new Cloud('img/5.Fondo/Capas/4.nubes/Completo.png', x+50, this.levelEndX),
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

    addCollectibles(amountCoins, amountBottles) {
        for (let i = 0; i < amountCoins; i++){
            this.collectibleObjects.push(new Coin(this.levelEndX));
        }
        for (let i = 0; i < amountBottles; i++) {
            this.collectibleObjects.push(new Bottle(this.levelEndX));
        }
    }

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