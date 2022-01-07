import type { IVector } from "../Vector/IVector";

export interface IRotator {
  dimension: number;
  getRotationXVector(): IVector;
  toArray(): Array<number>;
}
