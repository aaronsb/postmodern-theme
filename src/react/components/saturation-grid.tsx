import React from 'react';

/** Stepped saturation picker */
export const SaturationGrid: React.FC<{
  value: number;
  onChange: (value: number) => void;
  hue: number;
  lightness?: number;
  steps?: number[];
  label?: string;
}> = ({ value, onChange, hue, lightness = 35, steps = [0, 6, 12, 18, 24, 30], label }) => {
  const nearestStep = steps.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );

  return (
    <div className="py-2">
      {label && (
        <div className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wide">
          {label}
        </div>
      )}
      <div className="grid grid-cols-6 gap-0.5">
        {steps.map((sat) => (
          <button
            key={sat}
            onClick={() => onChange(sat)}
            className={`
              aspect-[3/1] transition-all
              ${nearestStep === sat ? 'ring-2 ring-foreground ring-offset-1 ring-offset-background scale-105 z-10' : 'hover:scale-105'}
            `}
            style={{ backgroundColor: `hsl(${hue}, ${sat}%, ${lightness}%)` }}
            title={`${sat}%`}
          />
        ))}
      </div>
    </div>
  );
};
