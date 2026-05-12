import type { ReactNode } from 'react';
import { AreaChart, Circle, Activity, Box, FlaskConical } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  controls: ReactNode;
  activeModule: string;
  setActiveModule: (m: any) => void;
}

export const Layout = ({ children, controls, activeModule, setActiveModule }: LayoutProps) => {
  return (
    <div className="app-container">
      <div className="sidebar" style={{ width: '380px' }}>
        <div className="module-header">
          <h1 style={{ color: '#38bdf8', letterSpacing: '0.1em', margin: '0 0 0.25rem 0', fontSize: '1.5rem' }}>AXIOM</h1>
          <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', margin: 0 }}>Visual Calculus Engine</p>
        </div>

        <div className="controls-container" style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column' }}>
          {controls}
        </div>

        <div className="navigation" style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
          <div className={`nav-item ${activeModule === 'riemann' ? 'active' : ''}`} onClick={() => setActiveModule('riemann')}>
            <AreaChart size={20} />
            <span>Riemann</span>
          </div>
          <div className={`nav-item ${activeModule === 'circle' ? 'active' : ''}`} onClick={() => setActiveModule('circle')}>
            <Circle size={20} />
            <span>Circle</span>
          </div>
          <div className={`nav-item ${activeModule === 'sphere' ? 'active' : ''}`} onClick={() => setActiveModule('sphere')}>
            <Box size={20} />
            <span>Sphere</span>
          </div>
          <div className={`nav-item ${activeModule === 'horn' ? 'active' : ''}`} onClick={() => setActiveModule('horn')}>
            <FlaskConical size={20} />
            <span>Gabriel</span>
          </div>
          <div className={`nav-item ${activeModule === 'ftc' ? 'active' : ''}`} onClick={() => setActiveModule('ftc')}>
            <Activity size={20} />
            <span>FTC</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        {children}
      </div>
    </div>
  );
};
