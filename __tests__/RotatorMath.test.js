const Vector3 = require("../cjs/Vector/Vector3").Vector3;
const Vector2 = require("../cjs/Vector/Vector2").Vector2;
const findLookAtRotation = require("../cjs/Rotator/Math").findLookAtRotation;
const degToRad = require("../cjs/Rotator/Math").degToRad;
const radToDeg = require("../cjs/Rotator/Math").radToDeg;

const numDigits = 5;

test("Rotator.Math.radToDeg", () => {
  expect(radToDeg(0)).toBeCloseTo(0, numDigits);
  expect(radToDeg(Math.PI / 4)).toBeCloseTo(45, numDigits);
  expect(radToDeg(Math.PI / 2)).toBeCloseTo(90, numDigits);
  expect(radToDeg(Math.PI)).toBeCloseTo(180, numDigits);
  expect(radToDeg((Math.PI * 3) / 2)).toBeCloseTo(270, numDigits);
  expect(radToDeg(Math.PI * 2)).toBeCloseTo(360, numDigits);
  expect(radToDeg(Math.PI * 3)).toBeCloseTo(540, numDigits);
  expect(radToDeg(Math.PI * 4)).toBeCloseTo(720, numDigits);
});

test("Rotator.Math.degToRad", () => {
  expect(degToRad(0)).toBeCloseTo(0, numDigits);
  expect(degToRad(90)).toBeCloseTo(Math.PI / 2, numDigits);
  expect(degToRad(180)).toBeCloseTo(Math.PI, numDigits);
  expect(degToRad(270)).toBeCloseTo(Math.PI * 1.5, numDigits);
  expect(degToRad(360)).toBeCloseTo(Math.PI * 2, numDigits);
  expect(degToRad(720)).toBeCloseTo(Math.PI * 4, numDigits);
});

test("Rotator.Math.degToRad <-random-> Rotator.Math.radToDeg", () => {
  for (let i = 0; i < 1000; i++) {
    const deg = Math.random() * 36000;
    const rad = degToRad(deg);
    expect(radToDeg(rad)).toBeCloseTo(deg, numDigits);
  }
});

test("Rotator.Math.findLookAtRotation 2D", () => {
  {
    const a = new Vector2(5, 5);
    const b = new Vector2(10, 5);

    expect(findLookAtRotation(a, b)).toBeCloseTo(0, numDigits);
  }

  {
    const a = new Vector2(5, 5);
    const b = new Vector2(10, 10);

    expect(findLookAtRotation(a, b)).toBeCloseTo(degToRad(45), numDigits);
  }
});

test("Rotator.Math.findLookAtRotation 3D", () => {
  {
    const a = new Vector3(5, 5, 0);
    const b = new Vector3(10, 10, 0);

    const r = findLookAtRotation(a, b);

    expect(r.x).toBeCloseTo(0, numDigits);
    expect(r.y).toBeCloseTo(0, numDigits);
    expect(r.z).toBeCloseTo(degToRad(45), numDigits);
  }

  {
    const a = new Vector3(-10, -10, -10);
    const b = new Vector3(10, 10, 10);

    const r = findLookAtRotation(a, b);

    expect(r.x).toBeCloseTo(0, numDigits);
    expect(r.y).toBeCloseTo(degToRad(35.264389682754654), numDigits);
    expect(r.z).toBeCloseTo(degToRad(45), numDigits);
  }

  {
    const a = new Vector3(0, 0, 0);
    const b = new Vector3(20, 0, 20);

    const r = findLookAtRotation(a, b);

    expect(r.x).toBeCloseTo(0, numDigits);
    expect(r.y).toBeCloseTo(degToRad(45), numDigits);
    expect(r.z).toBeCloseTo(0, numDigits);
  }
});
