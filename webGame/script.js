let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
console.log("testing   sudihwidh")

if (typeof window === "object") {
    console.log("code is running in a browser environment")

   
    // code is running in a browser environment
  } else {
    console.log("code is running in a node environment")

    // code is running in a non-browser environment
  }

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "stick",
        power: 5
    }
    ,
    {

        name: "dagger",
        power: 30
    },
    {

        name: "claw hammer",
        power: 50
    },
    {

        name: "sword",
        power: 100
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15,

    },
    {
        name: "fanged beast",
        level: 8,
        health: 60,
    },
    {
        name: "dragon",
        level: 20,
        health: 300,
    }
];

const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave",
            "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in town square. You see a sign that says \"Store\". "

    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)",
            "go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You entered the Store"
    },
    {
        name: "cave",
        "button text": ["fight slime", "fight fanged beast",
            "go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You entered the cave. You see some monsters."
    }
    ,
    {
        name: "fight",
        "button text": ["attack", "dodge",
            "run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster!"
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square",
            "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it takes its last breath. You gain experience points(xp) and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?",
            "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: 'You died.'
    }
    ,
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?",
            "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: 'You defeated the Dragon. You Win 🎉!! .'
    },
    {
        name: "easter egg",
        "button text": ["2", "8",
            "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: 'You find a secret game. Pick a number above. Ten numbers will be randomly choosen between 0 and 10. If the number you choose matches one of the random numbers, you win!❤️'
    }
]


//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


function update(location) {

    monsterStats.style.display = "none"


    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];


    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    text.innerText = location["text"]; //or location.text;
}
function goTown() {
    update(locations[0]);
    console.log("going to town..")
}


function goStore() {
    update(locations[1]);

    console.log('going to store')
    /*button1.innerText = "Buy 10 health (10 gold)";
    button2.innerText = "Buy weapon health (30 gold)";
    button3.innerText = "go to town square"
  
    text.innerText = "You entered the Store"
  
    button1.onclick = buyHealth;
    button2.onclick = buyWeapon;
    button3.onclick = goTown;
  */

}

function goCave() {
    console.log('going to Cave')
    update(locations[2])
}



function buyHealth() { 
    if(gold >= 10)
    {
        gold -= 10
    health += 10
    goldText.innerText = gold
    healthText.innerText = health
    
    }
    else
    {
        text.innerText="You donot have enough gold to buy health"
    }
    
}
function buyWeapon() {
if (currentWeapon < (weapons.length - 1))
  {   if(gold >= 30)
    {
        gold-=30
        currentWeapon++
        goldText.innerText = gold
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You now have a " + newWeapon + "."

        inventory.push(newWeapon)

        text.innerText += " In the inventory you have " + inventory + "."

    }
    else{
        text.innerText = "You do not have enough gold to buy a weapon.";

    }

}
else
{
    text.innerText="You already have most powerful weapon."
    button2.innerText = "Sell weapon for 15 gold"
    button2.onclick = sellWeapon


}
 }


function sellWeapon(){
    if(inventory.length > 1)
    {
        gold +=15
        goldText.innerText = gold
        let currentWeapon = inventory.shift() // removes frst eleemnt from array and stores it in variable

        text.innerText = "You sold a " + currentWeapon + "."

        text.innerText += " In the inventory you have " + inventory + "."
    }
    else
    {
        text.innerText = "You cant sell your ONLY weapon..."
    }
}


function fightSlime() {
    fighting = 0
    goFight()
}
 
function fightBeast() { 
    fighting = 1
    goFight()
}
function fightDragon() {
    console.log('fighting dragon')
    fighting = 2
    goFight()
}



function goFight() { 
    update(locations[3])
    
    monsterHealth = monsters[fighting].health

   monsterStats.style.display = "block"

    monsterNameText.innerText = monsters[fighting].name
    monsterHealthText.innerText = monsterHealth


   // console.log (monsters[fighting].name)
}

function attack(){
text.innerText = "the "+ monsters[fighting].name +" attacks."

text.innerText+= " You attack with your " + weapons[currentWeapon].name + "."

//health -= monsters[fighting].level
if (isMonsterHit())
{ 
    health -= getMonsterAttackValue(monsters[fighting].level)
    
}
else
{
    text.innerText = "You Miss!"
}

healthText.innerText= health


monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp ) + 1
monsterHealthText.innerText= monsterHealth

if(health <= 0 )
{
    lose()
}
else if (monsterHealth <= 0)
{
    fighting == 2 ? winGame() : defeatMonster()
}

if(Math.random() <= .1 && inventory.length !==1)
{

    text.innerText += "Your " + inventory.pop() + " breaks."
    currentWeapon--
}
}
function isMonsterHit()
{

    return Math.random() > .2 || health<20
}
function getMonsterAttackValue(level)
{
let hit = (level * 5) - (Math.floor(Math.random() *xp))

console.log(hit)
return hit
}
function dodge(){
text.innerText = "you dodged the attack from " + monsters[fighting].name+ "."
}

function lose()
{
    update(locations[5])
 // text.innerText = "You lose.."
}
function winGame()
{
    update(locations[6])
}
function defeatMonster()
{
    gold += Math.floor(monsters[fighting].level *6.7)
    xp += monsters[fighting].level

    goldText.innerText = gold
    xpText.innerText=xp

    update(locations[4])

}
function restart()
{
     xp = 0;
 health =100 ;
 gold = 50;
 currentWeapon = 0
 inventory = ["stick"];
 goldText.innerText = gold
 xpText.innerText = xp
 healthText.innerText = health
 goTown()
}
function easterEgg()
{
    update(locations[7])
}
function pickTwo()
{

}
function pickEight()
{

}
function pick(guess)
{
    let numbers = [];

    while (numbers.length <10 )
    {
        numbers.push(Math.floor(Math.random() * 11))
    }
    
    text.innerText= "You picked "+ guess +". Here are the random numbers: \n"

    for (let i=0;i<10;i++)
    {
text.innerText += numbers[i] + "\n"
    }

    if (numbers.indexOf(guess))
    {
        text.innerText += "\nRight! You win 20 gold!"
        gold+= 20
        goldText.innerText = gold

    }
    else
    {
        text.innerText += "\nWrong! You lose 10 health..\n"
        health -=20
        healthText.innerText = health

        if(health<=0)
        {
            lose()
        }
    }
}