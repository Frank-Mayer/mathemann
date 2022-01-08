/**
 * 4x4 matrix of floating point values.
 */
export class Matrix<T = number> {
  /** @internal */
  private readonly _data: Array<Array<T>>;

  constructor(data: Array<Array<T>>) {
    this._data = data;
  }

  public static fromAxis<X, Y, T>(
    X: Array<X>,
    Y: Array<Y>,
    merge: (x: X, y: Y) => T
  ) {
    for (let x = 0; x < X.length; x++) {
      const row = new Array<T>(Y.length);
      for (let y = 0; y < Y.length; y++) {
        row[y] = merge(X[x]!, Y[y]!);
      }
    }
  }

  public map<U>(cb: (value: T, x: number, y: number, matrix: Matrix<T>) => U) {
    const result = new Array<Array<U>>(this._data.length);

    for (let x = 0; x < this._data.length; x++) {
      const row = new Array<U>(this._data[x]!.length);
      for (let y = 0; y < this._data[x]!.length; y++) {
        row[y] = cb(this._data[x]![y]!, x, y, this);
      }
      result[x] = row;
    }

    return new Matrix(result);
  }

  /**
   * Apply callback function to all cells in this matrix.
   */
  public apply(cb: (x: number, y: number, value: T) => T) {
    for (let x = 0; x < this._data.length; x++) {
      const row = this._data[x]!;
      for (let y = 0; y < row.length; y++) {
        const cell = row[y]!;
        row[y] = cb(x, y, cell);
      }
    }
  }

  public toArray() {
    return Array.from(this._data);
  }

  public flat() {
    return this._data.flat();
  }

  public toString() {
    return this._data.map((row) => row.join("\t")).join("\n");
  }

  public *[Symbol.iterator]() {
    for (let x = 0; x < this._data.length; x++) {
      const row = this._data[x]!;
      for (let y = 0; y < row.length; y++) {
        const cell = row[y]!;
        yield [cell, x, y];
      }
    }
  }
}
