export function updateGrid(grid, rows, cols) {
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let aliveNeighbors = 0;

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) {
            continue;
          }

          const r = row + dr;
          const c = col + dc;

          if (r < 0 || r >= rows || c < 0 || c >= cols) {
            continue;
          }

          if (grid[r][c]) {
            aliveNeighbors++;
          }
        }
      }

      const alive = grid[row][col];
      if (alive) {
        nextGrid[row][col] = aliveNeighbors === 2 || aliveNeighbors === 3;
      } else {
        nextGrid[row][col] = aliveNeighbors === 3;
      }
    }
  }

  return nextGrid;
}
