import React, { useState } from 'react';
import { X, Star, Bookmark, BookmarkCheck, ShoppingBag, Headphones, BookOpen, Check, ShieldCheck, Truck } from 'lucide-react';
import { Book, BookFormat } from '../types/book';
import { AudioPreviewPlayer } from './AudioPreviewPlayer';
import { ExcerptReaderModal } from './ExcerptReaderModal';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (book: Book, format: BookFormat, quantity: number) => void;
  isBookmarked: boolean;
  onToggleBookmark: (bookId: string) => void;
  onSaveQuote: (quoteText: string, pageNumber: number) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
  onAddToCart,
  isBookmarked,
  onToggleBookmark,
  onSaveQuote
}) => {
  if (!isOpen || !book) return null;

  const [selectedFormat, setSelectedFormat] = useState<BookFormat>(book.availableFormats[0]?.format || 'Hardcover');
  const [quantity, setQuantity] = useState(1);
  const [showAudioPreview, setShowAudioPreview] = useState(false);
  const [showExcerptModal, setShowExcerptModal] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentPrice = book.availableFormats.find(f => f.format === selectedFormat)?.price || book.price;
  const totalPrice = (currentPrice * quantity).toFixed(2);

  const handleAddToCart = () => {
    onAddToCart(book, selectedFormat, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div 
          className="relative w-full sm:max-w-3xl max-h-[92vh] bg-[#FAF8F5] border sm:border-[#E8E4DC] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Drag Indicator Handle */}
          <div className="sm:hidden w-12 h-1.5 bg-[#dbc1ba] rounded-full mx-auto my-3 shrink-0" />

          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#E8E4DC] bg-[#F5F2EB]/80">
            <div className="flex items-center gap-2 text-xs text-[#6B726A]">
              <span>{book.genre}</span>
              <span aria-hidden="true">·</span>
              <span>Published {book.publishedYear}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark(book.id)}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked
                    ? 'bg-[#ffdbd0] text-[#94452c]'
                    : 'text-[#6B726A] hover:bg-[#E8E4DC]'
                }`}
                title={isBookmarked ? 'Remove from Want to Read' : 'Save to Want to Read'}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5 fill-current" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#6B726A] hover:text-[#242825] hover:bg-[#E8E4DC] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable body content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Column: Book Cover with Level 2 Spine Depth */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative group w-48 sm:w-56 aspect-[3/4] rounded-[4px] overflow-hidden shadow-book-spine border border-[#E8E4DC] bg-[#F5F2EB]">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  {/* Spine depth visual overlay */}
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Quick preview triggers */}
                <div className="w-full max-w-xs grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => setShowExcerptModal(true)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg bg-[#F5F2EB] border border-[#E8E4DC] text-[#242825] hover:bg-[#ecefea] transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#94452c]" />
                    <span>Read Sample</span>
                  </button>
                  <button
                    onClick={() => setShowAudioPreview(!showAudioPreview)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg bg-[#ffdbd0]/60 border border-[#dbc1ba] text-[#94452c] hover:bg-[#ffdbd0] transition-colors"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#94452c]" />
                    <span>Audio Sample</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Title, Author, Rating, Formats, Synopsis */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242825] leading-tight text-balance">
                    {book.title}
                  </h1>
                  <p className="text-base font-serif italic text-[#6B726A] mt-1">
                    by {book.author}
                  </p>
                </div>

                {/* Rating & Review counts */}
                <div className="flex items-center gap-3 text-xs text-[#6B726A]">
                  <div className="flex items-center gap-1 text-[#D97736]">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-[#242825]">{book.rating}</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <span>{book.reviewCount} literary reviews</span>
                  <span aria-hidden="true">·</span>
                  <span>{book.pages} pages</span>
                </div>

                {/* Inline Audio Player if toggled */}
                {showAudioPreview && (
                  <AudioPreviewPlayer
                    title={book.audioSampleTitle || book.title}
                    duration={book.audioDuration}
                    author={book.author}
                    onClose={() => setShowAudioPreview(false)}
                  />
                )}

                {/* Staff Selection Highlight */}
                {book.isStaffPick && book.staffPickQuote && (
                  <div className="bg-[#c5e7d8]/40 border border-[#466558]/30 rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#466558]">
                      <span>Curator's Commendation</span>
                    </div>
                    <p className="font-serif italic text-xs text-[#242825] leading-relaxed">
                      "{book.staffPickQuote}"
                    </p>
                    {book.curatorName && (
                      <p className="text-[11px] text-[#466558] font-medium">
                        — {book.curatorName}
                      </p>
                    )}
                  </div>
                )}

                {/* Format selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#6B726A] uppercase tracking-wider mb-2">
                    Select Binding / Edition
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {book.availableFormats.map((item) => (
                      <button
                        key={item.format}
                        onClick={() => setSelectedFormat(item.format)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          selectedFormat === item.format
                            ? 'bg-[#FAF8F5] border-[#94452c] ring-2 ring-[#94452c]/20 shadow-xs'
                            : 'bg-[#F5F2EB] border-[#E8E4DC] hover:border-[#dbc1ba]'
                        }`}
                      >
                        <p className="text-xs font-semibold text-[#242825]">
                          {item.format}
                        </p>
                        <p className="text-xs font-mono font-medium text-[#94452c] mt-0.5 tabular-nums">
                          ${item.price.toFixed(2)}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Synopsis */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B726A] mb-1.5">
                    Synopsis
                  </h4>
                  <p className="text-sm font-sans text-[#242825] leading-relaxed">
                    {book.synopsis}
                  </p>
                </div>

                {/* Print specs */}
                <div className="pt-3 border-t border-[#E8E4DC] grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[#6B726A]">
                  <div>
                    <span className="block text-[11px] text-[#6B726A]">Publisher</span>
                    <span className="font-medium text-[#242825]">{book.publisher}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#6B726A]">Binding</span>
                    <span className="font-medium text-[#242825]">{selectedFormat}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#6B726A]">Eco Stock</span>
                    <span className="font-medium text-[#242825]">FSC Acid-Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Purchase Bar */}
          <div className="px-6 py-4 border-t border-[#E8E4DC] bg-[#FAF8F5] flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center bg-[#F5F2EB] border border-[#E8E4DC] rounded-xl p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#242825] hover:bg-[#E8E4DC] font-bold transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-10 text-center font-mono font-semibold text-sm tabular-nums text-[#242825]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#242825] hover:bg-[#E8E4DC] font-bold transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 min-h-[48px] px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                addedAnimation
                  ? 'bg-[#466558] text-white'
                  : 'bg-[#94452c] text-white hover:bg-[#793019] active:scale-[0.98] shadow-sm'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Tote Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Tote Bag · ${totalPrice}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Reader Modal */}
      <ExcerptReaderModal
        book={book}
        isOpen={showExcerptModal}
        onClose={() => setShowExcerptModal(false)}
        onSaveQuote={onSaveQuote}
      />
    </>
  );
};
