// Smooth scrolling function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Dice roller functionality
function adjustDice(diceType, change) {
    const input = document.getElementById(diceType);
    const currentValue = parseInt(input.value);
    const newValue = Math.max(0, Math.min(10, currentValue + change));
    input.value = newValue;
}

function clearDice() {
    const diceTypes = ['proficiency', 'ability', 'boost', 'challenge', 'difficulty', 'setback'];
    diceTypes.forEach(type => {
        document.getElementById(type).value = 0;
    });
    document.getElementById('results').style.display = 'none';
}

// Placeholder dice rolling function - you can integrate your existing dice roller here
function rollDice() {
    const proficiency = parseInt(document.getElementById('proficiency').value);
    const ability = parseInt(document.getElementById('ability').value);
    const boost = parseInt(document.getElementById('boost').value);
    const challenge = parseInt(document.getElementById('challenge').value);
    const difficulty = parseInt(document.getElementById('difficulty').value);
    const setback = parseInt(document.getElementById('setback').value);

    // This is a placeholder - replace with your actual dice rolling logic
    const results = simulateRoll(proficiency, ability, boost, challenge, difficulty, setback);
    displayResults(results);
}

// Placeholder simulation function - replace with your actual dice mechanics
function simulateRoll(prof, abil, boost, chal, diff, setb) {
    // This is a simplified simulation - replace with your actual dice rolling logic
    const totalPositive = prof * 2 + abil + boost;
    const totalNegative = chal * 2 + diff + setb;

    const success = Math.max(0, Math.floor(Math.random() * totalPositive) - Math.floor(Math.random() * totalNegative));
    const advantage = Math.floor(Math.random() * 4) - Math.floor(Math.random() * 3);
    const triumph = prof > 0 ? Math.floor(Math.random() * prof * 0.1) : 0;
    const despair = chal > 0 ? Math.floor(Math.random() * chal * 0.1) : 0;

    return {
        success: success,
        advantage: advantage,
        triumph: triumph,
        despair: despair,
        failure: success < 0 ? Math.abs(success) : 0,
        threat: advantage < 0 ? Math.abs(advantage) : 0
    };
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    const summaryDiv = document.getElementById('resultsSummary');
    const detailsDiv = document.getElementById('resultsDetails');

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
        summary += `<span class="badge bg-warning me-2">Threat: ${results.threat}</span>`;
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
    if (results.success > results.failure) {
        interpretation = '<div class="alert alert-success">The action succeeds!</div>';
    } else if (results.failure > results.success) {
        interpretation = '<div class="alert alert-danger">The action fails.</div>';
    } else {
        interpretation = '<div class="alert alert-secondary">The action neither succeeds nor fails.</div>';
    }

    detailsDiv.innerHTML = interpretation;
    resultsDiv.style.display = 'block';
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    // Add any initialization code here
});