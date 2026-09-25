import { useState } from 'react';

/**
 * Light, Dark, or System. Light is the default. System follows the operating
 * system. The storage key matches the inline script in index.html, which
 * applies a saved choice before paint.
 */
const STORAGE_KEY = 'theme';
const OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

const readTheme = () => {
  const value = document.documentElement.getAttribute('data-theme');
  return value === 'dark' || value === 'system' ? value : 'light';
};

const syncThemeColor = (theme) => {
  const current = document.querySelector('meta[name="theme-color"][data-override]');
  if (theme === 'system') {
    current?.remove();
    return;
  }

  const meta = current ?? document.createElement('meta');
  meta.name = 'theme-color';
  meta.setAttribute('data-override', '');
  meta.content = theme === 'dark' ? '#161412' : '#ffffff';
  if (!current) document.head.appendChild(meta);
};

const ThemeSwitch = () => {
  const [theme, setTheme] = useState(readTheme);

  const choose = (next) => {
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute('data-theme', next);
    syncThemeColor(next);
  };

  return (
    <fieldset className="theme-switch">
      <legend className="sr-only">Color scheme</legend>
      {OPTIONS.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="theme"
            value={option.value}
            checked={theme === option.value}
            onChange={() => choose(option.value)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
};

export default ThemeSwitch;
