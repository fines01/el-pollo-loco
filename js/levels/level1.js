const level1 = new Level(
    // character
    //new Pepe(),
    // enemies inkl endboss
    [
        new Chicken(),
        new Chicken(),
        new Chick(),
        new Chick(),
        new Gallina(),
    ],
    // background-objects
    [
        new Cloud('img/5.Fondo/Capas/4.nubes/1.png', 0),
        //new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0, 0.5),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0, 1),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0, 1.5),
        // 720
        new Cloud('img/5.Fondo/Capas/4.nubes/2.png', 720),
        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 720, 0.5),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 720, 1),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 720, 1.5),

        new Cloud('img/5.Fondo/Capas/4.nubes/1.png', 1440),

        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 1440, 0.5),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 1440, 1),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 1440, 1.5),
        
        new Cloud('img/5.Fondo/Capas/4.nubes/2.png', 2160),

        new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 2160, 0.5),
        new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 2160, 1),
        new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 2160, 1.5),
        // new Cloud('img/5.Fondo/Capas/4.nubes/1.png', 0),
        // wieder wh mit 720 * 2 etc. --> besser lösen/wh
    ],
    // collectibles
    // [
    //     new Coin(),
    //     new Coin(),
    //     new Coin(),
    // ],
    // level-end
    canvasWidth*2, //for testing pps
);

