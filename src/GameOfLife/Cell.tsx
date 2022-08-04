import React from "react";
import { CELL_SIZE } from "./constants";

type CellProps = {
  x: number;
  y: number;
};

const Cell: React.FC<CellProps> = ({ x, y }) => {
  return (
    <div
      className="Cell"
      style={{
        left: `${CELL_SIZE * x + 1}px`,
        top: `${CELL_SIZE * y + 1}px`,
        width: `${CELL_SIZE - 1}px`,
        height: `${CELL_SIZE - 1}px`,
      }}
    />
  );
};

export default Cell;
