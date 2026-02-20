import React from 'react';

/** Mode-dependent lightness picker */
export const LightnessGrid: React.FC<{
  value: number;
  onChange: (value: number) => void;
  hue: number;
  saturation: number;
  stops: number[];
  label?: string;
}> = ({ value, onChange, hue, saturation, stops, label }) => {
  const nearestStop = stops.reduce((prev, curr) =>
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
        {stops.map((light) => (
          <button
            key={light}
            onClick={() => onChange(light)}
            className={`
              aspect-[3/1] transition-all
              ${nearestStop === light ? 'ring-2 ring-foreground ring-offset-1 ring-offset-background scale-105 z-10' : 'hover:scale-105'}
            `}
            style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${light}%)` }}
            title={`${light}%`}
          />
        ))}
      </div>
    </div>
  );
};
