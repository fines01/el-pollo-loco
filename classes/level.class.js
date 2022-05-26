class Level {
    
    character;
    enemies;
    backgroundObjects;
    levelEnd_x;

    constructor(character,enemies,bgo,endX){
        this.character = character;
        this.enemies = enemies;
        this.backgroundObjects = bgo;
        this.levelEnd_x = endX;
    }
}