import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import {
  Settings,
  Wallet,
  ChevronDown,
  Bell,
  Copy,
  Zap,
  Clock,
  X,
  BookOpen,
  MessageSquare,
  Hand,
} from "lucide-react";

// --- METADATA ---
export const metadata: Metadata = {
  title: "Eterna - Crypto Trading Dashboard",
  description: "Crypto trading dashboard",
};

// --- FOOTER COMPONENT (Inlined) ---
function Footer() {
  const isConnected = true;

  const IconWithDot = ({
    Icon,
    label,
    color = "text-gray-400",
  }: {
    Icon: any;
    label: string;
    color?: string;
  }) => (
    <div className="flex items-center gap-1.5 text-xs">
      <div className="relative cursor-pointer hover:text-white transition">
        <Icon className={`w-4 h-4 ${color}`} />
        <div className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-red-500" />
      </div>
      <span className={`${color} font-medium tracking-tight`}>{label}</span>
    </div>
  );

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#0a0a0a] border-t border-gray-800 z-50 px-4 sm:px-6">
      <div className="hidden lg:flex items-center justify-between h-12 text-xs">
        {/* --- LEFT SECTION: Presets, Wallet, Social --- */}
        <div className="flex items-center gap-4">
          <button className="relative flex items-center gap-1.5 px-3 py-1.5 bg-[#20203a] rounded-md text-gray-200 hover:bg-[#30305a] transition font-medium">
            <Settings className="w-3.5 h-3.5 text-yellow-400" />
            <span>PRESET 1</span>
            <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500"></div>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-4">
            <IconWithDot Icon={Wallet} label="Wallet" />
            <IconWithDot Icon={X} label="Twitter" />
            <IconWithDot Icon={Clock} label="Discover" />
            <IconWithDot Icon={Zap} label="Pulse" />
            <div className="h-4 w-[1px] bg-gray-600/50 mx-1"></div>
            <div className="h-4 w-[1px] bg-gray-600/50 mx-1"></div>
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 font-medium tracking-tight">
                PnL
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-l border-gray-800 pl-4">
            <button
              type="button"
              aria-label="Show token details"
              className="text-gray-400 hover:text-white transition"
            >
              <Hand className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Show token details"
              className="text-[#F0B90B] hover:text-white transition"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.8L17.2 8 12 11.2 6.8 8 12 4.8zM6 9.8l4.2 2.6L6 15v-5.2zm6 7.4L7.8 14.6 12 12l4.2 2.6L12 17.2zM18 15l-4.2-2.6L18 9.8V15z" />
              </svg>
            </button>
          </div>
        </div>

        {/* --- CENTER SECTION: Major Crypto Prices --- */}
        <div className="flex items-center gap-6 bg-[#151515] px-3 py-1.5 rounded-full whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="text-orange-500">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <circle cx="12" cy="12" r="10" fill="#f7931a" />
                <text
                  x="50%"
                  y="55%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#000"
                >
                  B
                </text>
              </svg>
            </span>
            <span className="text-orange-400 font-bold text-sm">$91.9K</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 1L2 12 12 23 22 12 Z" fill="#627EEA" />
              </svg>
            </span>
            <span className="text-blue-400 font-bold text-sm">$3013</span>
          </div>
        </div>

        {/* --- RIGHT SECTION: Connection Status & Global Controls --- */}
        <div className="flex items-center gap-4">
          <div
            className={`px-3 py-1.5 rounded-full font-semibold ${
              isConnected
                ? "bg-emerald-700/50 text-emerald-400"
                : "bg-red-700/50 text-red-400"
            }`}
          >
            {isConnected ? "Connection is stable" : "Reconnecting..."}
          </div>
          <div className="flex items-center gap-4 border-l border-gray-800 pl-4">
            <button className="flex items-center gap-3 px-3 py-1.5 border border-gray-800 rounded-full hover:border-gray-700 transition text-sm text-white bg-[#0a0a0a]">
              <div className="flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-gray-400" />
                <span className="font-mono">1</span>
              </div>
              <div className="h-3 w-[1px] bg-gray-800"></div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 text-[#F0B90B]">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.8L17.2 8 12 11.2 6.8 8 12 4.8zM6 9.8l4.2 2.6L6 15v-5.2zm6 7.4L7.8 14.6 12 12l4.2 2.6L12 17.2zM18 15l-4.2-2.6L18 9.8V15z" />
                  </svg>
                </div>
                <span className="font-mono">0</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>
            <div className="relative cursor-pointer">
              <Settings className="w-5 h-5 text-gray-400 hover:text-white transition" />
              <div className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-red-500"></div>
            </div>
            <div className="relative cursor-pointer">
              <Wallet className="w-5 h-5 text-gray-400 hover:text-white transition" />
              <div className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-red-500"></div>
            </div>
            <div className="h-5 w-[1px] bg-gray-800"></div>
            <button
              type="button"
              aria-label="Show token details"
              className="text-gray-400 hover:text-white transition"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Show token details"
              className="text-gray-400 hover:text-white transition"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Show token details"
              className="text-gray-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Show token details"
              className="text-gray-400 hover:text-white transition"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile summary bar */}
      <div className="flex lg:hidden items-center justify-between h-12 text-xs gap-4">
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#20203a] rounded-md text-gray-200">
          <Settings className="w-3.5 h-3.5 text-yellow-400" />
          <span>Preset 1</span>
        </button>
        <div className="flex items-center gap-3 text-gray-400">
          <Wallet className="w-4 h-4" />
          <div
            className={`px-3 py-1 rounded-full ${
              isConnected
                ? "bg-emerald-700/30 text-emerald-300"
                : "bg-red-700/30 text-red-300"
            }`}
          >
            {isConnected ? "Live" : "Offline"}
          </div>
        </div>
        <button
          type="button"
          aria-label="Show token details"
          className="text-gray-400 hover:text-white transition"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}

// --- ROOT LAYOUT ---
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
