import React, { useState } from 'react';
import { BOOKS_DATA, GENRES, INITIAL_PROGRESS, INITIAL_MARGINALIA, INITIAL_READING_GOAL } from './data/booksData';
import { Book, BookFormat, CartItem, MarginaliaNote, ReadingGoal, ReadingProgress } from './types/book';
import { MD3TopAppBar, DeviceMode } from './components/MD3TopAppBar';
import { MD3Navigation } from './components/MD3Navigation';
import { MD3Drawer } from './components/MD3Drawer';
import { BookCard } from './components/BookCard';
import { BookDetailModal } from './components/BookDetailModal';
import { ToteBagDrawer } from './components/ToteBagDrawer';
import { ShelvesView } from './components/ShelvesView';
import { FlutterCodeViewer } from './components/FlutterCodeViewer';
import { ArrowRight, BookOpen, Sparkles, Star, Trophy, Wifi, Battery, Signal } from 'lucide-react';

export default function App() {
  // Navigation & Viewport State
  const [activeTab, setActiveTab] = useState<'explore' | 'shelves' | 'marginalia' | 'flutter_code'>('explore');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Editions');

  // Interactive Book Data State
  const [books, setBooks] = useState<Book[]>(BOOKS_DATA);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['quiet-architecture', 'solitary-islands']);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { book: BOOKS_DATA[0], format: 'Hardcover', quantity: 1 }
  ]);
  const [progressMap, setProgressMap] = useState<Record<string, ReadingProgress>>(INITIAL_PROGRESS);
  const [marginaliaList, setMarginaliaList] = useState<MarginaliaNote[]>(INITIAL_MARGINALIA);
  const [readingGoal, setReadingGoal] = useState<ReadingGoal>(INITIAL_READING_GOAL);

  // Modal State
  const [selectedBookForModal, setSelectedBookForModal] = useState<Book | null>(null);

  // Handlers
  const handleToggleBookmark = (bookId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const handleAddToCart = (book: Book, format: BookFormat = 'Hardcover', quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id && item.format === format);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id && item.format === format
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, format, quantity }];
    });
  };

  const handleUpdateQuantity = (bookId: string, format: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(bookId, format);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.book.id === bookId && item.format === format
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (bookId: string, format: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.book.id === bookId && item.format === format))
    );
  };

  const handleClearCart = () => setCartItems([]);

  const handleUpdatePageProgress = (bookId: string, delta: number) => {
    setProgressMap((prev) => {
      const current = prev[bookId] || {
        bookId,
        currentPage: 0,
        totalPages: books.find((b) => b.id === bookId)?.pages || 250,
        status: 'currently_reading',
        lastReadDate: 'Today',
        notesCount: 0
      };
      const newPage = Math.min(current.totalPages, current.currentPage + delta);
      const isFinished = newPage >= current.totalPages;

      if (isFinished && current.status !== 'finished') {
        setReadingGoal((g) => ({ ...g, completedBooks: g.completedBooks + 1 }));
      }

      return {
        ...prev,
        [bookId]: {
          ...current,
          currentPage: newPage,
          status: isFinished ? 'finished' : 'currently_reading',
          lastReadDate: 'Just now'
        }
      };
    });
  };

  const handleAddMarginalia = (noteData: Omit<MarginaliaNote, 'id' | 'createdAt'>) => {
    const newNote: MarginaliaNote = {
      ...noteData,
      id: `note-${Date.now()}`,
      createdAt: 'Today'
    };
    setMarginaliaList((prev) => [newNote, ...prev]);
  };

  const handleSaveQuoteFromReader = (quoteText: string, pageNumber: number) => {
    if (!selectedBookForModal) return;
    handleAddMarginalia({
      bookId: selectedBookForModal.id,
      bookTitle: selectedBookForModal.title,
      author: selectedBookForModal.author,
      pageNumber,
      quoteText,
      userReflection: 'Saved during sample reading preview.'
    });
  };

  // Filtered books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === 'All Editions' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const staffPicks = books.filter((b) => b.isStaffPick);

  // Render Inner App Content
  const renderAppContent = (isMobileOrTabletViewport: boolean) => {
    return (
      <div className="flex flex-col min-h-full bg-[#FAF8F5]">
        {/* Main View Switcher */}
        {activeTab === 'flutter_code' ? (
          <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full">
            <FlutterCodeViewer />
          </div>
        ) : activeTab === 'shelves' ? (
          <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full">
            <ShelvesView
              books={books}
              progressMap={progressMap}
              onUpdatePage={handleUpdatePageProgress}
              marginaliaList={marginaliaList}
              onAddMarginalia={handleAddMarginalia}
              readingGoal={readingGoal}
              onSelectBook={setSelectedBookForModal}
              onAddToCart={(b) => handleAddToCart(b)}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              activeSubTab="reading"
            />
          </div>
        ) : activeTab === 'marginalia' ? (
          <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full">
            <ShelvesView
              books={books}
              progressMap={progressMap}
              onUpdatePage={handleUpdatePageProgress}
              marginaliaList={marginaliaList}
              onAddMarginalia={handleAddMarginalia}
              readingGoal={readingGoal}
              onSelectBook={setSelectedBookForModal}
              onAddToCart={(b) => handleAddToCart(b)}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              activeSubTab="quotes"
            />
          </div>
        ) : (
          /* Explore / Catalog View */
          <div className="flex-1 pb-12">
            {/* Editorial Curator Banner */}
            {!searchQuery && (
              <div className="px-4 sm:px-8 pt-4 pb-2 max-w-7xl mx-auto w-full">
                <div className="relative rounded-2xl overflow-hidden border border-[#E8E4DC] shadow-subtle-elevation bg-[#ecefea]">
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[320px]">
                    {/* Left Banner Text */}
                    <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#c5e7d8]/30 via-[#FAF8F5] to-[#ecefea] z-10">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#466558]">
                          <span className="w-2 h-2 rounded-full bg-[#466558]" />
                          <span>Curator's Salon · Autumn Reading Selection</span>
                        </div>
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#242825] leading-tight text-balance">
                          The Architecture of Silence and Fiber
                        </h1>
                        <p className="font-sans text-xs sm:text-sm text-[#6B726A] max-w-lg leading-relaxed">
                          Step inside our quiet corner sanctuary. Explore fine clothbound editions, letterpress essays, and hand-bound journals printed on archival cotton stock.
                        </p>
                      </div>

                      <div className="pt-6 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => {
                            const book = books.find((b) => b.id === 'quiet-architecture');
                            if (book) setSelectedBookForModal(book);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-[#94452c] text-white text-xs sm:text-sm font-semibold hover:bg-[#793019] active:scale-[0.98] transition-all shadow-xs flex items-center gap-2"
                        >
                          <span>Discover Staff Pick</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveTab('shelves')}
                          className="px-4 py-2.5 rounded-xl bg-[#F5F2EB] hover:bg-[#FAF8F5] border border-[#E8E4DC] text-xs sm:text-sm font-semibold text-[#242825] transition-colors"
                        >
                          View 2026 Challenge (18/24)
                        </button>
                      </div>
                    </div>

                    {/* Right Banner Image */}
                    <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full">
                      <img
                        src="/src/assets/images/editorial_banner_reading_room_1792115611724.jpg"
                        alt="Atelier bookstore reading corner with velvet armchair and oak bookshelves"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#FAF8F5] via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filter Chips Bar (MD3 Pill Style) */}
            <div className="px-4 sm:px-8 py-4 max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {GENRES.map((genre) => {
                  const isSelected = selectedGenre === genre;
                  return (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`h-9 px-4 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                        isSelected
                          ? 'bg-[#466558] text-white shadow-xs'
                          : 'bg-[#FAF8F5] text-[#242825] border border-[#E8E4DC] hover:border-[#dbc1ba] hover:bg-[#F5F2EB]'
                      }`}
                    >
                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Horizontal Carousel: Staff Selections */}
            {!searchQuery && selectedGenre === 'All Editions' && (
              <section className="py-4">
                <div className="px-4 sm:px-8 max-w-7xl mx-auto mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#242825]">
                      Curator's Staff Selections
                    </h2>
                    <p className="text-xs text-[#6B726A] mt-0.5">
                      Hand-inspected volumes celebrated for craftsmanship and prose
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 overflow-x-auto px-4 sm:px-8 pb-4 no-scrollbar scroll-smooth">
                  {staffPicks.map((book) => (
                    <div key={book.id} className="w-48 sm:w-56 shrink-0">
                      <BookCard
                        book={book}
                        onSelect={setSelectedBookForModal}
                        onAddToCart={(b) => handleAddToCart(b)}
                        isBookmarked={bookmarkedIds.includes(book.id)}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Main Catalog Grid */}
            <section className="px-4 sm:px-8 max-w-7xl mx-auto mt-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#242825]">
                    {searchQuery
                      ? `Search Results for "${searchQuery}" (${filteredBooks.length})`
                      : selectedGenre === 'All Editions'
                      ? 'Complete Catalog & New Bindings'
                      : selectedGenre}
                  </h2>
                  <p className="text-xs text-[#6B726A] mt-0.5">
                    {filteredBooks.length} editions available for direct courier dispatch
                  </p>
                </div>
              </div>

              {filteredBooks.length === 0 ? (
                <div className="text-center py-16 bg-[#F5F2EB] rounded-2xl border border-[#E8E4DC]">
                  <BookOpen className="w-12 h-12 text-[#6B726A] mx-auto mb-3" />
                  <h3 className="font-serif text-lg font-bold text-[#242825]">
                    No volumes matched your search
                  </h3>
                  <p className="text-xs text-[#6B726A] mt-1 max-w-sm mx-auto">
                    Try searching for another author, binding format, or clear your query to browse all editions.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedGenre('All Editions');
                    }}
                    className="mt-4 px-4 py-2 bg-[#94452c] text-white rounded-xl text-xs font-semibold hover:bg-[#793019]"
                  >
                    Reset Search & Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onSelect={setSelectedBookForModal}
                      onAddToCart={(b) => handleAddToCart(b)}
                      isBookmarked={bookmarkedIds.includes(book.id)}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#ecefea] text-[#242825] flex flex-col font-sans">
      {/* Top App Bar */}
      <MD3TopAppBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        deviceMode={deviceMode}
        onChangeDeviceMode={(mode) => setDeviceMode(mode)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab as any)}
      />

      {/* Main Responsive Container */}
      <div className="flex-1 flex justify-center py-4 sm:py-6 px-2 sm:px-4">
        {deviceMode === 'mobile' ? (
          /* Authentic Android Smartphone Viewport (Google Pixel 8 style) */
          <div className="w-full max-w-[412px] h-[870px] bg-[#FAF8F5] rounded-[48px] border-[10px] border-[#242825] shadow-2xl flex flex-col overflow-hidden relative ring-1 ring-black/10">
            {/* Android Status Bar */}
            <div className="h-9 bg-[#FAF8F5] px-6 flex items-center justify-between text-xs font-semibold text-[#242825] shrink-0 border-b border-[#E8E4DC]/50 select-none">
              <span>9:41</span>
              {/* Front Camera Notch Hole */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#242825]" />
              <div className="flex items-center gap-1.5 text-[#242825]">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4 fill-current" />
              </div>
            </div>

            {/* Scrollable Mobile App Body */}
            <div className="flex-1 overflow-y-auto">
              {renderAppContent(true)}
            </div>

            {/* Android MD3 Bottom Navigation Bar */}
            <MD3Navigation
              activeTab={activeTab}
              onSelectTab={(tab) => setActiveTab(tab as any)}
              savedCount={bookmarkedIds.length}
              layoutType="bottom_bar"
            />

            {/* Android Gesture Pill Handle */}
            <div className="h-4 bg-[#F5F2EB] flex items-center justify-center shrink-0">
              <div className="w-28 h-1 bg-[#242825]/40 rounded-full" />
            </div>
          </div>
        ) : deviceMode === 'tablet' ? (
          /* Tablet Viewport (768px wide with MD3 Rail) */
          <div className="w-full max-w-[840px] h-[900px] bg-[#FAF8F5] rounded-3xl border-4 border-[#dbc1ba] shadow-xl flex overflow-hidden">
            <MD3Navigation
              activeTab={activeTab}
              onSelectTab={(tab) => setActiveTab(tab as any)}
              savedCount={bookmarkedIds.length}
              layoutType="rail"
            />
            <div className="flex-1 overflow-y-auto">
              {renderAppContent(false)}
            </div>
          </div>
        ) : (
          /* Full Web Desktop Layout */
          <div className="w-full max-w-7xl bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] shadow-subtle-elevation flex overflow-hidden min-h-[85vh]">
            {/* Desktop MD3 Navigation Rail */}
            <div className="hidden md:block">
              <MD3Navigation
                activeTab={activeTab}
                onSelectTab={(tab) => setActiveTab(tab as any)}
                savedCount={bookmarkedIds.length}
                layoutType="rail"
              />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              {renderAppContent(false)}
            </div>
          </div>
        )}
      </div>

      {/* Book Detail Modal / Bottom Sheet */}
      <BookDetailModal
        book={selectedBookForModal}
        isOpen={!!selectedBookForModal}
        onClose={() => setSelectedBookForModal(null)}
        onAddToCart={handleAddToCart}
        isBookmarked={selectedBookForModal ? bookmarkedIds.includes(selectedBookForModal.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onSaveQuote={handleSaveQuoteFromReader}
      />

      {/* Tote Bag Checkout Drawer */}
      <ToteBagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Navigation Drawer */}
      <MD3Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab as any)}
        readingGoal={readingGoal}
      />
    </div>
  );
}
