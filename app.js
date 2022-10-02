const PLAYER1 = 'fa-circle-o'; // 3 ustawiamy symbol dla graczy
const PLAYER2 = 'fa-times';
let round = 1; //4 określamy rundę
const board = [ //6 tablica z wynikami
    ['','',''],
    ['','',''],
    ['','',''],
];

const combinations =[ // 7 zwycięskie kombinacje
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

const boxes =[...document.querySelectorAll('.box')]; // 1 wyciągamy nasze boxy do zmiennej
boxes.forEach(box => box.addEventListener('click', pick)); // 2 przechodzimy po elementach tablicy dodając zdarzenie

function pick(event) {  // 5
    const {row, column} = event.target.dataset; //8 odczytujemy właściwości atrybutów data 
    const turn = round % 2 === 0 ? PLAYER2 : PLAYER1; // sprawdzamy czy obecna runda jest parzysta,przypisujemy graczy do rund
    if(board[row][column] !=='')return; 
    event.target.classList.add(turn); //dodajemy klasę do klikniętego pola (odwołując się do zdarzenia)
    board[row][column] = turn; //9 przenosimy informacje do tablicy z wynikami
    round ++;  //przejście do kolejnej rundy
    
    console.log(check());
}

function check(){ //10 funkcja sprawdzająca
    const result = board.reduce((total, row) =>total.concat(row));
    let winner = null;
    let moves = {
        'fa-times':[],
        'fa-circle-o':[],
    };

    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
    combinations.forEach(combination => {
        if (combination.every(index => moves[PLAYER1].indexOf(index) > -1)) {
            winner = 'Winner: Pplayer 1';
        }
        if (combination.every(index => moves[PLAYER2].indexOf(index) > -1)) {
            winner = 'Winner: Pplayer 2';
        }
    });
    return winner;
}