class Level {
    
    character;
    enemies;
    backgroundObjects;
    levelEnd_x;
    world;

    constructor(character,enemies,bgo,endX){
        this.character = character;
        this.enemies = enemies;
        this.backgroundObjects = bgo;
        this.levelEnd_x = endX;
        console.log('level:', this);
    }
}