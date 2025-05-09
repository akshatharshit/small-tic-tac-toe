let boxs = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContaniner = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turn = true;
let count=0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turn = true;
    count=0;
    enableBox();
    msgContaniner.classList.add("hide");
}


boxs.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn) {
            box.textContent = "X";
            turn = false;
        } else {
            box.textContent = "O";
            turn = true;
        }
        count++;
        box.disabled = true;
       let isWinner= checkWinner();
       if (!isWinner && count===9) {
        gameDraw();
       }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContaniner.classList.remove("hide");
    disableBox();
  };

const disableBox = () => {
    for (let box of boxs) {
        box.disabled = true;
    }
};

const enableBox = () => {
    for (let box of boxs) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratilation , winner is ${winner}`;
    msgContaniner.classList.remove("hide");
    disableBox();
}

const checkWinner = () => {
    for (pattern of winPatterns) {
        let pos1Val = boxs[pattern[0]].innerText;
        let pos2Val = boxs[pattern[1]].innerText;
        let pos3Val = boxs[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true; 
            }
        }

    }
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);


