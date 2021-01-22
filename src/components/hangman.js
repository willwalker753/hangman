import React, { Component } from 'react';
import './hangman.css';
const brain = require('./brain');
export default class hangman extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hangmanImage: 'https://github.com/willwalker753/hangman/blob/main/src/images/hangman0.png?raw=true',
            imageNum: 0,
            guessed: '',
            guessedArr: [],
            answer: '',
            answerArr: ['_','_','_','_','_','_'],
        }
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
        }
        else if(this.state.guessedArr.length === 5) {
            let answer = brain.findNoMatch(this.state.guessedArr);
            this.setState({ answer: answer });
            this.setState({ guessed:  this.state.guessed + ' ' + letter });
            this.state.guessedArr.push(letter);
            this.cycleImage(); 
        }
        else if(this.state.guessedArr.length > 5) { 
            console.log(letter)
            this.state.guessedArr.push(letter);
            this.setState({ guessed:  this.state.guessed + ' ' + letter });
            let answerArr = brain.checkGuess(this.state.guessedArr, this.state.answer, this.state.answerArr);
            this.setState({ answerArr: answerArr })
        }
        
    }
    reset = e => {
        e.preventDefault();
        this.setState({
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
                <img src={this.state.hangmanImage}></img>
                <h3 id='answer'>{this.state.answerArr}</h3>
                <form id='letter-input'>
                    <input type='text' placeholder='Guess here' onChange={this.pressKey}></input>
                    <button onClick={this.reset}>Reset</button>
                </form>
                <p id='guess-list'>{this.state.guessed}</p>
            </div>
        )
    }
}
