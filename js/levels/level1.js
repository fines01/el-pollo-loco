function setLevel(Number = 1) { // right now only 1 Level (is default)
    if (Number === 1 ) {
        //const level = new Level(1, 1, 20, 10, 6); // TESTING
        const level = new Level(12, 14, 20, 10, 6); // params: amounts of: hens, chicks, coins, bottles, bg-lengths
        return level;
    } 
}

