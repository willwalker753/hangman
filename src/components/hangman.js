import React, { Component } from 'react';
import './hangman.css';
const brain = require('./brain');
export default class hangman extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hangmanImage: '.\images\hangman0.png',
            guessed: '',
            guessedArr: [],
            answer: '',
            answerArr: ['_','_','_','_','_','_'],
        }
    }
    pressKey = e => {
        let letter = e.target.value.slice(0,1);
        if(this.state.guessedArr.length < 5) {
            this.state.guessedArr.push(letter);
            this.setState({ guessed:  this.state.guessed + ' ' + letter });      
        }
        else if(this.state.guessedArr.length === 5) {
            let answer = brain.findNoMatch(this.state.guessedArr);
            this.setState({ answer: answer });
            this.state.guessedArr.push(letter);
        }
        else if(this.state.guessedArr.length >= 5) { 
            this.state.guessedArr.push(letter);
            this.setState({ guessed:  this.state.guessed + ' ' + letter });
            let answerArr = brain.checkGuess(this.state.guessedArr, this.state.answer, this.state.answerArr);
            this.setState({ answerArr: answerArr })
        }
        document.getElementById('letter-input').reset();
    }
    reset = e => {
        e.preventDefault();
        this.setState({
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
