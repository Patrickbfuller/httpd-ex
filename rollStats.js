/*
    Demo App - roll 6 core stats
*/

/**
 * $(id) - shorthand document accessor.
 */
function $(id) {return document.getElementById(id)}

/**
 * rollD6() - roll a a 6 sided die.
 * @returns Random int 1-6 inclusive
 */
function rollD6() {return Math.ceil(Math.random() * 6)}

/**
 * roll4D6DropLowest() - roll 4d6, take the three highest
 * @returns Sum of three highest rolls of four d6
 */
function roll4D6DropLowest() {
    // Generate 4 random d6 rolls
    var rolls = Array(4).fill(0).map(n => rollD6());
    // return sum of top 4
    rolls.sort();
    return rolls.slice(1).reduce((x, y) => x + y);
}

/**
 * rollToTable(statName) - populate stat cells with new rolls
 */
function rollToTable(statName) {
    var val = roll4D6DropLowest()
    $(statName + "-val").innerHTML = val
    var mod = Math.floor(val / 2 - 5)
    $(statName + "-mod").innerHTML = mod < 0 ? mod : "+" + mod
}

/**
 * generateTableRow(statName) - create a HTML tr element for a stats generation
 * table containing, name of stat, value of stat, modifier for stat, and button
 * to roll the die.
 */
function generateTableRow(statName) {

    var statsTableRow = document.createElement("tr")
    // table cells
    var tdStatName = document.createElement("td")
    var tdStatVal = document.createElement("td")
    var tdStatMod = document.createElement("td")
    var tdButton = document.createElement("td")

    statsTableRow.appendChild(tdStatName)
    statsTableRow.appendChild(tdStatVal)
    statsTableRow.appendChild(tdStatMod)
    statsTableRow.appendChild(tdButton)

    tdStatName.innerHTML = statName

    tdStatVal.id = statName + "-val"
    tdStatMod.id = statName + "-mod"
    
    var button = document.createElement("button")
    button.innerHTML = "Roll"
    button.addEventListener("click", () => rollToTable(statName))

    tdButton.appendChild(button)

    return statsTableRow
}

/**
 * clear the numbers to start again
 */
function reset(categories) {
    categories.forEach(
        c => {
            $(c + "-val").innerHTML = null
            $(c + "-mod").innerHTML = null
        }
    )
}

// Add rows to table
var table = $("stats-table")

var categories = ["STR", "DEX", "CON", "INT", "WIS", "CHA"]

categories.forEach(
    c => table.appendChild(generateTableRow(c))
    )

// Add reset event listener
console.log($("reset-button"))
$("reset-button").addEventListener("click", () => reset(categories))