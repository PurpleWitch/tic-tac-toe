import React,{useState} from 'react';
import {calculateWinner} from "./helper.js";
import Board from "./Board";
import './Game.css';

const Game = ()=>{
    const [history,setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber,setStepNumber] = useState(0);
    const [scoreP1,setScoreP1] = useState(0);
    const [scoreP2,setScoreP2] = useState(0);
    const [nameP1,setNameP1] = useState('player 1');
    const [nameP2,setNameP2] = useState('player 2');
    const [gameended,setGameended] = useState(false);
    const [xIsNext,setXisNext] = useState(true);
    let winner = calculateWinner(history[stepNumber]);
    let xO = xIsNext ? "X" : "O";
    // console.log(scoreP1)
    const handleClick = (i) =>{
        const historyPoint = history.slice(0,stepNumber+1);
        const current = history[stepNumber];
        const squares = [...current];
        // return if won
        if(winner || squares[i]){
            return;
        }
        //select square
        squares[i] = xO;
        setHistory([...historyPoint,squares]);
        setStepNumber(historyPoint.length);
        setXisNext(!xIsNext)
        // handleClick(i)
    }
    const submit1 = (e)=>{
        console.log("asdas")
        setNameP1(e.target.value)
    }
    const submit2 = (e)=>{
        console.log("asdas")
        setNameP2(e.target.value)
    }
    const scorereset = ()=>{
        setScoreP1(0)
        setScoreP2(0)
    }
    const playagain=()=>{
        setHistory([Array(9).fill(null)])
        setStepNumber(0)
        setGameended(false)
        setXisNext(true)
        winner = calculateWinner(history[stepNumber]);
        xO = xIsNext ? "X" : "O";
    }
    if(winner && !gameended){
        setGameended(true)
        if(xO==="O"){
            console.log("the winner is x")
            setScoreP1(scoreP1+1)
            console.log(scoreP1)
        }
        else{
            console.log("the winner is o")
            setScoreP2(scoreP2+1)
            console.log(scoreP1)
        }
    }
    // var checked = false
        return(
        <>
        <h1>Tic Tac Toe</h1>
        <form>
        <label>player1 name</label>
        <input className='pname' type="text" id="fname" value={nameP1} onChange={submit1}></input>
        <label>player2 name</label>
        <input className='pname' type="text" id="fname" value={nameP2} onChange={submit2}></input>
        </form>
        <Board squares = {history[stepNumber]} onClick={handleClick}/>
        <button className='play' onClick={playagain}>Play again</button>
        <button className='reset' onClick={scorereset}>Reset result</button>
        <div className="info-wrapper">
            <h3>{winner? "Winner: "+winner: "Next Player: " + xO}</h3>
            <div className='scoreboared'>
                <label>{nameP1}</label>
                <h2 className='p1'>{scoreP1}</h2>
                <label>{nameP2}</label>
                <h2 className='p2'>{scoreP2}</h2>
            </div>
        </div>
        </>
    )
}

export default Game