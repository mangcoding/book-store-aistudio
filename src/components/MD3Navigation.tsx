import React from 'react';
import { Compass, BookOpen, Bookmark, Sparkles, Code2, Feather, Heart } from 'lucide-react';

interface MD3NavigationProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  savedCount?: number;
  layoutType: 'bottom_bar' | 'rail';
}

export const MD3Navigation: React.FC<MD3NavigationProps> = ({
  activeTab,
  onSelectTab,
  savedCount = 0,
  layoutType
}) => {
  const navItems = [
    {
      id: 'explore',
      label: 'Explore',
      icon: Compass,
    },
    {
      id: 'shelves',
      label: 'Shelves',
      icon: BookOpen,
      badge: savedCount > 0 ? savedCount : undefined,
    },
    {
      id: 'marginalia',
      label: 'Marginalia',
      icon: Feather,
    },
    {
      id: 'flutter_code',
      label: 'Flutter Code',
      icon: Code2,
    }
  ];

  if (layoutType === 'rail') {
    return (
      <aside className="w-20 bg-[#F5F2EB] border-r border-[#E8E4DC] flex flex-col items-center py-6 gap-6 shrink-0 h-full select-none">
        <div className="w-10 h-10 rounded-xl bg-[#94452c] text-white flex items-center justify-center font-serif font-bold text-xl shadow-xs">
          A
        </div>

        <nav className="flex-1 flex flex-col items-center gap-4 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className="group flex flex-col items-center gap-1 w-full px-2 py-1.5 transition-all"
                title={item.label}
              >
                <div
                  className={`w-14 h-8 rounded-full flex items-center justify-center transition-colors relative ${
                    isActive
                      ? 'bg-[#ffdbd0] text-[#94452c]'
                      : 'text-[#6B726A] hover:bg-[#E8E4DC] hover:text-[#242825]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#94452c] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[11px] font-medium tracking-tight ${
                    isActive ? 'text-[#94452c] font-semibold' : 'text-[#6B726A]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="text-[10px] text-center text-[#6B726A] px-2 font-mono">
          MD3
        </div>
      </aside>
    );
  }

  // Mobile Bottom Navigation Bar (Height 64px, MD3 standard)
  return (
    <nav className="h-16 bg-[#F5F2EB]/95 backdrop-blur-md border-t border-[#E8E4DC] grid grid-cols-4 items-center px-2 select-none shadow-md3-nav z-30">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className="flex flex-col items-center justify-center gap-0.5 w-full h-full py-1 group"
          >
            <div
              className={`w-14 h-7 rounded-full flex items-center justify-center transition-colors relative ${
                isActive
                  ? 'bg-[#ffdbd0] text-[#94452c]'
                  : 'text-[#6B726A] group-hover:text-[#242825]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.badge && (
                <span className="absolute -top-1 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#94452c] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] font-medium tracking-tight ${
                isActive ? 'text-[#94452c] font-semibold' : 'text-[#6B726A]'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
