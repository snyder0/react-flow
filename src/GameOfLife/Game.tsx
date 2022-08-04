import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { unstable_batchedUpdates } from "react-dom";
import { Handle, Position } from "react-flow-renderer";
import Cell from "./Cell";
import { CELL_SIZE, HEIGHT, WIDTH } from "./constants";
import "./Game.css";

let rows = HEIGHT / CELL_SIZE;
let cols = WIDTH / CELL_SIZE;

const makeEmptyBoard = () => {
  let board: boolean[][] = [];
  for (let y = 0; y < rows; y++) {
    board[y] = [];
    for (let x = 0; x < cols; x++) {
      board[y][x] = false;
    }
  }

  return board;
};

type GameBoardProps = {
  data: any;
  isConnectable: boolean;
};

const GameBoard: React.FC<GameBoardProps> = ({
  data: { randomPercentage = 0.8, onConnect = () => {} },
  isConnectable,
}) => {
  const [board, setBoard] = useState<boolean[][]>([[]]);
  const [cells, setCells] = useState<any[]>();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [interval, setInterval] = useState<number>(10000);
  const [generations, setGenerations] = useState<number>(10000);

  const boardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setBoard(makeEmptyBoard());
  }, [setBoard]);

  const getElementOffset = () => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const doc = document.documentElement;

      return {
        x: rect.left + window.pageXOffset - doc.clientLeft,
        y: rect.top + window.pageYOffset - doc.clientTop,
      };
    }
  };

  /**
   * Calculate the number of neighbors at point (x, y)
   * @param {Array} board
   * @param {int} x
   * @param {int} y
   */
  const calculateNeighbors = (
    board: boolean[][] | undefined,
    x: number,
    y: number
  ) => {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (
        x1 >= 0 &&
        x1 < cols &&
        y1 >= 0 &&
        y1 < rows &&
        board &&
        board[y1][x1]
      ) {
        neighbors++;
      }
    }

    return neighbors;
  };

  const makeCells = useCallback(
    (nextBoard: boolean[][]) => {
      let cells = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (board && board[y][x]) {
            cells.push({ x, y });
          }
        }
      }

      return cells;
    },
    [board]
  );

  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const runIteration = useCallback(async () => {
    if (!runningRef.current) {
      return;
    }

    unstable_batchedUpdates(() => {
      setBoard((nextBoard) => {
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            let neighbors = calculateNeighbors(board, x, y);
            if (board && board[y][x]) {
              if (neighbors === 2 || neighbors === 3) {
                // Survives to next generation
                nextBoard[y][x] = true;
              } else {
                // Dies to over population
                nextBoard[y][x] = false;
              }
            } else {
              if (board && !board[y][x] && neighbors === 3) {
                // Born into next generation
                nextBoard[y][x] = true;
              }
            }
          }
        }
        setCells(makeCells(nextBoard));
        return nextBoard;
      });
    });

    setTimeout(runIteration, 100);
  }, [board, makeCells]);

  const handleIntervalChange = (event: any) => {
    setInterval(event.target.value);
  };

  const handleClear = () => {
    setBoard(makeEmptyBoard());
    setCells(makeCells(board));
  };

  const handleRandom = () => {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (board) {
          // board[y][x] = Math.random() >= 0.8;
          board[y][x] = Math.random() >= randomPercentage;
        }
      }
    }

    setCells(makeCells(board));
  };

  const handleClick = (event: any) => {
    const elemOffset = getElementOffset();
    if (elemOffset) {
      const offsetX = event.clientX - elemOffset.x;
      const offsetY = event.clientY - elemOffset.y;

      const x = Math.floor(offsetX / CELL_SIZE);
      const y = Math.floor(offsetY / CELL_SIZE);

      if (board && x >= 0 && x <= cols && y >= 0 && y <= rows) {
        board[y][x] = !board[y][x];
      }

      setCells(makeCells(board));
    }
  };

  const runGame = () => {
    setIsRunning(true);

    if (!isRunning) {
      runningRef.current = true;
      runIteration();
    }
  };

  const stopGame = () => {
    setIsRunning(false);
    // if (timeoutHandler) {
    //   window.clearTimeout(timeoutHandler);
    //   setTimeoutHandler(null);
    // }
  };

  return (
    <div className="GameNode">
      <Handle id="a" type="target" position={Position.Left} />
      {/* <Handle type="source" position={Position.Left} id="b" /> */}
      <div
        className="Board"
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
        onClick={handleClick}
        ref={boardRef}
      >
        {cells &&
          cells.map((cell) => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))}
      </div>

      <div className="controls">
        Generations <input value={interval} onChange={handleIntervalChange} />{" "}
        {isRunning ? (
          <button className="button" onClick={stopGame}>
            Stop
          </button>
        ) : (
          <button className="button" onClick={runGame}>
            Run
          </button>
        )}
        <button className="button" onClick={handleRandom}>
          Random
        </button>
        <button className="button" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
