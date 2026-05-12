import { useState, useMemo } from 'react';
import { MathDisplay } from '../components/MathDisplay';
import { sampleFunction, formatNumber } from '../math/calculus';
import { Layout } from '../components/Layout';

export const FTCModule = ({ activeModule, setActiveModule }: any) => {
  const [xVal, setXVal] = useState(2);
  const a = 0;

  const f = (t: number) => Math.sin(t) + 1.5;
  const F_exact = (t: number) => -Math.cos(t) + 1.5 * t;
  const constant = -Math.cos(a) + 1.5 * a;

  const getF = (x: number) => F_exact(x) - constant;

  const plotPoints_f = useMemo(() => sampleFunction(f, 0, 6, 100), []);
  const plotPoints_F = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const x = (6 / 100) * i;
      points.push({ x, y: getF(x) });
    }
    return points;
  }, []);

  // Scaling
  const scaleX = 100;
  const scaleY = 40;
  const offsetX = 50;
  const offsetY_f = 250;
  const offsetY_F = 550;

  const toSVGX = (x: number) => offsetX + x * scaleX;
  const toSVGY_f = (y: number) => offsetY_f - y * scaleY;
  const toSVGY_F = (y: number) => offsetY_F - y * scaleY;

  const controls = (
    <>
      <h2>Fundamental Theorem</h2>
      <p>The bridge between accumulation (integral) and rate of change (derivative).</p>

      <div className="control-group">
        <label>Upper Limit x: {formatNumber(xVal, 2)}</label>
        <input 
          type="range" 
          min="0" 
          max="6" 
          step="0.05" 
          value={xVal} 
          onChange={(e) => setXVal(Number(e.target.value))} 
        />
      </div>

      <div className="math-pane">
        <MathDisplay formula="F(x) = \int_a^x f(t) \, dt" block />
        <MathDisplay formula="\frac{d}{dx} F(x) = f(x)" block />
        <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
          The value of <span style={{ color: '#818cf8' }}>F(x)</span> on the bottom plot is exactly equal to the shaded area under <span style={{ color: '#38bdf8' }}>f(t)</span> on the top plot.
        </div>
      </div>
    </>
  );

  return (
    <Layout controls={controls} activeModule={activeModule} setActiveModule={setActiveModule}>
      <div className="canvas-container" style={{ position: 'absolute', inset: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 800 600">
          {/* Top Plot: f(t) */}
          <text x={offsetX} y={offsetY_f - 120} fill="#f8fafc" fontSize="14" fontWeight="bold">f(t) - Rate of Change</text>
          <line x1={offsetX} y1={offsetY_f} x2={offsetX + 600} y2={offsetY_f} stroke="var(--axis-color)" strokeWidth="1" />
          
          {/* Area under f(t) */}
          <path
            d={`M ${toSVGX(a)},${offsetY_f} L ${sampleFunction(f, a, xVal, 50).map(p => `${toSVGX(p.x)},${toSVGY_f(p.y)}`).join(' L ')} L ${toSVGX(xVal)},${offsetY_f} Z`}
            fill="rgba(56, 189, 248, 0.2)"
          />
          
          <path
            d={`M ${plotPoints_f.map(p => `${toSVGX(p.x)},${toSVGY_f(p.y)}`).join(' L ')}`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
          />

          {/* Bottom Plot: F(x) */}
          <text x={offsetX} y={offsetY_F - 120} fill="#f8fafc" fontSize="14" fontWeight="bold">F(x) - Accumulated Area</text>
          <line x1={offsetX} y1={offsetY_F} x2={offsetX + 600} y2={offsetY_F} stroke="var(--axis-color)" strokeWidth="1" />
          
          <path
            d={`M ${plotPoints_F.map(p => `${toSVGX(p.x)},${toSVGY_F(p.y)}`).join(' L ')}`}
            fill="none"
            stroke="#818cf8"
            strokeWidth="2"
          />

          {/* Markers */}
          <line x1={toSVGX(xVal)} y1={offsetY_f + 20} x2={toSVGX(xVal)} y2={toSVGY_F(getF(xVal))} stroke="rgba(255,255,255,0.2)" strokeDasharray="4" />
          <circle cx={toSVGX(xVal)} cy={toSVGY_F(getF(xVal))} r="4" fill="#818cf8" />
          
          <text x={toSVGX(xVal) + 10} y={toSVGY_F(getF(xVal)) - 10} fill="#818cf8" fontSize="12">
            F({formatNumber(xVal, 1)}) = {formatNumber(getF(xVal), 2)}
          </text>
        </svg>
      </div>
    </Layout>
  );
};
