import React from 'react';

/** Card section with header */
export const Section: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  description?: string;
}> = ({ title, icon, children, description }) => (
  <section className="bg-card rounded-lg border border-border overflow-hidden">
    <div className="px-4 py-3 border-b border-border flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <div>
        <h2 className="font-semibold text-card-foreground">{title}</h2>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </div>
    <div className="px-4 divide-y divide-border">{children}</div>
  </section>
);

/** Subsection header for grouped controls */
export const Subsection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="py-4">
    <div className="text-xs font-mono uppercase tracking-wider text-primary mb-3">{title}</div>
    {children}
  </div>
);

/** Toggle switch */
export const Toggle: React.FC<{
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}> = ({ enabled, onChange, label, description, icon }) => (
  <div className="flex items-start justify-between gap-4 py-3">
    <div className="flex items-start gap-3">
      {icon && <div className="mt-0.5 text-muted-foreground">{icon}</div>}
      <div>
        <div className="font-medium text-card-foreground">{label}</div>
        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0
        ${enabled ? 'bg-primary' : 'bg-muted-foreground/30'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm
          ${enabled ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  </div>
);
