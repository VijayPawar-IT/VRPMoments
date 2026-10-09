import { useBirthday } from '../../context/BirthdayContext';
import { PhotoUploader } from '../common/PhotoUploader';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function StepMemories() {
  const { data, updateData, nextStep, prevStep } = useBirthday();

  const handleMemoriesChange = (newMemories: typeof data.memories) => {
    updateData({ memories: newMemories });
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-md mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5EE] tracking-tight">
          Hang up some memories 📸
        </h2>
        <p className="text-sm text-[#FAF5EE]/75 mt-2">
          Add your favourite moments and give each one a little story.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <PhotoUploader
          memories={data.memories || []}
          onChange={handleMemoriesChange}
          maxPhotos={5}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between max-w-4xl mx-auto pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="min-h-[44px] px-5 py-2.5 flex items-center gap-2 rounded-xl text-xs sm:text-sm font-medium text-[#FAF5EE]/80 bg-[#250816] border border-[#FAF5EE]/15 hover:bg-[#340C20] hover:text-[#FAF5EE] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={nextStep}
          className="min-h-[44px] px-6 py-2.5 flex items-center gap-2 rounded-xl text-xs sm:text-sm font-semibold text-[#1E050D] bg-[#E5C384] hover:bg-[#F3D59B] transition-all shadow-md active:scale-[0.98]"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
