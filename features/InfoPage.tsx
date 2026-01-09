import React from 'react';

export const InfoPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 h-full animate-fade-in">
       
       {/* About Header */}
       <div>
          <h2 className="text-2xl font-black text-[--text-main] mb-6 flex items-center gap-3">
              <span className="w-2 h-8 rounded-full bg-[--accent] inline-block"></span>
              About the App
          </h2>
          <div className="neu-in p-6 md:p-8 rounded-[1.5rem] text-[--text-sub] font-medium leading-loose text-sm md:text-base">
            <p className="mb-4">
              <strong className="text-[--text-main]">Baked-Metric</strong> is a precision kitchen utility designed for the modern baker. Unlike generic converters, this tool respects the density of specific ingredients, the physics of oven temperatures at altitude, and the geometry of bakeware.
            </p>
          </div>
       </div>

       {/* Guide / Features */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard 
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>}
            title="Density Aware"
            desc="Converts Volume ↔ Weight using specific density factors for 50+ ingredients (flours, sugars, fats)."
          />
          <InfoCard 
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            title="Altitude Adjustment"
            desc="Calculates oven temperature offsets and Gas Marks for high-elevation baking above 3,000ft."
          />
          <InfoCard 
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>}
            title="Pan Scaling"
            desc="Mathematically resizes recipes when switching pan shapes (Round/Square/Rect) to ensure consistent baking."
          />
       </div>

       {/* Developer Section */}
       <div className="mt-auto pt-4">
          <h3 className="text-[--text-sub] font-bold uppercase tracking-wider text-xs mb-4 ml-2">Developer Credits</h3>
          <div className="neu-out p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
             
             {/* Decorative background element */}
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-[--accent] opacity-5 rounded-full blur-3xl"></div>

             <div className="w-24 h-24 rounded-full neu-in flex items-center justify-center bg-[--bg-color] shrink-0 border-4 border-[--bg-color] shadow-inner text-[--accent]">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
             </div>
             
             <div className="flex-1 text-center md:text-left z-10">
                <h4 className="text-2xl font-black text-[--text-main] mb-1">Matthew Robert Wesney</h4>
                <p className="text-[--text-muted] font-bold text-xs uppercase tracking-[0.2em] mb-6">Developed By</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                   <SocialLink 
                      href="https://matt-wesney.github.io/website/" 
                      label="Website" 
                      icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
                    />
                   <SocialLink 
                      href="https://github.com/" 
                      label="GitHub" 
                      icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>} 
                    />
                   <SocialLink 
                      href="https://x.com/D3VAUX" 
                      label="Twitter / X" 
                      icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                    />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

const InfoCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="neu-out p-6 rounded-3xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
     <div className="text-[--accent] mb-4 p-3 neu-in rounded-2xl">{icon}</div>
     <h3 className="font-bold text-[--text-main] mb-2">{title}</h3>
     <p className="text-xs text-[--text-sub] leading-relaxed">{desc}</p>
  </div>
);

const SocialLink = ({ href, label, icon }: { href: string, label: string, icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="neu-btn neu-out pl-3 pr-4 py-2 rounded-xl text-xs font-bold text-[--text-sub] hover:text-[--accent] flex items-center gap-2 transition-all active:scale-95"
  >
    <span className="flex items-center justify-center text-[--text-main]">{icon}</span>
    {label}
  </a>
);
