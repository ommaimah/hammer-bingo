const table = document.querySelector("#tblBingo")

// winning positions
const winningPositions = [
    // horizontal
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    // vertical
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    // diagonal 
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
]

// comments that will induce a shorter lifespan
let aneurysmInducingComments = [
    "but",
    "to be fair", 
    "it's not that bad / could be worse",
    "you're gonna love this",
    "that's why I am here",
    "girl math",
    "but I get points",
    "funny story",
    "it's better than it used to be",
    "no one ever taught me",
    "I deserve it / I'm worth it",
    "but I wanted it",
    "give me credit",
    "that's a good question",
    "used to be way worse",
    "well, I have to eat",
    "enabled by partner / parent",
    "blames toxic ex",
    "owns a pet",
    "admits tax evasion",
    "doesn't look at statements",
    "christmas or birthday",
    "disney",
    "self care",
    "tried to start a business",
    "manifesting",
    "listen"
]

// array used to assign unique IDs and content to the bingo 
let arr = Array.apply(null, { length: 26 }).map(Number.call, Number);

arr.shift()
shuffle(arr);

// shuffle the comments to be assigned to the bingo board
function shuffle(arr) {
    let currentIndex = arr.length;

    while (currentIndex != 0) {
        // ensure that each comment is only used once
        let randomIndex = Math.floor(Math.random() * aneurysmInducingComments.length);
        // remove the comment from the array and decrement the current index
        let randomComment = aneurysmInducingComments.splice(randomIndex, 1)[0];
        currentIndex--;
        [arr[currentIndex], randomComment] = [randomComment, arr[currentIndex]];
    }

    return arr;
}

let iterator = 0;

// create the bingo board
for (i = 0; i < 5; i++) {
    let tr = document.createElement("tr")
    table.appendChild(tr)

    for (j = 0; j < 5; j++) {
        let td = document.createElement("td")
        td.id = arr[iterator].toString()
        td.style.height = "20%"
        td.style.width = "20%"
        td.classList.add("main-table-cell")

        let div = document.createElement("div")
        div.classList.add("cell-format")
        div.textContent = arr[iterator].toString()
        td.appendChild(div)
        tr.appendChild(td)
        iterator++;
    }
}

const cell = document.querySelectorAll(".main-table-cell");

cell.forEach(e => {
    e.addEventListener("click", () => {
        // add the red circle to the clicked cell
        e.classList.add("circle-overlay");

        // popup alert if user hits a winning combination
        if(bingoPatternFound()) {
            alert('BINGO!')
        }
    })
})

// check if a winning combination has been found
function bingoPatternFound() {
    const cell = document.querySelectorAll(".main-table-cell");

    return winningPositions.some(combination => {
        let ite = 0;
        combination.forEach(index => {
            if(cell[index].classList.contains("circle-overlay")) ite++;
        })

        if(ite === 5) {
            let indexWin = winningPositions.indexOf(combination);
            winningPositions.splice(indexWin, 1)
        }

        return combination.every(index => {
            return cell[index].classList.contains("circle-overlay")
        })
    })
}