import React from 'react';

/** Color swatch with HSL/hex values */
export const ColorPreview: React.FC<{
  hue: number;
  saturation: number;
  lightness: number;
  hex: string;
  compact?: boolean;
}> = ({ hue, saturation, lightness, hex, compact = false }) => (
  <div className={`flex items-center gap-3 bg-surface-2 rounded ${compact ? 'p-2' : 'p-3'}`}>
    <div
      className={`flex-shrink-0 border border-border ${compact ? 'w-6 h-6' : 'w-8 h-8'}`}
      style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)` }}
    />
    <div className="font-mono text-xs text-muted-foreground">
      <div className="text-card-foreground font-medium">{hex}</div>
      <div>H:{hue} S:{saturation} L:{lightness}</div>
    </div>
  </div>
);
