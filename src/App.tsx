import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { moveBelow, updateBoard } from './store';
import { createBoard } from './utils/createBoard';
import Board from './components/Board';
import { checkforRowofFour, checkforRowofThree, isColumnOfThree, isColumnOffFour } from './utils/formulaCheckLogic';
import { formulaForColumnofFour, formulaForColumnofThree, generateInvalidMoves } from './utils/formulas';

function App() {
  const dispatch=useAppDispatch();
  const board=useAppSelector(({candyCrush:{board}})=>board);
  const boardSize=useAppSelector(({candyCrush:{boardSize}})=>boardSize);

  useEffect(()=>{
    dispatch(updateBoard(createBoard(boardSize)));
    // console.log(createBoard(boardSize));
  },[boardSize,dispatch])

  useEffect(()=>{
    const timeout=setTimeout(()=>{
      const newBoard=[...board];
      isColumnOffFour(newBoard,boardSize,formulaForColumnofFour(boardSize));
      checkforRowofFour(newBoard,boardSize,generateInvalidMoves(boardSize,true));
      isColumnOfThree(newBoard,boardSize,formulaForColumnofThree(boardSize))
      checkforRowofThree(newBoard,boardSize,generateInvalidMoves(boardSize,true));
      dispatch(updateBoard(newBoard));
      dispatch(moveBelow());
    },150);
    return ()=>clearInterval(timeout);
  },[board,boardSize,dispatch])
  return <div className='flex items-center justify-center h-screen'>
      <Board/>
    </div>
  
}

export default App


