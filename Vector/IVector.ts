/** @internal */
export interface IVector {
  dimension: number;

  plus: (v: any) => IVector;

  add: (v: any) => IVector;

  minus: (v: any) => IVector;

  subtract: (v: any) => IVector;

  multiply: (v: any) => IVector;

  multipliedBy: (v: any) => IVector;

  divide: (v: any) => IVector;

  dividedBy: (v: any) => IVector;

  equals: (v: any, tolerance?: number) => boolean;

  copy: () => IVector;

  length: () => number;

  dot: (v: any) => number;

  cross: (v: any) => IVector | number;

  normalize: () => IVector;

  toString: () => string;

  toArray: () => Array<number>;
}
