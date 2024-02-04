import { useState } from 'react';

function App() {
  const initialPositions = [
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
  ];

  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [postions, setPositions] = useState(initialPositions);
  const [winner, setWinner] = useState(null);

  const [player, setPlayer] = useState('cross');

  function handleChooseSquare(index) {
    setPlayer(player === 'cross' ? 'circle' : 'cross');
    setPositions(postions.map((el, i) => (i === index ? player : el)));
    Winner();
  }

  function Winner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        postions[a] !== 'empty' &&
        postions[a] === postions[b] &&
        postions[b] === postions[c]
      ) {
        handleWinner(postions[a]);
        return;
      }
    }

    if (!postions.includes('empty')) {
      setPositions(initialPositions);
    }
  }

  function handleWinner(winner) {
    if (winner === 'cross') {
      setPlayerOneScore(playerOneScore + 1);
    } else if (winner === 'circle') {
      setPlayerTwoScore(playerTwoScore + 1);
    }
    setPositions(initialPositions);
    setWinner(winner);
  }

  function onReset() {
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setPositions(initialPositions);
    setWinner(null);
  }

  function onContinue() {
    setWinner(null);
  }

  return (
    <div>
      <Score playerOneScore={playerOneScore} playerTwoScore={playerTwoScore} />
      <TicTacToe postions={postions} handleChooseSquare={handleChooseSquare} />
      <Reset onReset={onReset} />
      {winner && <Overlay onContinue={onContinue}>{winner}</Overlay>}
    </div>
  );
}

function TicTacToe({ postions, handleChooseSquare }) {
  return (
    <div className="container">
      <div className="tic-tac-toe">
        {postions.map((el, i) => (
          <Square key={i} onClick={() => handleChooseSquare(i)}>
            {el === 'circle' && <Circle />}
            {el === 'cross' && <Cross />}
          </Square>
        ))}
      </div>
    </div>
  );
}

function Square({ children, onClick }) {
  return (
    <div className="square" onClick={onClick}>
      {children}
    </div>
  );
}

function Cross() {
  return (
    <svg height="70" width="70">
      <line
        x1="0"
        y1="0"
        x2="70"
        y2="70"
        style={{ stroke: '#E03616', strokeWidth: '8' }}
      />
      <line
        x1="70"
        y1="0"
        x2="0"
        y2="70"
        style={{ stroke: '#E03616', strokeWidth: '8' }}
      />
    </svg>
  );
}

function Circle() {
  return (
    <svg height="70" width="70">
      <circle
        r="31"
        cx="35"
        cy="35"
        stroke="#275DAD"
        strokeWidth="8"
        fill="none"
      />
    </svg>
  );
}

function Score({ playerOneScore, playerTwoScore }) {
  return (
    <div className="scoreboard">
      <p className="score">Player One: {playerOneScore}</p>
      <p className="score">Player Two: {playerTwoScore}</p>
    </div>
  );
}

function Reset({ onReset }) {
  return (
    <div className="reset">
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

function Overlay({ children, onContinue }) {
  return (
    <div className="overlay">
      <p>The winner is {children}</p>
      <Continue onContinue={onContinue} />
    </div>
  );
}

function Continue({ onContinue }) {
  return (
    <div className="continue">
      <button onClick={onContinue}>Continue</button>
    </div>
  );
}

export default App;
