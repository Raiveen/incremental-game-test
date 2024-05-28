var player = {
    gold: 0,
    goldtimes: 1,
    goldperclickcost: 10,
    goldperclick: 1,
    automine: 0,
    autominecost: 20,
    prestiged: false,
    prestigetimes: 0,
    prestigecost: 1000,
};

var diamond = {
    diamonds: 0,
    diamondchance: 100,
    diamondchancetimes: 1,
    diamondchanceupgcost: 3,
    diamondgoldboostupgcost: 5,
    diamondgoldboostupgtimes: 0,
    diamondgainupgcost: 10,
    diamondgainupgtimes: 0,
};

function update() {
    var prestigemult = Math.pow(2, player.prestigetimes);
    document.getElementById("goldperclick").innerHTML = player.goldperclick * prestigemult * ((diamond.diamondgoldboostupgtimes / 2) + 1) + " gold per click";
    document.getElementById("goldMined").innerHTML = player.gold + " Gold Mined";
    document.getElementById("perClickUpgrade").innerHTML = "Increase gold mined by 1<br>Cost: " + player.goldperclickcost + " Gold";
    document.getElementById("prestige").innerHTML = "Prestige for " + player.prestigecost + " Gold";
    document.getElementById("autoupg").innerHTML = "Currently mining " + player.automine * player.goldperclick * prestigemult + " gold /s<br> Cost: " + player.autominecost + " Gold";
    document.getElementById("diamondmined").innerHTML = diamond.diamonds + " Diamonds Mined";
    document.getElementById("prestigemult").innerHTML = "Currently " + prestigemult + "x";
    document.getElementById("diamondchance").innerHTML = "Increase diamond chance by 1%<br>Currently " + diamond.diamondchancetimes + "%<br>Cost: " + diamond.diamondchanceupgcost + " Diamonds";
    document.getElementById("diamondgoldboost").innerHTML = "Increase gold gain by +0.5x<br>Currently " + ((diamond.diamondgoldboostupgtimes / 2) + 1) + "x<br>Cost: " + diamond.diamondgoldboostupgcost + " Diamonds";
    document.getElementById("diamondgain").innerHTML = "Increase diamond gain by 2x<br>Currently " + Math.pow(2, diamond.diamondgainupgtimes) + "x<br>Cost: " + diamond.diamondgainupgcost + " Diamonds";
    if (player.gold >= 500) {
        document.getElementById("test").style.display = "inline";
    }
    if (player.prestiged == true) {
        document.getElementById("diamondmined").style.display = "block";
        document.getElementById("test").style.display = "inline";
        document.getElementById("firstprestige").style.display = "none";
        document.getElementById("diaupg").style.display = "inline";
    }
}

//----------------------==========================-----------------------
//----------------------==========MINING==========-----------------------
//----------------------==========================-----------------------

function mineGold() {
    let x = player.goldperclick;
    if (player.prestiged) x = x * Math.pow(2, player.prestigetimes);
    x = x * ((diamond.diamondgoldboostupgtimes / 2) + 1);
    player.gold += x;
    diamondmine();
    update();
}

function diamondmine() {
    let x = 1;
    var chance = diamond.diamondchance / diamond.diamondchancetimes;
    if (Math.floor(Math.random() * chance) + 1 == 1 && player.prestiged == true) {
        x *= Math.pow(2, diamond.diamondgainupgtimes);
        diamond.diamonds += x;
    }
}

//----------------------==========================-----------------------
//----------------------==========RESET LAYERS==========-----------------------
//----------------------==========================-----------------------

function prestige() {
    if (player.gold >= player.prestigecost) {
        player = {
            gold: 0,
            goldtimes: 1,
            goldperclickcost: 10,
            goldperclick: 1,
            automine: 0,
            autominecost: 20,
            prestiged: true,
            prestigetimes: player.prestigetimes,
            prestigecost: player.prestigecost,
        };
        diamond = {
            diamonds: diamond.diamonds,
            diamondchance: diamond.diamondchance,
            diamondchancetimes: diamond.diamondchancetimes,
            diamondchanceupgcost: diamond.diamondchanceupgcost,
            diamondgoldboostupgcost: diamond.diamondgoldboostupgcost,
            diamondgoldboostupgtimes: diamond.diamondgoldboostupgtimes,
            diamondgainupgcost: diamond.diamondgainupgcost,
            diamondgainupgtimes: diamond.diamondgainupgtimes,
        };
        player.prestigetimes++;
        player.prestigecost = Math.floor(player.prestigecost * Math.pow(1.5, player.prestigetimes));
        document.getElementById("firstprestige").style.display = "none";
        document.getElementById("diamondmined").style.display = "block";
        update();
    }
}

//----------------------==========================-----------------------
//----------------------==========UPGRADES==========-----------------------
//----------------------==========================-----------------------

function buyGoldPerClick() {
    if (player.gold >= player.goldperclickcost) {
        player.gold -= player.goldperclickcost;
        player.goldtimes++;
        player.goldperclick++;
        player.goldperclickcost *= 2;
        update();
    }
}

function diamondchance() {
    if (diamond.diamonds >= diamond.diamondchanceupgcost) {
        diamond.diamonds -= diamond.diamondchanceupgcost;
        diamond.diamondchancetimes++;
        diamond.diamondchanceupgcost = Math.floor(3 * Math.pow(1.4, 1.2 * diamond.diamondchancetimes));
        update();
    }
}

function diamondgoldboost() {
    if (diamond.diamonds >= diamond.diamondgoldboostupgcost) {
        diamond.diamonds -= diamond.diamondgoldboostupgcost;
        diamond.diamondgoldboostupgtimes++;
        diamond.diamondgoldboostupgcost = Math.floor(5 * Math.pow(1.5, diamond.diamondgoldboostupgtimes));
        update();
    }
}

function diamondgain() {
    if (diamond.diamonds >= diamond.diamondgainupgcost) {
        diamond.diamonds -= diamond.diamondgainupgcost;
        diamond.diamondgainupgtimes++;
        diamond.diamondgainupgcost = Math.floor(10 * Math.pow(2.5, diamond.diamondgainupgtimes));
        update();
    }
}

//----------------------==========================-----------------------
//----------------------==========AUTOMINE==========-----------------------
//----------------------==========================-----------------------

function auto() {
    if (player.gold >= player.autominecost) {
        player.gold -= player.autominecost;
        player.automine += 1;
        player.autominecost += Math.pow(player.automine, 2);
        update();
        startAutoMine();
    }
}

function startAutoMine() {
    window.clearInterval(mainGameLoop);
    if (player.automine > 0) {
        mainGameLoop = window.setInterval(function() {
            if (player.automine == 0) return;
            mineGold();
            update();
        }, 1000 / player.automine);
    }
}

var mainGameLoop = window.setInterval(function() {
    if (player.automine > 0) {
        mineGold();
    }
}, 1000);

//----------------------==========================-----------------------
//----------------------==========SAVING AND CLEARING==========-----------------------
//----------------------==========================-----------------------

function clearData() {
    localStorage.removeItem("testsave");
    player = {
        gold: 0,
        goldtimes: 1,
        goldperclickcost: 10,
        goldperclick: 1,
        automine: 0,
        autominecost: 20,
        prestiged: false,
        prestigetimes: 0,
        prestigecost: 1000,
    };
    diamond = {
        diamonds: 0,
        diamondchance: 100,
        diamondchancetimes: 1,
        diamondchanceupgcost: 3,
        diamondgoldboostupgcost: 5,
        diamondgoldboostupgtimes: 0,
        diamondgainupgcost: 10,
        diamondgainupgtimes: 0,
    };
    location.reload();
    update();
}

function saveGame() {
    var data = {
        player: player,
        diamond: diamond
    };
    localStorage.setItem("testsave", JSON.stringify(data));
}

var saveGameLoop = window.setInterval(function() {
    saveGame();
}, 1000);

function loadSaveGame() {
    var savedData = JSON.parse(localStorage.getItem("testsave"));
    if (savedData !== null) {
        player = savedData.player !== undefined ? savedData.player : player;
        diamond = savedData.diamond !== undefined ? savedData.diamond : diamond;
    }
    update();
}

loadSaveGame();
startAutoMine();
