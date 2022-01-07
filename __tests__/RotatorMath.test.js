const findLookAtRotation = require("../cjs/Rotator/Math").findLookAtRotation;
const Vector3 = require("../cjs/Vector/Vector3").Vector3;

const numDigits = 5;

test("Rotator.Math.findLookAtRotation", () => {
  {
    const a = new Vector3(5, 5, 0);
    const b = new Vector3(10, 10, 0);

    const r = findLookAtRotation(a, b);

    expect(r.x).toBeCloseTo(0, numDigits);
    expect(r.y).toBeCloseTo(0, numDigits);
    expect(r.z).toBeCloseTo(45, numDigits);
  }

  {
    const a = new Vector3(-10, -10, -10);
    const b = new Vector3(10, 10, 10);

    const r = findLookAtRotation(a, b);

    expect(r.x).toBeCloseTo(0, numDigits);
    expect(r.y).toBeCloseTo(35.264389682754654, numDigits);
    expect(r.z).toBeCloseTo(45, numDigits);
  }

  {
    const a = new Vector3(0, 0, 0);
    const b = new Vector3(20, 0, 20);

    const r = findLookAtRotation(a, b);

    expect(r.x).toBeCloseTo(0, numDigits);
    expect(r.y).toBeCloseTo(45, numDigits);
    expect(r.z).toBeCloseTo(0, numDigits);
  }
});
