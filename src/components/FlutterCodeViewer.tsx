import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Smartphone, Globe, Terminal, Sparkles } from 'lucide-react';

export const FlutterCodeViewer: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'main' | 'theme' | 'home' | 'card' | 'model'>('main');
  const [copied, setCopied] = useState(false);

  const flutterFiles: Record<string, { filename: string; path: string; code: string }> = {
    main: {
      filename: 'main.dart',
      path: 'lib/main.dart',
      code: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'theme/app_theme.dart';
import 'screens/home_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const AtelierBooksApp());
}

class AtelierBooksApp extends StatelessWidget {
  const AtelierBooksApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Atelier Books',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const HomeScreen(),
    );
  }
}`
    },
    theme: {
      filename: 'app_theme.dart',
      path: 'lib/theme/app_theme.dart',
      code: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Warm Literary Modern Material 3 Color Scheme
  static const Color primary = Color(0xFF94452C);
  static const Color onPrimary = Color(0xFFFFFFFF);
  static const Color primaryContainer = Color(0xFFFFDBD0);
  static const Color onPrimaryContainer = Color(0xFF3A0A00);

  static const Color secondary = Color(0xFF466558);
  static const Color onSecondary = Color(0xFFFFFFFF);
  static const Color secondaryContainer = Color(0xFFC5E7D8);
  static const Color onSecondaryContainer = Color(0xFF1B382D);

  static const Color tertiary = Color(0xFFD97736);
  static const Color onTertiary = Color(0xFFFFFFFF);

  static const Color surface = Color(0xFFFAF8F5);
  static const Color surfaceLayer = Color(0xFFF5F2EB);
  static const Color onSurface = Color(0xFF242825);
  static const Color onSurfaceVariant = Color(0xFF6B726A);
  static const Color outline = Color(0xFFE8E4DC);

  static ThemeData get lightTheme {
    final colorScheme = ColorScheme(
      brightness: Brightness.light,
      primary: primary,
      onPrimary: onPrimary,
      primaryContainer: primaryContainer,
      onPrimaryContainer: onPrimaryContainer,
      secondary: secondary,
      onSecondary: onSecondary,
      secondaryContainer: secondaryContainer,
      onSecondaryContainer: onSecondaryContainer,
      tertiary: tertiary,
      onTertiary: onTertiary,
      error: const Color(0xFFBA1A1A),
      onError: const Color(0xFFFFFFFF),
      surface: surface,
      onSurface: onSurface,
      onSurfaceVariant: onSurfaceVariant,
      outline: outline,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: surface,
      textTheme: TextTheme(
        displayLarge: GoogleFonts.playfairDisplay(
          fontSize: 40,
          fontWeight: FontWeight.w600,
          color: onSurface,
          letterSpacing: -0.02,
        ),
        headlineMedium: GoogleFonts.playfairDisplay(
          fontSize: 24,
          fontWeight: FontWeight.w600,
          color: onSurface,
        ),
        headlineSmall: GoogleFonts.playfairDisplay(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: onSurface,
        ),
        titleMedium: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: onSurface,
        ),
        bodyLarge: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          fontWeight: FontWeight.w400,
          height: 1.6,
          color: onSurface,
        ),
        bodyMedium: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          height: 1.5,
          color: onSurfaceVariant,
        ),
        labelLarge: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.01,
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        height: 64,
        backgroundColor: surfaceLayer,
        indicatorColor: primaryContainer,
        iconTheme: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return const IconThemeData(color: primary);
          }
          return const IconThemeData(color: onSurfaceVariant);
        }),
      ),
      navigationRailTheme: NavigationRailThemeData(
        backgroundColor: surfaceLayer,
        indicatorColor: primaryContainer,
        selectedIconTheme: const IconThemeData(color: primary),
        unselectedIconTheme: const IconThemeData(color: onSurfaceVariant),
      ),
    );
  }
}`
    },
    home: {
      filename: 'home_screen.dart',
      path: 'lib/screens/home_screen.dart',
      code: `import 'package:flutter/material.dart';
import '../models/book.dart';
import '../widgets/book_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  String _selectedGenre = 'All Editions';
  final TextEditingController _searchController = TextEditingController();

  final List<String> _genres = [
    'All Editions',
    'Architecture & Design',
    'Natural History',
    'Literary Fiction',
    'Poetry',
  ];

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isCompact = constraints.maxWidth < 600;
        final isMedium = constraints.maxWidth >= 600 && constraints.maxWidth < 1024;
        final isExpanded = constraints.maxWidth >= 1024;

        if (isCompact) {
          // Android Phone Layout with Material 3 Bottom Navigation Bar
          return Scaffold(
            appBar: _buildAppBar(isCompact: true),
            body: _buildCatalogContent(isCompact: true),
            bottomNavigationBar: NavigationBar(
              selectedIndex: _selectedIndex,
              onDestinationSelected: (idx) => setState(() => _selectedIndex = idx),
              destinations: const [
                NavigationDestination(
                  icon: Icon(Icons.explore_outlined),
                  selectedIcon: Icon(Icons.explore),
                  label: 'Explore',
                ),
                NavigationDestination(
                  icon: Icon(Icons.book_outlined),
                  selectedIcon: Icon(Icons.book),
                  label: 'Shelves',
                ),
                NavigationDestination(
                  icon: Icon(Icons.create_outlined),
                  selectedIcon: Icon(Icons.create),
                  label: 'Marginalia',
                ),
                NavigationDestination(
                  icon: Icon(Icons.shopping_bag_outlined),
                  selectedIcon: Icon(Icons.shopping_bag),
                  label: 'Tote Bag',
                ),
              ],
            ),
          );
        } else {
          // Web Desktop & Tablet Layout with Material 3 Navigation Rail
          return Scaffold(
            body: Row(
              children: [
                NavigationRail(
                  selectedIndex: _selectedIndex,
                  onDestinationSelected: (idx) => setState(() => _selectedIndex = idx),
                  labelType: NavigationRailLabelType.all,
                  leading: Padding(
                    padding: const EdgeInsets.only(bottom: 24.0, top: 12.0),
                    child: CircleAvatar(
                      backgroundColor: Theme.of(context).colorScheme.primary,
                      child: const Text('A', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    ),
                  ),
                  destinations: const [
                    NavigationRailDestination(
                      icon: Icon(Icons.explore_outlined),
                      selectedIcon: Icon(Icons.explore),
                      label: Text('Explore'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.book_outlined),
                      selectedIcon: Icon(Icons.book),
                      label: Text('Shelves'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.create_outlined),
                      selectedIcon: Icon(Icons.create),
                      label: Text('Marginalia'),
                    ),
                  ],
                ),
                const VerticalDivider(thickness: 1, width: 1, color: Color(0xFFE8E4DC)),
                Expanded(
                  child: Scaffold(
                    appBar: _buildAppBar(isCompact: false),
                    body: _buildCatalogContent(isCompact: false),
                  ),
                ),
              ],
            ),
          );
        }
      },
    );
  }

  PreferredSizeWidget _buildAppBar({required bool isCompact}) {
    return AppBar(
      title: Text(
        'Atelier Books',
        style: Theme.of(context).textTheme.headlineSmall,
      ),
      backgroundColor: const Color(0xFFFAF8F5),
      elevation: 0,
      scrolledUnderElevation: 2,
      actions: [
        IconButton(
          icon: const Icon(Icons.shopping_bag_outlined),
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Canvas Tote Bag opened')),
            );
          },
        ),
        const SizedBox(width: 8),
      ],
    );
  }

  Widget _buildCatalogContent({required bool isCompact}) {
    return CustomScrollView(
      slivers: [
        // Editorial Banner
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Card(
              color: const Color(0xFFC5E7D8).withOpacity(0.3),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
                side: const BorderSide(color: Color(0xFFE8E4DC)),
              ),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Curator's Salon · Autumn 2026",
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: const Color(0xFF466558),
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'The Architecture of Silence and Fiber',
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Discover hand-bound editions crafted by independent letterpress presses.',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),

        // Genre Filter Chips
        SliverToBoxAdapter(
          child: SizedBox(
            height: 48,
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              scrollDirection: Axis.horizontal,
              itemCount: _genres.length,
              separatorBuilder: (_, __) => const SizedBox(width: 8),
              itemBuilder: (context, i) {
                final genre = _genres[i];
                final isSelected = genre == _selectedGenre;
                return ChoiceChip(
                  label: Text(genre),
                  selected: isSelected,
                  selectedColor: const Color(0xFF466558),
                  labelStyle: TextStyle(
                    color: isSelected ? Colors.white : const Color(0xFF242825),
                  ),
                  onSelected: (_) => setState(() => _selectedGenre = genre),
                );
              },
            ),
          ),
        ),

        // Book Grid
        SliverPadding(
          padding: const EdgeInsets.all(16.0),
          sliver: SliverGrid(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: isCompact ? 2 : 4,
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              childAspectRatio: 0.62,
            ),
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final book = sampleBooks[index % sampleBooks.length];
                return BookCardWidget(book: book);
              },
              childCount: sampleBooks.length,
            ),
          ),
        ),
      ],
    );
  }
}`
    },
    card: {
      filename: 'book_card.dart',
      path: 'lib/widgets/book_card.dart',
      code: `import 'package:flutter/material.dart';
import '../models/book.dart';

class BookCardWidget extends StatelessWidget {
  final Book book;

  const BookCardWidget({super.key, required this.book});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFF5F2EB),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: const Color(0xFFE8E4DC)),
      ),
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Book Cover with Level 2 Spine Depth Shadow
          Expanded(
            child: Center(
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(4),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x14242825),
                      blurRadius: 12,
                      offset: Offset(0, 4),
                    ),
                    BoxShadow(
                      color: Color(0x0A242825),
                      blurRadius: 3,
                      offset: Offset(1, 0),
                    ),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: Image.network(
                    book.imageUrl,
                    fit: BoxFit.cover,
                    errorBuilder: (ctx, _, __) => Container(
                      color: const Color(0xFFE8E4DC),
                      child: const Icon(Icons.book, size: 48, color: Color(0xFF94452C)),
                    ),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '\${book.genre} · \${book.pages}p',
            style: const TextStyle(fontSize: 11, color: Color(0xFF6B726A)),
            maxLines: 1,
          ),
          const SizedBox(height: 2),
          Text(
            book.title,
            style: Theme.of(context).textTheme.titleMedium,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          Text(
            book.author,
            style: const TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: Color(0xFF6B726A)),
            maxLines: 1,
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '\\$\${book.price.toStringAsFixed(2)}',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
              ),
              IconButton.filledTonal(
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                icon: const Icon(Icons.add_shopping_bag, size: 16),
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Added \${book.title} to Canvas Tote')),
                  );
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}`
    },
    model: {
      filename: 'book.dart',
      path: 'lib/models/book.dart',
      code: `class Book {
  final String id;
  final String title;
  final String author;
  final String genre;
  final double price;
  final double rating;
  final int pages;
  final String imageUrl;
  final String synopsis;

  const Book({
    required this.id,
    required this.title,
    required this.author,
    required this.genre,
    required this.price,
    required this.rating,
    required this.pages,
    required this.imageUrl,
    required this.synopsis,
  });
}

final List<Book> sampleBooks = [
  const Book(
    id: 'quiet-architecture',
    title: 'The Quiet Architecture',
    author: 'Eliza Vance',
    genre: 'Architecture & Design',
    price: 28.00,
    rating: 4.9,
    pages: 288,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
    synopsis: 'A lyrical investigation into spaces that foster silence and contemplation.',
  ),
  const Book(
    id: 'botanical-observations',
    title: 'Botanical Observations',
    author: 'Eliza Vance',
    genre: 'Natural History',
    price: 34.00,
    rating: 4.8,
    pages: 340,
    imageUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f',
    synopsis: 'A field guide to wild flora, mycology, and the natural world.',
  ),
  const Book(
    id: 'solitary-islands',
    title: 'Solitary Islands',
    author: 'Hina Tanaka',
    genre: 'Literary Fiction',
    price: 22.50,
    rating: 4.7,
    pages: 256,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
    synopsis: 'Set on a remote archipelago in the Seto Inland Sea.',
  ),
];`
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(flutterFiles[activeFile].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const file = flutterFiles[activeFile];
    const element = document.createElement('a');
    const blob = new Blob([file.code], { type: 'text/plain' });
    element.href = URL.createObjectURL(blob);
    element.download = file.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-[#FAF8F5] border border-[#E8E4DC] rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#466558]" />
            <h3 className="font-serif font-bold text-lg text-[#242825]">
              Flutter Material 3 Source Code
            </h3>
            <span className="text-[11px] font-mono bg-[#c5e7d8] text-[#1b382d] px-2 py-0.5 rounded-md font-semibold">
              Android & Web
            </span>
          </div>
          <p className="text-xs text-[#6B726A] mt-1">
            Production-grade Dart code with MD3 ColorScheme, responsive LayoutBuilder, NavigationBar, and NavigationRail.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F5F2EB] border border-[#E8E4DC] text-xs font-semibold text-[#242825] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#466558]" />
                <span className="text-[#466558]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#94452c]" />
                <span>Copy File</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownloadFile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#94452c] text-white text-xs font-semibold hover:bg-[#793019] shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download .dart</span>
          </button>
        </div>
      </div>

      {/* Target Platforms & Instructions Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F5F2EB] p-3.5 rounded-xl border border-[#E8E4DC] text-xs">
        <div className="flex items-start gap-2.5">
          <Smartphone className="w-4 h-4 text-[#94452c] mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-[#242825]">Target: Android 14+ (Material 3)</p>
            <p className="text-[11px] text-[#6B726A] mt-0.5">
              Uses standard 64px <code className="font-mono text-[#94452c]">NavigationBar</code>, tactile touch ink ripples, and bottom sheet dialogs.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Globe className="w-4 h-4 text-[#466558] mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-[#242825]">Target: Flutter Web (Responsive)</p>
            <p className="text-[11px] text-[#6B726A] mt-0.5">
              Uses <code className="font-mono text-[#466558]">NavigationRail</code>, fluid grid columns, and keyboard accessible shortcuts.
            </p>
          </div>
        </div>
      </div>

      {/* File Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#E8E4DC]">
        {Object.entries(flutterFiles).map(([key, file]) => (
          <button
            key={key}
            onClick={() => setActiveFile(key as any)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-colors ${
              activeFile === key
                ? 'bg-[#242825] text-white shadow-xs'
                : 'bg-[#F5F2EB] text-[#6B726A] hover:text-[#242825] hover:bg-[#ecefea]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{file.filename}</span>
          </button>
        ))}
      </div>

      {/* Code Editor Preview */}
      <div className="relative rounded-xl overflow-hidden border border-[#E8E4DC] bg-[#1c1f1d] text-[#e0e3de] font-mono text-xs">
        <div className="flex items-center justify-between px-4 py-2 bg-[#141715] border-b border-white/10 text-[11px] text-white/60">
          <span>{flutterFiles[activeFile].path}</span>
          <span>Dart 3.x · Flutter 3.22+</span>
        </div>
        <pre className="p-4 overflow-x-auto max-h-96 leading-relaxed selection:bg-[#94452c]/50">
          <code>{flutterFiles[activeFile].code}</code>
        </pre>
      </div>

      {/* CLI Run snippet */}
      <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E4DC] text-xs space-y-1">
        <p className="font-semibold text-[#242825] flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#94452c]" />
          <span>Quick Terminal Execution</span>
        </p>
        <div className="font-mono text-[11px] bg-[#F5F2EB] p-2 rounded-lg text-[#242825] overflow-x-auto">
          flutter create atelier_books &amp;&amp; cd atelier_books &amp;&amp; flutter pub add google_fonts &amp;&amp; flutter run -d chrome
        </div>
      </div>
    </div>
  );
};
