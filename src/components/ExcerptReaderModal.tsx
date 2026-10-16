import React, { useState } from 'react';
import { X, Bookmark, BookmarkCheck, Type, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Book } from '../types/book';

interface ExcerptReaderModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onSaveQuote: (quoteText: string, pageNumber: number) => void;
}

export const ExcerptReaderModal: React.FC<ExcerptReaderModalProps> = ({
  book,
  isOpen,
  onClose,
  onSaveQuote
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [savedQuoteIndex, setSavedQuoteIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSaveExcerpt = (text: string, index: number) => {
    onSaveQuote(text, 14 + index * 4);
    setSavedQuoteIndex(index);
    setTimeout(() => setSavedQuoteIndex(null), 2500);
  };

  const fontSizeClasses = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    larger: 'text-xl leading-loose'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#FAF8F5] border border-[#E8E4DC] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Parchment top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DC] bg-[#F5F2EB]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#E8E4DC] text-[#242825] transition-colors"
              aria-label="Back to book details"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#94452c] font-semibold">
                Sample Excerpt · Chapter One
              </p>
              <h3 className="font-serif font-semibold text-[#242825] text-base truncate max-w-xs md:max-w-md">
                {book.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size control */}
            <div className="flex items-center bg-[#FAF8F5] border border-[#E8E4DC] rounded-lg p-0.5">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  fontSize === 'normal'
                    ? 'bg-[#94452c] text-white font-medium'
                    : 'text-[#6B726A] hover:text-[#242825]'
                }`}
                title="Standard font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  fontSize === 'large'
                    ? 'bg-[#94452c] text-white font-medium'
                    : 'text-[#6B726A] hover:text-[#242825]'
                }`}
                title="Larger font size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('larger')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  fontSize === 'larger'
                    ? 'bg-[#94452c] text-white font-medium'
                    : 'text-[#6B726A] hover:text-[#242825]'
                }`}
                title="Largest font size"
              >
                A++
              </button>
            </div>
          </div>
        </div>

        {/* Tactile reading page */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 bg-[#FAF8F5]">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center pb-4 border-b border-[#E8E4DC]/60">
              <span className="text-xs uppercase tracking-widest text-[#6B726A]">
                Part I: The Inhabited Form
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#242825] mt-1">
                The First Threshold
              </h2>
              <p className="text-xs text-[#6B726A] italic mt-1 font-serif">
                by {book.author}
              </p>
            </div>

            {book.excerpt.map((paragraph, index) => (
              <div
                key={index}
                className="group relative rounded-xl p-3 transition-colors hover:bg-[#F5F2EB]/50"
              >
                <p className={`font-serif text-[#242825] ${fontSizeClasses}`}>
                  {paragraph}
                </p>

                <div className="flex items-center justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleSaveExcerpt(paragraph, index)}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#94452c] bg-[#ffdbd0]/60 hover:bg-[#ffdbd0] rounded-full transition-colors font-sans"
                  >
                    {savedQuoteIndex === index ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5" />
                        <span>Saved to Marginalia</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Save as Marginalia Note</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-8 border-t border-[#E8E4DC] text-center">
              <p className="text-xs text-[#6B726A] italic mb-3">
                End of free preview excerpt. The complete {book.pages}-page edition is in stock.
              </p>
            </div>
          </div>
        </div>

        {/* Reader bottom bar */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#E8E4DC] bg-[#F5F2EB] text-xs text-[#6B726A]">
          <span>Page 14 of {book.pages}</span>
          <span className="font-mono text-[11px]">Typeset in Playfair & Plus Jakarta Sans</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#94452c] text-white rounded-lg hover:bg-[#793019] font-medium transition-colors"
          >
            Finished Reading
          </button>
        </div>
      </div>
    </div>
  );
};
