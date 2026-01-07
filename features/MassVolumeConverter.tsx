import React, { useState, useEffect, useCallback } from 'react';
import { INGREDIENTS, UNITS } from '../constants';
import { ClayPanel, ClayNumberInput, ClaySelect } from '../components/ClayComponents';
import { UnitType } from '../types';

export const MassVolumeConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [ingredientId, setIngredientId] = useState(INGREDIENTS[0].id);
  const [fromUnitId, setFromUnitId] = useState('cup_us');
  const [toUnitId, setToUnitId] = useState('g');
  const [result, setResult] = useState<number | null>(null);

  const calculate = useCallback(() => {
    const val = parseFloat(amount);
    if (isNaN(val)) {
      setResult(null);
      return;
    }

    const ingredient = INGREDIENTS.find(i => i.id === ingredientId);
    const fromUnit = UNITS.find(u => u.id === fromUnitId);
    const toUnit = UNITS.find(u => u.id === toUnitId);

    if (!ingredient || !fromUnit || !toUnit) return;

    let grams = 0;
    if (fromUnit.type === UnitType.Weight) {
      grams = val * (fromUnit.toGrams || 1);
    } else {
      const ml = val * (fromUnit.toMl || 1);
      grams = ml * ingredient.density;
    }

    let finalVal = 0;
    if (toUnit.type === UnitType.Weight) {
      finalVal = grams / (toUnit.toGrams || 1);
    } else {
      const targetMl = grams / ingredient.density;
      finalVal = targetMl / (toUnit.toMl || 1);
    }

    setResult(finalVal);
  }, [amount, ingredientId, fromUnitId, toUnitId]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const currentIngredient = INGREDIENTS.find(i => i.id === ingredientId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full">
      
      {/* Configuration Column */}
      <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-black text-[--text-main] mb-6 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-[--accent] inline-block"></span>
              Measurements
            </h2>
            
            <ClaySelect
              label="Ingredient"
              value={ingredientId}
              onChange={(val) => setIngredientId(val)}
              options={INGREDIENTS.map(i => ({ 
                value: i.id, 
                label: i.name,
                category: i.category 
              }))}
              className="mb-6"
              searchable={true}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <ClayNumberInput
                  label="Amount"
                  value={amount}
                  onChange={setAmount}
                  step={0.5}
                  min={0}
               />
               <ClaySelect
                  label="Unit"
                  value={fromUnitId}
                  onChange={setFromUnitId}
                  options={UNITS.map(u => ({ value: u.id, label: u.name }))}
               />
            </div>
          </div>

          <div className="mt-auto">
             <div className="flex justify-between items-end mb-2 px-2">
                <span className="text-xs font-bold uppercase text-[--text-muted] tracking-widest">Density Factor</span>
                <span className="text-xs font-bold text-[--text-sub]">{currentIngredient?.density.toFixed(2)} g/ml</span>
             </div>
             <div className="neu-in h-4 w-full rounded-full p-1">
                <div 
                   className="h-full bg-amber-400 rounded-full transition-all duration-500"
                   style={{ width: `${Math.min((currentIngredient?.density || 0) * 50, 100)}%` }}
                ></div>
             </div>
          </div>
      </div>

      {/* Result Column */}
      <div className="flex flex-col h-full">
         <h2 className="text-2xl font-black text-[--text-main] mb-6 flex items-center gap-3 lg:hidden">
            <span className="w-2 h-8 rounded-full bg-stone-300 inline-block"></span>
            Result
         </h2>
         
         <div className="neu-out rounded-[2rem] p-2 flex-1 flex flex-col min-h-[300px]">
            <div className="neu-in rounded-[1.5rem] flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
               {/* Background Texture */}
               <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               
               <span className="text-[--text-muted] font-black uppercase tracking-[0.2em] text-sm mb-4">Equals</span>
               
               <div className="flex flex-col items-center gap-2 z-10">
                  <span className="text-7xl md:text-8xl font-black text-[--text-main] tracking-tighter transition-all duration-300">
                    {result !== null ? result.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '---'}
                  </span>
                  <span className="text-[--accent] font-black text-lg uppercase tracking-widest">
                    {UNITS.find(u => u.id === toUnitId)?.name}
                  </span>
               </div>
            </div>
            
            <div className="p-6">
              <ClaySelect
                label="Convert To"
                value={toUnitId}
                onChange={setToUnitId}
                options={UNITS.map(u => ({ value: u.id, label: u.name }))}
                dropUp={true}
              />
            </div>
         </div>
      </div>

    </div>
  );
};