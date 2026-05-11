export type MathFunction = (x: number) => number;

export interface Point {
  x: number;
  y: number;
}

export const sampleFunction = (
  fn: MathFunction,
  start: number,
  end: number,
  steps: number
): Point[] => {
  const points: Point[] = [];
  const stepSize = (end - start) / steps;
  for (let i = 0; i <= steps; i++) {
    const x = start + i * stepSize;
    points.push({ x, y: fn(x) });
  }
  return points;
};

export const riemannSum = (
  fn: MathFunction,
  a: number,
  b: number,
  n: number,
  type: 'left' | 'right' | 'mid' = 'mid'
): { sum: number; rectangles: { x: number; width: number; height: number }[] } => {
  const dx = (b - a) / n;
  let sum = 0;
  const rectangles = [];

  for (let i = 0; i < n; i++) {
    let x_val;
    if (type === 'left') x_val = a + i * dx;
    else if (type === 'right') x_val = a + (i + 1) * dx;
    else x_val = a + i * dx + dx / 2;

    const h = fn(x_val);
    sum += h * dx;
    rectangles.push({ x: a + i * dx, width: dx, height: h });
  }

  return { sum, rectangles };
};

export const formatNumber = (num: number, precision: number = 4): string => {
  return num.toFixed(precision);
};
