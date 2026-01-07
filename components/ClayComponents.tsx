import React, { useState, useRef, useEffect, useMemo } from 'react';

interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export const ClayCard: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={`neu-out p-6 ${className}`}>
    {children}
  </div>
);

export const ClayPanel: React.FC<BaseProps> = ({ children, className = '' }) => (
  <div className={`neu-in p-4 ${className}`}>
    {children}
  </div>
);

interface ClayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon';
}

export const ClayButton: React.FC<ClayButtonProps> = ({ 
  children, 
  variant = 'primary',
  className = '', 
  ...props 
}) => {
  return (
    <button
      className={`neu-out neu-btn flex items-center justify-center font-bold text-[--text-sub] active:text-[--accent] ${
        variant === 'icon' ? 'p-3 rounded-xl' : 'px-6 py-3 rounded-xl'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface ClayInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rightLabel?: string;
}

export const ClayInput: React.FC<ClayInputProps> = ({ label, rightLabel, className = '', ...props }) => (
  <div className="flex flex-col gap-2 w-full">
    <div className="flex justify-between items-end px-1">
      {label && <label className="text-[--text-sub] font-bold text-xs uppercase tracking-wider">{label}</label>}
      {rightLabel && <span className="text-[--text-muted] font-bold text-[10px] uppercase tracking-wider">{rightLabel}</span>}
    </div>
    <input
      className={`neu-in px-4 py-3 w-full outline-none text-[--text-main] font-bold bg-transparent focus:text-[--accent] transition-colors ${className}`}
      {...props}
    />
  </div>
);

interface ClayNumberInputProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  unitLabel?: string;
}

export const ClayNumberInput: React.FC<ClayNumberInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  className = '',
  unitLabel
}) => {
  const updateValue = (delta: number) => {
    const currentVal = parseFloat(value.toString()) || 0;
    const newVal = currentVal + delta;
    if (min !== undefined && newVal < min) return;
    if (max !== undefined && newVal > max) return;
    // Fix floating point errors
    const formatted = Math.round(newVal * 1000) / 1000;
    onChange(formatted.toString());
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && <label className="ml-2 text-[--text-sub] font-bold text-xs uppercase tracking-wider">{label}</label>}
      <div className="flex items-center gap-3">
        <button
          onClick={() => updateValue(-step)}
          className="w-10 h-10 neu-out neu-btn rounded-xl flex items-center justify-center text-[--text-muted] hover:text-[--accent] text-lg font-bold touch-manipulation flex-shrink-0"
          aria-label="Decrease"
        >
          -
        </button>
        
        <div className="flex-1 neu-in rounded-xl relative flex items-center">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-2 pr-8 py-3 text-center outline-none text-[--text-main] font-black text-lg bg-transparent"
            step={step}
          />
          {unitLabel && (
            <span className="absolute right-3 text-[10px] font-bold text-[--text-muted] pointer-events-none uppercase">
              {unitLabel}
            </span>
          )}
        </div>

        <button
          onClick={() => updateValue(step)}
          className="w-10 h-10 neu-out neu-btn rounded-xl flex items-center justify-center text-[--text-muted] hover:text-[--accent] text-lg font-bold touch-manipulation flex-shrink-0"
          aria-label="Increase"
        >
          +
        </button>
      </div>
    </div>
  );
};

interface ClaySelectOption {
  value: string;
  label: string;
  category?: string;
}

interface ClaySelectProps {
  label?: string;
  value: string;
  options: ClaySelectOption[];
  onChange: (value: string) => void;
  className?: string;
  dropUp?: boolean;
  searchable?: boolean;
}

export const ClaySelect: React.FC<ClaySelectProps> = ({ 
  label, 
  value, 
  options, 
  onChange, 
  className = '', 
  dropUp = false,
  searchable = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectedOption = options.find(opt => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    } else {
      if (searchable && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    }
  }, [isOpen, searchable]);

  const filteredOptions = useMemo<ClaySelectOption[]>(() => {
    if (!searchable || !searchQuery) return options;
    const lower = searchQuery.toLowerCase();
    return options.filter(opt => opt.label.toLowerCase().includes(lower));
  }, [options, searchQuery, searchable]);

  const groupedOptions = useMemo<Record<string, ClaySelectOption[]> | null>(() => {
    const hasCategories = options.some(o => !!o.category);
    if (!hasCategories) return null;
    
    const groups: Record<string, ClaySelectOption[]> = {};
    filteredOptions.forEach(opt => {
      const cat = opt.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(opt);
    });
    return groups;
  }, [filteredOptions, options]);

  const renderOption = (opt: ClaySelectOption) => (
    <div
      key={opt.value}
      onClick={() => {
        onChange(opt.value);
        setIsOpen(false);
      }}
      className={`px-4 py-3 md:py-3 rounded-xl font-bold text-sm cursor-pointer transition-colors mb-1 ${
        opt.value === value 
          ? 'neu-in text-[--accent]' 
          : 'text-[--text-sub] hover:text-[--text-main] hover:bg-[--hover-bg]'
      }`}
    >
      {opt.label}
    </div>
  );

  return (
    <div className={`flex flex-col gap-2 w-full relative ${isOpen ? 'z-50' : 'z-20'} ${className}`} ref={containerRef}>
      {label && <label className="ml-2 text-[--text-sub] font-bold text-xs uppercase tracking-wider">{label}</label>}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`neu-in w-full px-4 py-3 text-left flex items-center justify-between outline-none text-[--text-main] font-bold transition-all hover:bg-[--hover-bg] active:bg-[--hover-bg] touch-manipulation ${isOpen ? 'ring-2 ring-[--accent] ring-opacity-30' : ''}`}
        >
          <span className="truncate mr-2">{selectedOption?.label}</span>
          <span className="text-[--text-muted] text-xs shrink-0">▼</span>
        </button>

        {isOpen && (
          <div className={`absolute left-0 right-0 neu-out z-50 flex flex-col overflow-hidden ${
            dropUp ? 'bottom-[110%]' : 'top-[110%]'
          }`} style={{ maxHeight: '320px' }}>
            
            {searchable && (
               <div className="p-2 pb-0 shrink-0">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="neu-in w-full px-3 py-2 text-sm font-bold text-[--text-main] outline-none rounded-lg bg-transparent placeholder-[--text-muted]"
                    onClick={(e) => e.stopPropagation()}
                  />
               </div>
            )}

            <div className="overflow-y-auto p-2 flex-1">
                {filteredOptions.length === 0 ? (
                    <div className="p-4 text-center text-xs text-[--text-muted] font-bold">No results found</div>
                ) : groupedOptions ? (
                    Object.entries(groupedOptions).map(([cat, opts]) => (
                        <div key={cat} className="mb-2">
                        <div className="px-4 py-2 text-[--text-muted] text-[10px] uppercase font-black tracking-widest sticky top-0 bg-[--bg-color]/95 backdrop-blur-sm z-10 border-b border-stone-200/10 mb-1">
                            {cat}
                        </div>
                        {opts.map(renderOption)}
                        </div>
                    ))
                ) : (
                    filteredOptions.map(renderOption)
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ClayRangeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  displayValue?: string;
}

export const ClayRange: React.FC<ClayRangeProps> = ({ label, displayValue, className = '', ...props }) => (
  <div className="flex flex-col gap-4 w-full">
    <div className="flex justify-between items-end px-2">
       {label && <label className="text-[--text-sub] font-bold text-xs uppercase tracking-wider">{label}</label>}
       {displayValue && <span className="text-[--accent] font-black text-lg">{displayValue}</span>}
    </div>
    <div className="px-2">
      <input
        type="range"
        className={`w-full ${className}`}
        {...props}
      />
    </div>
  </div>
);

interface ClayToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const ClayToggle: React.FC<ClayToggleProps> = ({ label, checked, onChange, className = '' }) => (
  <div className={`flex items-center justify-between w-full ${className}`}>
    <span className="text-[--text-sub] font-bold text-xs uppercase tracking-wider">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`w-14 h-8 rounded-full p-1 transition-all duration-300 flex items-center ${
        checked ? 'neu-in bg-[--hover-bg]' : 'neu-out'
      }`}
      type="button"
    >
      <div 
        className={`w-6 h-6 rounded-full shadow-sm transform transition-all duration-300 ${
          checked ? 'translate-x-6 bg-[--accent]' : 'translate-x-0 bg-stone-300'
        }`} 
      />
    </button>
  </div>
);

interface ClaySegmentedControlProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ClaySegmentedControl: React.FC<ClaySegmentedControlProps> = ({ options, value, onChange, className = '' }) => {
  return (
    <div className={`neu-in p-1 rounded-xl flex ${className}`}>
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
              isActive 
                ? 'neu-out bg-[--bg-color] text-[--accent] shadow-sm transform scale-95' 
                : 'text-[--text-muted] hover:text-[--text-sub]'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};