import React, { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";
import { useEvent, getColors } from "./util";
import { motion, AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";

// import Swipe from "react-easy-swipe";

function Game() {
  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [gameOver, setGameOver] = useState(false);

  // Initialize
  const initialize = () => {
    let newGrid = cloneDeep(data);
    var retrievedObject = localStorage.getItem("highScore");
    setHighScore(JSON.parse(retrievedObject));
    addNumber(newGrid);
    console.table(newGrid);
    addNumber(newGrid);
    console.table(newGrid);
    setData(newGrid);
  };

  // AddNumber - Add an item
  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while (!added) {
      if (gridFull) {
        break;
      }

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
      if (attempts > 50) {
        gridFull = true;
        let gameOverr = checkIfGameOver();
        if (gameOverr) {
          alert("game over");
          // setGameOver(true);
        }
        // setGameOver(true);
      }
    }
  };
  // Swipe Left
  const swipeLeft = (dummy) => {
    console.log("swipe left");
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;

            if (score + b[slow][i] > highScore)
              setHighScore(score + b[slow][i]);
            setScore(score + b[slow]);

            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeRight = (dummy) => {
    console.log("swipe right");
    let oldData = data;
    let newArray = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;

            if (score + b[slow][i] > highScore)
              setHighScore(score + b[slow][i]);
            setScore(score + b[slow]);

            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeDown = (dummy) => {
    console.log("swipe down");
    console.log(data);
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;

            if (score + b[slow][i] > highScore)
              setHighScore(score + b[slow][i]);
            setScore(score + b[slow][i]);

            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };

  const swipeUp = (dummy) => {
    console.log("swipe up");
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];
            b[fast][i] = 0;

            if (score + b[slow][i] > highScore)
              setHighScore(score + b[slow][i]);
            setScore(score + b[slow][i]);

            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };

  // Check Gameover
  const checkIfGameOver = () => {
    console.log("CHECKING GAME OVER");
    // let original = cloneDeep(data);
    let checker = swipeLeft(true);

    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;
    }

    let checker2 = swipeDown(true);
    console.log("CHECKER DOWN");
    console.table(data);
    console.table(checker2);
    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false;
    }

    let checker3 = swipeRight(true);

    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false;
    }

    let checker4 = swipeUp(true);

    if (JSON.stringify(data) !== JSON.stringify(checker4)) {
      return false;
    }

    return true;
  };

  // Reset
  const resetGame = () => {
    setGameOver(false);
    const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    addNumber(emptyGrid);
    setScore(0);
    setData(emptyGrid);
  };

  const handleKeyDown = (event) => {
    if (gameOver) {
      return;
    }
    switch (event.keyCode) {
      case UP_ARROW:
        swipeUp();
        break;
      case DOWN_ARROW:
        swipeDown();
        break;
      case LEFT_ARROW:
        swipeLeft();
        break;
      case RIGHT_ARROW:
        swipeRight();
        break;
      default:
        break;
    }

    let gameOverr = checkIfGameOver();
    if (gameOverr) {
      localStorage.setItem("highScore", JSON.stringify(highScore));
      setGameOver(true);
    }
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line
  }, []);

  // This is a custom function
  useEvent("keydown", handleKeyDown);

  return (
    <div className="App">
      <span className="title">2048</span>
      <div className="score-container">
        <button className="newgamebtn" onClick={resetGame}>
          NEW GAME
        </button>
        <div className="score-wrapper">
          <div className="score">
            <div className="score-wrapper">
              <span>Score</span>
              <span className="high-score">Top</span>
            </div>
            <div className="score-wrapper">
              <span>{score}</span>
              <span className="high-score">{highScore}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cont">
        {gameOver && (
          <div style={style.gameOverOverlay}>
            <div>
              <div
                style={{
                  fontSize: 30,
                  fontFamily: "sans-serif",
                  fontWeight: "900",
                  color: "#FA282E",
                }}
              >
                Game Over
              </div>
              <div>
                <div
                  style={{
                    flex: 1,
                    marginTop: "auto",
                  }}
                >
                  <div onClick={resetGame} style={style.tryAgainButton}>
                    Try Again
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <AnimatePresence>
          {data.map((ls) =>
            ls.map((data, index) => (
              <Cube key={`${{ index } + { data }}`} num={data} />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* <div>
        <p class="game-explanation">
          <div>
            <strong class="important">How to play :</strong>
          </div>
          <div>
            Use your <strong>arrow keys</strong> to move the tiles.
            <br />
            When two tiles with the same number touch, they
            <strong>merge into one!</strong>
          </div>
        </p>
      </div> */}
    </div>
  );
}

const Cube = ({ num }) => {
  const animation = {
    initial: {
      scale: 0,
    },
    animate: {
      scale: 1,
      delay: 0,
    },
    exit: {
      scale: 0,
    },
  };

  return (
    <motion.div
      className="cube"
      style={{
        background: getColors(num),
        color: "#645B52",
      }}
    >
      <motion.div layout>{num !== 0 ? num : ""}</motion.div>
    </motion.div>
  );
};

const style = {
  newGameButton: {
    padding: 10,
    background: "#2cb67d",
    color: "#E34045",
    width: 95,
    borderRadius: 7,
    fontWeight: "900",
    // marginLeft: "auto",
    // marginBottom: "auto",
    cursor: "pointer",
  },
  tryAgainButton: {
    padding: 10,
    background: "#E34045",
    color: "#fff",
    width: 80,
    borderRadius: 7,
    fontWeight: "900",
    cursor: "pointer",
    margin: "auto",
    marginTop: 20,
  },
  gameOverOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    borderRadius: 5,
    background: "rgba(238,228,218,.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Game;
