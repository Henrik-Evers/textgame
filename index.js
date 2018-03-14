/**********************DECLARE***********************/
var number;
var player = {attack:2,health:8,heal:2,speed:70,level:1,exp:0,dex:5};
var enemy = {attack:1,health:1,name:1,exp:1};
var consol = {
  log: function(input) {
    var hlog = document.getElementById("log").innerHTML;
    document.getElementById("log").innerHTML = hlog + "<br> " + input;
    document.getElementById("log").scrollTop = 1000000000000000;
  }
};
var monsters = ["goblin","kobold","bugbear","adult black dragon","ancient black dragon"];
var attacks = [1,1.5,2,60,100];
var healths = [5,3,10,250,500];
var exps = [25,20,100,10000,25000];
var dif = [1,1,1.5,25,50];
var statIncrease = 0;

/***********************RUN*************************/
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function statUpdate() {
  document.getElementById("statblock").innerHTML = "You have " + player.attack + " attack.<br>You have " + player.health + " health.<br>You have " + player.speed + " speed.";
}
function changeText(){
  document.getElementById("points").innerHTML = "You have " + statIncrease + " points to spend.";
  statUpdate();
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
      changeText();
      consol.log("Choose a stat to increase.");
  }
}
function enemyTurn() {
  consol.log("The enemy attacked you.");
  player.health = player.health - enemy.attack;
  if (player.health < 1) {
    consol.log("You lost.");
    while(true) {
      consol.log("You lost.");
    }
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
    document.getElementById('enemy').innerHTML.src = '/assets/' + enemy.name + '.jpeg';
    player.health = player.health + (player.level * 2);
    consol.log("You encountered " + number + " " + enemy.name + "(s)!");
    statUpdate();
  }
}
function attack() {
  enemy.health = enemy.health - player.attack;
  if (enemy.health < 1) {
    consol.log("You defeated it!");
    consol.log("You gained " + enemy.exp + " experience.");
    consol.log("");
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
  number = getRandom(1,100);
  number = number - (player.level * 2);
  if (number > (100-player.speed)) {
    consol.log("You ran away succesfully!");
    fight();
  }
  else {
    consol.log("You couldn't run away!");
    consol.log("");
    enemyTurn();
  }
}
function heal() {
  player.health = player.health + player.heal;
  consol.log("You have " + player.health + " health.");
}
function attackIncrease() {
  if (statIncrease > 0) {
    statIncrease--;
    player.attack++;
  }
}
function healIncrease() {
  if (statIncrease > 0) {
    statIncrease--;
    player.heal++;
  }
}
function speedIncrease() {
  if (statIncrease > 0) {
    statIncrease--;
    player.heal++;
  }
}
fight();