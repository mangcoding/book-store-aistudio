import React from 'react';
import { Search, ShoppingBag, BookOpen, Smartphone, Laptop, Tablet, Code2, Menu, X } from 'lucide-react';

export type DeviceMode = 'mobile' | 'tablet' | 'desktop' | 'flutter_code';

interface MD3TopAppBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  deviceMode: DeviceMode;
  onChangeDeviceMode: (mode: DeviceMode) => void;
  onOpenDrawer?: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const MD3TopAppBar: React.FC<MD3TopAppBarProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  deviceMode,
  onChangeDeviceMode,
  onOpenDrawer,
  activeTab,
  onSelectTab
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E4DC] px-4 md:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand mark & Drawer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {onOpenDrawer && (
            <button
              onClick={onOpenDrawer}
              className="p-2 -ml-2 rounded-xl text-[#242825] hover:bg-[#F5F2EB] transition-colors md:hidden"
              aria-label="Open menu drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div
            onClick={() => onSelectTab('explore')}
            className="cursor-pointer group flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-[#94452c] text-white flex items-center justify-center font-serif font-bold text-lg shadow-xs group-hover:bg-[#793019] transition-colors">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl text-[#242825] tracking-tight whitespace-nowrap">
                Atelier Books
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#6B726A] -mt-1 hidden sm:block">
                Corner Press & Sanctuary
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Field with MD3 pill / rounded-lg feel */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#6B726A] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, author, or binding..."
              className="w-full h-10 pl-10 pr-9 rounded-xl bg-[#F5F2EB] border border-[#E8E4DC] text-xs md:text-sm text-[#242825] placeholder:text-[#6B726A] focus:outline-none focus:border-[#94452c] focus:ring-2 focus:ring-[#94452c]/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 p-1 text-[#6B726A] hover:text-[#242825]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Device / Output Switcher & Cart */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Responsive Viewport Mode Toggle */}
          <div className="hidden lg:flex items-center bg-[#F5F2EB] border border-[#E8E4DC] rounded-xl p-1 gap-1">
            <button
              onClick={() => onChangeDeviceMode('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                deviceMode === 'mobile'
                  ? 'bg-[#94452c] text-white shadow-xs'
                  : 'text-[#6B726A] hover:text-[#242825]'
              }`}
              title="Preview Android Mobile MD3 layout"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
            </button>
            <button
              onClick={() => onChangeDeviceMode('tablet')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                deviceMode === 'tablet'
                  ? 'bg-[#94452c] text-white shadow-xs'
                  : 'text-[#6B726A] hover:text-[#242825]'
              }`}
              title="Preview Tablet / Foldable MD3 layout"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => onChangeDeviceMode('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                deviceMode === 'desktop'
                  ? 'bg-[#94452c] text-white shadow-xs'
                  : 'text-[#6B726A] hover:text-[#242825]'
              }`}
              title="Preview Web Desktop responsive layout"
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Web</span>
            </button>
            <button
              onClick={() => onChangeDeviceMode('flutter_code')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                deviceMode === 'flutter_code'
                  ? 'bg-[#466558] text-white shadow-xs'
                  : 'text-[#466558] hover:bg-[#c5e7d8]/50'
              }`}
              title="View & Export Flutter (Dart) Material 3 Source Code"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Flutter MD3</span>
            </button>
          </div>

          {/* Tote Bag Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-[#F5F2EB] hover:bg-[#ffdbd0]/60 border border-[#E8E4DC] text-[#242825] transition-colors"
            aria-label="View canvas tote bag"
          >
            <ShoppingBag className="w-5 h-5 text-[#94452c]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-[#94452c] text-white text-[11px] font-mono font-bold rounded-full flex items-center justify-center shadow-xs animate-in zoom-in duration-150">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
