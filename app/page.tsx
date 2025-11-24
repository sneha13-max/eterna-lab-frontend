"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Zap,
  Settings2,
  Settings,
  Wallet,
  ChevronDown,
  Bell,
  Copy,
  Zap as ZapIcon,
  Clock,
  X,
  BookOpen,
  MessageSquare,
  Hand,
  Search,
  Star,
  LineChart,
  Hash,
  Eye,
  Square,
  Circle,
  Sun,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  Menu,
  User,
  Users,
  Trophy,
  Crown,
  UserPlus,
  Leaf,
  ChefHat,
  Target,
  EyeOff,
  Ban,
  Camera,
  List,
  Volume2,
  Bookmark,
} from "lucide-react";

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================
export interface TokenMetric {
  label: string;
  value: string;
  isPositive: boolean;
}
export interface TokenStats {
  replies?: number;
  likes?: number;
  views?: number;
  holders?: number;
}
export interface TokenPair {
  id: string;
  symbol: string;
  name: string;
  description: string;
  image: string;
  borderColor?: string;
  timeAgo: string;
  stats: TokenStats;
  marketCap: string;
  volume?: string;
  txCount?: number;
  price: string;
  liquiditySOL: string;
  metrics: TokenMetric[];
  address?: string;
  priceChangeDirection?: "up" | "down" | "neutral";
  marketCapChangeDirection?: "up" | "down" | "neutral";
  volumeChangeDirection?: "up" | "down" | "neutral";
  txCountChangeDirection?: "up" | "down" | "neutral";
  previousPrice?: number;
  previousMarketCap?: number;
  previousVolume?: number;
  previousTxCount?: number;
}
export interface ColumnData {
  title: string;
  count: number;
  pairs: TokenPair[];
}

// ==========================================
// 2. UTILS
// ==========================================
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  priceStr: string,
  noDecimals: boolean = false
): string {
  if (!noDecimals) return priceStr;
  const cleaned = priceStr.replace(/[$,]/g, "");
  if (cleaned.includes("K"))
    return `$${Math.floor(parseFloat(cleaned.replace("K", "")))}K`;
  if (cleaned.includes("M"))
    return `$${Math.floor(parseFloat(cleaned.replace("M", "")))}M`;
  if (cleaned.includes("B"))
    return `$${Math.floor(parseFloat(cleaned.replace("B", "")))}B`;
  if (cleaned.startsWith("0.000")) return "$0";
  return `$${Math.floor(parseFloat(cleaned))}`;
}

export type SortField =
  | "marketCap"
  | "volume"
  | "price"
  | "txCount"
  | "timeAgo";
export type SortDirection = "asc" | "desc";

function parsePriceForSort(priceStr: string): number {
  const cleaned = priceStr.replace(/[$,]/g, "");
  if (cleaned.includes("K")) return parseFloat(cleaned.replace("K", "")) * 1000;
  if (cleaned.includes("M"))
    return parseFloat(cleaned.replace("M", "")) * 1000000;
  if (cleaned.includes("B"))
    return parseFloat(cleaned.replace("B", "")) * 1000000000;
  if (cleaned.startsWith("0.000")) return parseFloat(cleaned) || 0.000001;
  return parseFloat(cleaned) || 0;
}

function parseTimeAgo(timeAgo: string): number {
  const match = timeAgo.match(/(\d+)([smhd])/);
  if (!match) return 0;
  const value = parseInt(match[1]);
  const unit = match[2];
  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 3600;
    case "d":
      return value * 86400;
    default:
      return value;
  }
}

export function sortTokenPairs(
  pairs: TokenPair[],
  field: SortField,
  direction: SortDirection
): TokenPair[] {
  return [...pairs].sort((a, b) => {
    let comparison = 0;
    switch (field) {
      case "marketCap":
        comparison =
          parsePriceForSort(a.marketCap) - parsePriceForSort(b.marketCap);
        break;
      case "volume":
        comparison =
          (a.volume ? parsePriceForSort(a.volume) : 0) -
          (b.volume ? parsePriceForSort(b.volume) : 0);
        break;
      case "price":
        comparison = parsePriceForSort(a.price) - parsePriceForSort(b.price);
        break;
      case "txCount":
        comparison = (a.txCount || 0) - (b.txCount || 0);
        break;
      case "timeAgo":
        comparison = parseTimeAgo(a.timeAgo) - parseTimeAgo(b.timeAgo);
        break;
    }
    return direction === "asc" ? comparison : -comparison;
  });
}

// ==========================================
// 3. MOCK DATA & PRICE UPDATER (Inlined)
// ==========================================
const BORDER_COLORS = [
  "#22c55e",
  "#eab308",
  "#a855f7",
  "#3b82f6",
  "#f43f5e",
  undefined,
];
const TOKENS = [
  {
    name: "Pepe",
    symbol: "PEPE",
    url: "https://api.dicebear.com/7.x/initials/svg?seed=PEPE",
  },
  {
    name: "Bonk",
    symbol: "BONK",
    url: "https://api.dicebear.com/7.x/initials/svg?seed=BONK",
  },
  {
    name: "Wif",
    symbol: "WIF",
    url: "https://api.dicebear.com/7.x/initials/svg?seed=WIF",
  },
  {
    name: "Popcat",
    symbol: "POPCAT",
    url: "https://api.dicebear.com/7.x/initials/svg?seed=POPCAT",
  },
  {
    name: "Slerf",
    symbol: "SLERF",
    url: "https://api.dicebear.com/7.x/initials/svg?seed=SLERF",
  },
  {
    name: "Book of Meme",
    symbol: "BOME",
    url: "https://api.dicebear.com/7.x/initials/svg?seed=BOME",
  },
  {
    name: "Wen",
    symbol: "WEN",
    url: "https://api.dicebear.com/7.x/initials/svg?seed=WEN",
  },
  {
    name: "Mog Coin",
    symbol: "MOG",
    url: "https://api.dicebear.com/7.x/initials/svg?seed=MOG",
  },
  {
    name: "Shiba Inu",
    symbol: "SHIB",
    url: "https://api.dicebear.com/7.x/initials/svg?seed=SHIB",
  },
  {
    name: "Floki",
    symbol: "FLOKI",
    url: "https://api.dicebear.com/7.x/initials/svg?seed=FLOKI",
  },
];

const createRandomPair = (index: number): TokenPair => {
  const token = TOKENS[index % TOKENS.length];
  return {
    id: index.toString(),
    symbol: token.symbol,
    name: token.name,
    description: `${token.name} token`,
    image: token.url,
    borderColor: BORDER_COLORS[index % BORDER_COLORS.length],
    timeAgo: `${Math.floor(Math.random() * 59) + 1}s`,
    address: `0x${Math.floor(Math.random() * 99)}...4444`,
    stats: {
      replies: Math.floor(Math.random() * 500),
      likes: Math.floor(Math.random() * 1000),
    },
    marketCap: `$${(Math.random() * 100).toFixed(1)}K`,
    volume: `$${(Math.random() * 50).toFixed(1)}K`,
    txCount: Math.floor(Math.random() * 800),
    price: "$0.000...",
    liquiditySOL: `${(Math.random() * 5).toFixed(1)} BNB`,
    metrics: [{ label: "5m", value: "10%", isPositive: true }],
  };
};
const getColumnData = (): ColumnData[] => [
  {
    title: "New Pairs",
    count: 15,
    pairs: Array.from({ length: 15 }, (_, i) => createRandomPair(i)),
  },
  {
    title: "Final Stretch",
    count: 8,
    pairs: Array.from({ length: 8 }, (_, i) => createRandomPair(i + 100)),
  },
  {
    title: "Migrated",
    count: 25,
    pairs: Array.from({ length: 25 }, (_, i) => createRandomPair(i + 200)),
  },
];

function parsePriceVal(p: string): number {
  return parsePriceForSort(p);
}
function formatPriceVal(v: number, orig: string): string {
  if (orig.includes("K")) return `$${(v / 1000).toFixed(1)}K`;
  if (orig.startsWith("$0.000")) return `$${v.toFixed(6)}`;
  return `$${v.toFixed(2)}`;
}
function updateTokenPrice(pair: TokenPair): TokenPair {
  const currentPrice = pair.previousPrice ?? parsePriceVal(pair.price);
  const newPrice = Math.max(
    0.000001,
    currentPrice * (1 + (Math.random() * 0.08 - 0.04))
  );
  const changeDir = newPrice > currentPrice ? "up" : "down";
  return {
    ...pair,
    price: formatPriceVal(newPrice, pair.price),
    priceChangeDirection: changeDir,
    previousPrice: newPrice,
  };
}
function updateColumnPrices(pairs: TokenPair[]): TokenPair[] {
  return pairs.map(updateTokenPrice);
}

// ==========================================
// 4. CONTEXT: DisplaySettings
// ==========================================
export interface DisplaySettings {
  metricsSize: "small" | "large";
  quickBuySize: "small" | "large" | "mega" | "ultra";
  quickBuyAmount: number;
  theme: "grey" | "dark";
  showSearchBar: boolean;
  noDecimals: boolean;
  showHiddenTokens: boolean;
  unhideOnMigrated: boolean;
  circleImages: boolean;
  progressBar: boolean;
}
const defaultSettings: DisplaySettings = {
  metricsSize: "large",
  quickBuySize: "small",
  quickBuyAmount: 47,
  theme: "grey",
  showSearchBar: true,
  noDecimals: false,
  showHiddenTokens: false,
  unhideOnMigrated: false,
  circleImages: false,
  progressBar: true,
};
const DisplaySettingsContext = createContext<{
  settings: DisplaySettings;
  setSettings: (s: DisplaySettings) => void;
}>({
  settings: defaultSettings,
  setSettings: () => {},
});
export function useDisplaySettings() {
  return useContext(DisplaySettingsContext);
}

// ==========================================
// 5. COMPONENTS: Modals & UI Elements
// ==========================================
function Modal({ isOpen, onClose, title, size = "md", children }: any) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  if (!mounted || !isOpen) return null;
  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-gray-800 bg-[#111] shadow-2xl",
          size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-3xl" : "max-w-lg"
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">
          <h3 className="text-sm font-semibold tracking-wide text-gray-200">
            {title}
          </h3>
          <button
            type="button"
            aria-label="Show token details"
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : null;
}

function DisplayModal({ isOpen, onClose, settings, onSettingsChange }: any) {
  // Simplified for brevity - full logic from original file would go here
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Display Settings">
      <div className="space-y-4">
        <button
          type="button"
          aria-label="Show token details"
          onClick={() =>
            onSettingsChange({ ...settings, noDecimals: !settings.noDecimals })
          }
          className="text-white border p-2 rounded block w-full"
        >
          Toggle Decimals: {settings.noDecimals ? "ON" : "OFF"}
        </button>
        <button
          type="button"
          aria-label="Show token details"
          onClick={() =>
            onSettingsChange({
              ...settings,
              circleImages: !settings.circleImages,
            })
          }
          className="text-white border p-2 rounded block w-full"
        >
          Toggle Circle Images: {settings.circleImages ? "ON" : "OFF"}
        </button>
      </div>
    </Modal>
  );
}

function FilterModal({ isOpen, onClose, currentSort, onSortChange }: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sort" size="sm">
      <button
        type="button"
        aria-label="Show token details"
        onClick={() => {
          onSortChange("marketCap", "desc");
          onClose();
        }}
        className="text-white block w-full p-2 hover:bg-gray-800"
      >
        Sort by Market Cap
      </button>
    </Modal>
  );
}

function TokenDetailModal({ isOpen, onClose, token }: any) {
  if (!token) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={token.symbol} size="lg">
      <div className="text-white space-y-4">
        <div className="flex gap-4">
          <img
            aria-label="Show token details"
            src={token.image}
            className="w-16 h-16 rounded"
          />
          <div>
            <h1 className="text-xl font-bold">{token.name}</h1>
            <p>{token.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0a0a0a] p-4 rounded border border-gray-800">
            Price: {token.price}
          </div>
          <div className="bg-[#0a0a0a] p-4 rounded border border-gray-800">
            MC: {token.marketCap}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function TokenCard({ pair, onCardClick }: any) {
  const { settings } = useDisplaySettings();
  const [imgSrc, setImgSrc] = useState(pair.image);
  const idNum = parseInt(pair.id);
  const showLeaf = idNum % 3 === 0;
  const priceDirection = pair.priceChangeDirection || "neutral";
  const barColorClass =
    priceDirection === "up"
      ? "bg-emerald-500"
      : priceDirection === "down"
      ? "bg-rose-500"
      : "bg-emerald-500";

  return (
    <div
      className="bg-[#111] border border-gray-800 rounded-lg p-3 hover:border-gray-700 transition relative cursor-pointer w-full"
      onClick={() => onCardClick?.(pair)}
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex-shrink-0 flex flex-row md:flex-col items-center gap-3">
          <img
            aria-label="Show token details"
            src={imgSrc}
            onError={() =>
              setImgSrc(
                `https://api.dicebear.com/7.x/initials/svg?seed=${pair.symbol}`
              )
            }
            className={cn(
              "w-16 h-16 object-cover border-2",
              settings.circleImages ? "rounded-full" : "rounded-lg"
            )}
            style={{ borderColor: pair.borderColor }}
          />
          <span className="text-[13px] text-slate-500 font-mono">
            {pair.address}
          </span>
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold">{pair.symbol}</span>
          </div>
          <div className="flex gap-2 text-[13px] text-gray-500">
            <span className="text-emerald-400">{pair.timeAgo}</span>
            {showLeaf && <Leaf className="w-4 h-4 text-emerald-500" />}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-gray-500">
            MC{" "}
            <span className="text-white font-bold">
              {formatPrice(pair.marketCap, settings.noDecimals)}
            </span>
          </div>
          <div className="h-[3px] w-[50px] bg-gray-800 rounded-full mt-1 overflow-hidden">
            <div
              className={cn("h-full", barColorClass)}
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColumnSection({ data }: { data: ColumnData }) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenPair | null>(null);
  const [sortField, setSortField] = useState<SortField>("marketCap");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortedPairs = useMemo(
    () => sortTokenPairs(data.pairs, sortField, sortDirection),
    [data.pairs, sortField, sortDirection]
  );

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800/50 bg-[#0a0a0a]">
        <h2 className="text-white font-semibold text-sm">{data.title}</h2>
        <button
          type="button"
          aria-label="Show token details"
          onClick={() => setIsFilterModalOpen(true)}
          className="text-gray-500 hover:text-white"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>
      <div className="px-2 pt-2 pb-4 space-y-2 flex-1 overflow-y-auto min-h-0">
        {sortedPairs.map((pair) => (
          <TokenCard
            key={pair.id}
            pair={pair}
            onCardClick={(p: any) => {
              setSelectedToken(p);
              setIsDetailModalOpen(true);
            }}
          />
        ))}
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentSort={{ field: sortField, direction: sortDirection }}
        onSortChange={(f: any, d: any) => {
          setSortField(f);
          setSortDirection(d);
        }}
      />
      <TokenDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedToken(null);
        }}
        token={selectedToken}
      />
    </div>
  );
}

function PulseSidebar() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className="w-full bg-[#0a0a0a] border-b border-gray-800 flex items-center px-4 sm:px-6 h-10 flex-shrink-0 overflow-x-auto">
      <div className="flex items-center gap-2 min-w-max">
        <button
          type="button"
          aria-label="Show token details"
          className="text-gray-500 hover:text-white p-1"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
        <div className="h-3 w-[1px] bg-gray-800 mx-2"></div>
        <button
          type="button"
          aria-label="Show token details"
          className="text-gray-500 hover:text-white p-1"
        >
          <Star className="w-3.5 h-3.5" />
        </button>
        <div className="h-3 w-[1px] bg-gray-800 mx-2"></div>
        <button
          type="button"
          aria-label="Show token details"
          className="text-gray-500 hover:text-white p-1"
        >
          <LineChart className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function Navbar() {
  const [showChainDropdown, setShowChainDropdown] = useState(false);
  const [selectedChain, setSelectedChain] = useState("BNB");
  return (
    <nav className="border-b border-gray-800 bg-[#0a0a0a] px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="text-white text-2xl font-semibold">
          ETERNA LABS - TRADING DASHBOARD <span className="text-base font-light">CREATOR</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Show token details"
          onClick={() => setShowChainDropdown(!showChainDropdown)}
          className="flex items-center gap-2 bg-[#111] border border-gray-800 rounded-full px-3 py-1.5 text-white text-sm"
        >
          {selectedChain} <ChevronDown className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Show token details"
          className="bg-blue-500 text-black px-4 py-1.5 rounded-full text-sm font-bold"
        >
          Deposit
        </button>
      </div>
    </nav>
  );
}

// ==========================================
// 6. MAIN PAGE COMPONENT
// ==========================================
export default function Home() {
  const [columns, setColumns] = useState<ColumnData[] | null>(null);
  const [isDisplayModalOpen, setIsDisplayModalOpen] = useState(false);
  const [displaySettings, setDisplaySettings] =
    useState<DisplaySettings>(defaultSettings);

  useEffect(() => {
    // Mock WebSocket
    setColumns(getColumnData());
    const interval = setInterval(() => {
      setColumns((prev) =>
        prev
          ? prev.map((col) => ({
              ...col,
              pairs: updateColumnPrices(col.pairs),
            }))
          : prev
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DisplaySettingsContext.Provider
      value={{ settings: displaySettings, setSettings: setDisplaySettings }}
    >
      <div className="min-h-screen xl:h-screen xl:max-h-screen xl:overflow-hidden flex flex-col bg-[#0a0a0a] text-white">
        <Navbar />
        <div className="flex flex-1 flex-col min-h-0 overflow-visible xl:overflow-hidden">
          <PulseSidebar />
          <div className="border-b border-gray-800 bg-[#0a0a0a] px-4 py-4 flex flex-col gap-4 lg:flex-row lg:justify-between">
            <h1 className="text-xl font-semibold">Pulse</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setIsDisplayModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#161616] rounded-full text-sm"
              >
                <List className="w-4 h-4" /> Display
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-visible xl:overflow-hidden">
            <div className="grid h-full min-h-0 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 border-t border-gray-800 xl:border-t-0 xl:border-x border-gray-800">
              {columns &&
                columns.map((col, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col min-h-0 h-full overflow-hidden border-gray-800 border-b sm:border-b-0 ${
                      idx < 2 ? "xl:border-r" : ""
                    }`}
                  >
                    <ColumnSection data={col} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <DisplayModal
          isOpen={isDisplayModalOpen}
          onClose={() => setIsDisplayModalOpen(false)}
          settings={displaySettings}
          onSettingsChange={setDisplaySettings}
        />
      </div>
    </DisplaySettingsContext.Provider>
  );
}