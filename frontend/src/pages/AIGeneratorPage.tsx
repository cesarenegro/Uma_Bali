import { useTranslation } from 'react-i18next';
import { useAIStore } from '../stores/aiStore';
import SceneUploader from '../components/ai/SceneUploader';
import ProductSelectionSidebar from '../components/ai/ProductSelectionSidebar';
import RenderResultViewer from '../components/ai/RenderResultViewer';
import { generateAIStaging } from '../services/aiService';

export default function AIGeneratorPage() {
  const { t } = useTranslation('common');
  const { 
    sceneImageUrl, 
    renderStatus, 
    selectedProducts,
    selectedRegions,
    setRenderStatus,
    setRenderResult
  } = useAIStore();

  const handleGenerate = async () => {
    if (!sceneImageUrl || selectedProducts.length === 0) {
      alert('Please upload a scene and select at least one product.');
      return;
    }
    
    setRenderStatus('rendering');
    try {
      const resultImageUrl = await generateAIStaging(
         sceneImageUrl,
         selectedProducts,
         selectedRegions
      );
      setRenderStatus('done');
      setRenderResult(`job_${Date.now()}`, resultImageUrl);
    } catch (err: any) {
      setRenderStatus('error', err.message || 'Generation failed');
    }
  };

  const handleEraseImage = () => {
    useAIStore.setState({
      sceneImageUrl: null,
      sceneUploadId: null,
      renderImageUrl: null,
      renderJobId: null,
      renderStatus: 'idle',
      renderError: null,
      selectedRegions: []
    });
  };

  return (
    <div className="h-screen flex flex-col bg-linen overflow-hidden pt-16">
      {/* Top Banner */}
      <div className="border-b border-charcoal/10 bg-white px-6 py-3 flex items-center justify-between z-10 shrink-0 shadow-sm">
        <h1 className="text-xl font-light text-charcoal tracking-wide uppercase">
          {t('ai.stager_title', 'Visualize in Your Space')}
        </h1>
        <div className="flex items-center gap-4">
          {sceneImageUrl && (
            <button 
              onClick={handleEraseImage}
              disabled={renderStatus === 'rendering'}
              className="text-xs uppercase tracking-widest text-[#D9534F] hover:text-red-700 transition-colors mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('ai.erase_image', 'Erase Image')}
            </button>
          )}
          <span className="text-sm text-charcoal/60">
            {selectedProducts.length} {t('ai.items_selected', 'items selected')}
          </span>
          <button 
            onClick={handleGenerate}
            disabled={renderStatus === 'rendering' || !sceneImageUrl || selectedProducts.length === 0}
            className="bg-sage text-white px-6 py-2 uppercase tracking-widest text-xs hover:bg-sage/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {renderStatus === 'rendering' ? t('ai.generating', 'Generating...') : t('ai.generate', 'Generate')}
          </button>
        </div>
      </div>

      {/* Editor Workspace */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar - Products */}
        <ProductSelectionSidebar />

        {/* Main Canvas Area */}
        <div className="flex-1 p-6 overflow-y-auto align-middle flex items-center justify-center">
          <div className="max-w-4xl w-full h-full flex flex-col pt-4 pb-12">
            {!sceneImageUrl ? (
               <SceneUploader />
            ) : (
               <RenderResultViewer />
            )}
            
            {sceneImageUrl && renderStatus === 'ready' && (
              <div className="mt-8 text-center bg-white p-8 rounded-xl border border-charcoal/10 shadow-sm">
                <h3 className="text-xl font-medium text-charcoal mb-2">Ready to Render</h3>
                <p className="text-charcoal/60 mb-6 max-w-lg mx-auto">
                  Your space has been uploaded and {selectedProducts.length} items are selected.
                </p>
                <div className="mb-8">
                   {/* Items are now displayed inside the viewer on the left */}
                </div>
                <button 
                  onClick={handleGenerate}
                  disabled={selectedProducts.length === 0}
                  className="bg-charcoal text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-md mx-auto inline-block"
                >
                  {t('ai.go_rendering', 'Go Rendering')}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
