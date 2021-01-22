import React, { Component } from 'react';
import './hangman.css';
const brain = require('./brain');
export default class hangman extends Component {
    constructor(props) {
        super(props)
        this.state = {
             guessed: '',
             guessedArr: [],
             answer: '',
             answerArr: ['-','-','-','-','-','-'],
        }
    }
    pressKey = e => {
        if(this.state.guessedArr.length < 5) {
            let letter = e.target.value.slice(0,1);
            this.state.guessedArr.push(letter);
            this.setState({ guessed:  this.state.guessed + ' ' + letter });      
        }
        if(this.state.guessedArr.length === 5) {
            let answer = brain.findNoMatch(this.state.guessedArr);
            this.setState({ answer: answer });
        }
        if(this.state.guessedArr.length >= 5) {
            let letter = e.target.value.slice(0,1);
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
            answerArr: ['-','-','-','-','-','-'],
        });
    }
    render() {
        return (
            <div>
                <p>{this.state.answerArr}</p>
                <form id='letter-input'>
                    <input type='text' onChange={this.pressKey}></input>
                    <button onClick={this.reset}>Reset</button>
                </form>
                <p>{this.state.guessed}</p>
            </div>
        )
    }
}
