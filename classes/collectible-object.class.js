class CollectibleObject extends MovableObject {

    constructor() {
        super();
        //place randomly between y [50, 325] & x [0, levelEnd_x -200]
            this.x = Math.random() * (2 * canvasWidth - 500);
            this.y = 50 + Math.random() * 275;
    }
}