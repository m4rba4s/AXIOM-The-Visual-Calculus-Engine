import { useState } from 'react';
import { MathDisplay } from '../components/MathDisplay';
import { Layout } from '../components/Layout';

export const CircleUnrollingModule = ({ activeModule, setActiveModule }: any) => {
  const [radius, setRadius] = useState(150);
  const [unrollFactor, setUnrollFactor] = useState(0); // 0 = circle, 1 = triangle

  const maxRadius = 200;
  const numRings = 20;

  const controls = (
    <>
      <h2>Circle Deconstruction</h2>
      <p>Visualizing the derivation of circle area by integrating concentric rings.</p>

      <div className="control-group">
        <label>Radius R: {radius}</label>
        <input 
          type="range" 
          min="50" 
          max={maxRadius} 
          value={radius} 
          onChange={(e) => setRadius(Number(e.target.value))} 
        />
      </div>

      <div className="control-group">
        <label>Unroll Factor: {Math.round(unrollFactor * 100)}%</label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={unrollFactor} 
          onChange={(e) => setUnrollFactor(Number(e.target.value))} 
        />
      </div>

      <div className="math-pane">
        <MathDisplay formula="A = \int_0^R 2\pi r \, dr" block />
        <MathDisplay formula="A = \left[ \pi r^2 \right]_0^R = \pi R^2" block />
        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Each ring of radius $r$ and thickness $dr$ unrolls into a strip of length $2\pi r$. The sum of all strips forms a right triangle with base $2\pi R$ and height $R$.
        </p>
      </div>
    </>
  );

  return (
    <Layout controls={controls} activeModule={activeModule} setActiveModule={setActiveModule}>
      <div className="canvas-container" style={{ position: 'absolute', inset: 0, background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="100%" height="100%" viewBox="0 0 800 600">
          <g transform="translate(400, 300)">
            {/* Grid/Axes */}
            <line x1="-350" y1="200" x2="350" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            
            {Array.from({ length: numRings }).map((_, i) => {
              const r = (radius / numRings) * (i + 1);
              const circumference = 2 * Math.PI * r;
              
              const numPoints = 60;
              const points = [];
              
              for (let j = 0; j <= numPoints; j++) {
                const t = j / numPoints;
                
                // Circle point (starts from bottom, goes counter-clockwise to "unroll")
                const angle = Math.PI / 2 - t * 2 * Math.PI;
                const circX = -200 + r * Math.cos(angle);
                const circY = r * Math.sin(angle);
                
                // Line point (starts at x=0, goes right to form the base of the triangle)
                const lineX = 0 + t * circumference;
                const lineY = 200 - r;
                
                // Linear morphing interpolation
                const x = circX * (1 - unrollFactor) + lineX * unrollFactor;
                const y = circY * (1 - unrollFactor) + lineY * unrollFactor;
                
                points.push(`${x},${y}`);
              }
              
              return (
                <polyline
                  key={i}
                  points={points.join(' ')}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity={0.3 + (i / numRings) * 0.7}
                />
              );
            })}

            {/* Labels */}
            {unrollFactor > 0.8 && (
              <>
                <text x="220" y="215" fill="#94a3b8" fontSize="12">2πR (Base)</text>
                <text x="-10" y={200 - radius} fill="#94a3b8" fontSize="12" textAnchor="end">R (Height)</text>
              </>
            )}
          </g>
        </svg>
      </div>
    </Layout>
  );
};
