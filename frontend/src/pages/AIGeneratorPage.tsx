import { motion } from 'framer-motion';
import { useAIGeneratorStore } from '../stores/aiGeneratorStore';
import { useTranslation } from 'react-i18next';

export default function AIGeneratorPage() {
  const { t } = useTranslation('common');
  const { step, spaceConfig, setSpaceConfig, setStep, isGenerating, generateScene, generatedSceneUrl } = useAIGeneratorStore();

  return (
    <div className="min-h-screen bg-linen pt-12 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="heading-display text-h2 text-espresso mb-4">{t('nav.ai_generator', 'AI Space Generator')}</h1>
          <p className="body-base text-stone max-w-2xl mx-auto">
            {t('ai.intro', 'Visualize UMA BALI furniture in your own environment. Configure your space, select products, and let our AI create a photorealistic rendering.')}
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-12 relative border-b border-travertine pb-6">
          {[
            { num: 1, label: t('ai.step1', 'Space Details') },
            { num: 2, label: t('ai.step2', 'Furniture Selection') },
            { num: 3, label: t('ai.step3', 'Style & Mood') },
            { num: 4, label: t('ai.step4', 'Result') }
          ].map((s) => (
            <div key={s.num} className={`flex flex-col items-center ${step >= s.num ? 'text-brand' : 'text-stone opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium mb-2 ${step >= s.num ? 'bg-brand text-linen' : 'bg-travertine text-stone'}`}>
                {s.num}
              </div>
              <span className="text-caption">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Space Details */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 border border-travertine shadow-sm">
            <h2 className="heading-h3 text-espresso mb-8">{t('ai.define_space', 'Define Your Space')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-nav font-medium text-espresso mb-2">{t('ai.space_type', 'Space Type')}</label>
                <select 
                  className="w-full bg-linen border border-travertine p-3 text-body outline-none focus:border-brand"
                  value={spaceConfig.type}
                  onChange={(e) => setSpaceConfig({ type: e.target.value as any })}
                >
                  <option value="Terrace">{t('ai.space.terrace', 'Terrace')}</option>
                  <option value="Poolside">{t('ai.space.poolside', 'Poolside')}</option>
                  <option value="Garden">{t('ai.space.garden', 'Garden')}</option>
                  <option value="Balcony">{t('ai.space.balcony', 'Balcony')}</option>
                  <option value="Patio">{t('ai.space.patio', 'Patio')}</option>
                </select>
              </div>
              <div>
                <label className="block text-nav font-medium text-espresso mb-2">{t('ai.environment', 'Environment')}</label>
                <select 
                  className="w-full bg-linen border border-travertine p-3 text-body outline-none focus:border-brand"
                  value={spaceConfig.environment}
                  onChange={(e) => setSpaceConfig({ environment: e.target.value as any })}
                >
                  <option value="Mediterranean">{t('ai.env.mediterranean', 'Mediterranean')}</option>
                  <option value="Tropical">{t('ai.env.tropical', 'Tropical')}</option>
                  <option value="Urban">{t('ai.env.urban', 'Urban')}</option>
                  <option value="Desert">{t('ai.env.desert', 'Desert')}</option>
                  <option value="Coastal">{t('ai.env.coastal', 'Coastal')}</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <button 
                onClick={() => setStep(2)}
                className="btn-primary"
              >
                {t('ai.next_step', 'Next Step')} →
              </button>
            </div>
          </motion.div>
        )}

        {/* Other steps stubs... */}
        {(step === 2 || step === 3) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 border border-travertine shadow-sm text-center">
             <h2 className="heading-h3 text-espresso mb-4">{t('ai.coming_soon', 'Coming Soon')}</h2>
             <p className="text-stone mb-8">{t('ai.being_implemented', 'This step is being implemented.')}</p>
             <div className="flex justify-center gap-4">
                <button onClick={() => setStep((step - 1) as any)} className="btn-secondary">← {t('ai.back', 'Back')}</button>
                <button onClick={() => step === 3 ? generateScene() : setStep((step + 1) as any)} className="btn-primary">
                  {step === 3 ? (isGenerating ? t('ai.generating', 'Generating...') : t('ai.generate_scene', 'Generate Scene')) : `${t('ai.next_step', 'Next Step')} →`}
                </button>
             </div>
          </motion.div>
        )}

        {/* Step 4: Result */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 border border-travertine shadow-sm">
             <h2 className="heading-h3 text-espresso mb-8 text-center">{t('ai.result_title', 'Your Space Visualized')}</h2>
             
             {generatedSceneUrl ? (
               <div className="aspect-[16/9] bg-stone relative">
                  <div className="absolute inset-0 flex items-center justify-center text-linen caption">
                    {t('ai.result_placeholder', '[Generated Image will appear here]')}
                  </div>
               </div>
             ) : (
               <div className="py-24 text-center text-stone">{t('ai.error_loading', 'Error loading scene.')}</div>
             )}

             <div className="flex justify-center mt-12">
               <button onClick={() => setStep(1)} className="btn-secondary">{t('ai.start_over', 'Start Over')}</button>
             </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
