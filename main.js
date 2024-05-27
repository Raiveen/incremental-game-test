var player = {
    gold: 499,
    goldtimes: 1,
    goldperclickcost: 10,
    goldperclick: 1,
    automine: 0,
    autominecost: 20,
    prestiged: false,
    prestigetimes: 0
};

function mineGold() {
    var x = 1
    x += player.goldtimes - 1
    if(player.prestiged) x = x*Math.pow(2, player.prestigetimes)
    player.gold += x;
    player.goldperclick = x
    update();
}

function update() {
    document.getElementById("goldperclick").innerHTML = player.goldperclick + " gold per click";
    document.getElementById("goldMined").innerHTML = player.gold + " Gold Mined";
    document.getElementById("perClickUpgrade").innerHTML = "Increase gold mined by 1, Cost: " + player.goldperclickcost + " Gold";
    document.getElementById("autoupg").innerHTML = "Currently mining " + player.automine*player.goldperclick + " gold /s Cost: " + player.autominecost + " Gold";
    if (player.gold >= 500) {
        document.getElementById("test").style.display = "inline";
    }
}

function buyGoldPerClick() {
    if (player.gold >= player.goldperclickcost) {
        player.gold -= player.goldperclickcost;
        player.goldtimes++
        player.goldperclickcost *= 2;
        update();
    }
}

function prestige() {
    player = {
        gold: 0,    
        goldtimes: 1,
        goldperclickcost: 10,
        update: 10,
        automine: 0,
        autominecost: 20,
        prestiged: true,
        prestigetimes: player.prestigetimes
    };
    player.prestigetimes++
}

function auto() {
    if (player.gold >= player.autominecost) {
        player.gold -= player.autominecost;
        player.automine += 1;
        player.autominecost += Math.pow(player.automine, 2);
        update();
        startAutoMine();
    }
}

function clearData() {
    localStorage.removeItem("testsave");
    player = {
        gold: 0,    
        goldtimes: 1,
        goldperclickcost: 10,
        goldperclick: 1,
        update: 10,
        automine: 0,
        autominecost: 20,
        prestiged: false,
        prestigetimes: 0
    };
    location.reload()
    update();
}

function startAutoMine() {
    window.clearInterval(mainGameLoop);
    if (player.automine > 0) {
        mainGameLoop = window.setInterval(function() {
            mineGold();
            update();
        }, 1000/player.automine);
    }
}

var mainGameLoop = window.setInterval(function() {
    if (player.automine > 0) {
        mineGold();
    }
    if (player.gold >= 500) {
        document.body.style.backgroundColor = "blue";
    }
}, 1000);

var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("testsave", JSON.stringify(player));
}, 1000);

function loadSaveGame() {
    var savegame = JSON.parse(localStorage.getItem("testsave"));
    if (savegame !== null) {
        player.gold = savegame.gold !== undefined ? savegame.gold : player.gold;
        player.goldtimes = savegame.goldtimes !== undefined ? savegame.goldtimes : player.goldtimes;
        player.goldperclick = savegame.goldperclick !== undefined ? savegame.goldperclick : player.goldperclick;
        player.goldperclickcost = savegame.goldperclickcost !== undefined ? savegame.goldperclickcost : player.goldperclickcost;
        player.automine = savegame.automine !== undefined ? savegame.automine : player.automine;
        player.autominecost = savegame.autominecost !== undefined ? savegame.autominecost : player.autominecost;
        player.prestiged = savegame.prestiged !== undefined ? savegame.prestiged : player.prestiged;
        player.prestigetimes = savegame.prestigetimes !== undefined ? savegame.prestigetimes : player.prestigetimes;
    }
    update();
}
loadSaveGame();
startAutoMine();