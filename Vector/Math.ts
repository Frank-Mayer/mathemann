import type { Vector2, Vector3 } from ".";

type IOverload = {
  (v1: Vector2, v2: Vector2): number;
  (v1: Vector3, v2: Vector3): number;
};

/**
 * Gets the angle of the target vector relative to the source vector.
 * The result is an angle expressed in radians.
 */
export const AngleBetweenVectors: IOverload = <
  V extends Vector2 | Vector3 = Vector3
>(
  source: V,
  target: V
): number => {
  const dot = source.dot(target as any);
  const len = source.length() * target.length();
  return Math.acos(dot / len);
};
