export type MatrixCoordinates = number[];

export interface MatrixCell<T = string> {
  value: T;
  coord: MatrixCoordinates;
  matrix: Matrix<T>;
}

export type Matrix<T = string> = Map<string, MatrixCell<T>>;

export type MatrixOrCell<T = string> = Matrix<T> | MatrixCell<T> | undefined;

export type Direction = '↑' | '↓' | '↕' | '←' | '→' | '↔' | '↖' | '↘' | '⤡' | '↗' | '↙' | '⤢' | '*' | '+' | 'x';

export interface MatrixDirection<T = string> {
  matrix: Matrix<T>;
  direction: Direction;
}

export namespace MatrixCell {
  export const move = (coord: MatrixCoordinates, direction: Direction, distance = 1) => {
    let [x, y] = coord;
    switch (direction) {
      case '↑':
        return [x, y - distance];
      case '↓':
        return [x, y + distance];
      case '←':
        return [x - distance, y];
      case '→':
        return [x + distance, y];
      case '↖':
        return [x - distance, y - distance];
      case '↗':
        return [x + distance, y - distance];
      case '↙':
        return [x - distance, y + distance];
      case '↘':
        return [x + distance, y + distance];
      default:
        return coord;
    }
  };
}

export namespace MatrixCoordinates {
  export const fromString = (coord: string): MatrixCoordinates => coord.split(',').map(Number);
}

export namespace MatrixOrCell {
  export const extractMatrix = <T>(matrixOrCell: MatrixOrCell<T>): Matrix<T> | undefined => {
    if (!matrixOrCell) return undefined;
    if (matrixOrCell instanceof Map) return matrixOrCell;
    const { matrix } = matrixOrCell;
    return matrix;
  };
}
