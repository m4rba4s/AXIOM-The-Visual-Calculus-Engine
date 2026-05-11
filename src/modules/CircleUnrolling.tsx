import { useState } from 'react';
import { MathDisplay } from '../components/MathDisplay';

export const CircleUnrollingModule = () => {
  const [radius, setRadius] = useState(150);
  const [unrollFactor, setUnrollFactor] = useState(0); // 0 = circle, 1 = triangle

  const maxRadius = 200;
  const numRings = 20;

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <div className="sidebar" style={{ position: 'relative', zIndex: 10 }}>
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
      </div>

      <div className="canvas-container" style={{ flex: 1, background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="100%" height="100%" viewBox="0 0 800 600">
          <g transform="translate(400, 300)">
            {/* Grid/Axes */}
            <line x1="-350" y1="200" x2="350" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            
            {Array.from({ length: numRings }).map((_, i) => {
              const r = (radius / numRings) * (i + 1);
              const circumference = 2 * Math.PI * r;
              
              // Interpolation between circle and line
              // When unrollFactor = 0: circle
              // When unrollFactor = 1: horizontal line at y=200, centered?
              
              // We'll place the triangle on the right and circle on the left or just morph?
              // The user's python script had two plots. Let's do a morphing visualization.
              
              const xOffset = -200 * (1 - unrollFactor);
              const yOffset = 0;
              
              if (unrollFactor < 0.1) {
                // Draw circle
                return (
                  <circle
                    key={i}
                    cx={xOffset}
                    cy={yOffset}
                    r={r}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    opacity={0.3 + (i / numRings) * 0.7}
                  />
                );
              } else {
                // Draw unrolling arc or line
                // For simplicity in a prototype, we'll morph from circle to line
                // A better visual is "peeling" but that's complex path math.
                // Let's do a "straightening" morph.
                
                const width = circumference * unrollFactor;
                const height = 2; // thickness
                
                return (
                  <rect
                    key={i}
                    x={xOffset - width / 2}
                    y={200 - r}
                    width={width}
                    height={height}
                    fill="#38bdf8"
                    opacity={0.3 + (i / numRings) * 0.7}
                    rx="1"
                  />
                );
              }
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
    </div>
  );
};
