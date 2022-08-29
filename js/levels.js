function setLevel(levelNumber = 1) {
    if (levelNumber === 1)
        return new Level(7, 9, 15, 10 , 4, 30000); // Easy TEST level // hens, chicks, coins, bottles, bg-lengths, max game time
    if (levelNumber === 2) 
        return new Level(13, 15, 20, 10, 6, 30000); // params: amounts of: hens, chicks, coins, bottles, bg-lengths, max game time
    if (levelNumber === 3)
       return new Level(19, 21, 25, 10, 8, 25000); // params: amounts of: hens, chicks, coins, bottles, bg-lengths, max game time
    // or auto-generate level
    else if (levelNumber < 11) 
        return new Level(levelNumber*5, levelNumber*6, 25, 10, 11, 25000);
}


