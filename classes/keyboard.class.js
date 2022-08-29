class Keyboard {

    LEFT = false;
    RIGHT = false;
    UP = false;
    SPACE = false;
    ENTER = false;
    
    /**
     * Creates a Keyboard object to control the user's game inputs
     */
    constructor(){
        this.handleKeyPress(); //bindKeyPressEvents()
        this.handleTouchButtonPress();
    }
    
    /**
     * Binds key press events
     */
    handleKeyPress() {
        window.addEventListener('keydown', (e) => {
            this.checkKeydown(e.code);
        });

        window.addEventListener('keyup', (e) => {
            this.checkKeyup(e.code);
        });
    }

    /**
     * Checks key codes of keydown events and sets key values accordingly
     * @param { string } keyCode - key code of a keypress event
     */
    checkKeydown(keyCode) {
        switch (keyCode) {
            case 'ArrowRight':
                this.RIGHT = true;
                break;
            case 'ArrowLeft':
                this.LEFT = true;
                break;
            case 'ArrowUp':
                this.UP = true;
                break;
            case 'Space':
                this.SPACE = true;
                break;
            case 'Enter':
                this.ENTER = true;
                break;
        }
    }

    /**
     * Checks key codes of keyup events and sets key values accordingly
     * @param { string } keyCode - key code of a keypress event
     */
    checkKeyup(keyCode) {
        switch (keyCode) {
            case 'ArrowRight':
               this.RIGHT = false;
                break;
            case 'ArrowLeft':
                this.LEFT = false;
                break;
            case 'ArrowUp':
                this.UP = false;
                break;
            case 'Space':
                this.SPACE = false;
                break;
            case 'Enter':
                this.ENTER = false;
                break;
        }
    }

    /**
     * Binds button press events
     */
    handleTouchButtonPress() {
        let btns = getId('btn-left', 'btn-right', 'btn-jump', 'btn-throw');
        let keys = ['LEFT', 'RIGHT', 'UP', 'ENTER'];
        btns.forEach((btn, index)=> {
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this[keys[index]] = true;
            });
        });
        btns.forEach((btn, index) => {
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this[keys[index]] = false;
            });
        });
    }

}