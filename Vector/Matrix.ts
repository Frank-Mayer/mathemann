/**
 * 4x4 matrix of floating point values.
 */
export class Matrix {
  private readonly _data: Float32Array;

  constructor(
    data?:
      | [
          [number, number, number, number],
          [number, number, number, number],
          [number, number, number, number],
          [number, number, number, number]
        ]
      | Array<Array<number>>
      | Matrix
  ) {
    if (data) {
      if (Array.isArray(data)) {
        this._data = new Float32Array(16);
        for (let i = 0; i < 4; i++) {
          const a = data[i];
          if (a) {
            for (let j = 0; j < 4; j++) {
              const b = a[j];
              if (b) {
                this._data[i * 4 + j] = b;
              } else {
                throw new Error(`Matrix data is invalid.`);
              }
            }
          } else {
            throw new Error(`Matrix data is invalid.`);
          }
        }
      } else {
        this._data = data._data;
      }
    } else {
      this._data = new Float32Array(16);
    }
  }

  /**
   * Apply Scale to this matrix.
   */
  public applyScale(scale: number) {
    for (let i = 0; i < 16; i++) {
      this._data[i] *= scale;
    }
  }

  public computeHash(): number {
    let hash = 0;
    for (let i = 0; i < 16; i++) {
      hash = (hash * 31) ^ this._data[i]!;
    }
    return hash;
  }

  public toArray(): [
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number]
  ] {
    return [
      [this._data[0]!, this._data[1]!, this._data[2]!, this._data[3]!],
      [this._data[4]!, this._data[5]!, this._data[6]!, this._data[7]!],
      [this._data[8]!, this._data[9]!, this._data[10]!, this._data[11]!],
      [this._data[12]!, this._data[13]!, this._data[14]!, this._data[15]!],
    ];
  }
}
