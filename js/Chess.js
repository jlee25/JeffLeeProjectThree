// Build 3x3 grid
// Check if piece has been filled
// Have a function to place a piece on the board, then check if they have won, then switch turns, then computer places piece
// Have a function to alert player if they place a piece on the board when it has been filled.
// Put all the winning combinations in an array. Have a loop to check if any of the winning combinations are fulfilled after a piece is placed.
// If all tiles are filled produce a draw.
// Have the AI place a random piece on the board after player has played.
// Array.includes to check if the winning combination is fufilled.



const tictactoe = {}

tictactoe.human1 = [];
tictactoe.human2 = [];
tictactoe.ai = []
tictactoe.boardstate = [];

tictactoe.winningCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

$(function () {

$('h1').each(function(){
    let letters = $(this).text();
    let newLetters = "";
    console.log(letters)
    for (i = 0; i < letters.length; i++) {
        if (i % 2 == 0) {
        newLetters += (`<span class = red>${letters.charAt(i)}</span>`);  
        }
      else
        newLetters +=(`<span class = blue>${letters.charAt(i)}</span>`);
        }
        $(this).html(newLetters);
        });

for (i = 1; i <= 9; i++) {
    $('.board').append(`<div class="square square${i}" data-value="${i}"></div>`)
};

let players = ["player1","player2"];
let pieces = ["X","O"];
let turn = 0;
let p1score = 1;
let p2score = 1;

let switchturns = function () {
    if (turn == 0) {
        turn = 1;
    } else {
        turn = 0;
    }
}

let humanvshuman = $('.human').on('click', function() {
let placingPiece = $('.board').on('click', '.square', function() {
    if (turn == 0) {
        if ($(this).hasClass('x-icon') || ($(this).hasClass('o-icon'))) {
            alert('Do you know how to play this game? Click another square!!!');
            $(this).notaddClass("x-icon")
    }
    else {
        $(this).addClass("x-icon");
        let number = $(this).data("value");
        tictactoe.human1.push(number);
        tictactoe.boardstate.push(number);
        turnspeech();
        console.log(tictactoe.human1);
        console.log(tictactoe.boardstate);
        checkForWin();
        checkForDraw();
    }
    }
    else {
        if ($(this).hasClass('x-icon') || ($(this).hasClass('o-icon'))) {
            alert('Do you know how to play this game? Click another square!!!');
            $(this).notaddClass("o-icon")
    } 
    else {
        $(this).addClass("o-icon");
        let number = $(this).data("value");
        tictactoe.human2.push(number);
        tictactoe.boardstate.push(number);
        console.log(tictactoe.boardstate);
        turnspeech();
        console.log(tictactoe.human2);
        checkForWin2();
        checkForDraw();
    }
    }
    switchturns();
});
});

// Against Computer

let humanvscomputer = $('.computer').on('click', function () {
let placingPiece2 = $('.board').on('click', '.square', function () {
    if (turn == 0) {
        if ($(this).hasClass('x-icon') || ($(this).hasClass('o-icon'))) {
            alert('Do you know how to play this game? Click another square!!!');
            $(this).notaddClass("x-icon")
        }
        else {
            $(this).addClass("x-icon");
            let number = $(this).data("value");
            tictactoe.human1.push(number);
            tictactoe.boardstate.push(number);
            console.log(tictactoe.human1);
            console.log(tictactoe.boardstate);
            checkForWin();
            checkForDraw();
        }
    }

    });
});

let computerplays = function() {
    let cpu = Math.floor(Math.random() * 9) + 1;
}

const checkForWin = function() {
    if ($(".square1").hasClass("x-icon") && $(".square2").hasClass("x-icon") && $(".square3").hasClass("x-icon")) {
        alert("Player 1 has won");
        $('.p1 .counter').html(`${p1score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 0
    }    
    else if ($(".square4").hasClass("x-icon") && $(".square5").hasClass("x-icon") && $(".square6").hasClass("x-icon")) {
        alert("Player 1 has won");
        $('.p1 .counter').html(`${p1score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 0
    } 
    else if ($(".square7").hasClass("x-icon") && $(".square8").hasClass("x-icon") && $(".square9").hasClass("x-icon")) {
        alert("Player 1 has won");
        $('.p1 .counter').html(`${p1score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 0
    }   
    else if ($(".square1").hasClass("x-icon") && $(".square4").hasClass("x-icon") && $(".square7").hasClass("x-icon")) {
        alert("Player 1 has won");
        $('.p1 .counter').html(`${p1score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 0
    }       
    else if ($(".square2").hasClass("x-icon") && $(".square5").hasClass("x-icon") && $(".square8").hasClass("x-icon")) {
        alert("Player 1 has won");
        $('.p1 .counter').html(`${p1score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 0
    }       
    else if ($(".square3").hasClass("x-icon") && $(".square6").hasClass("x-icon") && $(".square9").hasClass("x-icon")) {
        alert("Player 1 has won");
        $('.p1 .counter').html(`${p1score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 0
    }       
    else if ($(".square1").hasClass("x-icon") && $(".square5").hasClass("x-icon") && $(".square9").hasClass("x-icon")) {
        alert("Player 1 has won");
        $('.p1 .counter').html(`${p1score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 0
    }       
    else if ($(".square3").hasClass("x-icon") && $(".square5").hasClass("x-icon") && $(".square7").hasClass("x-icon")) {
        alert("Player 1 has won");
        $('.p1 .counter').html(`${p1score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 0
    }          
    else return ("false");
}

const checkForWin2 = function() {
    if ($(".square1").hasClass("o-icon") && $(".square2").hasClass("o-icon") && $(".square3").hasClass("o-icon")) {
        alert("Player 2 has won");
        $('.p2 .counter').html(`${p2score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 1
    }
    else if ($(".square4").hasClass("o-icon") && $(".square5").hasClass("o-icon") && $(".square6").hasClass("o-icon")) {
        alert("Player 2 has won");
        $('.p2 .counter').html(`${p2score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 1
    }
    else if ($(".square7").hasClass("o-icon") && $(".square8").hasClass("o-icon") && $(".square9").hasClass("o-icon")) {
        alert("Player 2 has won");
        $('.p2 .counter').html(`${p2score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 1
    }
    else if ($(".square1").hasClass("o-icon") && $(".square4").hasClass("o-icon") && $(".square7").hasClass("o-icon")) {
        alert("Player 2 has won");
        $('.p2 .counter').html(`${p2score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 1
    }
    else if ($(".square2").hasClass("o-icon") && $(".square5").hasClass("o-icon") && $(".square8").hasClass("o-icon")) {
        alert("Player 2 has won");
        $('.p2 .counter').html(`${p2score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 1
    }
    else if ($(".square3").hasClass("o-icon") && $(".square6").hasClass("o-icon") && $(".square9").hasClass("o-icon")) {
        alert("Player 2 has won");
        $('.p2 .counter').html(`${p2score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 1
    }
    else if ($(".square1").hasClass("o-icon") && $(".square5").hasClass("o-icon") && $(".square9").hasClass("o-icon")) {
        alert("Player 2 has won");
        $('.p2 .counter').html(`${p2score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 1
    }
    else if ($(".square3").hasClass("o-icon") && $(".square5").hasClass("o-icon") && $(".square7").hasClass("o-icon")) {
        alert("Player 2 has won");
        $('.p2 .counter').html(`${p2score++}`)
        tictactoe.boardstate = [];
        resetboard();
        turn = 1
    }   
    else return ("false");    
}

const resetboard = function() { // Reset Board Function
    for (i = 1; i <= 9; i++) {
    $(`.square${i}`).removeClass("x-icon").removeClass("o-icon");
    $('h2').html("Please click on a square to begin")
    }
}

const checkForDraw = function() {
    if (tictactoe.boardstate.length == 9) {
        alert("Its a draw. WOW! you two are equally skilled!");
        tictactoe.boardstate = [];
        resetboard();
        $('h2').html("Please click on a square to begin")
    }
}


const resetbutton = $('section button').on('click', function () { // Reset Button at the bottom of the screen
    let cheating = confirm("Are you sure you want to reset the board? Please ask the other player before you cheat.");
    if (cheating == true) {
        $('div').removeClass("x-icon").removeClass("o-icon");
        $('h2').html("Please click on a square to begin")
        tictactoe.boardstate = [];
    }
    else {
        return false;
    }
});

const turnspeech = function() {
    if (tictactoe.boardstate.length % 2 == 0 || turn == 1) {
        $('h2').html("It's Player One's <span class = blue>X Turn!</span>")
    }
    if (turn == 0) {
        $('h2').html("It's Player Two's <span class = red>O Turn!</span>")
    }
}

let winningCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

let transition = $(".human, .computer").click(function () {
    $('header').fadeOut(2000); 
});

// let cpuPlacingPiece = function () {
//     let cpu = Math.floor(Math.random() * 9) + 1;
//     console.log(cpu)
//     if ((`square${cpu}`) == (`square${i}`)) {
//         $(`square${i}`).addClass("o-icon");

//     }
// }



// let cpuPlacingPiece = function() {
//     for (i = 1; i <= 1000; i++) {
//         if 
//     }
// }

// const draw = function() {
    //     for (i = 1; i <= 9; i++) {
        //     if ((`square${i}`).hasClass('x-icon') && ('.square').hasclass('o-icon')) {
            //         alert("Draw! Try playing again!");
            //     }
// }
// }

});