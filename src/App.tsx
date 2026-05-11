import { useState } from 'react';
import { AreaChart, Circle, Activity, Box, FlaskConical } from 'lucide-react';
import './index.css';

// Lazy load modules (or import directly for simplicity in this project)
import { RiemannSumModule } from './modules/RiemannSum';
import { CircleUnrollingModule } from './modules/CircleUnrolling';
import { SphereVolumeModule } from './modules/SphereVolume';
import { GabrielHornModule } from './modules/GabrielHorn';
import { FTCModule } from './modules/FTC';

type ModuleType = 'riemann' | 'circle' | 'sphere' | 'horn' | 'ftc';

function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('horn');

  const renderModule = () => {
    switch (activeModule) {
      case 'riemann': return <RiemannSumModule />;
      case 'circle': return <CircleUnrollingModule />;
      case 'sphere': return <SphereVolumeModule />;
      case 'horn': return <GabrielHornModule />;
      case 'ftc': return <FTCModule />;
      default: return <GabrielHornModule />;
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="module-header">
          <h1 style={{ color: '#38bdf8', letterSpacing: '0.1em' }}>AXIOM</h1>
          <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Visual Calculus Engine</p>
        </div>

        <div className="navigation">
          <div 
            className={`nav-item ${activeModule === 'riemann' ? 'active' : ''}`}
            onClick={() => setActiveModule('riemann')}
          >
            <AreaChart size={20} />
            <span>Riemann</span>
          </div>
          <div 
            className={`nav-item ${activeModule === 'circle' ? 'active' : ''}`}
            onClick={() => setActiveModule('circle')}
          >
            <Circle size={20} />
            <span>Circle</span>
          </div>
          <div 
            className={`nav-item ${activeModule === 'sphere' ? 'active' : ''}`}
            onClick={() => setActiveModule('sphere')}
          >
            <Box size={20} />
            <span>Sphere</span>
          </div>
          <div 
            className={`nav-item ${activeModule === 'horn' ? 'active' : ''}`}
            onClick={() => setActiveModule('horn')}
          >
            <FlaskConical size={20} />
            <span>Gabriel</span>
          </div>
          <div 
            className={`nav-item ${activeModule === 'ftc' ? 'active' : ''}`}
            onClick={() => setActiveModule('ftc')}
          >
            <Activity size={20} />
            <span>FTC</span>
          </div>
        </div>

        <div className="math-pane" style={{ marginTop: '2rem' }}>
          <small style={{ color: '#94a3b8', fontSize: '0.7rem' }}>SYSTEM STATUS</small>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}></div>
            <span style={{ fontSize: '0.8rem' }}>Mathematical Core Active</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        {renderModule()}
      </div>
    </div>
  );
}

export default App;
