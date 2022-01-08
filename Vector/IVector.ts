/** @internal */
export interface IVector extends Iterable<number> {
  dimension: number;

  get(index: number): number;

  set(index: number, value: number): void;

  plus: (v: any) => IVector;

  add: (v: any) => this;

  minus: (v: any) => IVector;

  subtract: (v: any) => this;

  multiply: (v: any) => this;

  multipliedBy: (v: any) => IVector;

  divide: (v: any) => this;

  dividedBy: (v: any) => IVector;

  equals: (v: any, tolerance?: number) => boolean;

  copy: () => IVector;

  length: () => number;

  dot: (v: any) => number;

  cross: (v: any) => IVector | number;

  normalize(): this;

  getNormal: () => IVector;

  toString: () => string;

  toArray: () => Array<number>;
}
