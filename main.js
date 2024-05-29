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

var eme = {
    emeralds: 0,
    emecost: 10000,
    ememile: [0, 0, 0],
    lovetimes: 0,
    lovecost: 1,
}

var values = {
    goldgain: 1,

}

var lastMineGoldTime = 0;

function update() {
    var prestigemult = Math.pow(2, player.prestigetimes);
    let x = player.goldperclick;
    if (player.prestiged) x = x * Math.pow(2, player.prestigetimes);
    x = x * ((diamond.diamondgoldboostupgtimes / 2) + 1);
    if (eme.ememile[0] == 1) x *= 2;
    if (eme.lovetimes >= 1) x *= Math.pow(3, eme.lovetimes);
    values.goldgain = x;
    document.getElementById("goldperclick").innerHTML = values.goldgain + " gold per click";
    document.getElementById("goldMined").innerHTML = player.gold + " Gold Mined";
    document.getElementById("perClickUpgrade").innerHTML = "Increase gold mined by 1<br>Cost: " + player.goldperclickcost + " Gold";
    document.getElementById("prestige").innerHTML = "Prestige for " + player.prestigecost + " Gold";
    document.getElementById("autoupg").innerHTML = "Currently mining " + player.automine * values.goldgain + " gold /s<br> Cost: " + player.autominecost + " Gold";
    document.getElementById("diamondmined").innerHTML = diamond.diamonds + " Diamonds Mined";
    document.getElementById("prestigemult").innerHTML = "Currently " + prestigemult + "x";
    document.getElementById("diamondchance").innerHTML = "Increase diamond chance by 1%<br>Currently " + diamond.diamondchancetimes + "%<br>Cost: " + diamond.diamondchanceupgcost + " Diamonds";
    document.getElementById("diamondgoldboost").innerHTML = "Increase gold gain by +0.5x<br>Currently " + ((diamond.diamondgoldboostupgtimes / 2) + 1) + "x<br>Cost: " + diamond.diamondgoldboostupgcost + " Diamonds";
    document.getElementById("diamondgain").innerHTML = "Increase diamond gain by 2x<br>Currently " + Math.pow(2, diamond.diamondgainupgtimes) + "x<br>Cost: " + diamond.diamondgainupgcost + " Diamonds";
    document.getElementById("emeralds").innerHTML = "Emeralds: "+eme.emeralds;
    document.getElementById("emeraldbutton").innerHTML = "<br>Gain 1 emerald<br>Cost: "+eme.emecost+" Diamonds<br> ‎";
    document.getElementById("love").innerHTML = "<br>Fresh love (3x gold and diamonds)<br>Cost: "+eme.lovecost+" emerald<br> ‎ ";
    if (player.gold >= 500) {
        document.getElementById("test").style.display = "inline";
    }
    if (player.prestiged == true) {
        document.getElementById("diamondmined").style.display = "block";
        document.getElementById("test").style.display = "inline";
        document.getElementById("firstprestige").style.display = "none";
        document.getElementById("diaupg").style.display = "inline";
    }
    if (diamond.diamonds >= 5000 || eme.emeralds >= 1) {
        document.getElementById("emerald").style.display = "inline";
    }
    if (eme.emeralds >= 1) {
        document.getElementById("jedna").style.backgroundColor = "green";
    }
    if (eme.emeralds >= 3) {
        document.getElementById("dva").style.backgroundColor = "green";
    }
    if (eme.emeralds >= 5) {
        document.getElementById("tri").style.backgroundColor = "green";
    }
    if (eme.emeralds >= 10) {
        document.getElementById("ctyri").style.backgroundColor = "green";
    }
    
}

//----------------------==========================-----------------------
//----------------------==========MINING==========-----------------------
//----------------------==========================-----------------------

function mineGold() {
    var currentTime = new Date().getTime();
    if (currentTime - lastMineGoldTime < 50) {
        return;
    }
    lastMineGoldTime = currentTime;

    let x = player.goldperclick;
    if (player.prestiged) x = x * Math.pow(2, player.prestigetimes);
    x = x * ((diamond.diamondgoldboostupgtimes / 2) + 1);
    if (eme.ememile[0] == 1) x *= 2;
    if (eme.lovetimes >= 1) x *= Math.pow(3, eme.lovetimes);
    player.gold += x;
    diamondmine();
    update();
}

function diamondmine() {
    let x = 1;
    var chance = diamond.diamondchance / diamond.diamondchancetimes;
    if (Math.floor(Math.random() * chance) + 1 == 1 && player.prestiged == true) {
        x *= Math.pow(2, diamond.diamondgainupgtimes);
        if (eme.ememile[0] == 1) x *= 2;
        if (eme.ememile[3] == 1) x *= Math.floor(Math.log(player.prestigetimes) / Math.log(1.6)); 
        if (eme.lovetimes >= 1) x *= Math.pow(3, eme.lovetimes);
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
        if (eme.ememile[1] == 1) player.automine = 10*(eme.emeralds-2);
        update();
    }
}

function emerald() {
    if (diamond.diamonds >= eme.emecost) {
        player = {
            gold: 0,
            goldtimes: 1,
            goldperclickcost: 10,
            goldperclick: 1,
            automine: 0,
            autominecost: 20,
            prestiged: true,
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
        eme.emeralds++;
        eme.emecost = Math.floor(10000 * Math.pow(1.4, 1.5*eme.emeralds));
        milestonecheck()
        
    }
    if (eme.ememile[1] == 1) player.automine = 10*(eme.emeralds-2);
    startAutoMine()
    update();
}

function milestonecheck() {
    if (eme.emeralds >= 1) eme.ememile[0] = 1;
    if (eme.emeralds >= 3) eme.ememile[1] = 1;
    if (eme.emeralds >= 5) eme.ememile[2] = 1;
    if (eme.emeralds >= 10) eme.ememile[3] = 1;
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
    if (diamond.diamonds >= diamond.diamondchanceupgcost && diamond.diamondchancetimes < 100) {
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
        let x = 1;
        if (eme.ememile[2] == 1) {
            x = 0.75
        }
        else {x=1}
        diamond.diamondgainupgcost = Math.floor(10 * Math.pow(2.5, diamond.diamondgainupgtimes) * x);
        update();
    }
}

function love() {
    if (eme.emeralds >= eme.lovecost) {
        eme.emeralds -= eme.lovecost;
        eme.lovetimes++;
        eme.lovecost += Math.pow(eme.lovetimes, 2);
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
        diamond: diamond,
        eme: eme,
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
        eme = savedData.eme !== undefined ? savedData.eme : eme;
    }
    update();
}

loadSaveGame();
startAutoMine();
