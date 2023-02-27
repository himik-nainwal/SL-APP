import React, { useState, useEffect } from 'react';
import Keyboard from '../components/Keyboard';
import { equationList } from '../constants/data';

const Home = () => {
  const [boardData, setBoardData] = useState(null);
  const [message, setMessage] = useState(null);
  const [charArray, setCharArray] = useState([]);
  const [col, setCol] = useState(5);
  const [colArr, setColArr] = useState([1, 2, 3, 4, 5 ]);

  const setupgame = (colNo) => {
    const boardCol = colNo || col;

    var eqIndex = Math.floor(Math.random() * equationList[boardCol].length);
    let newBoardData = {
      ...boardData,
      solution: equationList[boardCol][eqIndex],
      rowIndex: 0,
      boardWords: [],
      boardRowStatus: [],
      presentCharArray: [],
      absentCharArray: [],
      correctCharArray: [],
      status: 'IN_PROGRESS',
    };
    setBoardData(newBoardData);
  };
  useEffect(() => {
    setupgame();
  }, []);

  const handleMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleChange = (event) => {
    const colNo = event.target.value;
    setCol(colNo);
    var arr = [];
    for (let i = 0; i < colNo; i++) arr.push(i);

    setColArr(arr);
    setupgame(colNo);
  };
  const enterBoardWord = (word) => {
    let boardWords = boardData.boardWords;
    let boardRowStatus = boardData.boardRowStatus;
    let solution = boardData.solution;
    let presentCharArray = boardData.presentCharArray;
    let absentCharArray = boardData.absentCharArray;
    let correctCharArray = boardData.correctCharArray;
    let rowIndex = boardData.rowIndex;
    let rowStatus = [];
    let matchCount = 0;
    let status = boardData.status;

    for (var index = 0; index < word.length; index++) {
      if (solution.charAt(index) === word.charAt(index)) {
        matchCount++;
        rowStatus.push('correct');
        if (!correctCharArray.includes(word.charAt(index)))
          correctCharArray.push(word.charAt(index));
        if (presentCharArray.indexOf(word.charAt(index)) !== -1)
          presentCharArray.splice(
            presentCharArray.indexOf(word.charAt(index)),
            1
          );
      } else if (solution.includes(word.charAt(index))) {
        rowStatus.push('present');
        if (
          !correctCharArray.includes(word.charAt(index)) &&
          !presentCharArray.includes(word.charAt(index))
        )
          presentCharArray.push(word.charAt(index));
      } else {
        rowStatus.push('absent');
        if (!absentCharArray.includes(word.charAt(index)))
          absentCharArray.push(word.charAt(index));
      }
    }
    if (matchCount === 5) {
      status = 'WIN';
      handleMessage('Winner ');
    } else if (rowIndex + 1 === 6) {
      status = 'LOST';
      handleMessage(boardData.solution);
    }
    boardRowStatus.push(rowStatus);
    boardWords[rowIndex] = word;
    let newBoardData = {
      ...boardData,
      boardWords: boardWords,
      boardRowStatus: boardRowStatus,
      rowIndex: rowIndex + 1,
      status: status,
      presentCharArray: presentCharArray,
      absentCharArray: absentCharArray,
      correctCharArray: correctCharArray,
    };
    setBoardData(newBoardData);
  };

  const enterCurrentText = (word) => {
    let boardWords = boardData.boardWords;
    let rowIndex = boardData.rowIndex;
    boardWords[rowIndex] = word;
    let newBoardData = { ...boardData, boardWords: boardWords };
    setBoardData(newBoardData);
  };

  const handleKeyPress = (key) => {
    if (boardData.rowIndex > 5 || boardData.status === 'WIN') return;
    if (key === 'ENTER') {
      if (charArray.length == col) {
        let word = charArray.join('').toLowerCase();
        // todo

        enterBoardWord(word);
        setCharArray([]);
      } else {
        handleMessage('Incomplete row');
      }
      return;
    }
    if (key === '⌫') {
      charArray.splice(charArray.length - 1, 1);
      setCharArray([...charArray]);
    } else if (charArray.length < col) {
      charArray.push(key);
      setCharArray([...charArray]);
    }
    enterCurrentText(charArray.join('').toLowerCase());
  };


  return (
    <div className="container">
  <div className="top flex justify-between items-center">
    <div className="title text-4xl font-bold text-gray-700">NERDLE</div>
    <div className="setting flex items-center space-x-2">
      <select className="rounded-md py-1 px-2 border-gray-300" value={col} onChange={handleChange} onClick={() => setupgame()} placeholder="Select rows">
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
      </select>
      <button className="reset-board rounded-md py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors" onClick={() => setupgame()}>
        Play again
      </button>
    </div>
  </div>

  {message && <div id="toast-simple" class="flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
    <div class="pl-4 text-sm font-normal">{message}</div>
</div>}
  {col && (
    <>
      <div className="cube rounded-md p-2 bg-gray-200">
        {[0, 1, 2, 3, 4, 5].map((row, rowIndex) => (
          <div className="cube-row flex justify-center items-center space-x-2 mb-1" key={rowIndex}>
            {colArr.map((colIndex) => (
              <div
                className={`cell rounded-md w-12 h-12 flex justify-center items-center text-gray-700 font-semibold ${boardData && boardData.boardRowStatus[rowIndex] && boardData.boardRowStatus[rowIndex][colIndex] === 'correct' ? 'bg-green-500 text-white' : boardData && boardData.boardRowStatus[rowIndex] && boardData.boardRowStatus[rowIndex][colIndex] === 'present' ? 'bg-yellow-500 text-gray-700' : boardData && boardData.boardRowStatus[rowIndex] && boardData.boardRowStatus[rowIndex][colIndex] === 'absent' ? 'bg-red-500 text-white' : 'bg-white'}`}
                key={colIndex}
              >
                {boardData && boardData.boardWords[rowIndex] && boardData.boardWords[rowIndex][colIndex]}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* <Keyboard handleKeyPress={handleKeyPress} charArray={charArray} /> */}
      <div className="text-center bg-purple-400 rounded-lg hover:bg-teal-100 py-5">
  <Keyboard handleKeyPress={handleKeyPress} charArray={charArray} />
</div>
      

    </>
  )}
</div>

  )
}

export default Home