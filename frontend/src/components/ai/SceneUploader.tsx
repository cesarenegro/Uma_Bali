import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAIStore } from '../../stores/aiStore';

export default function SceneUploader() {
  const { t } = useTranslation('common');
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setSceneImage, setRenderStatus } = useAIStore();

  const handleFile = (file: File) => {
    // Basic validation
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be under 10MB.');
      return;
    }

    setRenderStatus('uploading');
    
    // Simulate upload / object URL creation
    const imageUrl = URL.createObjectURL(file);
    setTimeout(() => {
      setSceneImage(imageUrl, `upload_${Date.now()}`);
      setRenderStatus('ready');
    }, 800);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors duration-300 flex flex-col items-center justify-center min-h-[400px] cursor-pointer hover:bg-charcoal/5
        ${isDragActive ? 'border-sage bg-sage/10' : 'border-charcoal/20 bg-linen'}`}
      onClick={() => fileInputRef.current?.click()}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept="image/*" 
        capture="environment"
        className="hidden" 
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
      />
      
      <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mb-6 text-sage">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <h3 className="text-2xl font-light text-charcoal mb-4">
        {t('ai.upload_title', 'Upload Your Outdoor Space')}
      </h3>
      <p className="text-charcoal/60 mb-8 max-w-md">
        {t('ai.upload_desc', 'Upload a clear photo of your garden, terrace, or poolside. For best results, use a wide angle shot during daylight.')}
      </p>
      
      <button 
        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
        className="bg-charcoal text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-charcoal/80 transition-colors"
      >
        {t('ai.upload_btn', 'Select Photo')}
      </button>
    </div>
  );
}
