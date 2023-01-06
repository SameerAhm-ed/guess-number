import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import { questions } from "./questions.js";
let guessNumber;
let noOfGuesses = 0;
let guessedNums = [];
let continueOp;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const welcome = async () => {
    const rainbowTitle = chalkAnimation.rainbow(`Are you here to use the TypeScript Number Guess Game?
        Created by Sameer Ahmed\n`);
    await sleep();
    rainbowTitle.stop();
    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')} 
        You have 4 chances to guess.
        If you get 4 wrong I will be ${chalk.bgRed('killed')}
        Guess the number between 1 to 10...
    `);
};
await welcome();
const askQuestions = async () => {
    let randomNumber = Math.floor(Math.random() * 10 + 1);
    console.log("Random Number: ", randomNumber);
    do {
        const guess = await inquirer.prompt([questions[0]]);
        guessNumber = guess.guessnumber;
        if (guessNumber < 1 || guessNumber > 10) {
            console.log("Please Enter a number between 1 and 10.");
        }
        else {
            guessedNums.push(guessNumber);
            noOfGuesses += 1;
            if (guessNumber < randomNumber) {
                console.log(`Your guess is too low \n No. of Guesses: ${noOfGuesses} \n Guesses Numbers are: ${guessedNums}`);
            }
            else if (guessNumber > randomNumber) {
                console.log(`Your guess is too high \n No. of Guesses: ${noOfGuesses} \n Guesses Numbers are: ${guessedNums}`);
            }
            else if (guessNumber == randomNumber) {
                console.log(`You Won \n The number was: ${randomNumber} \n You guessed it in: ${noOfGuesses} guesses`);
            }
        }
    } while (noOfGuesses < 4 && guessNumber !== randomNumber);
    guessedNums = [];
    noOfGuesses = 0;
};
const startAgain = async () => {
    do {
        await askQuestions();
        const restart = await inquirer.prompt([questions[1]]);
        continueOp = restart.startagain;
        if (continueOp == false) {
            break;
        }
    } while (continueOp == true);
};
await startAgain();
