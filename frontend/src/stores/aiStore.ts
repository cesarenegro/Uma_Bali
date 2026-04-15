import { create } from 'zustand';

export interface SelectedProduct {
  id: string;
  name: string;
  category: string;
  image: string;
}

export type RenderStatus = 'idle' | 'uploading' | 'analyzing' | 'ready' | 'rendering' | 'done' | 'error';
export type LayoutMode = 'dining' | 'lounge' | 'poolside' | 'mixed' | null;

interface SceneAnalysisResult {
  scene_type: string;
  zones: any[];
}

export interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AIState {
  sceneUploadId: string | null;
  sceneImageUrl: string | null;
  sceneAnalysis: SceneAnalysisResult | null;
  selectedProducts: SelectedProduct[];
  selectedRegions: Region[];
  layoutMode: LayoutMode;
  renderJobId: string | null;
  renderStatus: RenderStatus;
  renderImageUrl: string | null;
  refineInstruction: string;
  renderError: string | null;

  // Actions
  setSceneImage: (url: string, uploadId?: string) => void;
  setSceneAnalysis: (analysis: SceneAnalysisResult) => void;
  addRegion: (region: Region) => void;
  removeRegion: (index: number) => void;
  clearRegions: () => void;
  addProduct: (product: SelectedProduct) => void;
  removeProduct: (productId: string) => void;
  setLayoutMode: (mode: LayoutMode) => void;
  setRenderStatus: (status: RenderStatus, error?: string) => void;
  setRenderResult: (jobId: string, imageUrl: string) => void;
  setRefineInstruction: (instruction: string) => void;
  reset: () => void;
}

export const useAIStore = create<AIState>((set) => ({
  sceneUploadId: null,
  sceneImageUrl: null,
  sceneAnalysis: null,
  selectedProducts: [],
  selectedRegions: [],
  layoutMode: null,
  renderJobId: null,
  renderStatus: 'idle',
  renderImageUrl: null,
  refineInstruction: '',
  renderError: null,

  setSceneImage: (url, uploadId) => set({ sceneImageUrl: url, sceneUploadId: uploadId || null }),
  setSceneAnalysis: (analysis) => set({ sceneAnalysis: analysis }),
  addRegion: (region) => set((state) => ({ selectedRegions: [...state.selectedRegions, region] })),
  removeRegion: (index) => set((state) => ({ selectedRegions: state.selectedRegions.filter((_, i) => i !== index) })),
  clearRegions: () => set({ selectedRegions: [] }),
  addProduct: (product) => 
    set((state) => ({
      selectedProducts: state.selectedProducts.find(p => p.id === product.id) 
        ? state.selectedProducts 
        : [...state.selectedProducts, product]
    })),
  removeProduct: (productId) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.filter(p => p.id !== productId)
    })),
  setLayoutMode: (mode) => set({ layoutMode: mode }),
  setRenderStatus: (status, error) => set({ renderStatus: status, renderError: error || null }),
  setRenderResult: (jobId, imageUrl) => set({ renderJobId: jobId, renderImageUrl: imageUrl, renderStatus: 'done' }),
  setRefineInstruction: (instruction) => set({ refineInstruction: instruction }),
  reset: () => set({
    sceneUploadId: null,
    sceneImageUrl: null,
    sceneAnalysis: null,
    selectedProducts: [],
    selectedRegions: [],
    layoutMode: null,
    renderJobId: null,
    renderStatus: 'idle',
    renderImageUrl: null,
    refineInstruction: '',
    renderError: null
  })
}));
