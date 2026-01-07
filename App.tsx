import React, { useState, useEffect } from 'react';
import { MassVolumeConverter } from './features/MassVolumeConverter';
import { TemperatureConverter } from './features/TemperatureConverter';
import { PanScalingConverter } from './features/PanScalingConverter';
import { InfoPage } from './features/InfoPage';
import { ClayButton } from './components/ClayComponents';

enum Tab {
  Mass = 'mass',
  Temp = 'temp',
  Pan = 'pan',
  Info = 'info',
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Mass);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen pt-6 md:pt-20 pb-32 md:pb-12 px-4 md:px-8 flex flex-col items-center justify-start bg-[--bg-color] transition-colors duration-300">
      
      <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8">
        
        {/* Header */}
        <header className="flex flex-row items-center justify-between gap-4 px-2 md:px-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl neu-out flex items-center justify-center text-[--text-main] shrink-0">
               <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M12 2v10"/><path d="M16 7l-4-5-4 5"/><path d="M12 22v-3"/></svg>
            </div>
            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-black text-[--text-main] tracking-tight text-shadow">Baked<span className="text-[--accent]">Metric</span></h1>
              <p className="text-[--text-muted] font-bold text-[0.6rem] md:text-xs uppercase tracking-[0.3em]">Kitchen Chemistry</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-12 h-12 rounded-2xl neu-out flex items-center justify-center text-[--text-sub] hover:text-[--accent] active:scale-95 transition-all"
              aria-label="Toggle Dark Mode"
            >
               {theme === 'light' ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>
               )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex neu-out p-2 rounded-2xl items-center gap-2">
               <NavButton 
                  active={activeTab === Tab.Mass} 
                  onClick={() => setActiveTab(Tab.Mass)}
                  label="Weight & Vol"
               />
               <NavButton 
                  active={activeTab === Tab.Temp} 
                  onClick={() => setActiveTab(Tab.Temp)}
                  label="Temperature"
               />
               <NavButton 
                  active={activeTab === Tab.Pan} 
                  onClick={() => setActiveTab(Tab.Pan)}
                  label="Pan Scaling"
               />
               <NavButton 
                  active={activeTab === Tab.Info} 
                  onClick={() => setActiveTab(Tab.Info)}
                  label="Info"
               />
            </nav>
          </div>
        </header>

        {/* Main Card */}
        <main className="neu-out p-5 md:p-10 relative transition-all duration-300 min-h-[60vh] md:min-h-0 rounded-[2rem]">
          <div className="animate-fade-in h-full">
             {activeTab === Tab.Mass && <MassVolumeConverter />}
             {activeTab === Tab.Temp && <TemperatureConverter />}
             {activeTab === Tab.Pan && <PanScalingConverter />}
             {activeTab === Tab.Info && <InfoPage />}
          </div>
        </main>
        
      </div>

      {/* Mobile Bottom Navigation (Thumb UI) */}
      <nav className="fixed bottom-6 left-4 right-4 md:hidden z-50">
        <div className="neu-out p-2 rounded-2xl flex justify-between items-center bg-[--bg-color]">
             <MobileNavButton 
                active={activeTab === Tab.Mass} 
                onClick={() => setActiveTab(Tab.Mass)}
                label="Measure"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>}
             />
             <MobileNavButton 
                active={activeTab === Tab.Temp} 
                onClick={() => setActiveTab(Tab.Temp)}
                label="Heat"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>}
             />
             <MobileNavButton 
                active={activeTab === Tab.Pan} 
                onClick={() => setActiveTab(Tab.Pan)}
                label="Scale"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>}
             />
             <MobileNavButton 
                active={activeTab === Tab.Info} 
                onClick={() => setActiveTab(Tab.Info)}
                label="Info"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
             />
        </div>
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button
    onClick={onClick}
    className={`
      px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap
      ${active 
        ? 'neu-in text-[--accent]' 
        : 'text-[--text-sub] hover:text-[--text-main] border border-transparent'
      }
    `}
  >
    {label}
  </button>
);

const MobileNavButton = ({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`
      flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-xl font-bold text-xs transition-all duration-300
      ${active 
        ? 'neu-in text-[--accent] translate-y-[1px]' 
        : 'text-[--text-muted] active:scale-95 border border-transparent'
      }
    `}
  >
    <div className={active ? "text-[--accent]" : "text-[--text-muted]"}>{icon}</div>
    <span>{label}</span>
  </button>
);

export default App;