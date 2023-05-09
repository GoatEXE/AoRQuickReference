//POSITIVE VALUES
let success = 0;
let advantage = 0;
let triumph = 0;

//NEGATIVE VALUES
let failure = 0;
let threat = 0;
let despair = 0;

//NUMBER OF POSITIVE DICE
let numberOfBoost = 0;
let numberOfAbility = 0; 
let numberOfProficiency = 0;

//NUMBER OF NEGATIVE DICE
let numberOfSetback = 0;
let numberOfDifficulty = 0;
let numberOfChallenge = 0;

//DOM VARIABLES
let boostSlider = document.getElementById("boostSlider");
let boostHTML = document.getElementById("boostHTML")

let abilitySlider = document.getElementById("abilitySlider");
let abilityHTML = document.getElementById("abilityHTML");

let proficiencySlider = document.getElementById("proficiencySlider");
let proficiencyHTML = document.getElementById("proficiencyHTML");

let setbackSlider = document.getElementById("setbackSlider");
let setbackHTML = document.getElementById("setbackHTML");

let difficultySlider = document.getElementById("difficultySlider");
let difficultyHTML = document.getElementById("difficultyHTML");

let challengeSlider = document.getElementById("challengeSlider");
let challengeHTML = document.getElementById("challengeHTML");

//RANGE ONINPUT FUNCTIONS
boostSlider.oninput = function(){
    boostHTML.innerHTML = "Boost "+this.value;
    numberOfBoost = boostSlider.value;
}

abilitySlider.oninput = function(){
    abilityHTML.innerHTML = "Ability "+this.value;
    numberOfAbility = abilitySlider.value;
}

proficiencySlider.oninput = function(){
    proficiencyHTML.innerHTML = "Proficiency "+this.value;
    numberOfProficiency = proficiencySlider.value;
}

setbackSlider.oninput = function(){
    setbackHTML.innerHTML = "Setback "+this.value;
    numberOfSetback = setbackSlider.value;
}

difficultySlider.oninput = function(){
    difficultyHTML.innerHTML = "Difficulty "+this.value;
    numberOfDifficulty = difficultySlider.value;
}

challengeSlider.oninput = function(){
    challengeHTML.innerHTML = "Challenge "+this.value;
    numberOfChallenge = challengeSlider.value;
}

//POSITIVE DICTIONARIES
const boostDictionary = {
    roll0: function(num) {return getAbility(numberOfAbility);},
    roll1: function(num) {return report(num);},
    roll2: function(num) {return report(num);},
    roll3: function(num) {success++; return report(num);},
    roll4: function(num) {success++; advantage++; return report(num);},
    roll5: function(num) {advantage = advantage + 2; return report(num);},
    roll6: function(num) {advantage++; return report(num);}
}

const abilityDictionary = {
    roll0: function(num) {return getProficiency(numberOfProficiency);},
    roll1: function(num) {return report(num);},
    roll2: function(num) {success++; return report(num);},
    roll3: function(num) {success++; return report (num);},
    roll4: function(num) {success = success + 2; return report(num);},
    roll5: function(num) {advantage++; return report(num);},
    roll6: function(num) {advantage++; return report(num);},
    roll7: function(num) {success++; advantage++; return report(num);},
    roll8: function(num) {advantage = advantage + 2; return report(num);}
}

const proficiencyDictionary = {
    roll0: function(num) {return report(num);},
    roll1: function(num) {return report(num);},
    roll2: function(num) {success++; return report(num);},
    roll3: function(num) {success++; return report(num);},
    roll4: function(num) {success = success + 2; return report(num);},
    roll5: function(num) {success = success + 2; return report(num);},
    roll6: function(num) {advantage++; return report(num);},
    roll7: function(num) {success++; advantage++; return report(num);},
    roll8: function(num) {success++; advantage++; return report(num);},
    roll9: function(num) {success++; advantage++; return report(num);},
    roll10: function(num) {advantage = advantage + 2; return report(num);},
    roll11: function(num) {advantage = advantage + 2; return report(num);},
    roll12: function(num) {triumph++; return report(num);}
}

//NEGATIVE DICTIONARIES
const setbackDictionary = {
    roll0: function(num) {return report(num);},
    roll1: function(num) {return report(num);},
    roll2: function(num) {return report(num);},
    roll3: function(num) {failure++; return report(num);},
    roll4: function(num) {failure++; return report(num);},
    roll5: function(num) {threat++; return report(num);},
    roll6: function(num) {threat++; return report(num);}  
}

const difficultyDictionary = {
    roll0: function(num) {return report(num);},
    roll1: function(num) {return report(num);},
    roll2: function(num) {failure++; return report(num);},
    roll3: function(num) {failure = failure + 2; return report(num);},
    roll4: function(num) {threat++; return report(num);},
    roll5: function(num) {threat++; return report(num);},
    roll6: function(num) {threat++; return report(num);},
    roll7: function(num) {threat = threat + 2; return report(num);},
    roll8: function(num) {failure++; threat++; return report(num);}    
}

const challengeDictionary = {
    roll0: function(num) {return report(num);},
    roll1: function(num) {return report(num);},
    roll2: function(num) {failure++; return report(num);},
    roll3: function(num) {failure++; return report(num);},
    roll4: function(num) {failure = failure + 2; return report(num);},
    roll5: function(num) {failure = failure + 2; return report(num);},
    roll6: function(num) {threat++; return report(num);},
    roll7: function(num) {threat++; return report(num);},
    roll8: function(num) {failure++; threat++; return report(num);},
    roll9: function(num) {failure++; threat++; return report(num);},
    roll10: function(num) {threat = threat + 2; return report(num);},
    roll11: function(num) {threat = threat + 2; return report(num);},
    roll12: function(num) {despair++; return report(num);}
}

//RESET VALUES + innerHTML
function reset() {
    success = 0;
    advantage = 0;
    triumph = 0;
    failure = 0;
    threat = 0;
    despair = 0;
    document.getElementById("positiveRaw").innerHTML = "";
    document.getElementById("negativeRaw").innerHTML = "";
    document.getElementById("positiveResults").innerHTML = "";
    document.getElementById("negativeResults").innerHTML = "";
    getBoost(numberOfBoost);
}

//POSITIVE DICE RANDOM NUMBER
function getBoost(numberofBoost) {
    for (let i = 0; i < numberOfBoost; i++) {
        let num = Math.ceil(Math.random()*6);
        boostDictionary['roll'+num](num);
    }
    console.log("BOOST TOTALS! Success: " + success + " Advantage: " + advantage + " Triumph: " + triumph);
    return getAbility(numberOfAbility);
}

function getAbility(repeat) {
    for (let i = 0; i < repeat; i++) {
        let num = Math.ceil(Math.random()*8);
        abilityDictionary['roll'+num](num);        
    }
    console.log("ABILITY TOTALS! Success: " + success + " Advantage: " + advantage + " Triumph: " + triumph);   
    return getProficiency(numberOfProficiency);
}

function getProficiency(repeat) {
    for (let i = 0; i < repeat; i++) {
        let num = Math.ceil(Math.random()*12);
        proficiencyDictionary['roll'+num](num);
    }
    document.getElementById("positiveRaw").innerHTML = "Success: " + success + " Advantage: " + advantage + " Triumph: " + triumph;
    console.log("PROFICIENCY TOTALS! Success: " + success + " Advantage: " + advantage + " Triumph: " + triumph); 
    return getSetback(numberOfSetback);
}

//NEGATIVE DICE RANDOM NUMBER
function getSetback(repeat) {
    for (let i = 0; i < repeat; i++) {
        let num = Math.ceil(Math.random()*6);
        setbackDictionary['roll'+num](num);        
    }
    console.log("SETBACK TOTALS! Failure: " +  failure + " Threat: " + threat + " Despair: " + despair);
    return getDifficulty(numberOfDifficulty);
}

function getDifficulty(repeat) {
    for (let i = 0; i < repeat; i++) {
        let num = Math.ceil(Math.random()*8);
        difficultyDictionary['roll'+num](num);        
    }
    console.log("DIFFICULTY TOTALS! Failure: " +  failure + " Threat: " + threat + " Despair: " + despair);
    return getChallenge(numberOfChallenge);
}

function getChallenge(repeat) {
    for (let i = 0; i < repeat; i++) {
        let num = Math.ceil(Math.random()*12);
        challengeDictionary['roll'+num](num);        
    }
    document.getElementById("negativeRaw").innerHTML = "Failure: " +  failure + " Threat: " + threat + " Despair: " + despair;
    console.log("CHALLENGE TOTALS! Failure: " +  failure + " Threat: " + threat + " Despair: " + despair);
    return main(success, advantage, triumph, failure, threat, despair);
}

//PROVIDES THE ROLLS AND CURRENT TOTALS
function report(num){
    return console.log("Roll: "+num+" Success: "+success+" Advantage: " +advantage+" Triumph: "+triumph+" Failure: "+failure+" Threat: "+threat+" Despair: "+despair);
}

//PROVIDES LOGIC FOR THE FINAL OUTCOME
function main(success, advantage, triumph, failure, threat, despair) {
    success = (success + triumph) - (failure + despair);
    advantage = advantage - threat
    console.log("");

    if (triumph > 0) {
        alert("TRIUMPH! "+triumph+" special event(s).");
        console.log("TRIUMPH! "+triumph+" special event(s).");
    }

    if (despair > 0) {
        alert("DESPAIR! "+despair+" special event(s).");
        console.log("DESPAIR! "+despair+" special event(s).");
    }

    if (success > 0) {
        document.getElementById("positiveResults").innerHTML = "SUCCESS! Remainder of "+success+". Advantage: "+advantage;
        return console.log("SUCCESS! Remainder of "+success+". Advantage: "+advantage);
    } else {
        document.getElementById("negativeResults").innerHTML = "FAILURE! Remainder of "+success+". Advantage: "+advantage;
        return console.log("FAILURE! Remainder of "+success+". Advantage: "+advantage);
    }
}
