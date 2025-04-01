"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"; 

export default function DarkModeToggleButton({ toggleDarkMode, isDarkMode }) {
  return (
    <button
      onClick={() => {
        console.log("✅ Button clicked! Calling toggleDarkMode...");
        toggleDarkMode();
      }}
      className="fixed top-23 right-3 px-2 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-all z-[1000] flex items-center space-x-2"
    >
      {/* আইকন পরিবর্তন হবে ডার্ক মোডের অবস্থার উপর ভিত্তি করে */}
      {isDarkMode ? (
        <SunIcon className="w-5 h-5" /> // ডার্ক মোড চালু থাকলে সূর্য আইকন দেখাবে
      ) : (
        <MoonIcon className="w-5 h-5" /> // ডার্ক মোড বন্ধ থাকলে চাঁদ আইকন দেখাবে
      )}
    </button>
  );
}
