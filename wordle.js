export function check(guess, solution)
{
    let letterCounter = {};

    let guessRevealed = [];

    for (let letters in solution) 
    {
        const character = solution[letters];
        if (letterCounter[character]) 
        {
            letterCounter[character] += 1;
        } 
        else 
        {
            letterCounter[character] = 1;
        }
    }

    for (let letters in guess) 
    {
        const character = guess[letters];
        if (character == solution[letters]) 
        {
            letterCounter[character] -= 1;
            
            guessRevealed.push({
                colour: "green",
                letter: character,
            });
        } 
        else 
        {
            guessRevealed.push({
                colour: "gray",
                letter: character,
            });
        }
    }

    for (let letters in guess) 
    {
        const character = guess[letters];
        if (solution.includes(character) && letterCounter[character] != 0 && character != solution[letters]) 
        {
            letterCounter[character] -= 1;
            guessRevealed[letters]["colour"] = "yellow";
        }
    }

    return guessRevealed;
}
