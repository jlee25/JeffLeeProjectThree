// Build 3x3 grid
// Check if piece has been filled
// Have a function to place a piece on the board, then check if they have won, then switch turns, then computer places piece
// Have a function to alert player if they place a piece on the board when it has been filled.
// Put all the winning combinations in an array. Have a loop to check if any of the winning combinations are fulfilled after a piece is placed.
// If all tiles are filled produce a draw.
// Have the AI place a random piece on the board after player has played.
// Array.includes to check if the winning combination is fufilled.


const tictactoe = {}

let i = 0
tictactoe.human1 = [];
tictactoe.human2 = [];
tictactoe.ai = []
tictactoe.boardstate = [];
tictactoe.turn = 0;
tictactoe.p1score = 1;
tictactoe.p2score = 1;

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

tictactoe.title = $('h1').each(function () { // ALTERNATING COLOUR IN THE MAIN HEADER
    let letters = $(this).text();
    let newLetters = "";
    for (i = 0; i < letters.length; i++) {
        if (i % 2 == 0) {
            newLetters += (`<span class = red>${letters.charAt(i)}</span>`);
        }
        else
            newLetters += (`<span class = blue>${letters.charAt(i)}</span>`);
    }
    $(this).html(newLetters);
});

for (i = 1; i <= 9; i++) { // CREATING THE BOARD
    $('.board').append(`<div class="square square${i}" data-value="${i}"></div>`)
};

tictactoe.switchturns = function () { // SWITCHING TURNS
    if (tictactoe.turn == 0) {
        tictactoe.turn = 1;
    } else {
        tictactoe.turn = 0;
    }
}

// HUMAN VS HUMAN (PLACING A PIECE AND ALL OTHER FUNCTIONS INCLUDED)

tictactoe.humanvshuman = $('.human').on('click', function () { 
    tictactoe.placingPiece = $('.board').on('click', '.square', function () {
        if (tictactoe.turn == 0) {
            if ($(this).hasClass('x-icon') || ($(this).hasClass('o-icon'))) {
                $('h3').html("Do you know how to play? Should I make an instruction manual in the bottom left corner? Click another square!!!")
                $(this).notaddClass("x-icon")
            }
            else {
                $(this).addClass("x-icon");
                $('h3').html("");
                let number = $(this).data("value");
                tictactoe.human1.push(number);
                tictactoe.boardstate.push(number);
                tictactoe.turnspeech();
                tictactoe.checkForWin();
                tictactoe.checkForDraw();
            }
        }
        else {
            if ($(this).hasClass('x-icon') || ($(this).hasClass('o-icon'))) {
                $('h3').html("Do you know how to play? Should I make an instruction manual in the bottom left corner? Click another square!")
                $(this).notaddClass("o-icon")
            }
            else {
                $(this).addClass("o-icon");
                $('h3').html("");
                let number = $(this).data("value");
                tictactoe.human2.push(number);
                tictactoe.boardstate.push(number);
                tictactoe.turnspeech();
                tictactoe.checkForWin2();
                tictactoe.checkForDraw();
            }
        }
        tictactoe.switchturns();
    });
});

// AGAINST COMPUTER

tictactoe.humanvscomputer = $('.computer').on('click', function () {
    tictactoe.placingPiece2 = $('.board').on('click', '.square', function () {
        $('h2').html("You can do it!!!!!")
        if ($(this).hasClass('x-icon') || ($(this).hasClass('o-icon'))) {
            $('h3').html("Do you know how to play? Should I make an instruction manual in the bottom left corner? Click another square!")
            $(this).notaddClass("x-icon")
        }
        else {
            $(this).addClass("x-icon");
            $(this).addClass("filled");
            $('h3').html("");
            let number = $(this).data("value");
            tictactoe.human1.push(number);
            tictactoe.boardstate.push(number);
            tictactoe.checkForWin();
            tictactoe.checkForDraw();
            tictactoe.cputurn();
        }
    });
});

// Generate a random number to place in a square.
// Check if square does not have a piece already //
// Place in random square //
// If 2 out of 3 squares have a piece, place in the last square.


tictactoe.squareOpen = function (dataValue) { // CHECKING IF SQUARE HAS A PIECE ON IT
    if ($(`.square${dataValue}`).hasClass("filled")) {
        squareFree = false;
    }
    else {
        squareFree = true;
    }
}

tictactoe.randomPlay = function () { // MAKING CPU ADD A RANDOM PIECE TO AN EMPTY SPOT
    for (i = 1; i <= 30; i++) {
        let rand = Math.floor(Math.random() * 9) + 1;
        tictactoe.squareOpen(rand);
        if (squareFree == true) {
            $(`.square${rand}`).addClass("o-icon");
            $(`.square${rand}`).addClass("filled");
            tictactoe.human2.push(rand);
            tictactoe.boardstate.push(rand);
            break;
        }
    }
}

tictactoe.smartPlay = function () { // If either person is about to win. Put the O there.
    if ($('.square1').hasClass("filled") && ($('.square2').hasClass("filled"))) {
        $('.square3').addClass("filled").addClass("x-icon");
    }
}

tictactoe.cputurn = function () { // CPU COMPLETE TURN
    tictactoe.randomPlay();
    tictactoe.checkForWin2();
    tictactoe.checkForDraw();
}


tictactoe.checkForWin = function () { // CHECKING FOR A WIN PLAYER ONE. WOULD LOVE TO FIND A LOOP FOR IT BECAUSE I KNOW THERE IS!! 
    if ($(".square1").hasClass("x-icon") && $(".square2").hasClass("x-icon") && $(".square3").hasClass("x-icon")) {
        $("h3").html("<span class='blue'>PLAYER ONE HAS WON. PLAYER TWO YOU SUCK! Please click to play again.</span>");
        tictactoe.fading();
        $('.p1 .counter').html(`${tictactoe.p1score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 0
    }
    else if ($(".square4").hasClass("x-icon") && $(".square5").hasClass("x-icon") && $(".square6").hasClass("x-icon")) {
        $("h3").html("<span class='blue'>PLAYER ONE HAS WON. PLAYER TWO YOU SUCK! Please click to play again.</span>");
        tictactoe.fading();
        $('.p1 .counter').html(`${tictactoe.p1score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 0
        
    }
    else if ($(".square7").hasClass("x-icon") && $(".square8").hasClass("x-icon") && $(".square9").hasClass("x-icon")) {
        $("h3").html("<span class='blue'>PLAYER ONE HAS WON. PLAYER TWO YOU SUCK! Please click to play again.</span>");
        tictactoe.fading();
        $('.p1 .counter').html(`${tictactoe.p1score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 0
    }
    else if ($(".square1").hasClass("x-icon") && $(".square4").hasClass("x-icon") && $(".square7").hasClass("x-icon")) {
        $("h3").html("<span class='blue'>PLAYER ONE HAS WON. PLAYER TWO YOU SUCK! Please click to play again.</span>");
        tictactoe.fading();
        $('.p1 .counter').html(`${tictactoe.p1score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);;
        turn = 0
    }
    else if ($(".square2").hasClass("x-icon") && $(".square5").hasClass("x-icon") && $(".square8").hasClass("x-icon")) {
        $("h3").html("<span class='blue'>PLAYER ONE HAS WON. PLAYER TWO YOU SUCK! Please click to play again.</span>")
        tictactoe.fading();
        $('.p1 .counter').html(`${tictactoe.p1score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 0
    }
    else if ($(".square3").hasClass("x-icon") && $(".square6").hasClass("x-icon") && $(".square9").hasClass("x-icon")) {
        $("h3").html("<span class='blue'>PLAYER ONE HAS WON. PLAYER TWO YOU SUCK! Please click to play again.</span>")
        tictactoe.fading();
        $('.p1 .counter').html(`${tictactoe.p1score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);;
        turn = 0
    }
    else if ($(".square1").hasClass("x-icon") && $(".square5").hasClass("x-icon") && $(".square9").hasClass("x-icon")) {
        $("h3").html("<span class='blue'>PLAYER ONE HAS WON. PLAYER TWO YOU SUCK! Please click to play again.</span>")
        tictactoe.fading();
        $('.p1 .counter').html(`${tictactoe.p1score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 0
    }
    else if ($(".square3").hasClass("x-icon") && $(".square5").hasClass("x-icon") && $(".square7").hasClass("x-icon")) {
        $("h3").html("<span class='blue'>PLAYER ONE HAS WON. PLAYER TWO YOU SUCK! Please click to play again.</span>")
        tictactoe.fading();
        $('.p1 .counter').html(`${tictactoe.p1score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 0
    }
    else return ("false");
}



tictactoe.checkForWin2 = function () { // CHECKING FOR WIN FOR SECOND PLAYER
    if ($(".square1").hasClass("o-icon") && $(".square2").hasClass("o-icon") && $(".square3").hasClass("o-icon")) {
        $("h3").html("<span class='red'>PLAYER TWO HAS WON. PLAYER ONE, MAYBE YOU SHOULD RETHINK YOUR LIFE</span>");
        tictactoe.fading();
        $('.p2 .counter').html(`${tictactoe.p2score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 1
    }
    else if ($(".square4").hasClass("o-icon") && $(".square5").hasClass("o-icon") && $(".square6").hasClass("o-icon")) {
        $("h3").html("<span class='red'>PLAYER TWO HAS WON. PLAYER ONE, MAYBE YOU SHOULD RETHINK YOUR LIFE</span>");
        tictactoe.fading();
        $('.p2 .counter').html(`${tictactoe.p2score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 1
    }
    else if ($(".square7").hasClass("o-icon") && $(".square8").hasClass("o-icon") && $(".square9").hasClass("o-icon")) {
        $("h3").html("<span class='red'>PLAYER TWO HAS WON. PLAYER ONE, MAYBE YOU SHOULD RETHINK YOUR LIFE</span>");
        tictactoe.fading();
        $('.p2 .counter').html(`${tictactoe.p2score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 1
    }
    else if ($(".square1").hasClass("o-icon") && $(".square4").hasClass("o-icon") && $(".square7").hasClass("o-icon")) {
        $("h3").html("<span class='red'>PLAYER TWO HAS WON. PLAYER ONE, MAYBE YOU SHOULD RETHINK YOUR LIFE</span>");
        tictactoe.fading();
        $('.p2 .counter').html(`${tictactoe.p2score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 1
    }
    else if ($(".square2").hasClass("o-icon") && $(".square5").hasClass("o-icon") && $(".square8").hasClass("o-icon")) {
        $("h3").html("<span class='red'>PLAYER TWO HAS WON. PLAYER ONE, MAYBE YOU SHOULD RETHINK YOUR LIFE</span>");
        tictactoe.fading();
        $('.p2 .counter').html(`${tictactoe.p2score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 1
    }
    else if ($(".square3").hasClass("o-icon") && $(".square6").hasClass("o-icon") && $(".square9").hasClass("o-icon")) {
        $("h3").html("<span class='red'>PLAYER TWO HAS WON. PLAYER ONE, MAYBE YOU SHOULD RETHINK YOUR LIFE</span>");
        tictactoe.fading();
        $('.p2 .counter').html(`${tictactoe.p2score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 1
    }
    else if ($(".square1").hasClass("o-icon") && $(".square5").hasClass("o-icon") && $(".square9").hasClass("o-icon")) {
        $("h3").html("<span class='red'>PLAYER TWO HAS WON. PLAYER ONE, MAYBE YOU SHOULD RETHINK YOUR LIFE</span>");
        tictactoe.fading();
        $('.p2 .counter').html(`${tictactoe.p2score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 1
    }
    else if ($(".square3").hasClass("o-icon") && $(".square5").hasClass("o-icon") && $(".square7").hasClass("o-icon")) {
        $("h3").html("<span class='red'>PLAYER TWO HAS WON. PLAYER ONE, MAYBE YOU SHOULD RETHINK YOUR LIFE</span>");
        tictactoe.fading();
        $('.p2 .counter').html(`${tictactoe.p2score++}`)
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        turn = 1
    }
    else return ("false");
}

tictactoe.resetboard = function () { // RESET BOARD FUNCTION
    for (i = 1; i <= 9; i++) {
        $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
        $('h2').html("Please click on a square to begin")
    }
}

tictactoe.checkForDraw = function () { // CHECKING FOR A DRAW
    if (tictactoe.boardstate.length == 9) {
        $('h3').append("It's a draw! You are both equally skilled!");
        tictactoe.boardstate = [];
        tictactoe.delayreset = setTimeout(function () { // RESET BOARD FUNCTION
            for (i = 1; i <= 9; i++) {
                $(`.square${i}`).removeClass("x-icon").removeClass("o-icon").removeClass("filled");
                $('h2').html("Please click on a square to begin")
            }
        }, 3000);
        $('h2').html("Please click on a square to begin")
    }
}

tictactoe.turnspeech = function () { // H2 THAT CHANGES DEPENDING ON WHOSE TURN IT IS
    if (tictactoe.boardstate.length % 2 == 0 || tictactoe.turn == 1) {
        $('h2').html("It's Player One's <span class = blue>X Turn!</span>")
    }
    if (tictactoe.turn == 0) {
        $('h2').html("It's Player Two's <span class = red>O Turn!</span>")
    }
}

tictactoe.transition = $(".human, .computer").click(function () { // FADING OUT WHEN ENTERING GAME
    $('header').fadeOut(3000);
});

tictactoe.fading = function () {
    $('h3').fadeOut('slow', function () {
        $('h3').fadeIn('slow', function () {
            tictactoe.fading();
        });
    });
}

tictactoe.resetting = $('.yes').on("click", function () {
    $('.reset-pop').hide();
    $('div').removeClass("x-icon").removeClass("o-icon").removeClass("filled");
    $('h2').html("Please click on a square to begin")
    tictactoe.boardstate = [];
});

tictactoe.resetbutton = $('.reset').on("click", function () { // RESET BUTTON POPUP
    $('.reset-pop').show();
    $('.reset-question').show("slow").animate({ top: '200' });
    tictactoe.resetting();
    $('.close, .no').on("click", function () {
        $('.reset-pop').hide();
    });
});

tictactoe.resetting = $('.yes').on("click", function () {
    $('.reset-pop').hide();
    $('div').removeClass("x-icon").removeClass("o-icon").removeClass("filled");
    $('h2').html("Please click on a square to begin")
    tictactoe.boardstate = [];
});

$('.close, .no').on("click", function () {
    $('.reset-pop').hide();
});

// tictactoe.countdown = setInterval(function () { // CountDown
//     $("h3").html("PLAYER ONE HAS WON. PLAYER TWO YOU SUCK! Please click to play again.")
//     $("h3").toggleClass("blue");
//     i += 1;
//     if (i === 5) {
//         clearInterval(tictactoe.countdown);
//     }
// }, 500)


tictactoe.init = function () {

}

$(function () {

});