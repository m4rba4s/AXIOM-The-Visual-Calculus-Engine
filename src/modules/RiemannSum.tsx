import { useState, useMemo } from 'react';
import { MathDisplay } from '../components/MathDisplay';
import { sampleFunction, riemannSum, formatNumber } from '../math/calculus';

export const RiemannSumModule = () => {
  const [n, setN] = useState(10);
  const [bounds] = useState({ a: 0, b: 4 });
  const [sumType, setSumType] = useState<'left' | 'right' | 'mid'>('mid');

  const fn = (x: number) => 0.5 * x * x; // f(x) = 0.5x^2
  const exactArea = (0.5 * Math.pow(bounds.b, 3) / 3) - (0.5 * Math.pow(bounds.a, 3) / 3);

  const { sum, rectangles } = useMemo(() => 
    riemannSum(fn, bounds.a, bounds.b, n, sumType), 
    [n, bounds, sumType]
  );

  const plotPoints = useMemo(() => 
    sampleFunction(fn, -1, 5, 100), 
    []
  );

  // Scaling factors for SVG
  const scaleX = 100;
  const scaleY = 30;
  const offsetX = 100;
  const offsetY = 500;

  const toSVGX = (x: number) => offsetX + x * scaleX;
  const toSVGY = (y: number) => offsetY - y * scaleY;

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <div className="sidebar">
        <h2>Riemann Sums</h2>
        <p>Approximating the area under a curve via a sum of rectangles.</p>

        <div className="control-group">
          <label>Partition n: {n}</label>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={n} 
            onChange={(e) => setN(Number(e.target.value))} 
          />
        </div>

        <div className="control-group">
          <label>Sum Type</label>
          <select 
            value={sumType} 
            onChange={(e) => setSumType(e.target.value as any)}
            style={{ width: '100%', background: '#1e293b', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem' }}
          >
            <option value="left">Left Rectangles</option>
            <option value="right">Right Rectangles</option>
            <option value="mid">Midpoint Rectangles</option>
          </select>
        </div>

        <div className="math-pane">
          <MathDisplay formula={`S_n = \\sum_{i=1}^n f(x_i^*) \\Delta x`} block />
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Riemann Sum:</span>
              <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{formatNumber(sum)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Exact Value:</span>
              <span style={{ color: '#818cf8' }}>{formatNumber(exactArea)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Error:</span>
              <span style={{ color: '#ef4444' }}>{formatNumber(Math.abs(sum - exactArea))}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="canvas-container" style={{ flex: 1 }}>
        <svg width="100%" height="100%" viewBox="0 0 800 600">
          {/* Axes */}
          <line x1={toSVGX(-1)} y1={offsetY} x2={toSVGX(5)} y2={offsetY} stroke="var(--axis-color)" strokeWidth="2" />
          <line x1={offsetX} y1={offsetY + 50} x2={offsetX} y2={toSVGY(15)} stroke="var(--axis-color)" strokeWidth="2" />

          {/* Rectangles */}
          {rectangles.map((rect, i) => (
            <rect
              key={i}
              x={toSVGX(rect.x)}
              y={rect.height >= 0 ? toSVGY(rect.height) : offsetY}
              width={rect.width * scaleX}
              height={Math.abs(rect.height) * scaleY}
              fill="rgba(56, 189, 248, 0.3)"
              stroke="var(--accent-color)"
              strokeWidth="1"
            />
          ))}

          {/* Function Curve */}
          <path
            d={`M ${plotPoints.map(p => `${toSVGX(p.x)},${toSVGY(p.y)}`).join(' L ')}`}
            fill="none"
            stroke="#f8fafc"
            strokeWidth="3"
          />

          {/* Points/Markers */}
          <text x={toSVGX(bounds.a)} y={offsetY + 20} fill="#94a3b8" fontSize="12" textAnchor="middle">a={bounds.a}</text>
          <text x={toSVGX(bounds.b)} y={offsetY + 20} fill="#94a3b8" fontSize="12" textAnchor="middle">b={bounds.b}</text>
        </svg>
      </div>
    </div>
  );
};
