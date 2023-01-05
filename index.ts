import inquirer from "inquirer";

const randomNumber = Math.floor(Math.random() * 10);
console.log(randomNumber);

let guessNumber!: number;
let noOfGuesses = 0;
let guessedNums: number[] = [];


const askQuestions = async () => {
    const guess = await inquirer.prompt([
        {
            type: 'number',
            name: 'guessnumber',
            message: 'Guess the Number: '
        }
    ]);

    guessNumber = guess.guessnumber;

}

const play = async () => {
    await askQuestions();

    if (guessNumber < 1 || guessNumber > 10) {
        console.log("Please Enter a number between 1 and 10.");
    } else {
        guessedNums.push(guessNumber);
        noOfGuesses += 1;

        if (guessNumber < randomNumber) {
            console.log(`Your guess is too low \n No. of Guesses: ${noOfGuesses} \n Guesses Numbers are: ${guessedNums}`);
        } else if (guessNumber > randomNumber) {
            console.log(`Your guess is too high \n No. of Guesses: ${noOfGuesses} \n Guesses Numbers are: ${guessedNums}`);
        } else if (guessNumber == randomNumber) {
            console.log(`You Won \n The number was: ${randomNumber} \n You guessed it in: ${noOfGuesses} guesses`);
        }
    }
}

do {
    await play();
} while (noOfGuesses < 4);