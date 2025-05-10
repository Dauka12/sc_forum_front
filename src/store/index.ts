import { create } from 'zustand';

interface StoreState {
    language: string;
    setLanguage: (language: string) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const useStore = create<StoreState>((set) => ({
    language: localStorage.getItem('i18nextLng') || 'ru',
    setLanguage: (language: string) => {
        localStorage.setItem('i18nextLng', language);
        set({ language });
    },
    isDarkMode: localStorage.getItem('theme') === 'dark',
    toggleDarkMode: () => {
        set((state) => {
            const newDarkMode = !state.isDarkMode;
            localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', newDarkMode);
            return { isDarkMode: newDarkMode };
        });
    },
}));