import React, { useRef, useState } from 'react';
import { BirthdayMemory } from '../../types/birthday';
import { compressImageFile } from '../../utils/imageCompression';
import { Upload, X, ArrowLeft, ArrowRight, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotoUploaderProps {
  memories: BirthdayMemory[];
  onChange: (memories: BirthdayMemory[]) => void;
  maxPhotos?: number;
}

export function PhotoUploader({ memories, onChange, maxPhotos = 5 }: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMessage(null);
    const availableSlots = maxPhotos - memories.length;
    if (availableSlots <= 0) {
      setErrorMessage(`You have reached the maximum of ${maxPhotos} memories.`);
      return;
    }

    const filesToProcess = Array.from(files).slice(0, availableSlots);
    setIsProcessing(true);

    try {
      const newMemories: BirthdayMemory[] = [];
      for (const file of filesToProcess) {
        try {
          const compressedDataUrl = await compressImageFile(file);
          newMemories.push({
            id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            url: compressedDataUrl,
            caption: 'A cherished moment we will always remember',
            dateOrLocation: 'Special Day',
          });
        } catch (err: unknown) {
          const message = (err as Error).message || 'Failed to process image.';
          setErrorMessage(message);
        }
      }

      if (newMemories.length > 0) {
        onChange([...memories, ...newMemories]);
      }
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removePhoto = (index: number) => {
    const updated = memories.filter((_, i) => i !== index);
    onChange(updated);
  };

  const movePhoto = (fromIndex: number, direction: 'left' | 'right') => {
    const toIndex = direction === 'left' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= memories.length) return;

    const updated = [...memories];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onChange(updated);
  };

  const updateMemoryField = (index: number, field: keyof BirthdayMemory, value: string) => {
    const updated = [...memories];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Upload button & guidelines */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#2A0916]/70 border border-[#E5C384]/20">
        <div>
          <h4 className="text-sm font-semibold text-[#FAF5EE]">
            Hanging Memories ({memories.length}/{maxPhotos})
          </h4>
          <p className="text-xs text-[#FAF5EE]/70 mt-0.5">
            Supported formats: JPG, PNG, WEBP (up to 5MB). Automatically optimized.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />

        <button
          type="button"
          disabled={memories.length >= maxPhotos || isProcessing}
          onClick={() => fileInputRef.current?.click()}
          className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 flex items-center justify-center gap-2 rounded-xl text-xs font-semibold text-[#1E050D] bg-[#E5C384] hover:bg-[#F3D59B] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.98]"
        >
          {isProcessing ? (
            <span>Optimizing...</span>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Upload Moments</span>
            </>
          )}
        </button>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-200 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hanging Memories Gallery Preview with string wire and wooden clips */}
      <div className="relative pt-6 pb-2">
        {/* Fairy Light String Wire */}
        <div className="relative w-full h-8 mb-4">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 24">
            <path
              d="M0,4 Q200,18 400,6 T800,10"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              opacity="0.6"
            />
          </svg>
        </div>

        {memories.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-[#E5C384]/20 bg-[#1E050D]/40">
            <ImageIcon className="w-10 h-10 text-[#E5C384]/40 mx-auto mb-2" />
            <p className="text-sm font-medium text-[#FAF5EE]/80">No photos added yet</p>
            <p className="text-xs text-[#FAF5EE]/50 mt-1 max-w-sm mx-auto">
              Add up to 5 pictures that will hang on fairy lights in their interactive memory lane.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {memories.map((mem, index) => {
                // Subtle rotation for organic polaroid look
                const rotations = [-1.5, 1.2, -0.8, 1.8, -1.2];
                const rot = rotations[index % rotations.length];

                return (
                  <motion.div
                    key={mem.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0, rotate: rot }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group bg-[#FAF5EE] text-[#1E050D] p-3.5 pb-4 rounded-xl shadow-xl border border-white/20 transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]"
                  >
                    {/* Golden Clip Pin at the top center */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 w-4 h-6 bg-gradient-to-b from-[#E5C384] to-[#B88E44] rounded-sm shadow-md flex items-center justify-center">
                      <div className="w-2 h-1 bg-[#4A1226]/60 rounded-full" />
                    </div>

                    {/* Image Container with 4:3 ratio */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-900 shadow-inner">
                      <img
                        src={mem.url}
                        alt={mem.caption || `Memory ${index + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        aria-label={`Remove photo ${index + 1}`}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {/* Reorder buttons */}
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg p-0.5">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => movePhoto(index, 'left')}
                          aria-label="Move memory earlier"
                          className="p-1 text-white hover:text-[#E5C384] disabled:opacity-30 disabled:hover:text-white"
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                        <span className="text-[10px] font-mono text-white/80 px-1">{index + 1}</span>
                        <button
                          type="button"
                          disabled={index === memories.length - 1}
                          onClick={() => movePhoto(index, 'right')}
                          aria-label="Move memory later"
                          className="p-1 text-white hover:text-[#E5C384] disabled:opacity-30 disabled:hover:text-white"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Caption & Location Input Fields */}
                    <div className="mt-3 space-y-2">
                      <div>
                        <label className="block text-[10px] font-medium text-neutral-600 uppercase tracking-wider">
                          Story / Caption
                        </label>
                        <input
                          type="text"
                          value={mem.caption}
                          placeholder="e.g. That evening we couldn't stop laughing"
                          onChange={(e) => updateMemoryField(index, 'caption', e.target.value)}
                          maxLength={100}
                          className="w-full mt-0.5 px-2 py-1 text-xs text-neutral-900 bg-neutral-100 rounded border border-neutral-300 focus:outline-none focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-neutral-600 uppercase tracking-wider">
                          Date or Place
                        </label>
                        <input
                          type="text"
                          value={mem.dateOrLocation || ''}
                          placeholder="e.g. Goa, 2023"
                          onChange={(e) => updateMemoryField(index, 'dateOrLocation', e.target.value)}
                          maxLength={40}
                          className="w-full mt-0.5 px-2 py-1 text-xs text-neutral-900 bg-neutral-100 rounded border border-neutral-300 focus:outline-none focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D]"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
