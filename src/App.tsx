import { useState } from 'react';
import './index.css';

import { RiemannSumModule } from './modules/RiemannSum';
import { CircleUnrollingModule } from './modules/CircleUnrolling';
import { SphereVolumeModule } from './modules/SphereVolume';
import { GabrielHornModule } from './modules/GabrielHorn';
import { FTCModule } from './modules/FTC';

type ModuleType = 'riemann' | 'circle' | 'sphere' | 'horn' | 'ftc';

function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('horn');

  const props = { activeModule, setActiveModule };

  switch (activeModule) {
    case 'riemann': return <RiemannSumModule {...props} />;
    case 'circle': return <CircleUnrollingModule {...props} />;
    case 'sphere': return <SphereVolumeModule {...props} />;
    case 'horn': return <GabrielHornModule {...props} />;
    case 'ftc': return <FTCModule {...props} />;
    default: return <GabrielHornModule {...props} />;
  }
}

export default App;
