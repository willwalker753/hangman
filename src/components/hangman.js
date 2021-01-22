import React, { Component } from 'react';
import './hangman.css';
const brain = require('./brain');
export default class hangman extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numGuessRemaining: 6,
            guessRemaining: '6 Guesses Left',
            hangmanImage: 'https://github.com/willwalker753/hangman/blob/main/src/images/hangman0.png?raw=true',
            imageNum: 0,
            guessed: '',
            guessedArr: [],
            answer: '',
            answerArr: ['_','_','_','_','_','_'],
        }
    }
    cycleCountdown = e => {
        let num = this.state.numGuessRemaining - 1;
        let guessRemaining = '';
        switch(num){
            case 5: 
                guessRemaining = '5 left, you got this';
                break;
            case 4:
                guessRemaining = '4 left, unlucky so far';
                break;
            case 3:
                guessRemaining = '3 left, time to give up';
                break;
            case 2:
                guessRemaining = '2 left, this is embarrassing';
                break;
            case 1:
                guessRemaining = '1 left, last chance';
                break;
            case 0:  
                guessRemaining = "You died, but keep on guessing";
                break;
        }
        this.setState({
            numGuessRemaining: num,
            guessRemaining: guessRemaining,
        });
    }
    cycleImage = e => {
        let num = this.state.imageNum + 1;
        let image = 'https://github.com/willwalker753/hangman/blob/main/src/images/hangman'+ num +'.png?raw=true';
        this.setState({
            hangmanImage: image,
            imageNum: num,
        });
    }
    pressKey = e => {
        let letter = e.target.value.slice(0,1);
        document.getElementById('letter-input').reset();
        if(this.state.guessedArr.length < 5) {
            this.state.guessedArr.push(letter);
            this.setState({ guessed:  this.state.guessed + ' ' + letter }); 
            this.cycleImage();   
            this.cycleCountdown();
        }
        else if(this.state.guessedArr.length === 5) {
            let answer = brain.findNoMatch(this.state.guessedArr);
            this.setState({ answer: answer });
            this.setState({ guessed:  this.state.guessed + ' ' + letter });
            this.state.guessedArr.push(letter);
            this.cycleImage(); 
            this.cycleCountdown();
        }
        else if(this.state.guessedArr.length > 5) { 
            this.state.guessedArr.push(letter);
            this.setState({ guessed:  this.state.guessed + ' ' + letter });
            let answerArr = brain.checkGuess(this.state.guessedArr, this.state.answer, this.state.answerArr);
            this.setState({ answerArr: answerArr })
        }
        
    }
    reset = e => {
        e.preventDefault();
        this.setState({
            numGuessRemaining: 6,
            guessRemaining: '6 Guesses Left',
            hangmanImage: 'https://github.com/willwalker753/hangman/blob/main/src/images/hangman0.png?raw=true',
            imageNum: 0,
            guessed: '',
            guessedArr: [],
            answer: '',
            answerArr: ['_','_','_','_','_','_'],
        });
    }
    render() {
        return (
            <div>
                <p id='guess-counter'>{this.state.guessRemaining}</p>
                <div id='top-flex'>
                    <img id='hangman-image' src={this.state.hangmanImage}></img>
                    <p id='guess-list'>{this.state.guessed}</p>
                </div>
                <h3 id='answer'>{this.state.answerArr}</h3>  
                <form id='letter-input'>
                    <input type='text' placeholder='Guess here' onChange={this.pressKey}></input>
                    <button onClick={this.reset}><img src='https://github.com/willwalker753/hangman/blob/main/src/images/reset.png?raw=true'></img></button>
                </form>
                
            </div>
        )
    }
}
