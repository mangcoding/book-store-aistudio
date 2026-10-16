import { Book, MarginaliaNote, ReadingGoal, ReadingProgress } from '../types/book';

export const BOOKS_DATA: Book[] = [
  {
    id: 'quiet-architecture',
    title: 'The Quiet Architecture',
    author: 'Eliza Vance',
    genre: 'Architecture & Design',
    price: 28.00,
    rating: 4.9,
    reviewCount: 142,
    pages: 288,
    publishedYear: 2025,
    publisher: 'Atelier Editions',
    coverImage: '/src/assets/images/book_cover_quiet_architecture_1792115610137.jpg',
    synopsis: 'A lyrical investigation into spaces that foster silence, contemplation, and emotional equilibrium. Eliza Vance explores courtyard houses, cloistered monasteries, and modernist lightwells, arguing that silence is the essential raw material of enduring structure.',
    excerpt: [
      'We build not merely to shelter our bodies from the rain, but to grant our wandering thoughts a boundary.',
      'In the Roman peristyle, as in the quiet tea pavilions of Kyoto, the courtyard does not exclude the world; it distills it. Light falls upon a stone basin with deliberate weight.',
      'When an architect removes the unnecessary ornament, what remains is not absence, but an acoustic invitation for the inhabitant to finally hear their own breathing.'
    ],
    audioSampleTitle: 'Chapter 2: The Acoustic Weight of Lime Plaster',
    audioDuration: '3:45',
    isStaffPick: true,
    staffPickQuote: 'An extraordinary treatise on tactile spaces. Required reading for anyone yearning for tranquility in modern life.',
    curatorName: 'Clara M., Head Antiquarian',
    availableFormats: [
      { format: 'Hardcover', price: 28.00, inStock: true },
      { format: 'Paperback', price: 18.50, inStock: true },
      { format: 'E-Book', price: 12.00, inStock: true },
      { format: 'Audiobook', price: 24.00, inStock: true },
    ]
  },
  {
    id: 'botanical-observations',
    title: 'Botanical Observations',
    author: 'Eliza Vance',
    genre: 'Natural History',
    price: 34.00,
    rating: 4.8,
    reviewCount: 98,
    pages: 340,
    publishedYear: 2024,
    publisher: 'Fieldfare Press',
    coverImage: '/src/assets/images/book_cover_botanical_notes_1792115610549.jpg',
    synopsis: 'A field guide to wild flora, mycology, and the natural world rendered through delicate watercolor plates and archival journals. Documents forty endangered temperate species across forgotten hedgerows and mountain meadows.',
    excerpt: [
      'The chamomile flower opens only when the sun touches its perimeter at dawn. In this modest obedience to solar mathematics, it preserves its essential oils against the dew.',
      'Beneath the leaf litter of the ancient beech grove, mycorrhizal threads run like subterranean parchment, carrying water and mineral whispers from elder root to sapling.'
    ],
    audioSampleTitle: 'Prologue: On Gathering Seeds in Autumn Mist',
    audioDuration: '4:12',
    isStaffPick: true,
    staffPickQuote: 'The clothbound binding alone is a work of craft, but the prose will fundamentally change how you walk through woodlands.',
    curatorName: 'Julian Thorne, Naturalist Curator',
    availableFormats: [
      { format: 'Hardcover', price: 34.00, inStock: true },
      { format: 'Paperback', price: 22.00, inStock: true },
      { format: 'E-Book', price: 14.50, inStock: true },
      { format: 'Audiobook', price: 26.00, inStock: true },
    ]
  },
  {
    id: 'solitary-islands',
    title: 'Solitary Islands',
    author: 'Hina Tanaka',
    genre: 'Literary Fiction',
    price: 22.50,
    rating: 4.7,
    reviewCount: 215,
    pages: 256,
    publishedYear: 2025,
    publisher: 'Kiri Press',
    coverImage: '/src/assets/images/book_cover_solitary_islands_1792115611598.jpg',
    synopsis: 'Set on a remote archipelago in the Seto Inland Sea, this luminous novel traces three generations of lighthouses keepers, paper makers, and wandering cartographers as they navigate exile, memory, and the tide.',
    excerpt: [
      'Salt mist settles first upon the cedar eaves. If you listen closely at nightfall, the tide sounds less like moving water and more like raw silk being torn in half.',
      'My grandfather kept two journals: one for the maritime weather recorded in blue ink, and one for the things he could never say aloud to the villagers, recorded with pure charcoal.'
    ],
    audioSampleTitle: 'Opening: The Ferry That Missed the Reef',
    audioDuration: '5:10',
    isStaffPick: false,
    availableFormats: [
      { format: 'Hardcover', price: 26.00, inStock: true },
      { format: 'Paperback', price: 22.50, inStock: true },
      { format: 'E-Book', price: 11.99, inStock: true },
      { format: 'Audiobook', price: 20.00, inStock: true },
    ]
  },
  {
    id: 'shadows-of-antiquity',
    title: 'Shadows of Antiquity',
    author: 'Elara Vance',
    genre: 'History & Astronomy',
    price: 32.00,
    rating: 4.9,
    reviewCount: 167,
    pages: 412,
    publishedYear: 2024,
    publisher: 'Nocturne Academic',
    coverImage: '/src/assets/images/book_cover_astronomy_shadows_1792115612798.jpg',
    synopsis: 'A cultural and scientific history of the night sky before electric illumination. Tracing Babylonian stone tablets, Islamic astrolabes, and Renaissance celestial globes, Elara Vance examines how darkness shaped philosophical inquiry.',
    excerpt: [
      'Before oil lamps and gas mantles severed city from celestial vault, humans did not merely gaze at stars; they sailed by them, judged criminal trials beneath their alignment, and measured their heartbeats by the zenith of Cassiopeia.',
      'The darkness of antiquity was not an absence of vision, but an amplification of the nocturnal senses.'
    ],
    audioSampleTitle: 'Chapter 5: The Alexandria Astrolabe Workshop',
    audioDuration: '4:48',
    isStaffPick: true,
    staffPickQuote: 'Richly researched, poetic, and humbling. A love letter to the celestial canopy.',
    curatorName: 'Dr. Marcus Vance, Astronomy Historian',
    availableFormats: [
      { format: 'Hardcover', price: 32.00, inStock: true },
      { format: 'Paperback', price: 21.00, inStock: true },
      { format: 'E-Book', price: 15.00, inStock: true },
      { format: 'Audiobook', price: 28.00, inStock: true },
    ]
  },
  {
    id: 'poetics-of-water',
    title: 'The Poetics of Water',
    author: 'Eliza Reed',
    genre: 'Poetry',
    price: 24.00,
    rating: 4.6,
    reviewCount: 84,
    pages: 144,
    publishedYear: 2025,
    publisher: 'Rill Editions',
    coverImage: '/src/assets/images/book_cover_poetics_of_water_1792115631025.jpg',
    synopsis: 'A contemplative collection of fifty poems exploring estuaries, cold mountain springs, coastal tides, and the psychological fluidity of grief and renewal. Printed on heavy deckle-edge paper.',
    excerpt: [
      'To step into a river is to forgive the bank for remaining behind.',
      'We were made of water that remembers rain on stone / long before the stone was broken for the hearth.'
    ],
    audioSampleTitle: 'Poem IV: Estuary in Blue Hour',
    audioDuration: '2:30',
    isStaffPick: false,
    availableFormats: [
      { format: 'Hardcover', price: 24.00, inStock: true },
      { format: 'Paperback', price: 16.00, inStock: true },
      { format: 'E-Book', price: 9.99, inStock: true },
      { format: 'Audiobook', price: 18.00, inStock: true },
    ]
  },
  {
    id: 'coffee-and-ink',
    title: 'Coffee and Ink',
    author: 'Eliza Reed',
    genre: 'Essays & Memoir',
    price: 26.00,
    rating: 4.9,
    reviewCount: 310,
    pages: 224,
    publishedYear: 2024,
    publisher: 'Parchment & Co.',
    coverImage: '/src/assets/images/book_cover_coffee_and_ink_1792115630931.jpg',
    synopsis: 'Warm, candid essays on the daily rituals of writing, the history of European literary cafes, the sensory chemistry of espresso, and why analog pens remain our most trustworthy confidants.',
    excerpt: [
      'The fountain pen does not allow for hasty regret. Ink sinks into fiber before thought can second-guess itself; it forces courage upon the solitary writer.',
      'A cafe table at seven in the morning is sacred ground: the steam from the cup curls upward, meeting the dust motes in the diagonal shaft of autumnal sun.'
    ],
    audioSampleTitle: 'Essay: The Sound of Nib Against Linen',
    audioDuration: '3:50',
    isStaffPick: true,
    staffPickQuote: 'Warm, comforting, and wonderfully literate. Read it on a rainy Sunday morning with a freshly brewed cup.',
    curatorName: 'Sophie Lin, Literary Critic',
    availableFormats: [
      { format: 'Hardcover', price: 26.00, inStock: true },
      { format: 'Paperback', price: 17.50, inStock: true },
      { format: 'E-Book', price: 10.50, inStock: true },
      { format: 'Audiobook', price: 22.00, inStock: true },
    ]
  }
];

export const INITIAL_PROGRESS: Record<string, ReadingProgress> = {
  'quiet-architecture': {
    bookId: 'quiet-architecture',
    currentPage: 142,
    totalPages: 288,
    status: 'currently_reading',
    lastReadDate: 'Today',
    notesCount: 4
  },
  'coffee-and-ink': {
    bookId: 'coffee-and-ink',
    currentPage: 224,
    totalPages: 224,
    status: 'finished',
    lastReadDate: 'Oct 11',
    notesCount: 7
  },
  'botanical-observations': {
    bookId: 'botanical-observations',
    currentPage: 45,
    totalPages: 340,
    status: 'currently_reading',
    lastReadDate: 'Yesterday',
    notesCount: 3
  },
  'solitary-islands': {
    bookId: 'solitary-islands',
    currentPage: 0,
    totalPages: 256,
    status: 'want_to_read',
    lastReadDate: 'Saved',
    notesCount: 0
  }
};

export const INITIAL_MARGINALIA: MarginaliaNote[] = [
  {
    id: 'note-1',
    bookId: 'quiet-architecture',
    bookTitle: 'The Quiet Architecture',
    author: 'Eliza Vance',
    pageNumber: 38,
    quoteText: 'When an architect removes the unnecessary ornament, what remains is an acoustic invitation to hear one\'s own breathing.',
    userReflection: 'Reminded me of the courtyard garden in Kyoto. Space breathes when we give it room.',
    createdAt: 'Oct 14, 2026'
  },
  {
    id: 'note-2',
    bookId: 'coffee-and-ink',
    bookTitle: 'Coffee and Ink',
    author: 'Eliza Reed',
    pageNumber: 74,
    quoteText: 'The fountain pen does not allow for hasty regret. Ink sinks into fiber before thought can second-guess itself.',
    userReflection: 'A beautiful rationale for drafting by hand before opening any screen.',
    createdAt: 'Oct 12, 2026'
  },
  {
    id: 'note-3',
    bookId: 'shadows-of-antiquity',
    bookTitle: 'Shadows of Antiquity',
    author: 'Elara Vance',
    pageNumber: 112,
    quoteText: 'The darkness of antiquity was not an absence of vision, but an amplification of the nocturnal senses.',
    userReflection: 'Fascinating thesis on how light pollution narrowed our acoustic attention.',
    createdAt: 'Oct 09, 2026'
  }
];

export const INITIAL_READING_GOAL: ReadingGoal = {
  targetBooks: 24,
  completedBooks: 18,
  currentStreakDays: 14,
  minutesReadThisWeek: 385
};

export const GENRES = [
  'All Editions',
  'Architecture & Design',
  'Natural History',
  'Literary Fiction',
  'History & Astronomy',
  'Poetry',
  'Essays & Memoir'
];
