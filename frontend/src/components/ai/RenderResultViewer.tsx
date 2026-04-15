import { useState, useRef } from 'react';
import { useAIStore } from '../../stores/aiStore';

export default function RenderResultViewer() {
  const { renderStatus, renderImageUrl, sceneImageUrl, renderError, setRenderStatus, selectedProducts, selectedRegions, addRegion, removeRegion } = useAIStore();

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{x: number, y: number} | null>(null);
  const [currentPoint, setCurrentPoint] = useState<{x: number, y: number} | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || renderImageUrl) return;
    
    // Prevent default to stop native drag-and-drop of the image ruining the drawing interaction
    e.preventDefault();
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setStartPoint({ x, y });
    setCurrentPoint({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !startPoint || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));
    
    setCurrentPoint({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !startPoint || !currentPoint) return;
    setIsDrawing(false);
    
    const width = Math.abs(currentPoint.x - startPoint.x);
    const height = Math.abs(currentPoint.y - startPoint.y);
    
    if (width > 2 && height > 2) {
      if (selectedRegions.length >= 1) {
        // Replace existing first region rather than adding a second one
        removeRegion(0);
      }
      setTimeout(() => {
        addRegion({
          x: Math.min(startPoint.x, currentPoint.x),
          y: Math.min(startPoint.y, currentPoint.y),
          width,
          height
        });
      }, 0);
    }
    
    setStartPoint(null);
    setCurrentPoint(null);
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
         <p className="text-charcoal/60">Using Remodela Virtual Staging AI to stage your selection...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 flex gap-4 min-h-0 h-full">

        {/* Selected Products Sidebar inside the viewer (Left side) */}
        {selectedProducts.length > 0 && (
          <div className="w-20 sm:w-24 shrink-0 flex flex-col gap-3 overflow-y-auto pr-1 pb-4 pt-1 custom-scrollbar">
            {selectedProducts.map((p) => (
              <div key={p.id} className="w-full aspect-square bg-white border border-charcoal/10 shadow-sm rounded-lg flex items-center justify-center overflow-hidden shrink-0 group relative cursor-help" title={p.name}>
                <img src={p.image || '/placeholder.png'} alt={p.name} className="w-full h-full object-contain p-2 mix-blend-multiply" />
              </div>
            ))}
          </div>
        )}

        <div className="flex-1 bg-charcoal/5 rounded-xl overflow-hidden relative shadow-inner flex items-center justify-center p-4">
          {renderImageUrl ? (
            <img src={renderImageUrl} alt="Rendered Result" className="w-full h-full object-contain pointer-events-none" />
          ) : sceneImageUrl ? (
            <div 
              ref={containerRef}
              className="relative w-full h-full flex flex-col items-center justify-center cursor-crosshair touch-none select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img src={sceneImageUrl} alt="Original Scene" className="w-full h-full object-contain pointer-events-none drag-none" draggable={false} />
              
              {/* Drawn Box Indicator */}
              {(isDrawing && startPoint && currentPoint) && (
                <div 
                  className="absolute border-2 border-dashed border-[#ffffff] bg-[#8a9a86]/20 pointer-events-none transition-none z-20"
                  style={{
                    left: `${Math.min(startPoint.x, currentPoint.x)}%`,
                    top: `${Math.min(startPoint.y, currentPoint.y)}%`,
                    width: `${Math.abs(currentPoint.x - startPoint.x)}%`,
                    height: `${Math.abs(currentPoint.y - startPoint.y)}%`
                  }}
                />
              )}
              
              {/* Drawn Regions */}
              {selectedRegions.map((region, idx) => (
                <div 
                  key={idx}
                  className="absolute border-2 border-dashed border-[#ffffff] bg-[#8a9a86]/20 flex items-center justify-center group z-20 pointer-events-auto"
                  style={{
                    left: `${region.x}%`,
                    top: `${region.y}%`,
                    width: `${region.width}%`,
                    height: `${region.height}%`
                  }}
                >
                   <button 
                     className="bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 -right-3 shadow-lg z-30 cursor-pointer"
                     onClick={(e) => {
                       e.stopPropagation();
                       removeRegion(idx);
                     }}
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   </button>
                   <span className="text-white font-bold opacity-0 group-hover:opacity-100 drop-shadow-md">Region {idx + 1}</span>
                </div>
              ))}

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                {selectedRegions.length === 0 && !isDrawing && (
                  <>
                    <span className="bg-white/90 text-charcoal px-6 py-3 rounded-full shadow-lg font-medium tracking-wide flex items-center gap-2 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Photo Uploaded — Ready to Generate
                    </span>
                    <p className="text-charcoal/70 bg-white/90 px-4 py-2 rounded-md font-medium text-sm text-center shadow-sm">
                      Click and drag a box above to mark where you want the furniture!
                    </p>
                  </>
                )}
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
      </div>
      {renderStatus === 'done' && (
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto w-full">
        <p className="text-charcoal/60 text-center">To add another piece of furniture, download this generated image and re-upload it as a new scene.</p>
      </div>
      )}
    </div>
  );
}
