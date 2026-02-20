import React from 'react';

/** 12-step hue picker at 30-degree intervals */
export const HueGrid: React.FC<{
  value: number;
  onChange: (value: number) => void;
  lightness?: number;
  saturation?: number;
  label?: string;
}> = ({ value, onChange, lightness = 50, saturation = 70, label }) => {
  const nearestStep = Math.round(value / 30) * 30;

  return (
    <div className="py-2">
      {label && (
        <div className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wide">
          {label}
        </div>
      )}
      <div className="grid grid-cols-12 gap-0.5">
        {Array.from({ length: 12 }, (_, i) => {
          const hue = i * 30;
          const isSelected = nearestStep === hue || (nearestStep === 360 && hue === 0);
          return (
            <button
              key={hue}
              onClick={() => onChange(hue)}
              className={`
                aspect-[2/1] transition-all
                ${isSelected ? 'ring-2 ring-foreground ring-offset-1 ring-offset-background scale-105 z-10' : 'hover:scale-105'}
              `}
              style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)` }}
              title={`${hue}°`}
            />
          );
        })}
      </div>
    </div>
  );
};
