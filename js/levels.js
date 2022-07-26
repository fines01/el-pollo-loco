function setLevel(levelNumber = 1) {
    if (levelNumber === 1){
        const level = new Level(7, 9, 15, 10 , 4, 35000); // Easy TEST level // hens, chicks, coins, bottles, bg-lengths, max game time
        return level;
    }
    if (levelNumber === 2) {
        const level = new Level(13, 15, 20, 10, 6, 35000); // params: amounts of: hens, chicks, coins, bottles, bg-lengths, max game time
        return level;
    } 
    if (levelNumber === 3) {
        const level = new Level(19, 21, 25, 10, 8, 30000); // params: amounts of: hens, chicks, coins, bottles, bg-lengths, max game time
        return level;
    }
    if (levelNumber === 4) {
        const level = new Level(25, 27, 25, 10, 10, 30000); // params: amounts of: hens, chicks, coins, bottles, bg-lengths, max game time
        return level;
    }
    if (levelNumber === 5) {
        const level = new Level(31, 33, 25, 10, 11, 25000); // params: amounts of: hens, chicks, coins, bottles, bg-lengths, max game time
        return level;
    }

    // or auto-generate level
    else if (levelNumber < 11) {
        const level = new Level(levelNumber*5, levelNumber*5.5, 25, 9, 11, 25000);
        return level;
    }

    // else return a bool --> & check if all levels are won
}

