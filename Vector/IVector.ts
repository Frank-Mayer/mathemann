/** @internal */
export interface IVector {
  dimension: number;

  plus: (v: any) => IVector;

  minus: (v: any) => IVector;

  multiply: (v: any) => IVector;

  divide: (v: any) => IVector;

  equals: (v: any, tolerance?: number) => boolean;

  length: () => number;

  dot: (v: any) => number;

  normalize: () => IVector;

  toString: () => string;

  toArray: () => Array<number>;
}
