import React from 'react';
import { X, BookOpen, Compass, Feather, Code2, Award, Clock, MapPin, Heart, Sparkles, BookMarked } from 'lucide-react';
import { ReadingGoal } from '../types/book';

interface MD3DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  readingGoal: ReadingGoal;
}

export const MD3Drawer: React.FC<MD3DrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  readingGoal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Surface */}
      <div className="relative w-80 max-w-[85vw] h-full bg-[#FAF8F5] border-r border-[#E8E4DC] shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E8E4DC] bg-[#F5F2EB]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#94452c] text-white flex items-center justify-center font-serif font-bold text-xl shadow-xs">
              A
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#E8E4DC] text-[#6B726A] hover:text-[#242825]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="font-serif font-bold text-xl text-[#242825]">
            Atelier Books
          </h2>
          <p className="text-xs text-[#6B726A] mt-0.5">
            Warm Literary Modern Sanctuary
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-[#466558] mt-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>24 Quai des Écritures · Open Daily</span>
          </div>
        </div>

        {/* Reading Goal Widget in Drawer */}
        <div className="p-4 mx-4 my-4 bg-[#ecefea] rounded-xl border border-[#E8E4DC]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#242825]">2026 Reading Challenge</span>
            <span className="font-mono text-[#94452c] font-bold">
              {readingGoal.completedBooks}/{readingGoal.targetBooks}
            </span>
          </div>
          <div className="w-full h-2 bg-[#FAF8F5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#466558] rounded-full transition-all duration-500"
              style={{
                width: `${(readingGoal.completedBooks / readingGoal.targetBooks) * 100}%`
              }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#6B726A] mt-2">
            <span>🔥 {readingGoal.currentStreakDays} day reading streak</span>
            <span>75% complete</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {[
            { id: 'explore', label: 'Explore & Catalog', icon: Compass },
            { id: 'shelves', label: 'My Reading Shelves', icon: BookOpen },
            { id: 'marginalia', label: 'Marginalia & Saved Quotes', icon: Feather },
            { id: 'flutter_code', label: 'Flutter Material 3 Source', icon: Code2 },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#ffdbd0] text-[#94452c]'
                    : 'text-[#242825] hover:bg-[#F5F2EB]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#94452c]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-[#E8E4DC] text-center text-xs text-[#6B726A]">
          <p className="font-serif italic">
            "A room without books is like a body without a soul."
          </p>
          <p className="text-[10px] mt-1 text-[#88726c]">
            Designed for Android & Web · Material 3
          </p>
        </div>
      </div>
    </div>
  );
};
