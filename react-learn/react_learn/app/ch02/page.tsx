'use client';

import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./app";
import next from "next";

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

export default function Ch02() {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    
    const [currentMove, setCurrentMove] = useState(0);
    // const currentSqaures = history[history.length - 1];
    const currentSqaures = history[currentMove];
    // const [isX, setIsX] = useState(true);
    const isX = currentMove % 2 === 0;  // 直接根据回合判断，而不是 x = !x

    function handlePlay(nextSquare) {
        const nextHis = [... history.slice(0, currentMove + 1), nextSquare];
        setHistory(nextHis);
        setCurrentMove(nextHis.length - 1);
        // setIsX(!isX);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        // setIsX(nextMove % 2 === 0)
    }

    const move = history.map((square, move) => {
        let desc;
        if (move > 0) {
            desc = "Goto move #" + move;
        } else {
            desc = "Goto game start";
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });
    

    return (
        <div className="game">
            <div className="game-board">
                <App isX={isX} square={currentSqaures} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{move}</ol>
            </div>
        </div>
    );
}
