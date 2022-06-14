$(document).ready(function(){
var currentQuestion;
var timeLeft = 10;
var interval;
var score = 0;
var highScore = 0;
var range = 10;

var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
};

var updateHighScore = function (amount) {
    if (score > highScore) {
        highScore = score;
    $('#high-score').text(highScore);
    }
};

var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft + " seconds left");
};

var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateHighScore(score);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 5 || timeLeft === 3 || timeLeft === 1) {
            $('#time-left').css("color", "red");
        }
        else {
            $('#time-left').css("color", "black");
        }
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
};

var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
};

var questionGenerator = function () {
    var selectedOperators = $('.op-select:checked').map(function() {
        return $(this).data('op');
    }).toArray();

    var randomOperator = selectedOperators[randomNumberGenerator(Math.floor(Math.random() * selectedOperators.length))]

    var question = {};
    var num1 = randomNumberGenerator(range);
    var num2 = randomNumberGenerator(range);

    var max = Math.max(num1, num2);
    var min = Math.min(num1, num2);

    switch (randomOperator) {
        case 'divide':
            question.answer = min;
            question.equation = String(max * min) + " ÷ " + String(max);
            break;
        case 'multiply':
            question.answer = num1 * num2;
            question.equation = String(num1) + " x " + String(num2);
            break;
        case 'subtract':
            question.answer = max - min;
            question.equation = String(max) + " - " + String(min);
            break;
        case 'add':
            question.answer = num1 + num2;
            question.equation = String(num1) + " + " + String(num2);
        default:
    }

    return question;
};

var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
};

var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
        renderNewQuestion();
        $('#user-input').val('');
        updateTimeLeft(+1);
        updateScore(+1);
    }
};

$('#user-input').on('keyup', function() {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
});

//slider
    const slider = document.querySelector(".range");
    const value = document.querySelector(".value");
    value.textContent = 'Max Value: ' + slider.value;
    slider.oninput = function(){
        value.textContent = 'Max Value: ' + this.value;
        range = Number($(this).val());
    }

renderNewQuestion();
});
