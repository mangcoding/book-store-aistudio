import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Headphones } from 'lucide-react';

interface AudioPreviewPlayerProps {
  title: string;
  duration?: string;
  author: string;
  onClose?: () => void;
}

export const AudioPreviewPlayer: React.FC<AudioPreviewPlayerProps> = ({
  title,
  duration = '3:45',
  author,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(18); // percentage

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl p-4 my-3 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#ffdbd0] text-[#94452c] flex items-center justify-center shrink-0">
            <Headphones className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#94452c]">
              Audio Excerpt Preview
            </p>
            <p className="text-sm font-serif font-medium text-[#242825] truncate">
              {title}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-xs text-[#6B726A] hover:text-[#242825] px-2 py-1 rounded"
          >
            Close
          </button>
        )}
      </div>

      {/* Waveform graphic simulator */}
      <div className="flex items-center justify-between gap-1 h-8 my-2 px-1 bg-[#F5F2EB] rounded-lg">
        {[
          35, 60, 45, 80, 50, 90, 70, 30, 40, 75, 95, 65, 40, 55, 85, 90, 60,
          40, 70, 50, 80, 30, 60, 40, 75, 85, 45, 95, 60, 40, 70, 50, 30, 65,
          45, 80
        ].map((height, i) => {
          const barProgress = (i / 36) * 100;
          const isPassed = barProgress <= progress;
          return (
            <div
              key={i}
              className="flex-1 rounded-full transition-all duration-150"
              style={{
                height: `${isPlaying ? Math.max(20, (height * (progress % 20 + 80)) / 100) : height}%`,
                backgroundColor: isPassed ? '#94452c' : '#dbc1ba'
              }}
            />
          );
        })}
      </div>

      {/* Progress slider bar */}
      <div className="flex items-center justify-between text-[11px] text-[#6B726A] font-mono tabular-nums mb-3">
        <span>0:{Math.floor((progress * 3.45) / 10).toString().padStart(2, '0')}</span>
        <span>Narrated by Literary Cast</span>
        <span>{duration}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1 border-t border-[#E8E4DC]">
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2 text-[#6B726A] hover:text-[#242825] rounded-full hover:bg-[#F5F2EB] transition-colors"
            title="Restart sample"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 text-xs text-[#6B726A]">
            <Volume2 className="w-3.5 h-3.5" />
            <span>High Fidelity Sample</span>
          </div>
        </div>

        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#94452c] text-white text-xs font-semibold hover:bg-[#793019] active:scale-95 transition-all shadow-sm"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause Sample</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              <span>Play Sample</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
