import { answers } from "./answers.js"
import { validGuesses } from "./valid_guesses.js"
import { check } from "./wordle.js";

let guessCounter = 6;
let guessWord = [];
let guessLetters = [];
let solution = "";

const alphaBet = "QWERTYUIOPASDFGHJKLZXCVBNM";
const alertLog = document.getElementsByClassName("alertLogs")[0];

function initialize()
{
    solution = answers[Math.floor(Math.random() * answers.length)];
    guessWord = [];
    guessCounter = 6;

    const wordleGameBoard = document.getElementsByClassName("wordleBoard")[0];
    const cells = wordleGameBoard.getElementsByTagName('td');

    for (let i = 0; i < cells.length; i++)
    {
        cells[i].innerHTML = "";
        cells[i].className = "empty";
    };
    
    for (let m = 0; m < alphaBet.length; m++)
    {
        document.getElementById(alphaBet[m]).className = "";
    };
}

function updateCell()
{
    const row = document.getElementById(`${6 - guessCounter}`);
    const cells = row.getElementsByTagName('td');

    for (let letters = 0; letters < cells.length; letters++)
    {   
        if (guessWord[letters])
        {
            cells[letters].innerHTML = guessWord[letters];
        }
        else
        {
            cells[letters].innerHTML = "";
        };
    };
};

function updateCellSolution(solution)
{
    const row = document.getElementById(`${6 - guessCounter}`);
    const cells = row.getElementsByTagName('td');

    for (let j = 0; j < cells.length; j++)
    {   
        cells[j].className = solution[j]['colour'];
    };
};

function removeLastAlert()
{
    const latest = alertLog.childNodes[0];
    alertLog.removeChild(latest);
}

function addLetter(char)
{
    if (guessWord.length < 5)
    {
        guessWord.push(char);
        updateCell();
    };
};

function backSpace()
{
    guessWord.pop();
    updateCell();
};

function updateKeyboard(solution)
{
    const tiers = ['gray', 'yellow', 'green'];
    const guessLettersKey = guessLetters.map(item => item['letter']);
    for (let elements in solution)
    {
        const key = solution[elements];

        if (guessLettersKey.includes(key['letter']))
        {
            const indexOfGuessLetters = guessLettersKey.indexOf(key['letter']);

            if (tiers.indexOf(key['colour']) > tiers.indexOf(guessLetters[indexOfGuessLetters]['colour']))
            {
                guessLetters.splice(indexOfGuessLetters, 1)
                guessLetters.push(key);
            };
        }
        else
        {
            guessLetters.push(key);
        };
    };

    for (let z = 0; z < guessLetters.length; z++)
    {
        const keyTwo = guessLetters[z];
        const letter = document.getElementById(keyTwo['letter'].toUpperCase());
        letter.className = keyTwo['colour'];
    };
};

function enterButton()
{
    const lowerCaseGuessWord = guessWord.join('').toLowerCase();
    let alertText = "";

    if (guessWord.length != 5)
    {
        alertText = "Not enough letters";
    }
    else if (validGuesses.includes(lowerCaseGuessWord))
    {
        const checkSolution = check(lowerCaseGuessWord, solution);
        updateCellSolution(checkSolution);
        updateKeyboard(checkSolution)
        guessCounter -= 1;
        guessWord = [];
        return;
    }
    else
    {
        alertText = "Not in word list";
    };

    if (alertLog.children.length < 6)
    {
        const alertDiv = document.createElement("div");
        alertDiv.className = "warning";
        alertDiv.innerText = alertText;

        alertLog.appendChild(alertDiv);
        setTimeout(removeLastAlert, 2000);
    };
    
};

function main()
{
    initialize();

    for (let letters in alphaBet)
    {
        const letter = alphaBet[letters];
        const letterKey = document.getElementById(letter);
        letterKey.addEventListener('click', (event) =>{
            addLetter(letter);
        });
    };

    document.getElementById("ENTER").addEventListener('click', (event) =>{
        enterButton();
    });

    document.getElementById("BACKSPACE").addEventListener('click', (event) =>{
        backSpace();
    });

    document.addEventListener('keyup', (event) =>{
        const key = event.key.toUpperCase()

        if (alphaBet.includes(key))
        {
            addLetter(key);
        }
        else if (key == 'BACKSPACE')
        {
            backSpace();
        }
        else if (key == 'ENTER')
        {
            enterButton();
        };
    });
};

window.onload = () => {
    main();
};