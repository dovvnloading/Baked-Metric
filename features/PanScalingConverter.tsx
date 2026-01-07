import React, { useState, useEffect, useMemo } from 'react';
import { ClayPanel, ClayNumberInput, ClaySelect, ClayInput, ClaySegmentedControl } from '../components/ClayComponents';
import { PanShape } from '../types';

interface DynamicPanVisualProps {
  shape: PanShape | 'Bundt';
  d1: number;
  d2: number;
  maxD: number;
  isTarget?: boolean;
  unit: 'in' | 'cm' | 'cup' | 'ml';
}

const DynamicPanVisual: React.FC<DynamicPanVisualProps> = ({ shape, d1, d2, maxD, isTarget, unit }) => {
  const size = 300; 
  const padding = 40;
  const availableSpace = size - (padding * 2);
  // Normalize visualization size regardless of unit
  const pixelsPerUnit = unit === 'cm' 
    ? availableSpace / (maxD * 2.54) // convert maxD (assumed inches) to CM scale roughly
    : unit === 'ml' || unit === 'cup' 
      ? 1 // Volume doesn't map to linear width easily, handled separately
      : availableSpace / maxD;

  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), []);
  const filterId = `pan-inset-${isTarget ? 'target' : 'source'}-${uniqueId}`;
  const gradientId = `pan-grad-${isTarget ? 'target' : 'source'}-${uniqueId}`;

  // Gradient Colors
  const gradStart = isTarget ? 'var(--pan-target-start)' : 'var(--pan-source-start)';
  const gradEnd = isTarget ? 'var(--pan-target-end)' : 'var(--pan-source-end)';

  let w, h, r;
  
  if (shape === 'Bundt') {
    // Visual approximation for Bundt based on Volume
    // Assume 12 cups is roughly a 10 inch bundt in visual weight
    const normalizedVol = unit === 'ml' ? d1 / 236 : d1; // Convert ml to cups roughly for visual sizing
    const scale = Math.min(Math.max(normalizedVol / 12, 0.4), 1.2);
    r = (availableSpace / 2) * scale * 0.8;
  } else if (shape === PanShape.Round) {
    const safeD1 = unit === 'cm' ? d1 / 2.54 : d1; // Draw in 'inch space'
    r = (safeD1 * (availableSpace / maxD)) / 2;
  } else {
    const safeD1 = unit === 'cm' ? d1 / 2.54 : d1;
    const safeD2 = unit === 'cm' ? d2 / 2.54 : d2;
    w = safeD1 * (availableSpace / maxD);
    h = safeD2 * (availableSpace / maxD);
  }

  // Clamping visual boundaries
  w = Math.max(0, w || 0);
  h = Math.max(0, h || 0);
  r = Math.max(0, r || 0);

  return (
    <div className="w-full h-56 neu-in rounded-3xl flex items-center justify-center p-6 relative overflow-hidden group transition-all duration-300 bg-[--bg-color]">
      {/* Label Badge */}
      <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[0.65rem] font-black uppercase tracking-widest z-10 transition-colors duration-300 ${isTarget ? 'bg-amber-600 text-white shadow-md' : 'neu-out text-[--text-sub]'}`}>
         {isTarget ? 'New Pan' : 'Original Pan'}
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <span className="text-[10px] font-bold text-[--text-muted] bg-[--bg-color] px-2 py-1 rounded-md neu-out opacity-80">
          {shape === 'Bundt' ? 'VOLUME' : 'DIMENSION'}
        </span>
      </div>

      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${size} ${size}`} 
        className="overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={gradientId} x1="20%" y1="20%" x2="80%" y2="80%">
             <stop offset="0%" stopColor={gradStart} /> 
             <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>

          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feComponentTransfer in="SourceAlpha" result="invertAlpha">
               <feFuncA type="table" tableValues="1 0"/>
            </feComponentTransfer>
            <feOffset in="invertAlpha" dx="8" dy="8" result="offsetDeep"/>
            <feGaussianBlur in="offsetDeep" stdDeviation="6" result="blurDeep"/>
            <feComposite operator="in" in="blurDeep" in2="SourceAlpha" result="shadowDeep"/>
            <feFlood floodColor="var(--pan-shadow-flood)" floodOpacity="0.4" result="floodDeep"/> 
            <feComposite operator="in" in="floodDeep" in2="shadowDeep" result="finalShadowDeep"/>
            
            <feGaussianBlur in="invertAlpha" stdDeviation="4" result="blurAO"/>
            <feComposite operator="in" in="blurAO" in2="SourceAlpha" result="shadowAO"/>
            <feFlood floodColor="black" floodOpacity="0.1" result="floodAO"/>
            <feComposite operator="in" in="floodAO" in2="shadowAO" result="finalShadowAO"/>

            <feMerge>
               <feMergeNode in="SourceGraphic"/>
               <feMergeNode in="finalShadowDeep"/>
               <feMergeNode in="finalShadowAO"/>
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${size/2}, ${size/2})`}>
          {shape === 'Bundt' ? (
             <g>
                {/* Outer Ring */}
                <circle cx="0" cy="0" r={r} fill={`url(#${gradientId})`} style={{ filter: `url(#${filterId})` }} />
                {/* Center Hole (Donut) */}
                <circle cx="0" cy="0" r={r * 0.35} fill="var(--bg-color)" style={{ filter: `drop-shadow(inset 2px 2px 4px var(--shadow-dark))` }} />
             </g>
          ) : shape === PanShape.Round ? (
            <circle cx="0" cy="0" r={r} fill={`url(#${gradientId})`} style={{ filter: `url(#${filterId})` }} />
          ) : (
            <rect x={-w/2} y={-h/2} width={w} height={h} rx="12" fill={`url(#${gradientId})`} style={{ filter: `url(#${filterId})` }} />
          )}

          {/* Wireframe overlay for detail */}
          {shape === 'Bundt' ? (
             <circle cx="0" cy="0" r={r} fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="4 4"/>
          ) : shape === PanShape.Round ? (
            <circle cx="0" cy="0" r={r} fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
          ) : (
            <rect x={-w/2} y={-h/2} width={w} height={h} rx="12" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
          )}
        </g>
      </svg>
      
      {/* Dynamic measurement labels */}
      <div className="absolute bottom-3 right-5 text-right pointer-events-none">
         <div className="text-xs font-black text-[--text-muted] opacity-80">
            {shape === 'Bundt' 
               ? `${d1} ${unit}` 
               : `${d1}${unit} ${shape !== PanShape.Round ? `x ${d2}${unit}` : ''}`
            }
         </div>
      </div>
    </div>
  );
};

type CalcMode = 'area' | 'volume';
type UnitSystem = 'in' | 'cm';

export const PanScalingConverter: React.FC = () => {
  // Config States
  const [calcMode, setCalcMode] = useState<CalcMode>('area');
  
  // Source States
  const [sourceShape, setSourceShape] = useState<PanShape>(PanShape.Round);
  const [sourceUnit, setSourceUnit] = useState<UnitSystem>('in');
  const [sourceDim1, setSourceDim1] = useState<string>('9'); 
  const [sourceDim2, setSourceDim2] = useState<string>('9'); 
  const [sourceVol, setSourceVol] = useState<string>('10');
  const [sourceVolUnit, setSourceVolUnit] = useState<'cup' | 'ml'>('cup');

  // Target States
  const [targetShape, setTargetShape] = useState<PanShape>(PanShape.Square);
  const [targetUnit, setTargetUnit] = useState<UnitSystem>('in');
  const [targetDim1, setTargetDim1] = useState<string>('8');
  const [targetDim2, setTargetDim2] = useState<string>('8');
  const [targetVol, setTargetVol] = useState<string>('10');
  const [targetVolUnit, setTargetVolUnit] = useState<'cup' | 'ml'>('cup');

  const [ratio, setRatio] = useState<number>(1);
  const [calcAmount, setCalcAmount] = useState<string>('');

  // Physics Helpers
  const CM_TO_INCH = 0.393701;
  
  const getNormalizedArea = (shape: PanShape, unit: UnitSystem, d1Str: string, d2Str: string) => {
    let d1 = parseFloat(d1Str) || 0;
    let d2 = parseFloat(d2Str) || 0;

    // Normalize to Inches for Calculation
    if (unit === 'cm') {
      d1 *= CM_TO_INCH;
      d2 *= CM_TO_INCH;
    }

    if (shape === PanShape.Round) {
      const r = d1 / 2;
      return Math.PI * r * r;
    }
    return d1 * d2;
  };

  const getNormalizedVolume = (volStr: string, unit: 'cup' | 'ml') => {
    const v = parseFloat(volStr) || 0;
    // Normalize to cups
    if (unit === 'ml') return v / 236.588;
    return v;
  };

  // Max Dimension Calculation for Visual Scaling
  const maxDimension = useMemo(() => {
    if (calcMode === 'volume') return 12; // arbitrary max for volume visual
    
    // Normalize visuals to inches for consistent drawing scale
    const s1 = (parseFloat(sourceDim1) || 0) * (sourceUnit === 'cm' ? CM_TO_INCH : 1);
    const s2 = (parseFloat(sourceDim2) || 0) * (sourceUnit === 'cm' ? CM_TO_INCH : 1);
    const t1 = (parseFloat(targetDim1) || 0) * (targetUnit === 'cm' ? CM_TO_INCH : 1);
    const t2 = (parseFloat(targetDim2) || 0) * (targetUnit === 'cm' ? CM_TO_INCH : 1);
    
    const dims = [s1, t1];
    if (sourceShape !== PanShape.Round) dims.push(s2);
    if (targetShape !== PanShape.Round) dims.push(t2);
    return Math.max(...dims, 10); 
  }, [sourceDim1, sourceDim2, targetDim1, targetDim2, sourceShape, targetShape, sourceUnit, targetUnit, calcMode]);

  useEffect(() => {
    let newRatio = 1;

    if (calcMode === 'area') {
      const sourceArea = getNormalizedArea(sourceShape, sourceUnit, sourceDim1, sourceDim2);
      const targetArea = getNormalizedArea(targetShape, targetUnit, targetDim1, targetDim2);
      if (sourceArea > 0) newRatio = targetArea / sourceArea;
      else newRatio = 0;
    } else {
      const sVol = getNormalizedVolume(sourceVol, sourceVolUnit);
      const tVol = getNormalizedVolume(targetVol, targetVolUnit);
      if (sVol > 0) newRatio = tVol / sVol;
      else newRatio = 0;
    }
    
    setRatio(newRatio);
  }, [
    calcMode,
    sourceShape, sourceUnit, sourceDim1, sourceDim2, sourceVol, sourceVolUnit,
    targetShape, targetUnit, targetDim1, targetDim2, targetVol, targetVolUnit
  ]);

  return (
    <div className="flex flex-col gap-6 h-full">
       
       <div className="md:col-span-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-xl font-black text-[--text-main] mb-2 flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[--accent] inline-block"></span>
                Resize Recipe
            </h2>
            <p className="text-[--text-sub] font-bold text-xs max-w-xl leading-relaxed">
              Standard pans should be scaled by <strong className="text-[--text-main]">Surface Area</strong> to maintain cake height and baking time. Use <strong className="text-[--text-main]">Capacity</strong> for Bundt or Tube pans.
            </p>
         </div>
         <div className="w-full md:w-auto min-w-[200px]">
            <label className="text-[--text-sub] font-bold text-[10px] uppercase tracking-wider mb-2 block">Calculation Method</label>
            <ClaySegmentedControl 
               options={[
                  { label: 'Surface Area', value: 'area' },
                  { label: 'Capacity (Vol)', value: 'volume' }
               ]}
               value={calcMode}
               onChange={(v) => setCalcMode(v as CalcMode)}
            />
         </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          
          {/* Divider Graphic for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-20">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[--text-muted]"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </div>

          {/* Source Pan */}
          <div className="flex flex-col gap-6">
             <DynamicPanVisual 
                shape={calcMode === 'area' ? sourceShape : 'Bundt'}
                d1={calcMode === 'area' ? (parseFloat(sourceDim1)||0) : (parseFloat(sourceVol)||0)}
                d2={parseFloat(sourceDim2) || 0}
                maxD={maxDimension}
                unit={calcMode === 'area' ? sourceUnit : sourceVolUnit}
             />
             <div className="space-y-4 px-1">
                {calcMode === 'area' ? (
                  <>
                     <div className="flex gap-4">
                        <div className="flex-1">
                           <ClaySelect 
                              label="Original Shape"
                              options={Object.values(PanShape).map(s => ({ value: s, label: s }))}
                              value={sourceShape}
                              onChange={(val) => setSourceShape(val as PanShape)}
                           />
                        </div>
                        <div className="w-24 pt-6">
                           <ClaySegmentedControl 
                              options={[{label: 'IN', value: 'in'}, {label: 'CM', value: 'cm'}]}
                              value={sourceUnit}
                              onChange={(v) => setSourceUnit(v as UnitSystem)}
                           />
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <ClayNumberInput 
                           label={sourceShape === PanShape.Round ? "Diameter" : "Width"}
                           value={sourceDim1} 
                           onChange={setSourceDim1}
                           min={1}
                           unitLabel={sourceUnit}
                        />
                        {sourceShape !== PanShape.Round && (
                           <ClayNumberInput 
                           label="Length"
                           value={sourceDim2} 
                           onChange={setSourceDim2}
                           min={1}
                           unitLabel={sourceUnit}
                           />
                        )}
                     </div>
                  </>
                ) : (
                   /* Volume Inputs */
                  <div className="flex gap-4 items-end">
                     <ClayNumberInput 
                        label="Pan Capacity"
                        value={sourceVol} 
                        onChange={setSourceVol}
                        min={1}
                        unitLabel={sourceVolUnit}
                     />
                     <div className="w-32 mb-1">
                        <ClaySegmentedControl 
                           options={[{label: 'Cups', value: 'cup'}, {label: 'ML', value: 'ml'}]}
                           value={sourceVolUnit}
                           onChange={(v) => setSourceVolUnit(v as any)}
                        />
                     </div>
                  </div>
                )}
             </div>
          </div>

          {/* Target Pan */}
          <div className="flex flex-col gap-6">
             <DynamicPanVisual 
                shape={calcMode === 'area' ? targetShape : 'Bundt'}
                d1={calcMode === 'area' ? (parseFloat(targetDim1)||0) : (parseFloat(targetVol)||0)}
                d2={parseFloat(targetDim2) || 0}
                maxD={maxDimension}
                isTarget
                unit={calcMode === 'area' ? targetUnit : targetVolUnit}
             />
             <div className="space-y-4 px-1">
                {calcMode === 'area' ? (
                  <>
                     <div className="flex gap-4">
                        <div className="flex-1">
                           <ClaySelect 
                              label="New Shape"
                              options={Object.values(PanShape).map(s => ({ value: s, label: s }))}
                              value={targetShape}
                              onChange={(val) => setTargetShape(val as PanShape)}
                           />
                        </div>
                        <div className="w-24 pt-6">
                           <ClaySegmentedControl 
                              options={[{label: 'IN', value: 'in'}, {label: 'CM', value: 'cm'}]}
                              value={targetUnit}
                              onChange={(v) => setTargetUnit(v as UnitSystem)}
                           />
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <ClayNumberInput 
                           label={targetShape === PanShape.Round ? "Diameter" : "Width"}
                           value={targetDim1} 
                           onChange={setTargetDim1}
                           min={1}
                           unitLabel={targetUnit}
                        />
                        {targetShape !== PanShape.Round && (
                           <ClayNumberInput 
                           label="Length"
                           value={targetDim2} 
                           onChange={setTargetDim2}
                           min={1}
                           unitLabel={targetUnit}
                           />
                        )}
                     </div>
                  </>
                ) : (
                   /* Volume Inputs Target */
                   <div className="flex gap-4 items-end">
                     <ClayNumberInput 
                        label="Target Capacity"
                        value={targetVol} 
                        onChange={setTargetVol}
                        min={1}
                        unitLabel={targetVolUnit}
                     />
                     <div className="w-32 mb-1">
                        <ClaySegmentedControl 
                           options={[{label: 'Cups', value: 'cup'}, {label: 'ML', value: 'ml'}]}
                           value={targetVolUnit}
                           onChange={(v) => setTargetVolUnit(v as any)}
                        />
                     </div>
                  </div>
                )}
             </div>
          </div>
       </div>

       {/* Results & Conversion Tool */}
       <div className="neu-out rounded-[2rem] p-6 md:p-8 mt-4 animate-fade-in relative overflow-hidden">
        {/* Verification Watermark */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            
            {/* The Ratio Explanation */}
            <div className="flex flex-col gap-2">
               <span className="text-[--text-muted] font-black text-xs uppercase tracking-widest">Mathematical Factor</span>
               <div className="flex items-baseline gap-4">
                  <span className={`text-5xl md:text-6xl font-black ${ratio === 1 ? 'text-[--text-muted]' : 'text-[--accent]'}`}>
                    {ratio.toFixed(2)}x
                  </span>
                  <span className="text-[--text-sub] font-bold text-lg">Multiplier</span>
               </div>
               <p className="text-[--text-sub] text-sm font-semibold leading-relaxed mt-2">
                  {ratio > 1 
                     ? "Your new pan is larger." 
                     : ratio < 1 
                        ? "Your new pan is smaller." 
                        : "These pans are identical in capacity."}
                  {' '}
                  Multiply your ingredients by <strong className="text-[--text-main]">{ratio.toFixed(2)}</strong> 
                  {calcMode === 'area' && ' to maintain the exact same cake height and baking time.'}
               </p>
            </div>

            {/* The Active Calculator */}
            <div className="neu-in rounded-2xl p-6 bg-[--hover-bg]">
               <span className="text-[--text-muted] font-black text-xs uppercase tracking-widest mb-4 block">Quick Calculator</span>
               <div className="flex items-center gap-4">
                  <div className="flex-1">
                     <ClayInput 
                        label="Recipe Qty" 
                        rightLabel="(g, oz, cup)"
                        type="number" 
                        value={calcAmount} 
                        onChange={(e) => setCalcAmount(e.target.value)}
                        placeholder="100"
                     />
                  </div>
                  <div className="pt-6 text-[--text-muted] font-black text-xl">→</div>
                  <div className="flex-1">
                     <label className="ml-2 text-[--accent] font-bold text-[10px] uppercase tracking-wider mb-2 block opacity-80">Adjusted Qty</label>
                     <div className="h-[52px] w-full neu-out rounded-xl flex items-center justify-start px-4 text-[--accent] font-black text-lg border-2 border-transparent truncate">
                        {calcAmount && !isNaN(parseFloat(calcAmount)) 
                           ? (parseFloat(calcAmount) * ratio).toLocaleString(undefined, { maximumFractionDigits: 1 }) 
                           : '---'}
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};