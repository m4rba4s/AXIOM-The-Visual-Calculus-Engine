import { useState, useMemo } from 'react';
import { MathDisplay } from '../components/MathDisplay';
import { formatNumber } from '../math/calculus';
import { Layout } from '../components/Layout';

export const GabrielHornModule = ({ activeModule, setActiveModule }: any) => {
  const [xMax, setXMax] = useState(5);
  const [slices, setSlices] = useState(20);

  const fn = (x: number) => 1 / x;
  
  // Mathematical logic: 
  // Volume = PI * integral(1/x^2) from 1 to xMax
  const volume = Math.PI * (1 - 1 / xMax);
  
  // 3D Rendering logic
  const centerX = 150;
  const centerY = 300;
  const scaleX = 100;
  const scaleY = 150;

  const points = useMemo(() => {
    const pts = [];
    const step = (xMax - 1) / slices;
    for (let i = 0; i <= slices; i++) {
      const x = 1 + i * step;
      const r = fn(x);
      pts.push({ x, r });
    }
    return pts;
  }, [xMax, slices]);

  const controls = (
    <>
      <h2>Gabriel's Horn</h2>
      <p>A mathematical paradox: a solid with infinite surface area but finite volume.</p>

      <div className="control-group">
        <label>Length (x-axis): {formatNumber(xMax, 1)}</label>
        <input type="range" min="1.1" max="10" step="0.1" value={xMax} onChange={(e) => setXMax(Number(e.target.value))} />
      </div>

      <div className="control-group">
        <label>Visual Fidelity: {slices}</label>
        <input type="range" min="5" max="100" value={slices} onChange={(e) => setSlices(Number(e.target.value))} />
      </div>

      <div className="math-pane">
        <div style={{ color: '#fbbf24', fontWeight: 'bold' }}>The Paradox:</div>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Created by rotating $y = 1/x$ for $x \ge 1$.</p>
        
        <div style={{ color: '#38bdf8', fontSize: '0.85rem', marginTop: '1rem' }}>Volume (Finite):</div>
        <MathDisplay formula="V = \pi \int_1^\infty \frac{1}{x^2} dx = \pi" block />
        
        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '1rem' }}>Surface Area (Infinite):</div>
        <MathDisplay formula="A = 2\pi \int_1^\infty \frac{1}{x} \sqrt{1 + \frac{1}{x^4}} dx \to \infty" block />

        <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '4px', border: '1px solid #fbbf24' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#fbbf24' }}>Why It Diverges:</div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            Crucial step: <MathDisplay formula="\sqrt{1 + 1/x^4} \ge 1" /> for all <MathDisplay formula="x \ge 1" />.
          </p>
          <div style={{ margin: '0.5rem 0' }}>
            <MathDisplay formula="A \ge 2\pi \int_1^\infty \frac{1}{x} dx = 2\pi [\ln(x)]_1^\infty = \infty" block />
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            The area relies on the harmonic series (diverges), while the volume relies on <MathDisplay formula="1/x^2" /> (converges).
            Thus, <MathDisplay formula="1/x" /> decays "too slowly" for the surface area to be finite.
          </p>
        </div>
      </div>
    </>
  );

  return (
    <Layout controls={controls} activeModule={activeModule} setActiveModule={setActiveModule}>
      <div className="canvas-container" style={{ position: 'absolute', inset: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 800 600">
          <g transform={`translate(${centerX}, ${centerY})`}>
            {/* X-Axis */}
            <line x1="-50" y1="0" x2={900} y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            
            {/* The Horn */}
            {points.map((p, i) => {
              if (i === 0) return null;
              const prev = points[i-1];
              const r_scaled = p.r * scaleY;
              const prev_r_scaled = prev.r * scaleY;
              
              return (
                <g key={i}>
                  {/* Top slice curve */}
                  <line 
                    x1={(prev.x-1) * scaleX} y1={-prev_r_scaled} 
                    x2={(p.x-1) * scaleX} y2={-r_scaled} 
                    stroke="#38bdf8" strokeWidth="2" 
                  />
                  {/* Bottom slice curve */}
                  <line 
                    x1={(prev.x-1) * scaleX} y1={prev_r_scaled} 
                    x2={(p.x-1) * scaleX} y2={r_scaled} 
                    stroke="#38bdf8" strokeWidth="2" 
                  />
                  {/* Disk ellipse */}
                  <ellipse 
                    cx={(p.x-1) * scaleX} cy="0" 
                    rx={p.r * scaleX * 0.2} ry={r_scaled} 
                    fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" 
                  />
                </g>
              );
            })}

            {/* Labels */}
            <text x="0" y="-170" fill="#f8fafc" fontSize="14" fontWeight="bold">Gabriel's Horn (Solid of Revolution)</text>
            <text x="0" y="200" fill="#94a3b8" fontSize="12">Current Volume: {formatNumber(volume, 4)} units³</text>
            <text x="0" y="220" fill="#ef4444" fontSize="12">Surface Area: Growing toward ∞</text>
            
            {/* xMax marker */}
            <line x1={(xMax-1) * scaleX} y1={-200} x2={(xMax-1) * scaleX} y2={200} stroke="rgba(239, 68, 68, 0.5)" strokeDasharray="4" />
            <text x={(xMax-1) * scaleX + 10} y="-180" fill="#ef4444" fontSize="12">x = {formatNumber(xMax, 1)}</text>
            <text x={(xMax-1) * scaleX + 10} y="-160" fill="#ef4444" fontSize="12">A(x) &ge; {formatNumber(2 * Math.PI * Math.log(xMax), 2)}</text>
            <text x={(xMax-1) * scaleX + 10} y="-140" fill="#38bdf8" fontSize="12">V(x) = {formatNumber(Math.PI * (1 - 1/xMax), 2)}</text>
          </g>
        </svg>
      </div>
    </Layout>
  );
};