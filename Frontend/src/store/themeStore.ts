import { create } from 'zustand';
import { ThemeState } from '@/types';

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system',
  
  setTheme: (theme: 'light' | 'dark' | 'system') => {
    localStorage.setItem('theme', theme);
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
    
    set({ theme });
  },
}));