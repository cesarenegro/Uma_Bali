import { create } from 'zustand';

interface AudioState {
  isPlaying: boolean;
  toggleAudio: () => void;
  setAudioState: (state: boolean) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false, // Default is false to prevent autoplay issues, will be ignited by splash
  toggleAudio: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setAudioState: (state) => set({ isPlaying: state }),
}));
