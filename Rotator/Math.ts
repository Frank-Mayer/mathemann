import type { anyVector, Vector2, Vector3 } from "../Vector";
import { Rotator3 } from "./Rotator3";

export const radToDeg = (rad: number) => (rad * 180) / Math.PI;

export const degToRad = (deg: number) => (deg * Math.PI) / 180;

export const findLookAtRotation: {
  (start: Vector3, target: Vector3): Rotator3;
  (start: Vector2, target: Vector2): number;
} = (start: anyVector, target: anyVector): any => {
  if (start.dimension === 3 && target.dimension === 3) {
    const delta = target.minus(start);
    const normalizedDelta = delta.normalize();

    if (delta.z === 0) {
      return new Rotator3(
        0, // x is not needed
        0, // y is not needed
        Math.atan2(normalizedDelta.y, normalizedDelta.x)
      );
    }

    return new Rotator3(
      0, // x is not needed
      /*
      asin(normalizedDelta.z * sin(90°) / normalizedDelta.length)
      sin(90°) == 1
      normalizedDelta.length == 1
      => asin(normalizedDelta.z)
      */
      Math.asin(normalizedDelta.z),
      Math.atan2(normalizedDelta.y, normalizedDelta.x)
    );
  }

  if (start.dimension === 2 && target.dimension === 2) {
    const normalizedDelta = target.minus(start).normalize();
    return Math.atan2(normalizedDelta.y, normalizedDelta.x);
  }

  throw new Error("Invalid dimensions");
};
