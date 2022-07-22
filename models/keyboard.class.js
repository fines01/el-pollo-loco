class Keyboard {

    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    ENTER = false;
    // also keys for: audio - controls (volume) ?

    /**
     * Creates a Keyboard object to control user game inputs
     */
    constructor(){
        this.handleKeyPress(); //bindKeyPressEvents()
        this.handleButtonPress();
    }
    
    /**
     * Binds key press events
     */
    handleKeyPress() {

        window.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'ArrowRight':
                    this.RIGHT = true;
                    break;
                case 'ArrowLeft':
                    this.LEFT = true;
                    break;
                case 'ArrowUp':
                    this.UP = true;
                    break;
                case 'ArrowDown':
                    this.DOWN = true;
                    break;
                case 'Space':
                    this.SPACE = true;
                    break;
                case 'Enter':
                    this.ENTER = true;
                    break;
            }
        });

        window.addEventListener('keyup', (event) => {
            switch (event.code) {
                case 'ArrowRight':
                    this.RIGHT = false;
                    break;
                case 'ArrowLeft':
                    this.LEFT = false;
                    break;
                case 'ArrowUp':
                    this.UP = false;
                    break;
                case 'ArrowDown':
                    this.DOWN = false;
                    break;
                case 'Space':
                    this.SPACE = false;
                    break;
                case 'Enter':
                    this.ENTER = false;
                    break;
            } 
        });
    }

    /**
     * Binds button press events
     */
    handleButtonPress() {
        getId('btn-left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        getId('btn-right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        getId('btn-jump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        });
        getId('btn-throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        // 
        getId('btn-left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
        getId('btn-right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
        getId('btn-jump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
        });
        getId('btn-throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
    
    }
}