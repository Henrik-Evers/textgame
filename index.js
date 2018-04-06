/*************************DECLARE*************************/
var number;
var player = {attack:2,health:8,maxhealth:8,speed:70,level:1,exp:0,dex:5};
player.equipment = {weapon:0,chestarmour:0,shield:0,legarmour:0,headarmour:0,token1:0,token2:0};
var enemy = {attack:1,health:1,name:1,exp:1,dif:1};
var consol = {
  log: function(text,color) {
    var hlog = document.getElementById("log").innerHTML;
    document.getElementById("log").innerHTML = hlog + "<br> " + "<a style='color:" + color + "'>" + text + "</a>";
    document.getElementById("log").scrollTop = (1000^(1000^(1000^1000)));
  }
};
var monsters = ["goblin","kobold","bugbear","adult black dragon","ancient black dragon","terrasque"];
var attacks = [1,1.5,2,60,100,10000];
var healths = [5,3,10,250,500,10000];
var exps = [25,20,100,1000,2500,30000];
var dif = [1,1,1.5,25,50,50];
var statIncrease = 0;
var lost = 0;
var keypressed;
var attackbind;
var runbind;
var attackIncreasebind;
var healthIncreasebind;
var speedIncreasebind;
var keybinds = [attackbind,runbind,attackIncreasebind,healthIncreasebind,speedIncreasebind];
var i;

/***********************RUN*************************/
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function openNew() {
  window.open('https://preview.c9users.io/henrikevers/text-game/keybindtest.html?_c9_id=livepreview2&_c9_host=https://ide.c9.io');
}
function checkBound() {
  if (keybinds[i] === attackbind) {
    attack();
  }
  if (keybinds[i] === runbind) {
    run();
  }
  if (keybinds[i] === attackIncreasebind) {
    attackIncrease();
    changeText();
  }
  if (keybinds[i] === healthIncreasebind) {
    healthIncrease();
    changeText();
  }
  if (keybinds[i] === speedIncreasebind) {
    speedIncrease();
    changeText();
  }
}
document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    keypressed = charStr;
    alert(charStr);//Devcode
    for (i = 0; i < (keybinds.length - 1); i++) {
      if (keybinds[i] === keypressed) {
        checkBound();
      }
    }
};
function keyFormSubmit() {
  alert("Finally running.");
  var attackbindp = document.getElementById("attackbind").innerHTML;
  var runbindp = document.getElementById("runbind").innerHTML;
  var attackincbindp = document.getElementById("attackincbind").innerHTML;
  var healthincbindp = document.getElementById("healthincbind").innerHTML;
  var runincbindp = document.getElementById("runincbind").innerHTML;
  if (attackbindp.length !== 1 || runbindp.length !== 1 || attackincbindp.length !== 1 || healthincbindp.length !== 1 || runincbindp.length !== 1) {
    alert("You can only have one character assigned to each key.");
  }
  else {
    alert(attackbindp);
    attackbind = attackbindp;
    runbind = runbindp;
    attackIncreasebind = attackincbindp;
    healthIncreasebind = healthincbindp;
    speedIncreasebind = runincbindp;
  }
}
function end() {
  lost = 1;
}
function clearConsol() {
  document.getElementById("log").innerHTML = "";
}
function myFunction() {
  var copyText = document.getElementById("savefield");
  copyText.select();
  document.execCommand("Copy");
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied: " + copyText.value;
}
function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}
function statUpdate() {
  document.getElementById("statblock").innerHTML = "You have " + player.attack + " attack.<br>You have " + player.health + " health.<br>You have " + player.maxhealth + " maximum health.<br>You have " + player.speed + " speed.";
  document.getElementById("equipmentdisplay").innerHTML = "Weapon: " + player.equipment.weapon.name + "<br>Shield: " + player.equipment.shield.name + "<br>Chest Armour: " + player.equipment.chestarmour.name + "<br>Leg Armour: " + player.equipment.legarmour.name + "<br>Head Armour: " + player.equipment.headarmour.name;
}
function changeText(){
  document.getElementById("points").innerHTML = "You have " + statIncrease + " points to spend.";
  statUpdate();
  levelText();
}
function levelText() {
  document.getElementById("levelval").innerHTML = "You are level " + player.level;
  document.getElementById("experience").innerHTML = "You have " + player.exp + " experience. You need " + (player.level * 100) + " experience to level up.";
}
function checkLevelUp() {
  if (player.exp >= (100*player.level)) {
      player.exp = player.exp - (100*player.level);
      player.level = player.level + 1;
      statIncrease = statIncrease + 1;
      player.maxhealth++;
      player.health = player.health + player.level;
      changeText();
      consol.log("Choose a stat to increase.",'green');
  }
}
function enemyTurn() {
  consol.log("The enemy attacked you.");
  player.health = player.health - enemy.attack;
  if (player.health < 1) {
    consol.log("You lost.",'red');
    end();
  }
  else {
    consol.log("You took " + enemy.attack + " damage.");
    consol.log("You have " + player.health + " health left.");
  }
  consol.log("");
  statUpdate();
}
function fight() {
  if (lost !== 1) {
  var number = getRandom(0,(monsters.length-1));
  enemy.name = monsters[number];
  enemy.attack = attacks[number];
  enemy.health = healths[number];
  enemy.exp = exps[number];
  if (dif[number]>player.level) {
    fight();
  }
  else if (dif[number]<player.level||dif[number]===player.level) {
    number = Math.floor(player.level/dif[number]);
    enemy.dif = dif[number];
    number = getRandom(1,number);
    enemy.dif = enemy.did * number;
    enemy.attack = enemy.attack*number;
    enemy.health = enemy.health*number;
    enemy.exp = enemy.exp*number;
    consol.log('<img id="enemyimg" src="https://raw.githubusercontent.com/Henrik-Evers/textgame/master/assets/' + enemy.name + '.jpeg' + "\"></img>");
    player.health = player.health + (player.level * 2);
    if (player.health>player.maxhealth) {
      player.health = player.maxhealth;
    }
    consol.log("");
    consol.log("");
    consol.log("You encountered " + number + " " + enemy.name + "(s)!",'red');
    consol.log("");
    statUpdate();
  }}
}
function attack() {
  if (lost !== 1) {
  enemy.health = enemy.health - player.attack;
  if (enemy.health < 1) {
    clearConsol();
    consol.log("You defeated it!");
    consol.log("You gained " + enemy.exp + " experience.", 'blue');
    player.exp = player.exp + enemy.exp;
    checkForLoot();
    checkLevelUp();
    levelText();
    fight();
  }
  else {
    consol.log("You dealt it " + player.attack + " damage.")
    consol.log("The enemy has " + enemy.health + " health left.");
    consol.log("");
    enemyTurn();
  }}
}
function run() {
  if (lost !== 1) {
  number = getRandom(1,100);
  number = number - (player.level * 2);
  if (number < player.speed) {
    consol.log("You ran away succesfully!");
    clearConsol();
    fight();
  }
  else {
    consol.log("You couldn't run away!");
    consol.log("");
    enemyTurn();
  }}
}
function attackIncrease() {
  if (lost !== 1) {
  if (statIncrease > 0) {
    statIncrease--;
    player.attack = player.attack + (Math.ceil(player.level / 2));
  }}
}
function healthIncrease() {
  if (lost !== 1) {
  if (statIncrease > 0) {
    statIncrease--;
    player.maxhealth = player.maxhealth + (Math.ceil(player.level / 2));
    player.health = player.health + (Math.ceil(player.level / 2));
  }}
}
function speedIncrease() {
  if (lost !== 1) {
  if (statIncrease > 0) {
    statIncrease--;
    player.speed = player.maxhealth + (Math.ceil(player.level / 4));
  }}
}
fight();