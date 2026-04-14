import { useState } from 'react';
import { useAIStore } from '../../stores/aiStore';

export default function RenderResultViewer() {
  const { renderStatus, renderImageUrl, sceneImageUrl, renderError, refineInstruction, setRefineInstruction, setRenderStatus } = useAIStore();
  const [inputText, setInputText] = useState(refineInstruction);

  const handleRefine = () => {
    if (!inputText.trim()) return;
    setRefineInstruction(inputText);
    setRenderStatus('rendering');
    
    // Simulate API call for refining
    setTimeout(() => {
      // For now we just stay in done state without actually changing image
      // Real app would fetch a slightly different version and update renderImageUrl
      setRenderStatus('done');
    }, 2000);
  };

  if (renderStatus === 'error') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center bg-red-50/50 rounded-xl border border-red-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-xl font-medium text-red-800 mb-2">Generation Failed</h3>
        <p className="text-red-600/80 mb-6">{renderError || 'We encountered an issue processing your scene.'}</p>
        <button 
          onClick={() => setRenderStatus('ready')}
          className="bg-white text-charcoal border border-charcoal/20 px-6 py-2 uppercase tracking-widest text-sm hover:bg-charcoal/5 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (renderStatus === 'rendering') {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
         <div className="w-16 h-16 border-4 border-sage/20 border-t-sage rounded-full animate-spin mb-6"></div>
         <h3 className="text-2xl font-light text-charcoal mb-2 animate-pulse">Rendering Setup...</h3>
         <p className="text-charcoal/60">Using Gemini 2.5 Flash to stage your selection</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-charcoal/5 rounded-xl overflow-hidden relative shadow-inner flex items-center justify-center p-4">
        {renderImageUrl ? (
          <img src={renderImageUrl} alt="Rendered Result" className="w-full h-full object-contain" />
        ) : sceneImageUrl ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img src={sceneImageUrl} alt="Original Scene" className="w-full h-full object-contain opacity-40 blur-[1px]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="bg-white/90 text-charcoal px-6 py-3 rounded-full shadow-lg font-medium tracking-wide flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Photo Uploaded — Ready to Generate
              </span>
            </div>
          </div>
        ) : (
          <div className="text-charcoal/40 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>Your result will appear here</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto w-full">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="e.g. Move the dining table closer to the pool"
          className="flex-1 bg-white border border-charcoal/20 px-4 py-3 placeholder:text-charcoal/40 focus:outline-none focus:border-sage transition-colors"
        />
        <button 
          onClick={handleRefine}
          disabled={!inputText.trim()}
          className="bg-charcoal text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-charcoal/80 transition-colors disabled:opacity-50"
        >
          Refine Result
        </button>
      </div>
    </div>
  );
}
