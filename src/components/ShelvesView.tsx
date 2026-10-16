import React, { useState } from 'react';
import { Book, MarginaliaNote, ReadingGoal, ReadingProgress } from '../types/book';
import { BookCard } from './BookCard';
import { BookOpen, Bookmark, CheckCircle2, Feather, Flame, Plus, Quote, Sparkles, Trophy } from 'lucide-react';

interface ShelvesViewProps {
  books: Book[];
  progressMap: Record<string, ReadingProgress>;
  onUpdatePage: (bookId: string, delta: number) => void;
  marginaliaList: MarginaliaNote[];
  onAddMarginalia: (note: Omit<MarginaliaNote, 'id' | 'createdAt'>) => void;
  readingGoal: ReadingGoal;
  onSelectBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (bookId: string) => void;
  activeSubTab?: 'reading' | 'saved' | 'finished' | 'quotes';
}

export const ShelvesView: React.FC<ShelvesViewProps> = ({
  books,
  progressMap,
  onUpdatePage,
  marginaliaList,
  onAddMarginalia,
  readingGoal,
  onSelectBook,
  onAddToCart,
  bookmarkedIds,
  onToggleBookmark,
  activeSubTab = 'reading'
}) => {
  const [currentTab, setCurrentTab] = useState<'reading' | 'saved' | 'finished' | 'quotes'>(activeSubTab);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [selectedBookForNote, setSelectedBookForNote] = useState<string>(books[0]?.id || '');
  const [quoteInput, setQuoteInput] = useState('');
  const [reflectionInput, setReflectionInput] = useState('');
  const [pageInput, setPageInput] = useState<number>(42);

  // Group books according to status
  const currentlyReadingBooks = books.filter(
    (b) => progressMap[b.id]?.status === 'currently_reading'
  );
  const wantToReadBooks = books.filter(
    (b) => bookmarkedIds.includes(b.id) || progressMap[b.id]?.status === 'want_to_read'
  );
  const finishedBooks = books.filter(
    (b) => progressMap[b.id]?.status === 'finished'
  );

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteInput.trim()) return;
    const targetBook = books.find((b) => b.id === selectedBookForNote);
    onAddMarginalia({
      bookId: selectedBookForNote,
      bookTitle: targetBook?.title || 'Unknown Title',
      author: targetBook?.author || 'Unknown Author',
      pageNumber: Number(pageInput) || 1,
      quoteText: quoteInput.trim(),
      userReflection: reflectionInput.trim()
    });
    setQuoteInput('');
    setReflectionInput('');
    setShowAddNoteModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 2026 Reading Challenge Sanctuary Card */}
      <div className="bg-[#c5e7d8]/30 border border-[#466558]/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#466558] uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-[#466558]" />
              <span>2026 Reading Sanctuary Challenge</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#242825]">
              {readingGoal.completedBooks} of {readingGoal.targetBooks} Volumes Completed
            </h2>
            <p className="text-xs text-[#6B726A]">
              Pacing 4 books ahead of schedule · {readingGoal.minutesReadThisWeek} minutes read this week
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] shadow-xs">
              <Flame className="w-5 h-5 text-[#94452c]" />
              <div>
                <p className="text-xs font-bold text-[#242825]">
                  {readingGoal.currentStreakDays} Days
                </p>
                <p className="text-[10px] text-[#6B726A]">Daily Streak</p>
              </div>
            </div>

            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#E8E4DC]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#466558]"
                  strokeDasharray={`${(readingGoal.completedBooks / readingGoal.targetBooks) * 100}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-mono text-xs font-bold text-[#466558]">
                {Math.round((readingGoal.completedBooks / readingGoal.targetBooks) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Shelf Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E4DC] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'reading', label: `Currently Reading (${currentlyReadingBooks.length})` },
          { id: 'saved', label: `Want to Read (${wantToReadBooks.length})` },
          { id: 'finished', label: `Finished Shelf (${finishedBooks.length})` },
          { id: 'quotes', label: `Marginalia & Notes (${marginaliaList.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id as any)}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors ${
              currentTab === tab.id
                ? 'bg-[#94452c] text-white shadow-xs'
                : 'bg-[#F5F2EB] text-[#6B726A] hover:text-[#242825] hover:bg-[#ecefea]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Currently Reading Tab */}
      {currentTab === 'reading' && (
        <div className="space-y-4">
          {currentlyReadingBooks.length === 0 ? (
            <div className="text-center py-12 bg-[#F5F2EB] rounded-2xl border border-[#E8E4DC]">
              <BookOpen className="w-10 h-10 text-[#6B726A] mx-auto mb-2" />
              <p className="font-serif text-lg font-semibold text-[#242825]">Your reading desk is clear</p>
              <p className="text-xs text-[#6B726A] mt-1">Pick a title from Explore to begin your reading session.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentlyReadingBooks.map((book) => {
                const prog = progressMap[book.id] || {
                  currentPage: 0,
                  totalPages: book.pages,
                  status: 'currently_reading',
                  lastReadDate: 'Today',
                  notesCount: 0
                };
                const percentage = Math.round((prog.currentPage / prog.totalPages) * 100);

                return (
                  <div
                    key={book.id}
                    className="bg-[#F5F2EB] border border-[#E8E4DC] rounded-xl p-4 flex gap-4 items-center hover:border-[#dbc1ba] transition-colors"
                  >
                    <div
                      onClick={() => onSelectBook(book)}
                      className="w-20 aspect-[3/4] shrink-0 rounded-[4px] overflow-hidden shadow-book-spine cursor-pointer border border-[#E8E4DC]"
                    >
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4
                        onClick={() => onSelectBook(book)}
                        className="font-serif font-bold text-base text-[#242825] hover:text-[#94452c] transition-colors cursor-pointer truncate"
                      >
                        {book.title}
                      </h4>
                      <p className="text-xs text-[#6B726A] italic">{book.author}</p>

                      <div className="mt-3 space-y-1.5">
                        <div className="flex justify-between text-xs text-[#6B726A]">
                          <span className="font-mono tabular-nums">
                            Page {prog.currentPage} of {prog.totalPages}
                          </span>
                          <span className="font-semibold text-[#94452c]">{percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#FAF8F5] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#94452c] rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#E8E4DC]/60">
                        <button
                          onClick={() => onUpdatePage(book.id, 10)}
                          className="px-2.5 py-1 text-xs font-semibold bg-[#FAF8F5] hover:bg-[#ffdbd0] text-[#94452c] rounded-lg border border-[#E8E4DC] transition-colors"
                        >
                          +10 Pages
                        </button>
                        <button
                          onClick={() => onUpdatePage(book.id, 25)}
                          className="px-2.5 py-1 text-xs font-semibold bg-[#FAF8F5] hover:bg-[#ffdbd0] text-[#94452c] rounded-lg border border-[#E8E4DC] transition-colors"
                        >
                          +25 Pages
                        </button>
                        <button
                          onClick={() => onSelectBook(book)}
                          className="ml-auto text-xs text-[#466558] hover:underline font-medium"
                        >
                          Open Details →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Want to Read Shelf */}
      {currentTab === 'saved' && (
        <div>
          {wantToReadBooks.length === 0 ? (
            <div className="text-center py-12 bg-[#F5F2EB] rounded-2xl border border-[#E8E4DC]">
              <Bookmark className="w-10 h-10 text-[#6B726A] mx-auto mb-2" />
              <p className="font-serif text-lg font-semibold text-[#242825]">No saved books yet</p>
              <p className="text-xs text-[#6B726A] mt-1">Tap the bookmark ribbon on any book card to collect titles for future reading.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {wantToReadBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onSelect={onSelectBook}
                  onAddToCart={onAddToCart}
                  isBookmarked={true}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Finished Shelf */}
      {currentTab === 'finished' && (
        <div className="space-y-4">
          {finishedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-[#F5F2EB] border border-[#E8E4DC] rounded-xl p-4 flex gap-4 items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  onClick={() => onSelectBook(book)}
                  className="w-16 aspect-[3/4] shrink-0 rounded-[4px] overflow-hidden shadow-book-spine cursor-pointer border border-[#E8E4DC]"
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4
                    onClick={() => onSelectBook(book)}
                    className="font-serif font-bold text-base text-[#242825] hover:text-[#94452c] transition-colors cursor-pointer"
                  >
                    {book.title}
                  </h4>
                  <p className="text-xs text-[#6B726A] italic">{book.author} · {book.pages} pages</p>
                  <div className="flex items-center gap-1.5 text-xs text-[#466558] font-semibold mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Completed & Shelved</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectBook(book)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF8F5] border border-[#E8E4DC] text-[#242825] hover:bg-[#ecefea]"
              >
                Re-read Notes
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Marginalia & Quotes Tab */}
      {currentTab === 'quotes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#242825]">
                Marginalia & Saved Quotes
              </h3>
              <p className="text-xs text-[#6B726A]">
                Passages collected in the quiet hours of reading
              </p>
            </div>
            <button
              onClick={() => setShowAddNoteModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#94452c] text-white text-xs font-semibold hover:bg-[#793019] shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Record Quote</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marginaliaList.map((note) => (
              <div
                key={note.id}
                className="bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl p-5 space-y-3 shadow-xs relative"
              >
                <Quote className="w-6 h-6 text-[#94452c]/20 absolute top-4 right-4 pointer-events-none" />
                <p className="font-serif text-sm text-[#242825] italic leading-relaxed">
                  "{note.quoteText}"
                </p>

                {note.userReflection && (
                  <div className="bg-[#F5F2EB] rounded-lg p-2.5 border-l-2 border-[#466558]">
                    <p className="text-xs text-[#466558] font-sans">
                      {note.userReflection}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-[#6B726A] pt-2 border-t border-[#E8E4DC]/60">
                  <div>
                    <span className="font-semibold text-[#242825]">{note.bookTitle}</span>
                    <span className="ml-1 text-[11px]">· p. {note.pageNumber}</span>
                  </div>
                  <span className="text-[11px] font-mono">{note.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal to Add Marginalia Note */}
      {showAddNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] border border-[#E8E4DC] rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="font-serif font-bold text-xl text-[#242825] mb-1">
              Add Marginalia Note
            </h3>
            <p className="text-xs text-[#6B726A] mb-4">
              Transcribe a memorable phrase or thought from your reading.
            </p>

            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B726A] mb-1">
                  Book Title
                </label>
                <select
                  value={selectedBookForNote}
                  onChange={(e) => setSelectedBookForNote(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#F5F2EB] border border-[#E8E4DC] text-xs text-[#242825] focus:outline-none focus:border-[#94452c]"
                >
                  {books.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title} by {b.author}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B726A] mb-1">
                  Page Number
                </label>
                <input
                  type="number"
                  value={pageInput}
                  onChange={(e) => setPageInput(Number(e.target.value))}
                  className="w-24 h-9 px-3 rounded-lg bg-[#F5F2EB] border border-[#E8E4DC] text-xs text-[#242825] focus:outline-none focus:border-[#94452c]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B726A] mb-1">
                  Book Passage / Quote
                </label>
                <textarea
                  rows={3}
                  value={quoteInput}
                  onChange={(e) => setQuoteInput(e.target.value)}
                  placeholder="Enter the quote text..."
                  className="w-full p-3 rounded-lg bg-[#F5F2EB] border border-[#E8E4DC] text-xs text-[#242825] focus:outline-none focus:border-[#94452c]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B726A] mb-1">
                  Your Reflection or Marginalia (Optional)
                </label>
                <textarea
                  rows={2}
                  value={reflectionInput}
                  onChange={(e) => setReflectionInput(e.target.value)}
                  placeholder="What feelings or insights did this evoke?"
                  className="w-full p-3 rounded-lg bg-[#F5F2EB] border border-[#E8E4DC] text-xs text-[#242825] focus:outline-none focus:border-[#94452c]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddNoteModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B726A] hover:bg-[#F5F2EB] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-[#94452c] text-white hover:bg-[#793019] rounded-lg shadow-xs"
                >
                  Save to Marginalia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
