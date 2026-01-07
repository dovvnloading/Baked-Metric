import React, { useState } from 'react';
import { ClayPanel, ClayNumberInput, ClayRange, ClayToggle } from '../components/ClayComponents';

export const TemperatureConverter: React.FC = () => {
  const [celsius, setCelsius] = useState<number>(180);
  const [useElevation, setUseElevation] = useState<boolean>(false);
  const [elevation, setElevation] = useState<number>(5000);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCelsius(parseFloat(e.target.value));
  };

  const handleManualC = (val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) setCelsius(num);
  };

  const handleManualF = (val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) setCelsius((num - 32) * 5 / 9);
  };

  // Logic: Above 3000ft, add roughly 2.2C (4F) per 1000ft
  const getElevationAdjustment = () => {
    if (!useElevation || elevation <= 3000) return 0;
    return (elevation - 3000) * 0.0022;
  };

  const adjCelsius = celsius + getElevationAdjustment();

  const toF = (c: number) => ((c * 9 / 5) + 32).toFixed(1);

  const getGasMark = (tempC: number) => {
    const c = tempC;
    if (c < 135) return '½';
    if (c < 145) return '1';
    if (c < 155) return '2';
    if (c < 170) return '3';
    if (c < 185) return '4';
    if (c < 200) return '5';
    if (c < 210) return '6';
    if (c < 225) return '7';
    if (c < 240) return '8';
    return '9';
  };

  return (
    <div className="flex flex-col h-full gap-8">
       
       {/* Top Controls */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-8">
             <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-[--text-sub] font-bold uppercase tracking-wider text-sm">Recipe Temperature</h3>
                </div>
                <ClayRange 
                    min="100" 
                    max="300" 
                    step="1" 
                    value={celsius} 
                    onChange={handleSliderChange}
                    displayValue={`${Math.round(celsius)}°C`}
                />
                <div className="flex justify-between text-xs font-bold text-[--text-muted] px-2 mt-[-10px]">
                    <span>Cool (100°)</span>
                    <span>Hot (300°)</span>
                </div>
             </div>

             {/* Environment Section */}
             <div className="neu-out p-4 rounded-2xl flex flex-col gap-4">
                <ClayToggle 
                  label="High Altitude Mode" 
                  checked={useElevation} 
                  onChange={setUseElevation} 
                />
                
                {useElevation && (
                  <div className="animate-fade-in pt-2">
                    <ClayRange 
                      min="0" 
                      max="10000" 
                      step="100" 
                      value={elevation} 
                      onChange={(e) => setElevation(parseFloat(e.target.value))}
                      displayValue={`${elevation.toLocaleString()} ft`}
                    />
                    <p className="text-[0.65rem] text-[--text-muted] mt-2 px-2 leading-relaxed">
                      At elevations above 3,000 ft, air pressure is lower. Increasing oven temperature helps structure set before gases expand too much.
                    </p>
                  </div>
                )}
             </div>
          </div>

          {/* Gas Mark / Result Badge */}
          <div className="flex flex-col gap-6 items-center justify-center">
             <div className="neu-out w-40 h-40 rounded-full flex items-center justify-center relative">
                {/* Status Indicator Ring */}
                {useElevation && getElevationAdjustment() > 0 && (
                   <div className="absolute inset-0 rounded-full border-4 border-[--accent] opacity-20 animate-pulse"></div>
                )}
                
                <div className="absolute inset-0 rounded-full neu-out opacity-50 blur-sm"></div>
                <div className="neu-in w-32 h-32 rounded-full flex flex-col items-center justify-center z-10 text-center">
                   <span className="text-[--text-muted] font-black text-[0.6rem] uppercase tracking-widest mb-1">
                     {useElevation ? 'Adj. Gas Mark' : 'Gas Mark'}
                   </span>
                   <span className="text-6xl font-black text-[--text-main]">{getGasMark(adjCelsius)}</span>
                </div>
             </div>

             {useElevation && (
                <div className="neu-in px-6 py-3 rounded-xl flex flex-col items-center">
                   <span className="text-xs font-bold text-[--text-muted] uppercase tracking-widest mb-1">Set Oven To</span>
                   <span className="text-2xl font-black text-[--accent]">
                     {Math.round(adjCelsius)}°C <span className="text-[--text-muted] text-lg">/ {Math.round(parseFloat(toF(adjCelsius)))}°F</span>
                   </span>
                   <span className="text-[0.6rem] font-bold text-[--text-muted] mt-1">
                     (+{Math.round(getElevationAdjustment())}°C adjustment)
                   </span>
                </div>
             )}
          </div>
       </div>

       {/* Detailed Converter Inputs */}
       <div className="neu-out p-8 rounded-3xl mt-auto">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-[--text-sub] font-bold uppercase tracking-wider text-sm">
               {useElevation ? 'Base Recipe Value' : 'Precise Input'}
             </h3>
             {useElevation && <span className="text-xs font-bold text-[--accent] bg-[--accent-bg] px-2 py-1 rounded">Input Original Temp</span>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ClayNumberInput
                label="Celsius (°C)"
                value={Math.round(celsius)}
                onChange={handleManualC}
                step={1}
              />
              <ClayNumberInput
                label="Fahrenheit (°F)"
                value={toF(celsius)}
                onChange={handleManualF}
                step={1}
              />
          </div>
       </div>

    </div>
  );
};