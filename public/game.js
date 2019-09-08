// NOTE: this example uses the xiangqi.js library:
// https://github.com/lengyanyu258/xiangqi.js

let board = null;
let game = new Xiangqi();

function removeGreySquares () {
    $('#myBoard .square-2b8ce').removeClass('highlight');
}

function greySquare (square) {
    let $square = $('#myBoard .square-' + square);

    $square.addClass('highlight');
}

function onDragStart (source, piece) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false;

    // or if it's not that side's turn
    if ((game.turn() === 'r' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^r/) !== -1)) {
        return false;
    }
}

function onDrop (source, target) {
    console.log('onDrop',source, target);
    removeGreySquares();

    // see if the move is legal
    let move = game.move({
        from: source,
        to: target
    });

    // illegal move
    if (move === null) return 'snapback';
}

function onClickPiece (square,squareElsIds) {
    // get list of possible moves for this square
    $('#' + squareElsIds[square]).addClass(CSS.highlight2)

    let moves = game.moves({
        square: square,
        verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    // highlight the square they moused over
    greySquare(square);

    // highlight the possible squares for this piece
    for (let i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
}

function onClickOutPiece (square, piece) {
    removeGreySquares();
}

function onSnapEnd () {
    board.position(game.fen());
}

let config = {
    draggable: true,
    sparePieces: false,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onClickOutPiece: onClickOutPiece,
    onClickPiece: onClickPiece,
    onSnapEnd: onSnapEnd,
    xiangqi:game,
    pieceTheme: '/library/xiangqiboardjs-0.2.0/img/xiangqipieces/wikipedia/{piece}.svg',
    boardTheme: '/library/xiangqiboardjs-0.2.0/img/xiangqiboards/wikimedia/xiangqiboard.svg',
};
board = Xiangqiboard('myBoard', config);



$(document).ready(function () {

    $('#button').click()


})
