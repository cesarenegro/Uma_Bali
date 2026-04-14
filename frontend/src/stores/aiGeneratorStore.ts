import { create } from 'zustand';
import type { SpaceConfig, AIProductPayload, StyleParams } from '../types';

interface AIGeneratorStore {
  step: 1 | 2 | 3 | 4;
  spaceConfig: SpaceConfig;
  selectedProducts: AIProductPayload[];
  styleParams: StyleParams;
  generatedSceneUrl: string | null;
  isGenerating: boolean;
  error: string | null;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  setSpaceConfig: (config: Partial<SpaceConfig>) => void;
  addProduct: (product: AIProductPayload) => void;
  removeProduct: (productId: string) => void;
  setStyleParams: (params: Partial<StyleParams>) => void;
  generateScene: () => Promise<void>;
  resetGenerator: () => void;
}

const initialSpaceConfig: SpaceConfig = {
  type: 'Terrace',
  environment: 'Mediterranean'
};

const initialStyleParams: StyleParams = {
  timeOfDay: 'Afternoon',
  season: 'Summer',
  mood: 'Mediterranean',
  lightingStyle: 'Natural'
};

export const useAIGeneratorStore = create<AIGeneratorStore>((set) => ({
  step: 1,
  spaceConfig: initialSpaceConfig,
  selectedProducts: [],
  styleParams: initialStyleParams,
  generatedSceneUrl: null,
  isGenerating: false,
  error: null,
  
  setStep: (step) => set({ step }),
  setSpaceConfig: (config) => set((state) => ({ spaceConfig: { ...state.spaceConfig, ...config } })),
  addProduct: (product) => set((state) => ({
    selectedProducts: [...state.selectedProducts.filter(p => p.id !== product.id), product]
  })),
  removeProduct: (productId) => set((state) => ({
    selectedProducts: state.selectedProducts.filter(p => p.id !== productId)
  })),
  setStyleParams: (params) => set((state) => ({
    styleParams: { ...state.styleParams, ...params }
  })),
  
  generateScene: async () => {
    set({ isGenerating: true, error: null });
    try {
      // Logic for scene generation via Gemini API would be connected here
      await new Promise(resolve => setTimeout(resolve, 3000)); // Mocking API call time
      set({ generatedSceneUrl: '/mock_scene.png', isGenerating: false, step: 4 });
    } catch (err) {
      set({ error: 'Failed to generate scene.', isGenerating: false });
    }
  },
  
  resetGenerator: () => set({
    step: 1,
    spaceConfig: initialSpaceConfig,
    selectedProducts: [],
    styleParams: initialStyleParams,
    generatedSceneUrl: null,
    isGenerating: false,
    error: null
  })
}));
