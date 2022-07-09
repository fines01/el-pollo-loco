function setLevel(Number = 1) { // right now only 1 Level (is default)
    if (Number === 1 ) {
        const level = new Level(10, 21, 20, 10, 6); // params: amounts of: hens, chicks, coins, bottles, bg-lengths
        return level;
    } 
}

