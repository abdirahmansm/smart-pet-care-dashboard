import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../common/ThemeProvider';

const modeSequence = {
  light: 'dark',
  dark: 'system',
  system: 'light'
};

const ThemeToggle = () => {
  const { mode, theme, setMode } = useTheme();
  const nextMode = modeSequence[mode] || 'light';

  return (
    <button
      onClick={() => setMode(nextMode)}
      className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border border-border hover:bg-muted/80 transition-colors duration-200"
      aria-label={`Switch theme (current: ${mode})`}
      title={`Switch theme (current: ${mode})`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-yellow-400" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700" />
      )}
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground hidden sm:inline">
        {mode}
      </span>
    </button>
  );
};

export default ThemeToggle;