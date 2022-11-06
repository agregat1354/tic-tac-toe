const Gameboard = (() => {
  const info = document.querySelector(".info");
  const tiles = document.querySelectorAll(".tile");
  const crossPath = "../assets/plus.svg";
  const circlePath = "../assets/circle-outline.svg";
  let gameboard = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const getFieldPos = (domElement) => {
    const idx = parseInt(domElement.getAttribute("data-number")) - 1;
    const row = Math.floor(idx / 3);
    const col = idx - row * 3;
    return { row, col };
  };
  const setTile = (sign, tile) => {
    const path = sign === "x" ? crossPath : circlePath;
    tile.innerHTML = `<img src=${path} alt=${sign}>`;
  };
  const update = () => {
    tiles.forEach((tile) => {
      const pos = getFieldPos(tile);
      let sign = ".";
      if (gameboard[pos.row][pos.col] === "x") sign = "x";
      else if (gameboard[pos.row][pos.col] === "o") sign = "o";

      if (sign !== ".") setTile(sign, tile);
    });
  };

  tiles.forEach((tile) => {
    tile.addEventListener("click", (event) => {
      const pos = getFieldPos(tile);
      if (gameboard[pos.row][pos.col] === ".") {
        gameboard[pos.row][pos.col] = Game.getCurrentPlayerSign();
        Game.togglePlayerSign();
      }
      update();
      if (gameFinishedCheck()) {
        setTimeout(resetGame, 1000);
      }
    });
  });
  update();
  const gameFinishedCheck = () => {
    if (
      gameboard[0][0] !== "." &&
      gameboard[0][0] === gameboard[0][1] &&
      gameboard[0][1] === gameboard[0][2]
    ) {
      highlightWin(0, 1, 2, gameboard[0][0]);
      return true;
    }
    if (
      gameboard[1][1] !== "." &&
      gameboard[1][0] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[1][2]
    ) {
      highlightWin(3, 4, 5, gameboard[1][0]);
      return true;
    }
    if (
      gameboard[2][2] !== "." &&
      gameboard[2][0] === gameboard[2][1] &&
      gameboard[2][1] === gameboard[2][2]
    ) {
      highlightWin(6, 7, 8, gameboard[2][0]);
      return true;
    }
    if (
      gameboard[0][0] !== "." &&
      gameboard[0][0] === gameboard[1][0] &&
      gameboard[1][0] === gameboard[2][0]
    ) {
      highlightWin(0, 3, 6, gameboard[0][0]);
      return true;
    }
    if (
      gameboard[1][1] !== "." &&
      gameboard[0][1] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][1]
    ) {
      highlightWin(1, 4, 7, gameboard[2][1]);
      return true;
    }
    if (
      gameboard[2][2] !== "." &&
      gameboard[0][2] === gameboard[1][2] &&
      gameboard[1][2] === gameboard[2][2]
    ) {
      highlightWin(2, 5, 8, gameboard[2][2]);
      return true;
    }
    if (
      gameboard[0][0] !== "." &&
      gameboard[0][0] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][2]
    ) {
      highlightWin(0, 4, 8, gameboard[2][2]);
      return true;
    }
    if (
      gameboard[1][1] !== "." &&
      gameboard[0][2] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][0]
    ) {
      highlightWin(2, 4, 6, gameboard[2][0]);
      return true;
    }
    let sum = 0;
    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard.length; j++) {
        if (gameboard[i][j] === "x" || gameboard[i][j] === "o") {
          sum++;
        }
      }
    }
    if (sum === 9) {
      highlightWin(0, 0, 0, ".");
      return true;
    }
  };
  const displayInfo = (text) => {
    info.classList.toggle("invisible");
    info.textContent = text;
  };
  const highlightWin = (idx1, idx2, idx3, sign) => {
    if (sign === ".") {
      displayInfo("Draw");
      return;
    } else if (sign === "x") {
      displayInfo('Player "X" wins!');
    } else if (sign === "o") {
      displayInfo('Player "O" wins!');
    }

    tiles.forEach((tile) => {
      const nr = parseInt(tile.getAttribute("data-number")) - 1;
      if (nr === idx1 || nr === idx2 || nr === idx3) {
        tile.style.backgroundColor = "black";
      } else {
        tile.style.backgroundColor = "white";
      }
    });
  };
  const resetGame = () => {
    gameboard = [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ];
    tiles.forEach((tile) => {
      tile.innerHTML = "";
      tile.style.backgroundColor = "white";
      if (Game.getCurrentPlayerSign() === "o") Game.togglePlayerSign();
    });
    info.textContent = "";
    info.classList.toggle("invisible");
  };
})();

const Game = (() => {
  let currentPlayerSign = "x";
  const togglePlayerSign = () => {
    currentPlayerSign = currentPlayerSign === "x" ? "o" : "x";
  };
  const getCurrentPlayerSign = () => {
    return currentPlayerSign;
  };
  return { togglePlayerSign, getCurrentPlayerSign };
})();

const player = (name) => {
  return { name };
};
