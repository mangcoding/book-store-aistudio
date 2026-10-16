import React from 'react';
import { Star, Bookmark, BookmarkCheck, ShoppingBag, Eye } from 'lucide-react';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  isBookmarked: boolean;
  onToggleBookmark: (bookId: string) => void;
  compact?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onSelect,
  onAddToCart,
  isBookmarked,
  onToggleBookmark,
  compact = false
}) => {
  return (
    <div
      onClick={() => onSelect(book)}
      className="group relative flex flex-col bg-[#F5F2EB] border border-[#E8E4DC] rounded-xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-subtle-elevation hover:border-[#dbc1ba] cursor-pointer"
    >
      {/* Book Cover Container with authentic book spine depth */}
      <div className="relative w-full aspect-[3/4] bg-[#ecefea] rounded-[4px] overflow-hidden shadow-book-spine mb-3 flex items-center justify-center">
        <img
          src={book.coverImage}
          alt={book.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Book spine tactile shadow gradient */}
        <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" />

        {/* Staff Pick Badge if applicable */}
        {book.isStaffPick && (
          <div className="absolute top-2 left-2 bg-[#466558] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
            Staff Pick
          </div>
        )}

        {/* Bookmark Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(book.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors ${
            isBookmarked
              ? 'bg-[#FAF8F5] text-[#94452c] shadow-xs'
              : 'bg-black/30 text-white hover:bg-black/50'
          }`}
          title={isBookmarked ? 'Saved to Want to Read' : 'Save for later'}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 fill-current" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Quiet Unboxed Metadata */}
          <div className="flex items-center gap-1.5 text-xs text-[#6B726A] mb-1">
            <span className="truncate">{book.genre}</span>
            <span aria-hidden="true">·</span>
            <span>{book.pages}p</span>
          </div>

          <h3 className="font-serif font-bold text-base text-[#242825] group-hover:text-[#94452c] transition-colors line-clamp-1">
            {book.title}
          </h3>

          <p className="font-sans text-xs italic text-[#6B726A] mt-0.5 line-clamp-1">
            {book.author}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#E8E4DC]/70">
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-bold text-sm text-[#242825] tabular-nums">
              ${book.price.toFixed(2)}
            </span>
            <div className="flex items-center text-[11px] text-[#D97736]">
              <Star className="w-3 h-3 fill-current ml-1 mr-0.5" />
              <span className="font-medium">{book.rating}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(book);
            }}
            className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#ffdbd0] text-[#94452c] border border-[#E8E4DC] hover:border-[#dbc1ba] transition-colors"
            title="Add to canvas tote"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
