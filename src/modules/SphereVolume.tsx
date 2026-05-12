import { useState, useMemo } from 'react';
import { MathDisplay } from '../components/MathDisplay';
import { formatNumber } from '../math/calculus';

export const SphereVolumeModule = () => {
  const [R, setR] = useState(150);
  const [numSlices, setNumSlices] = useState(10);
  const [zHighlight, setZHighlight] = useState(0);

  // Constants for 3D projection
  const centerX = 400;
  const centerY = 300;
  const tilt = 0.5; // perspective tilt factor

  const slices = useMemo(() => {
    const temp = [];
    const step = (2 * R) / numSlices;
    for (let i = 0; i <= numSlices; i++) {
      const z = -R + i * step;
      const r_slice = Math.sqrt(Math.max(0, R * R - z * z));
      temp.push({ z, r: r_slice });
    }
    return temp;
  }, [R, numSlices]);

  const currentRSlice = Math.sqrt(Math.max(0, R * R - zHighlight * zHighlight));

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div className="module-controls">
        <h2>Sphere Volume (3D)</h2>
        <p>Deriving the volume formula via the disk method (slicing).</p>

        <div className="control-group">
          <label>Radius R: {R}</label>
          <input 
            type="range" 
            min="50" 
            max="200" 
            value={R} 
            onChange={(e) => setR(Number(e.target.value))} 
          />
        </div>

        <div className="control-group">
          <label>Disk Count: {numSlices}</label>
          <input 
            type="range" 
            min="2" 
            max="50" 
            value={numSlices} 
            onChange={(e) => setNumSlices(Number(e.target.value))} 
          />
        </div>

        <div className="control-group">
          <label>Z-Height Analysis: {formatNumber(zHighlight, 1)}</label>
          <input 
            type="range" 
            min={-R} 
            max={R} 
            step="1" 
            value={zHighlight} 
            onChange={(e) => setZHighlight(Number(e.target.value))} 
          />
        </div>

        <div className="math-pane">
          <div style={{ color: '#38bdf8', fontWeight: 'bold', marginBottom: '0.5rem' }}>1. Pythagorean Theorem:</div>
          <MathDisplay formula="r^2 + z^2 = R^2 \implies r = \sqrt{R^2 - z^2}" block />
          
          <div style={{ color: '#818cf8', fontWeight: 'bold', margin: '1rem 0 0.5rem 0' }}>2. Disk Volume dV:</div>
          <MathDisplay formula="dV = \pi r^2 dz = \pi (R^2 - z^2) dz" block />

          <div style={{ color: '#22c55e', fontWeight: 'bold', margin: '1rem 0 0.5rem 0' }}>3. Synthesis Integral:</div>
          <MathDisplay formula="V = \int_{-R}^{R} \pi (R^2 - z^2) dz = \frac{4}{3}\pi R^3" block />
        </div>
      </div>

      <div className="canvas-container" style={{ position: 'absolute', inset: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 800 600">
          <defs>
            <radialGradient id="sphereGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>

          {/* Main Sphere Shadow/Background */}
          <circle cx={centerX} cy={centerY} r={R} fill="url(#sphereGradient)" stroke="rgba(255,255,255,0.05)" />

          {/* Slices (Disks) */}
          {slices.map((slice, i) => (
            <ellipse
              key={i}
              cx={centerX}
              cy={centerY + slice.z * tilt}
              rx={slice.r}
              ry={slice.r * tilt * 0.5}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1"
              opacity={0.2}
            />
          ))}

          {/* Highlighted Disk at zHighlight */}
          <ellipse
            cx={centerX}
            cy={centerY + zHighlight * tilt}
            rx={currentRSlice}
            ry={currentRSlice * tilt * 0.5}
            fill="rgba(56, 189, 248, 0.4)"
            stroke="#38bdf8"
            strokeWidth="2"
          />

          {/* Geometric Markers */}
          <g transform={`translate(${centerX}, ${centerY})`}>
            {/* R (sphere radius) */}
            <line x1="0" y1="0" x2={R} y2="0" stroke="#94a3b8" strokeDasharray="4" />
            <text x={R/2} y="-10" fill="#94a3b8" fontSize="12" textAnchor="middle">R</text>

            {/* z (current height) */}
            <line x1="0" y1="0" x2="0" y2={zHighlight * tilt} stroke="#818cf8" strokeWidth="2" />
            <text x="-15" y={zHighlight * tilt / 2} fill="#818cf8" fontSize="12" textAnchor="end">z</text>

            {/* r (current slice radius) */}
            <line x1="0" y1={zHighlight * tilt} x2={currentRSlice} y2={zHighlight * tilt} stroke="#38bdf8" strokeWidth="2" />
            <text x={currentRSlice / 2} y={zHighlight * tilt + 20} fill="#38bdf8" fontSize="12" textAnchor="middle">r(z)</text>

            {/* Hypotenuse R connecting z and r */}
            <line x1="0" y1="0" x2={currentRSlice} y2={zHighlight * tilt} stroke="#f8fafc" strokeWidth="1" opacity="0.5" />
          </g>

          {/* Axis */}
          <line x1={centerX} y1={centerY - R - 20} x2={centerX} y2={centerY + R + 20} stroke="rgba(255,255,255,0.2)" strokeDasharray="2" />
          <text x={centerX} y={centerY - R - 30} fill="#94a3b8" fontSize="12" textAnchor="middle">Z-Axis</text>
        </svg>

        {/* Legend Overlay */}
        <div className="legend-overlay">
          <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Volume Synthesis:</div>
          <div style={{ color: '#38bdf8' }}>$V \approx \sum \pi r_i^2 \Delta z$</div>
          <div style={{ color: '#22c55e', fontSize: '1.1rem', marginTop: '0.5rem' }}>$V = \frac{4}{3}\pi R^3$</div>
        </div>
      </div>
    </div>
  );
};
