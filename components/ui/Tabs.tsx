"use client";

import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          aria-pressed={activeTab === tab.id}
          className={cn(
            "min-h-11 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            activeTab === tab.id
              ? "bg-primary text-white  shadow-primary/25"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
