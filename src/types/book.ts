export type BookFormat = 'Hardcover' | 'Paperback' | 'E-Book' | 'Audiobook';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  rating: number;
  reviewCount: number;
  pages: number;
  publishedYear: number;
  publisher: string;
  coverImage: string;
  synopsis: string;
  excerpt: string[];
  audioSampleTitle?: string;
  audioDuration?: string;
  isStaffPick?: boolean;
  staffPickQuote?: string;
  curatorName?: string;
  availableFormats: {
    format: BookFormat;
    price: number;
    inStock: boolean;
  }[];
}

export interface CartItem {
  book: Book;
  format: BookFormat;
  quantity: number;
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  status: 'currently_reading' | 'want_to_read' | 'finished';
  lastReadDate: string;
  notesCount: number;
}

export interface MarginaliaNote {
  id: string;
  bookId: string;
  bookTitle: string;
  author: string;
  pageNumber: number;
  quoteText: string;
  userReflection?: string;
  createdAt: string;
}

export interface ReadingGoal {
  targetBooks: number;
  completedBooks: number;
  currentStreakDays: number;
  minutesReadThisWeek: number;
}
