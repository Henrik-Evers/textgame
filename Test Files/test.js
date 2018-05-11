/*************************DECLARE*************************/
var number;
var player = {attack:2,health:8,maxhealth:8,speed:70,level:1,exp:0,dex:5};
player.equipment = {weapon:0,chestarmour:0,shield:0,legarmour:0,headarmour:0,token:0};
var enemy = {attack:1,health:1,name:1,exp:1,dif:1};
var consol = {
  log: function(text,color) {
    var hlog = document.getElementById("log").innerHTML;
    document.getElementById("log").innerHTML = hlog + "<br> " + "<a style='color:" + color + "'>" + text + "</a>";
    document.getElementById("log").scrollTop = (1000^(1000^(1000^1000)));
  }
};
function Equipment(name,type,bonus,pos,difreq/*,descpos*/) {
  this.name = name;
  this.type = type;
  this.bonus = bonus;
  this.pos = pos;
  this.difreq = difreq;
//  this.descpos = descpos;
}
var none = new Equipment('none','weapon',0,0,0);
var none1 = new Equipment('none','chestarmour',0,1,0);
var none2 = new Equipment('none','shield',0,2,0);
var none3 = new Equipment('none','legarmour',0,3,0);
var none4 = new Equipment('none','headarmour',0,4,0);
var none5 = new Equipment('none','token',0,5,0);
var sword = new Equipment('weak sword','weapon',3,6,2);
var axe = new Equipment('axe','weapon',2,7,1);
var sword1 = new Equipment('brittle sword','weapon',3,8,2);
var equipment = [none,none1,none2,none3,none4,none5,sword,axe,sword1];
var actualEquipment = [sword,axe];
var monsters = ["goblin","kobold","bugbear","adult black dragon","ancient black dragon","terrasque","butcher","automaton guard","automaton soldier"];
var attacks = [1,1.5,2,60,100,10000,25,10,15];
var healths = [5,3,10,250,500,10000,130,20,30];
var exps = [5,10,25,1000,2500,30000,500,50,75];
var dif = [1,1,1.5,25,50,100,20,10,15];
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
var mode;
var exploreDesc;
var level50flavor = "The paths you have walked blur together. You may be where your started, or hundreds of miles away. Your sense of direction has long since given up, and you fear the rest of your life will be spent down here, helplessly wandering, fighting to survive. Will you make it out? You doubt it. There is nothing to indicate that it might happen. The monsters seem as clueless as you. Maybe another monster will kill you, just like you kill them, thinking you are just another inhabitant?";
var level100flavor = "You might have been in here anywhere from a few dozen days to several years. The time of day is unknown to you. Is there even a way out? Are there others that have fallen in? There must be others, but they could have been dead for decades. This place is very old. Pondering its original purpose has become a popular subject for you to think about as time drags on. You no longer notice the sound of your footsteps or the dripping water. Even the slight breeze is hardly noticeable."
var level100flavor2 = "<a style=\"color:red\">Wait - a breeze?</a> That must mean a way out! You dash forward, but soon reach a fork. The breeze seems to be coming from the left. That seems like the right way to go. You bubble with excitement as you realise you are almost free.";

/***********************RUN*************************/
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function equip(item) {
  if (item.type === "weapon") {
    player.equipment.weapon = item;
  }
  else if (item.type === "chestarmour") {
    player.equipment.chestarmour = item;
  }
  else if (item.type === "shield") {
    player.equipment.shield = item;
  }
  else if (item.type === "legarmour") {
    player.equipment.legarmour = item;
  }
  else if (item.type === "headarmour") {
    player.equipment.headarmour = item;
  }
  else if (item.type === "token") {
    player.equipment.token = item;
  }
}
function checkForLoot() {
  /* Later
  var availableEquipment = [];
  for (i = 0; i < (equipment.length-1); i++) {
    if (actualEquipment[i].difreq <= player.level) {
      availableEquipment[availableEquipment.length] = equipment[i];
    }
  }
  if (availableEquipment.length > 0) {
    thing = getRandom(0,available.Equipment.length-1);
    return availableEquipment[thing];
  }
  else {
    return false;
  }
  */
}
function explore() {
  exploreDesc = ["You walk into a vast cave. In the center is a black stone with runes on it. When you walk up to inspect it, you suddenly have a strong anger towards the rock, and an unstoppabble urge to break it. It crumbles easily in your hands.","A stream winds through the tunnel. After looking around to make sure it's safe, you stop to wash yourself in the stream. It is very cool, like the rest of the cave.","As your travel wears on, you notice some luminescent moss growing on the cave walls, lighting your way. You walk on in stupefied wonder at the beauty of the cave. If only you were there in better circumstances.","A small rock lays in your path. When you look closely at it, a slight shimmering effect appears around it. As you watch, fascinated, your mind thinks back to the family you left behind. You had no choice - they were starving, and you couldn't find work where you were. You went traveling, searching for a way to sustain your family. Abruptly, you stand up. This is no time to think about things lost. The caves await you.","As you walk along a cavern, you hear a dragon pass through the caves. As you duck into the shadows behind a rock, it pauses and sniffs the air. \"Show yourself!\" it shouts. It roars, and smoke wafts out from its nostrils. The dragons walks closer to your position, but before it can spot you a voice sounds from farther down the tunnel. \"Stop yelling at that rock! We need to go!\" The dragon gives one last glance around before turning to follow the voice. You decide to be more careful next time.","A fluttering noise sounds behind you. Looking behind yourself, you can barely make out slight movement in the air. A small butterfly emerges from the gloom, and lands on your arm. It's amazing how the simple things become so large when trapped in a cave. You make a promise to yourself that you will savour every detail of life when, <i>if</i>, you get out of the caves.","Trudging along through the cave, you notice a lump on the ground. Approaching it, you notice that it is a dead kobold. Did you already pass this way? Or was there another monster? Or an adventurer? You don't notice anyone around, so you walk onwards, hopeful that there is another adventurer. Maybe they know the way out."];
  number = getRandom(0,exploreDesc.length-1);
  consol.log("");
  consol.log(exploreDesc[number]);
  consol.log("");
  consol.log("Run to continue.","red");
}
var encountered = 0;
function encounter() {
  if (lost !== 1) {
  if (encountered === 0) {
    number = 1;
    encountered++;
  }
  else {
    number = getRandom(1,100);
  }
  if (number >= 25) {mode="fight"; fight();}
  else {mode="explore"; explore();}
}}
var welcomeMessage = "You slowly slide into consciousness. You are a hard stone floor. You sit up and look around. This looks nothing like the plain you were traveling on. In the distance, there is a small bright dot. You must have fallen in, but you can't climb out. Collecting yourself, you stride through the passageway into the unknown.";
function welcome() {
  consol.log("Welcome to The Dungeon.");
  consol.log("");
  consol.log('<img style="height:200px; width:200px;" src="https://raw.githubusercontent.com/Henrik-Evers/textgame/master/assets/openening picture.jpeg' + '"></img>');
  consol.log("");
  consol.log(welcomeMessage);
  consol.log("");
  mode = "explore";
  //consol.log(exploreDesc[3]); //This line is broken
  consol.log("Run to continue.", "red");
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
  document.getElementById("equipmentdisplay").innerHTML = "Weapon: " + player.equipment.weapon.name + "<br>Shield: " + player.equipment.shield.name + "<br>Chest Armour: " + player.equipment.chestarmour.name + "<br>Leg Armour: " + player.equipment.legarmour.name + "<br>Head Armour: " + player.equipment.headarmour.name;
}
function changeText(){
  document.getElementById("points").innerHTML = "You have " + statIncrease + " points to spend.";
  statUpdate();
  levelText();
}
function levelText() {
  document.getElementById("levelval").innerHTML = "You are level " + player.level;
  document.getElementById("experience").innerHTML = "You have " + player.exp + " experience. You need " + ((player.level*2) * 100) + " experience to level up.";
}
function checkLevelUp() {
  if (player.exp >= (100*(player.level*2))) {
      player.exp = player.exp - (100*(player.level*2));
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
  var levelAppropriateMonsters = dif.filter(diff => diff <= player.level);
  var number = getRandom(0,monsters.length-1);
  if (dif[number]>player.level) {
    fight();
  }
  else if (dif[number]<player.level||dif[number]===player.level) {
    enemy.name = monsters[number];
    enemy.attack = attacks[number];
    enemy.health = healths[number];
    enemy.exp = exps[number];
    number = Math.floor(player.level/dif[number]);
    enemy.dif = dif[number];
    number = getRandom(Math.ceil(number*(2/3)),number);
    enemy.dif = enemy.did * number;
    enemy.attack = enemy.attack*number;
    enemy.health = enemy.health*number;
    enemy.exp = enemy.exp*number;
    consol.log('<img id="enemyimg" src="https://raw.githubusercontent.com/Henrik-Evers/textgame/master/assets/' + enemy.name + '.jpeg' + '"></img>');
    consol.log("");
    consol.log("");
    consol.log("You encountered " + number + " " + enemy.name + "(s)!",'red');
    consol.log("");
    statUpdate();
  }
}
function attack() {
  if (mode==="fight") {
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
    player.health = player.health + (player.level * 2);
    if (player.health > player.maxhealth) {
      player.health = player.maxhealth;
    }
    encounter();
  }
  else {
    consol.log("You dealt it " + player.attack + " damage.")
    consol.log("The enemy has " + enemy.health + " health left.");
    consol.log("");
    enemyTurn();
  }}}
}
function run() {
  if (mode === "fight") {
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
  }}}
  else if (mode === "explore" && lost !== 1) {
    clearConsol();
    encounter();
  }
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
equip(none);
equip(none1);
equip(none2);
equip(none3);
equip(none4);
welcome();
//fight();