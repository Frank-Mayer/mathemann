import type { Vector3 } from "../Vector";
import { Rotator3 } from "./Rotator3";

export const radToDeg = (rad: number) => (rad * 180) / Math.PI;

export const degToRad = (deg: number) => (deg * Math.PI) / 180;

export const findLookAtRotation = (
  start: Vector3,
  target: Vector3
): Rotator3 => {
  if (start.dimension === 3 && target.dimension === 3) {
    const delta = target.minus(start);
    const normalizedDelta = delta.normalize();

    // y
    const c = delta.length();
    const q = delta.z ** 2 / c;
    const p = c - q;

    return new Rotator3(
      0, // x is not needed
      radToDeg(Math.atan(Math.sqrt(p * q) / p)),
      radToDeg(Math.atan2(normalizedDelta.y, normalizedDelta.x))
    );
  }

  throw new Error("Invalid dimensions");
};
