import React from 'react';

/** 6x4 saturation/lightness grid for accent color selection */
export const SVGrid: React.FC<{
  hue: number;
  saturation: number;
  lightness: number;
  onChange: (sat: number, light: number) => void;
  label?: string;
}> = ({ hue, saturation, lightness, onChange, label }) => {
  const saturations = [40, 55, 70, 85, 100, 100];
  const lightnesses = [35, 45, 55, 65];

  return (
    <div className="py-2">
      {label && (
        <div className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wide">
          {label}
        </div>
      )}
      <div className="grid grid-cols-6 gap-0.5">
        {lightnesses.map((l) =>
          saturations.map((s, si) => {
            const isSelected = s === saturation && l === lightness;
            return (
              <button
                key={`${s}-${l}-${si}`}
                onClick={() => onChange(s, l)}
                className={`
                  aspect-[2.5/1] transition-all
                  ${isSelected ? 'ring-2 ring-foreground ring-offset-1 ring-offset-background scale-105 z-10' : 'hover:scale-105'}
                `}
                style={{ backgroundColor: `hsl(${hue}, ${s}%, ${l}%)` }}
                title={`S:${s}% L:${l}%`}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
