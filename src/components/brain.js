const findNoMatch = guess => {
    const words = ['banana', 'excess', 'giggit', 'voodoo', 'pullup', 'myrrhy'];
    let word;
    for(let w=0; w<6; w++) {
        let correct = 0;
        for(let c=0; c<6; c++) { for(let g=0; g<5; g++) {
            if((words[w].charAt(c) !== guess[g]) && (correct < 29)) {  
                correct++;
            }
            else if((words[w].charAt(c) !== guess[g]) && (correct === 29)) {
                word = words[w];
            }
        }}
    }
    return word;
}
const checkGuess = (guess, word, arr) => {
    let letter = guess[guess.length -1];
    for(let i=0; i<6; i++) {
        if(word[i] === letter) {
            arr[i] = letter;
        }
    }
    return arr;
} 

exports.findNoMatch = findNoMatch;
exports.checkGuess = checkGuess;