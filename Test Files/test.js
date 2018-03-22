/**********************DECLARE***********************/
var number;
var player = {attack:2,health:8,maxhealth:8,speed:70,level:1,exp:0,dex:5};
var enemy = {attack:1,health:1,name:1,exp:1};
var consol = {
  log: function(text,color) {
    var hlog = document.getElementById("log").innerHTML;
    document.getElementById("log").innerHTML = hlog + "<br> " + "<a style='color:" + color + "'>" + text + "</a>";
    document.getElementById("log").scrollTop = 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
  }
};
var monsters = ["goblin","kobold","bugbear","adult black dragon","ancient black dragon"];
var attacks = [1,1.5,2,60,100];
var healths = [5,3,10,250,500];
var exps = [25,20,100,10000,25000];
var dif = [1,1,1.5,25,50];
var statIncrease = 0;
var lost = 0;

/***********************RUN*************************/
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function end() {
  lost = 1;
}
function checkAlive() {
  if (lost === 1) {
    while(true) {
      
    }
  }
  else {
    
  }
}
function clearConsol() {
  document.getElementById("log").innerHTML = "";
}
/* Commented below is FUBAR, and officially abandoned until I finally decide to revisit these horrors. To test, comment out myFunction and outFunc.
function makeSave() {
  var binaryVals = ['00110000', '00110001', '00110010', '00110011', '00110100', '00110101', '00110110', '00110111', '00111000', '00111001'];
  var ASCIId = [0,1,2,3,4,5,6,7,8,9];
  var saveCode;
  var a = player.health.length();
  for (var i = 0; i < a; i++) {
    saveCode[i + 1] = player.health.slice(i,i+1);
  }
  for (i = 0; i < saveCode.length(); i++) {
    a = saveCode[i];
    saveCode[i] = binaryVals[a];
  }
  for (i = 0; i < saveCode.length(); i++) {
    saveCode[0] = saveCode[0] + saveCode[1];
  }
  document.getElementById("savedisplay").innerHTML = saveCode[0];
  document.getElementById("savedisplay").select();
  document.execCommand("Copy");
  alert("Save code copied to clipboard: " + saveCode[0]);
} */
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
  var number = getRandom(0,4);
  enemy.name = monsters[number];
  enemy.attack = attacks[number];
  enemy.health = healths[number];
  enemy.exp = exps[number];
  if (dif[number]>player.level) {
    fight();
  }
  else if (dif[number]<player.level||dif[number]===player.level) {
    number = Math.floor(player.level/dif[number]);
    enemy.attack = enemy.attack*number;
    enemy.health = enemy.health*number;
    enemy.exp = enemy.exp*number;
    consol.log("<img id=\"enemyimg\" src=\"" + 'https://github.com/Henrik-Evers/textgame/assets/' + enemy.name + '.jpeg' + "\"></img>");
    player.health = player.health + (player.level * 2);
    if (player.health>player.maxhealth) {
      player.health = player.maxhealth;
    }
    consol.log("");
    consol.log("");
    consol.log("You encountered " + number + " " + enemy.name + "(s)!",'red');
    consol.log("");
    statUpdate();
  }
}
function attack() {
  checkAlive();
  enemy.health = enemy.health - player.attack;
  if (enemy.health < 1) {
    clearConsol();
    consol.log("You defeated it!");
    consol.log("You gained " + enemy.exp + " experience.", 'blue');
    player.exp = player.exp + enemy.exp;
    checkLevelUp();
    levelText();
    fight();
  }
  else {
    consol.log("You dealt it " + player.attack + " damage.")
    consol.log("The enemy has " + enemy.health + " health left.");
    consol.log("");
    enemyTurn();
  }
}
function run() {
  checkAlive();
  number = getRandom(1,100);
  number = number - (player.level * 2);
  if (number < player.speed) {
    consol.log("You ran away succesfully!");
    fight();
  }
  else {
    consol.log("You couldn't run away!");
    consol.log("");
    enemyTurn();
  }
}
function attackIncrease() {
  checkAlive();
  if (statIncrease > 0) {
    statIncrease--;
    player.attack = player.attack + (Math.ceil(player.level / 2));
  }
}
function healthIncrease() {
  checkAlive();
  if (statIncrease > 0) {
    statIncrease--;
    player.maxhealth = player.maxhealth + (Math.ceil(player.level / 2));
  }
}
function speedIncrease() {
  checkAlive();
  if (statIncrease > 0) {
    statIncrease--;
    player.speed = player.maxhealth + (Math.ceil(player.level / 4));
  }
}
fight();