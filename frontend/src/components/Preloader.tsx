import { useEffect, useState } from "react";

export function Preloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start sliding out after 1.8 seconds
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1800);

    // Completely remove preloader from DOM after 2.8 seconds
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {loading && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
            fading ? "-translate-y-full pointer-events-none" : "translate-y-0"
          }`}
        >
          <div className="relative flex flex-col items-center">
            <div className="relative overflow-hidden">
              {/* Elegant reveal of the logo */}
              <img 
                src="/lo.png" 
                alt="coimbatore.properties Loading" 
                className="relative z-10 h-32 w-auto object-contain drop-shadow-lg opacity-0 animate-[fadeScale_1.2s_ease-out_forwards]"
              />
              {/* Light sweep effect across the logo */}
              <div className="absolute inset-0 z-20 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </div>
            
            <style>{`
              @keyframes fadeScale {
                0% { opacity: 0; transform: scale(0.95) translateY(10px); }
                100% { opacity: 1; transform: scale(1) translateY(0); }
              }
              @keyframes shimmer {
                100% { transform: translateX(100%); }
              }
            `}</style>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
