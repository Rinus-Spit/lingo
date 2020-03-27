const toGuessWords5 = ['VIRUS','THUIS','PAARD','BESEF'];
const toGuessWords6 = ['CORONA','SLAGER','BRIDGE','WERKEN','MATRAS'];
const toGuessWords10 = ['BACKOFFICE','DAADKRACHT','GANGENMENU','GANZEBORD','RAAKLIJNEN'];
let lengthWord = 6;
let toGuessWord = toGuessWords6[Math.floor(Math.random() * (toGuessWords6.length))];
const timeout = 1000;
// guessed is array van guessed letters, 0 is komt niet voor, 1 is komt voor, 2 is klopt
let guessed = [2,0,0,0,0,0];
let occurs = [false,false,false,false,false,false];
// showGuess toont de bekende letters
let showGuess = toGuessWord[0] + '     ';//"C     ";
let guess = "";
let myWord = document.getElementById("word");
let round = 1;
let cells = Array();

showRow();

function changeCountLetters(countLetters) {
    // alert (countLetters);
    let row = document.getElementById('row'+round);
    let beginrow = document.getElementById('row0');
    if (countLetters > lengthWord) {
        for (let i=lengthWord;i<countLetters;i++) {
            let cell = document.createElement('td');
            let sellSpan = document.createElement('span');
            cell.append(sellSpan);
            row.append(cell);
            cell = document.createElement('td');
            sellSpan = document.createElement('span');
            cell.append(sellSpan);
            beginrow.append(cell);
        }
    } else if (countLetters < lengthWord) {
        for (let i=countLetters;i<lengthWord;i++) {
            row.removeChild(row.lastElementChild);
            beginrow.removeChild(beginrow.lastElementChild);
        }
    }
    lengthWord = countLetters;
    switch (countLetters) {
        case 5: 
            toGuessWord = toGuessWords5[Math.floor(Math.random() * (toGuessWords5.length))];
            break;
        case 10:
            toGuessWord = toGuessWords10[Math.floor(Math.random() * (toGuessWords10.length))];
            break;
        default:
            toGuessWord = toGuessWords6[Math.floor(Math.random() * (toGuessWords6.length))];
    }
    word.setAttribute('maxLength',lengthWord);
    word.setAttribute('minLength',lengthWord);
    showGuess = toGuessWord[0];
    for (let i=1;i<lengthWord;i++){
        showGuess += ' ';
    }
    showRow();
}

function showRow() {
    myWord.placeholder = showGuess;
    //toon letters
    let row = document.getElementById('row'+round);
    if (row) {
        row.parentNode.removeChild(row);
    }
    row = document.createElement('tr');
    row.id = 'row'+round;

    let bord = document.getElementById('bord');
    for (let i=0;i<lengthWord;i++) {
        let cell = document.createElement('td');
        let sellSpan = document.createElement('span');
        if (guessed[i] === 2 ) {
            sellSpan.innerHTML = toGuessWord[i];
            sellSpan.className = 'succes';
        } else {
            sellSpan.innerHTML = '&nbsp;';
        }
        cell.append(sellSpan);
        row.append(cell);
    }
    bord.append(row);

    // uit guessed de 1 en weghalen
    for (let i=0;i<lengthWord;i++){
        if (guessed[i] === 1) {
            guessed[i] = 0;
        }
    }

    if (round === 2) {
        var radios = document.getElementsByName('count_letters');
        for (var i = 0, r=radios, l=r.length; i < l;  i++){
            r[i].disabled = true;
        }
    }
}

function showLetter(round,num) {
    let row = document.getElementById('row'+round);
    row.append(cells[num]);

}

function newWord() {
    alert("U heeft het woord geraden!!")
    let ready = document.getElementById('ready');
    ready.style.display = 'block';
}

function guessWord() {
    occurs = [false,false,false,false,false,false];
    
    guess = myWord.value.toUpperCase();
    //controleer op de juiste lengte
    if (guess.length<lengthWord || guess.length>lengthWord) {
        alert("geef een woord van "+lengthWord+" letters in!");
        return false;
    }

    // controleer op goed geraden letters
    for (let i=0;i<lengthWord;i++) {
        if (guess[i] === toGuessWord[i]) {
            guessed[i] = 2;
        }
    }
    // controleer op voorkomende letters
    for (let i=0;i<lengthWord;i++) {
        if (guessed[i] !== 2) {
            //ook controle op meerdere dezelfde letters
            for (let j=0;j<lengthWord;j++) {
                if (j !== i && !occurs[j] && (guessed[j] !== 2) && guess[i] === toGuessWord[j]) {
                    guessed[i] = 1;
                    occurs[j] = true;
                }
            }
        }
    }
    //eerst letters verwijderen
    let row = document.getElementById('row'+round);
    while (row.lastElementChild) {
        row.removeChild(row.lastElementChild);
    }
        
    let bord = document.getElementById('bord');
    // in cells komen de letters met de juiste kleuren
    cells = Array();
    for (let i=0;i<lengthWord;i++) {
        let cell = document.createElement('td');
        let sellSpan = document.createElement('span');
        sellSpan.innerHTML = guess[i];
        if (guessed[i] === 2 && guess[i] === toGuessWord[i]) {
            sellSpan.className = 'succes';
        } else if (guessed[i] === 1) {
            sellSpan.className = 'occurs';
        } else {
            sellSpan.className = '';
        }
        cell.append(sellSpan);
        cells.push(cell);
        
    }
    bord.append(row);
    showGuess = "";
    for (let i=0;i<lengthWord;i++) {
        if (guessed[i] === 2) {
            showGuess += toGuessWord[i];
        } else {
            showGuess += ".";
        }
    }
    if (guess === toGuessWord) {
        //alert("U heeft het woord geraden!!")
        setTimeout(newWord,timeout*(lengthWord));
    } else {
        myWord.value = "";
        myWord.placeholder = showGuess;
        setTimeout (showRow,timeout*(lengthWord));
    }
    console.log(round);
    for(let i=0;i<lengthWord;i++){
        setTimeout(showLetter,timeout*i,round,i);
    }
    //volgende ronde
    round++;

}
