let totals = {
    success: 0,
    advantage: 0,
    triumph: 0,
    despair: 0,
    failure: 0,
    threat: 0
}

const boostDictionary = {
    roll1: function() {return;},
    roll2: function() {return;},
    roll3: function() {totals.success++; return;},
    roll4: function() {totals.success++; totals.advantage++; return;},
    roll5: function() {totals.advantage+=2; return;},
    roll6: function() {totals.advantage++; return;},
}

const setbackDictionary = {
    roll1: function() {return;},
    roll2: function() {return;},
    roll3: function() {totals.failure++; return;},
    roll4: function() {totals.failure++; return;},
    roll5: function() {totals.threat++; return;},
    roll6: function() {totals.threat++; return;},
}

const abilityDictionary = {
    roll1: function() {return;},
    roll2: function() {totals.success++; return;},
    roll3: function() {totals.success++; return;},
    roll4: function() {totals.success+=2; return;},
    roll5: function() {totals.advantage++; return;},
    roll6: function() {totals.advantage++; return;},
    roll7: function() {totals.advantage++; totals.success++; return;},
    roll8: function() {totals.advantage+=2; return;},
}

const difficultyDictionary = {
    roll1: function() {return;},
    roll2: function() {totals.failure++; return;},
    roll3: function() {totals.failure+=2; return;},
    roll4: function() {totals.threat++; return;},
    roll5: function() {totals.threat++; return;},
    roll6: function() {totals.threat++; return;},
    roll7: function() {totals.threat+=2; return;},
    roll8: function() {totals.threat++; totals.failure++; return;},
}

const proficiencyDictionary = {
    roll1: function() {return;},
    roll2: function() {totals.success++; return;},
    roll3: function() {totals.success++; return;},
    roll4: function() {totals.success+=2; return;},
    roll5: function() {totals.success+=2; return;},
    roll6: function() {totals.advantage++; return;},
    roll7: function() {totals.advantage++; totals.success++; return;},
    roll8: function() {totals.advantage++; totals.success++; return;},
    roll9: function() {totals.advantage++; totals.success++; return;},
    roll10: function() {totals.advantage+=2; return;},
    roll11: function() {totals.advantage+=2; return;},
    roll12: function() {totals.triumph++; return;},
}

const challengeDictionary = {
    roll1: function() {return;},
    roll2: function() {totals.failure++; return;},
    roll3: function() {totals.failure++; return;},
    roll4: function() {totals.failure+=2; return;},
    roll5: function() {totals.failure+=2; return;},
    roll6: function() {totals.threat++; return;},
    roll7: function() {totals.threat++; return;},
    roll8: function() {totals.threat++; totals.failure++; return;},
    roll9: function() {totals.threat++; totals.failure++; return;},
    roll10: function() {totals.threat+=2; return;},
    roll11: function() {totals.threat+=2; return;},
    roll12: function() {totals.despair++; return;},
}

/**
 * Adjusts the value of a dice input field.
 * @param {*} diceType - The type of dice (e.g., proficiency, ability). Correlates to the ID of the input element.
 * @param {*} change - The amount to change the dice value by (can be positive or negative).
 */
function adjustDice(diceType, change) {
    const input = document.getElementById(diceType);
    const currentValue = parseInt(input.value);
    const newValue = Math.max(0, Math.min(10, currentValue + change));
    input.value = newValue;
}

/**
 * Clears all dice input fields and hides the results section.
 */
function clearDice() {
    const diceTypes = ['proficiency', 'ability', 'boost', 'challenge', 'difficulty', 'setback'];
    diceTypes.forEach(type => {
        document.getElementById(type).value = 0;
    });
    document.getElementById('results').style.display = 'none';
}

/**
 * Rolls the dice (simulateRoll function) based on the values in the input fields and displays the results (displayResults function).
 */
function rollDice() {
    const proficiency = parseInt(document.getElementById('proficiency').value);
    const ability = parseInt(document.getElementById('ability').value);
    const boost = parseInt(document.getElementById('boost').value);
    const challenge = parseInt(document.getElementById('challenge').value);
    const difficulty = parseInt(document.getElementById('difficulty').value);
    const setback = parseInt(document.getElementById('setback').value);

    const results = simulateRoll(proficiency, ability, boost, challenge, difficulty, setback);
    console.table(results);
    displayResults(results);
    resetTotals();
}

/**
 * Simulates a dice roll based on the number of dice all input fields.
 * @param {Number} prof - The number of proficiency dice.
 * @param {Number} abil - The number of ability dice.
 * @param {Number} boost - The number of boost dice.
 * @param {Number} chal - The number of challenge dice.
 * @param {Number} diff - The number of difficulty dice.
 * @param {Number} setb - The number of setback dice.
 * @returns {Array} - An object containing the results all dice rolls, which is then passed to displayResults from rollDice.
 */
function simulateRoll(prof, abil, boost, chal, diff, setb) {
    for (i = 0; i < boost; i++) {
        const roll = Math.ceil(Math.random() * 6);
        boostDictionary['roll'+roll]();
    }

    for (i = 0; i < setb; i++) {
        const roll = Math.ceil(Math.random() * 6);
        setbackDictionary['roll'+roll]();
    }

    for (i=0; i < abil; i++) {
        const roll = Math.ceil(Math.random() * 8);
        abilityDictionary['roll'+roll]();
    }

    for (i=0; i < diff; i++) {
        const roll = Math.ceil(Math.random() * 8);
        difficultyDictionary['roll'+roll]();
    }

    for (i=0; i < prof; i++) {
        const roll = Math.ceil(Math.random() * 12);
        proficiencyDictionary['roll'+roll]();
    }

    for (i=0; i < chal; i++) {
        const roll = Math.ceil(Math.random() * 12);
        challengeDictionary['roll'+roll]();
    }

    return totals;
}

/**
 * Displays the results of the dice roll and adds an interpretation of the results to the results section.
 * @param {Array} results - The results of all dice rolls from simulateRoll.
 */
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    const summaryDiv = document.getElementById('resultsSummary');
    const detailsDiv = document.getElementById('resultsDetails');

    // Measure Success
    totalSuccess = results.success + results.triumph;
    totalFailure = results.failure + results.despair;

    // Effects of despair and triumph cannot be negated
    if (totalSuccess > totalFailure) {
        results.success -= totalFailure;
        results.failure = 0;
    } else if (totalFailure >= totalSuccess) {
        results.failure -= totalSuccess;
        results.success = 0;
    }

    // Measure magnitude
    results.advantage -= results.threat;
    results.advantage < 0 ? results.threat=Math.abs(results.advantage) : results.threat=0;

    let summary = '';
    if (results.success > 0) {
        summary += `<span class="badge bg-success me-2">Success: ${results.success}</span>`;
    }
    if (results.failure > 0) {
        summary += `<span class="badge bg-danger me-2">Failure: ${results.failure}</span>`;
    }
    if (results.advantage > 0) {
        summary += `<span class="badge bg-info me-2">Advantage: ${results.advantage}</span>`;
    }
    if (results.threat > 0) {
        summary += `<span class="badge bg-orange me-2">Threat: ${results.threat}</span>`;
    }
    if (results.triumph > 0) {
        summary += `<span class="badge bg-warning me-2">Triumph: ${results.triumph}</span>`;
    }
    if (results.despair > 0) {
        summary += `<span class="badge bg-dark me-2">Despair: ${results.despair}</span>`;
    }

    summaryDiv.innerHTML = summary || '<span class="text-muted">No significant results</span>';

    // Add interpretation
    let interpretation = '';
    if ((totalSuccess > totalFailure) && (totals.triumph > 0 || totals.despair > 0)) {
        interpretation = '<div class="alert alert-success">The action succeeds! Special event triggered.</div>';
    } else if (totalSuccess > totalFailure) {
        interpretation = '<div class="alert alert-success">The action succeeds!</div>';
    } else if ((totalFailure >= totalSuccess) && (totals.triumph > 0 || totals.despair > 0)) {
        interpretation = '<div class="alert alert-danger">The action fails. Special event triggered.</div>';
    } else if (totalFailure >= totalSuccess) {
        interpretation = '<div class="alert alert-danger">The action fails.</div>';
    }

    detailsDiv.innerHTML = interpretation;
    resultsDiv.style.display = 'block';
}


function resetTotals() {
    for (key in totals) {
        totals[key] = 0;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    console.log("Dice roller is ready for use.")
});