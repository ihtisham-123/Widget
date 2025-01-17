import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ScreenReaderState {
  isEnabled: boolean;
  isSpeaking: boolean;
  currentElement: HTMLElement | null;
  toggleEnabled: () => void;
  setCurrentElement: (element: HTMLElement | null) => void;
  setSpeaking: (speaking: boolean) => void;
}

export const useScreenReader = create<ScreenReaderState>()(
  persist(
    (set) => ({
      isEnabled: false,
      isSpeaking: false,
      currentElement: null,
      toggleEnabled: () => set((state) => ({ isEnabled: !state.isEnabled })),
      setCurrentElement: (element) => set({ currentElement: element }),
      setSpeaking: (speaking) => set({ isSpeaking: speaking }),
    }),
    {
      name: 'screen-reader-settings',
    }
  )
);
