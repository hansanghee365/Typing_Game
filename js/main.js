const GAME_TIME = 10;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init(){
    buttonChange('Game Loading...');
    getWords();
    wordInput.addEventListener('input',checkMatch);
}

//Game start
function run(){
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown,1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('Game Playing');
}

function checkStatus(){
    if(!isPlaying && time === 0){
        buttonChange("Game Start");
        clearInterval(checkInterval);
    }
}
//単語　呼び出し
function getWords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {

            response.data.forEach((word)=>{
                if(word.length < 10){
                    words.push(word);
                }
            })
            buttonChange('Game Start');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}


//単語チェック
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = "";
        if(!isPlaying){
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}

// setInterval(countDown,1000);
buttonChange('Game Start');



function countDown(){
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

function buttonChange(text){
    button.innerText = text;
    text === 'Game Start' ? button.classList.remove('loading') : button.classList.add('loading');
}