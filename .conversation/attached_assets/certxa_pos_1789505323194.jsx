import React, { useMemo, useState } from "react";
import {
  Search, Bell, ChevronDown, Plus, MoreVertical, X, Delete, RotateCcw,
  UserCheck, UserPlus, FileText, History, MoreHorizontal, Phone, Crown,
  Star, Wallet, CalendarClock, Sparkles, Footprints, Hand, Droplet,
  Paintbrush, ShoppingBag, Gift, Ticket, Trophy, Ban, Printer, Banknote,
  Tag, Store, PackageOpen, LogOut, Wifi, ShoppingCart, CalendarDays,
  Users, Package, BarChart3, MessageSquare, Menu, CreditCard, Nfc,
  Smartphone, ArrowLeft, Loader2, CheckCircle2,
} from "lucide-react";

/* ---------------------------------- Palette ---------------------------------- */
const C = {
  navy: "#0B1220",
  navyPill: "#182338",
  pink: "#E31C79",
  pinkSoft: "#FCE4F1",
  green: "#159A48",
  greenSoft: "#DFF7E6",
  purple: "#8B5CF6",
  purpleSoft: "#EEE9FE",
  orange: "#F59E0B",
  orangeSoft: "#FEF3C7",
  teal: "#0FA8A0",
  tealSoft: "#D8F5F2",
  blue: "#2563EB",
  blueSoft: "#DFEBFF",
  ink: "#1A2233",
  sub: "#6B7686",
  line: "#E7EAEF",
  bg: "#F4F6F9",
};

const DOT_COLORS = [C.blue, C.pink, C.purple, C.green, C.orange, C.teal];

/* ---------------------------------- Data ---------------------------------- */
const CATEGORIES = [
  { key: "full-sets", label: "Full Sets", icon: Sparkles, color: C.pink },
  { key: "pedicures", label: "Pedicures", icon: Footprints, color: C.blue },
  { key: "manicures", label: "Manicures", icon: Hand, color: C.blue },
  { key: "dip-powder", label: "Dip Powder", icon: Droplet, color: C.purple },
  { key: "polish", label: "Polish", icon: Paintbrush, color: C.orange },
  { key: "extras", label: "Extras", icon: Plus, color: C.green },
  { key: "retail", label: "Retail", icon: ShoppingBag, color: C.sub },
  { key: "gift-cards", label: "Gift Cards", icon: Gift, color: C.pink },
];

const SERVICES = {
  "full-sets": [
    { name: "Gel Full Set", time: "150 min", price: 55 },
    { name: "Acrylic Full Set", time: "150 min", price: 50 },
    { name: "Pink & White", time: "150 min", price: 60 },
    { name: "Builder Gel", time: "135 min", price: 50 },
    { name: "Gel Overlay", time: "90 min", price: 45 },
    { name: "Hard Gel", time: "135 min", price: 50 },
    { name: "Fill - Gel", time: "90 min", price: 40 },
    { name: "Fill - Acrylic", time: "90 min", price: 35 },
  ],
  pedicures: [
    { name: "Classic Pedicure", time: "30 min", price: 35 },
    { name: "Deluxe Pedicure", time: "45 min", price: 45 },
    { name: "Gel Pedicure", time: "45 min", price: 50 },
    { name: "Spa Pedicure", time: "60 min", price: 65 },
    { name: "Kids Pedicure", time: "25 min", price: 25 },
    { name: "Express Pedicure", time: "20 min", price: 28 },
    { name: "Hot Stone Pedicure", time: "55 min", price: 60 },
    { name: "Paraffin Pedicure", time: "45 min", price: 48 },
  ],
  manicures: [
    { name: "Classic Manicure", time: "25 min", price: 25 },
    { name: "Gel Manicure", time: "35 min", price: 35 },
    { name: "Deluxe Manicure", time: "40 min", price: 40 },
    { name: "Spa Manicure", time: "50 min", price: 50 },
    { name: "Kids Manicure", time: "20 min", price: 18 },
    { name: "Express Manicure", time: "15 min", price: 20 },
    { name: "Paraffin Manicure", time: "35 min", price: 38 },
    { name: "French Manicure", time: "35 min", price: 32 },
  ],
  "dip-powder": [
    { name: "Dip Powder Full Set", time: "60 min", price: 45 },
    { name: "Dip Overlay", time: "45 min", price: 40 },
    { name: "Dip Color Change", time: "30 min", price: 30 },
    { name: "Dip Removal", time: "20 min", price: 15 },
    { name: "Dip French", time: "65 min", price: 50 },
    { name: "Dip Ombre", time: "70 min", price: 55 },
    { name: "Dip Fill", time: "45 min", price: 38 },
    { name: "Dip Chrome", time: "65 min", price: 52 },
  ],
  polish: [
    { name: "Polish Change - Hands", time: "15 min", price: 12 },
    { name: "Polish Change - Feet", time: "15 min", price: 15 },
    { name: "Gel Polish - Hands", time: "25 min", price: 20 },
    { name: "Gel Polish - Feet", time: "25 min", price: 22 },
    { name: "French Polish", time: "20 min", price: 18 },
    { name: "Chrome Polish", time: "25 min", price: 20 },
    { name: "Polish Removal", time: "10 min", price: 8 },
    { name: "Nail Art Accent", time: "15 min", price: 10 },
  ],
  extras: [
    { name: "French Tips", time: "15 min", price: 10 },
    { name: "Chrome Powder", time: "15 min", price: 10 },
    { name: "Nail Art - Simple", time: "20 min", price: 15 },
    { name: "Paraffin Treatment", time: "15 min", price: 10 },
    { name: "Gel Removal", time: "15 min", price: 10 },
    { name: "Callus Treatment", time: "10 min", price: 12 },
    { name: "Hot Towel", time: "5 min", price: 5 },
    { name: "Shellac Removal", time: "15 min", price: 12 },
  ],
  retail: [
    { name: "Cuticle Oil", time: null, price: 12 },
    { name: "Hand Cream", time: null, price: 15 },
    { name: "Nail File Set", time: null, price: 8 },
    { name: "Top Coat", time: null, price: 14 },
    { name: "Base Coat", time: null, price: 14 },
    { name: "Foot Scrub", time: null, price: 18 },
    { name: "Lotion Gift Set", time: null, price: 25 },
    { name: "Nail Strengthener", time: null, price: 16 },
  ],
  "gift-cards": [
    { name: "$25 Gift Card", time: null, price: 25 },
    { name: "$50 Gift Card", time: null, price: 50 },
    { name: "$75 Gift Card", time: null, price: 75 },
    { name: "$100 Gift Card", time: null, price: 100 },
    { name: "$150 Gift Card", time: null, price: 150 },
    { name: "$200 Gift Card", time: null, price: 200 },
    { name: "Custom Amount", time: null, price: 0 },
    { name: "E-Gift Card", time: null, price: 0 },
  ],
};

const ADD_ONS = [
  { name: "French Tips", price: 10 },
  { name: "Chrome Powder", price: 10 },
  { name: "Nail Art - Simple", price: 15 },
  { name: "Paraffin Treatment", price: 10 },
  { name: "Gel Removal", price: 10 },
];

const ACTION_TILES = [
  { label: "Lotto", icon: Ticket, accent: C.teal },
  { label: "Lotto Wins", icon: Trophy, accent: C.purple },
  { label: "Scratch Wins", icon: Star, accent: C.pink },
  { label: "No Sale", icon: Ban, accent: C.sub },
  { label: "Refund", icon: RotateCcw, accent: C.teal },
  { label: "Receipt Reprint", icon: Printer, accent: C.purple },
  { label: "Cash Drop", icon: Banknote, accent: C.orange },
  { label: "Coupon", icon: Tag, accent: C.pink },
  { label: "Store Menu", icon: Store, accent: C.pink },
  { label: "OP Menu", icon: MoreHorizontal, accent: C.sub },
  { label: "Open Drawer", icon: PackageOpen, accent: C.teal },
  { label: "Log Out", icon: LogOut, accent: C.sub },
];

const PAYMENT_METHODS = [
  { key: "cash", label: "Cash", icon: Banknote, color: C.green },
  { key: "card", label: "Card", icon: CreditCard, color: C.blue },
  { key: "gift-card", label: "Gift Card", icon: Gift, color: C.pink },
  { key: "voucher", label: "Voucher", icon: Ticket, color: C.purple },
  { key: "m2-reader", label: "M2 Reader", icon: Smartphone, color: C.teal },
  { key: "tap-to-pay", label: "Tap to Pay", icon: Nfc, color: C.orange },
];

const BOTTOM_NAV = [
  { key: "pos", label: "POS", icon: ShoppingCart, badge: null },
  { key: "calendar", label: "Calendar", icon: CalendarDays, badge: null },
  { key: "customers", label: "Customers", icon: Users, badge: null },
  { key: "inventory", label: "Inventory", icon: Package, badge: null },
  { key: "reports", label: "Reports", icon: BarChart3, badge: null },
  { key: "messages", label: "Messages", icon: MessageSquare, badge: 2 },
  { key: "more", label: "More", icon: Menu, badge: null },
];

const money = (n) => `$${n.toFixed(2)}`;

/* ---------------------------------- Small building blocks ---------------------------------- */
function Pill({ children, style }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold"
      style={style}
    >
      {children}
    </span>
  );
}

function IconTile({ icon: Icon, label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1.5 rounded-xl border bg-white px-3 py-2.5 transition hover:shadow-sm active:scale-[0.98]"
      style={{ borderColor: C.line, minWidth: 84 }}
    >
      <Icon size={18} color={color} strokeWidth={2} />
      <span className="text-[11px] font-medium text-center leading-tight" style={{ color: C.ink }}>
        {label}
      </span>
    </button>
  );
}

/* ---------------------------------- Main component ---------------------------------- */
export default function CertxaPOS() {
  const [activeCategory, setActiveCategory] = useState("full-sets");
  const [search, setSearch] = useState("");
  const [selectedServiceName, setSelectedServiceName] = useState("Gel Full Set");
  const [ticket, setTicket] = useState([
    { uid: 1, name: "Gel Full Set", time: "150 min", price: 55, tech: "Linda" },
    { uid: 2, name: "French Tips", time: "15 min", price: 10, tech: "Linda" },
    { uid: 3, name: "Nail Art - Simple", time: "20 min", price: 15, tech: "Linda" },
    { uid: 4, name: "Paraffin Hand Treatment", time: "15 min", price: 10, tech: "Linda" },
  ]);
  const [nextUid, setNextUid] = useState(5);
  const [discount, setDiscount] = useState(0);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [padValue, setPadValue] = useState("");
  const [activeNav, setActiveNav] = useState("pos");
  const [toast, setToast] = useState(null);
  const [paying, setPaying] = useState(false);
  const [cashMode, setCashMode] = useState(false);
  const [cashReceived, setCashReceived] = useState(0);
  const [processingMethod, setProcessingMethod] = useState(null);

  const flashToast = (msg) => {
    setToast(msg);
    window.clearTimeout(flashToast._t);
    flashToast._t = window.setTimeout(() => setToast(null), 1800);
  };

  const addToTicket = (item) => {
    setTicket((t) => [...t, { uid: nextUid, tech: "Linda", ...item }]);
    setNextUid((n) => n + 1);
  };

  const removeFromTicket = (uid) => {
    setTicket((t) => t.filter((i) => i.uid !== uid));
  };

  const subtotal = useMemo(() => ticket.reduce((s, i) => s + i.price, 0), [ticket]);
  const tax = 0;
  const total = Math.max(subtotal + tax - discount, 0);

  const filteredServices = useMemo(() => {
    const list = SERVICES[activeCategory] || [];
    if (!search.trim()) return list;
    return list.filter((s) => s.name.toLowerCase().includes(search.trim().toLowerCase()));
  }, [activeCategory, search]);

  const filteredAddOns = useMemo(() => {
    if (!search.trim()) return ADD_ONS;
    return ADD_ONS.filter((a) => a.name.toLowerCase().includes(search.trim().toLowerCase()));
  }, [search]);

  const pressPad = (key) => {
    if (key === "back") return setPadValue((v) => v.slice(0, -1));
    if (key === "clear") return setPadValue("");
    setPadValue((v) => (v.length >= 7 ? v : v + key));
  };

  const padAmount = padValue ? parseInt(padValue, 10) / 100 : 0;

  const enterPad = () => {
    if (!padValue) return;
    addToTicket({ name: "Custom Amount", time: null, price: padAmount });
    setPadValue("");
    flashToast(`Added ${money(padAmount)} to ticket`);
  };

  const quickCash = (amount) => {
    addToTicket({ name: "Quick Sale", time: null, price: amount });
    flashToast(`Added ${money(amount)} quick sale`);
  };

  const startPayment = () => {
    if (ticket.length === 0) return;
    setPaying(true);
    setCashMode(false);
    setCashReceived(0);
  };

  const cancelPayment = () => {
    setPaying(false);
    setCashMode(false);
    setCashReceived(0);
    setProcessingMethod(null);
  };

  const completeSale = (methodLabel, note) => {
    flashToast(note || `${methodLabel} payment of ${money(total)} approved`);
    setTicket([]);
    setDiscount(0);
    setPaying(false);
    setCashMode(false);
    setCashReceived(0);
    setProcessingMethod(null);
  };

  const selectPaymentMethod = (method) => {
    if (method.key === "cash") {
      setCashMode(true);
      setCashReceived(total);
      return;
    }
    setProcessingMethod(method.label);
    window.setTimeout(() => completeSale(method.label), 900);
  };

  const cashOptions = useMemo(() => {
    const opts = [total, 20, 50, 100].filter((v) => v >= total);
    return Array.from(new Set(opts.map((v) => Math.round(v * 100) / 100))).sort((a, b) => a - b);
  }, [total]);

  const completeCashSale = () => {
    const change = Math.max(cashReceived - total, 0);
    completeSale("Cash", `Cash payment received \u2014 change due ${money(change)}`);
  };

  const handleHold = () => {
    if (ticket.length === 0) return;
    flashToast("Ticket held");
  };

  const handleCancel = () => {
    setTicket([]);
    setDiscount(0);
    flashToast("Ticket cancelled");
  };

  return (
    <div className="w-full h-full flex flex-col font-sans" style={{ background: C.bg, color: C.ink, minHeight: 700 }}>
      {/* ---------------- Top bar ---------------- */}
      <div className="flex items-center gap-3 px-4 py-2.5" style={{ background: C.navy }}>
        <div className="flex items-center gap-2 pr-3 mr-1" style={{ borderRight: "1px solid #263149" }}>
          <span className="text-white font-bold text-lg tracking-tight">certxa</span>
          <span className="text-[11px] font-semibold text-slate-400 tracking-wide">POS</span>
        </div>

        <button
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-slate-200 font-medium"
          style={{ background: C.navyPill }}
        >
          Walk-ins Waiting
          <span
            className="rounded-md px-1.5 text-xs font-bold text-white"
            style={{ background: C.pink }}
          >
            3
          </span>
        </button>

        <button
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-slate-200 font-medium"
          style={{ background: C.navyPill }}
        >
          Appts Waiting
          <span
            className="rounded-md px-1.5 text-xs font-bold text-white"
            style={{ background: C.pink }}
          >
            5
          </span>
        </button>

        <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-white font-medium" style={{ background: C.navyPill }}>
          <Plus size={15} /> New Ticket
        </button>

        <div className="flex-1 flex items-center gap-2 rounded-lg px-3 py-1.5 mx-2" style={{ background: C.navyPill, maxWidth: 320 }}>
          <Search size={15} className="text-slate-400" />
          <input
            placeholder="Search Customer"
            className="bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500 w-full"
          />
        </div>

        <div className="ml-auto flex items-center gap-4 text-slate-300 text-sm">
          <span className="font-medium">10:42 AM</span>
          <button className="relative">
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: C.pink }} />
          </button>
          <div className="flex items-center gap-2 pl-3" style={{ borderLeft: "1px solid #263149" }}>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "#33415C" }}
            >
              TB
            </div>
            <span className="font-medium text-white">Toby</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* ---------------- Body ---------------- */}
      <div className="flex-1 flex gap-3 p-3 overflow-hidden" style={{ minHeight: 0 }}>
        {/* ===== Left: Current Ticket ===== */}
        <div className="flex flex-col rounded-xl bg-white border" style={{ borderColor: C.line, width: 300, flexShrink: 0 }}>
          <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5" style={{ borderBottom: `1px solid ${C.line}` }}>
            <span className="font-semibold text-[15px]">Current Ticket</span>
            <Pill style={{ background: C.greenSoft, color: C.green }}>WALK-IN</Pill>
          </div>

          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <div>
              <div className="flex items-center gap-1.5 text-[15px]">
                <span className="font-semibold">Linda</span>
                <span className="font-semibold" style={{ color: C.blue }}>Member</span>
                <Crown size={13} color={C.orange} fill={C.orange} />
              </div>
              <div className="text-xs mt-0.5" style={{ color: C.sub }}>Chair 4 &bull; Linda (You)</div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 flex items-center justify-center rounded-md border" style={{ borderColor: C.line }}>
                <Plus size={14} />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-md border" style={{ borderColor: C.line }}>
                <MoreVertical size={14} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4" style={{ minHeight: 0 }}>
            {ticket.length === 0 && (
              <div className="text-sm text-center py-10" style={{ color: C.sub }}>
                No items on this ticket yet.
              </div>
            )}
            {ticket.map((item, idx) => (
              <div key={item.uid} className="flex items-start gap-2.5 py-2.5" style={{ borderBottom: `1px solid ${C.line}` }}>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white mt-0.5 flex-shrink-0"
                  style={{ background: DOT_COLORS[idx % DOT_COLORS.length] }}
                >
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{item.name}</div>
                  {item.time && <div className="text-xs" style={{ color: C.sub }}>{item.time}</div>}
                  <select
                    defaultValue={item.tech}
                    className="mt-1.5 text-xs rounded-md border px-1.5 py-1 outline-none"
                    style={{ borderColor: C.line, color: C.ink }}
                  >
                    <option>Linda</option>
                    <option>Maya</option>
                    <option>Sofia</option>
                  </select>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-sm font-semibold">{money(item.price)}</span>
                  <button onClick={() => removeFromTicket(item.uid)}>
                    <X size={15} color="#DC4C4C" />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => addToTicket({ name: "Custom Item", time: null, price: padAmount || 0 })}
              className="w-full mt-3 mb-3 rounded-lg border border-dashed py-2 text-sm font-medium flex items-center justify-center gap-1.5"
              style={{ borderColor: "#C7CDD6", color: C.ink }}
            >
              <Plus size={14} /> Add Custom Item
            </button>
          </div>

          <div className="px-4 pt-3 pb-4" style={{ borderTop: `1px solid ${C.line}` }}>
            <div className="flex items-center justify-between text-sm py-0.5" style={{ color: C.sub }}>
              <span>SUBTOTAL</span>
              <span className="font-medium" style={{ color: C.ink }}>{money(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm py-0.5" style={{ color: C.sub }}>
              <span>TAX (0%)</span>
              <span className="font-medium" style={{ color: C.ink }}>{money(tax)}</span>
            </div>
            <div className="flex items-center justify-between text-sm py-0.5" style={{ color: C.sub }}>
              <span>DISCOUNT</span>
              {showDiscountInput ? (
                <input
                  autoFocus
                  type="number"
                  min={0}
                  value={discount || ""}
                  onChange={(e) => setDiscount(Math.max(0, Number(e.target.value) || 0))}
                  onBlur={() => setShowDiscountInput(false)}
                  className="w-20 text-right text-sm rounded-md border px-1.5 py-0.5 outline-none"
                  style={{ borderColor: C.line }}
                  placeholder="0.00"
                />
              ) : (
                <button className="font-medium" style={{ color: C.blue }} onClick={() => setShowDiscountInput(true)}>
                  {discount > 0 ? `-${money(discount)}` : "Add Discount"}
                </button>
              )}
            </div>
            <div className="flex items-center justify-between pt-2 mt-1" style={{ borderTop: `1px solid ${C.line}` }}>
              <span className="font-semibold">TOTAL</span>
              <span className="font-bold text-lg">{money(total)}</span>
            </div>

            <button
              onClick={startPayment}
              disabled={ticket.length === 0}
              className="w-full mt-3 rounded-xl py-3 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
              style={{ background: paying ? C.ink : C.green }}
            >
              {paying ? "AWAITING PAYMENT\u2026" : <>FINALIZE &amp; PAY&nbsp;&nbsp;{money(total)}</>}
            </button>

            <div className="flex gap-2 mt-2">
              <button
                onClick={handleHold}
                className="flex-1 rounded-lg border py-2.5 text-sm font-medium flex items-center justify-center gap-1.5"
                style={{ borderColor: C.line }}
              >
                <RotateCcw size={14} /> Hold Ticket
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 rounded-lg border py-2.5 text-sm font-medium flex items-center justify-center gap-1.5"
                style={{ borderColor: C.line, color: "#DC4C4C" }}
              >
                <X size={14} /> Cancel Ticket
              </button>
            </div>
          </div>
        </div>

        {/* ===== Middle: Customer + Numpad ===== */}
        <div className="flex flex-col gap-3" style={{ width: 380, flexShrink: 0, minHeight: 0 }}>
          <div className="rounded-xl bg-white border p-4" style={{ borderColor: C.line }}>
            <div className="flex items-start gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${C.pink}, ${C.purple})` }}
              >
                LS
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[15px]">Linda Smith</span>
                  <Pill style={{ background: C.pinkSoft, color: C.pink }}>VIP</Pill>
                </div>
                <div className="flex items-center gap-1.5 text-sm mt-1" style={{ color: C.sub }}>
                  <Phone size={13} /> (303) 555-1234
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-1.5 mt-3 text-xs">
              <span style={{ color: C.sub }}>Last Visit:</span>
              <span className="font-medium">Jun 18, 2026</span>
              <span style={{ color: C.sub }}>Preferred Tech:</span>
              <span className="font-medium">Linda</span>
              <span style={{ color: C.sub }}>Birthday:</span>
              <span className="font-medium">May 12</span>
              <span style={{ color: C.sub }}>Notes:</span>
              <span className="font-medium">Loves French Tips &amp; Chrome</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-3.5 pt-3.5" style={{ borderTop: `1px solid ${C.line}` }}>
              <div className="flex items-center gap-2">
                <Crown size={15} color={C.purple} />
                <div>
                  <div className="text-[11px]" style={{ color: C.sub }}>Membership</div>
                  <div className="text-xs font-semibold">Elite Member</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star size={15} color={C.green} />
                <div>
                  <div className="text-[11px]" style={{ color: C.sub }}>Reward Points</div>
                  <div className="text-xs font-bold" style={{ color: C.green }}>280 pts</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wallet size={15} color={C.blue} />
                <div>
                  <div className="text-[11px]" style={{ color: C.sub }}>Wallet Balance</div>
                  <div className="text-xs font-bold" style={{ color: C.blue }}>$45.00</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarClock size={15} color={C.ink} />
                <div>
                  <div className="text-[11px]" style={{ color: C.sub }}>Upcoming Appt</div>
                  <div className="text-xs font-semibold">Jun 29 &bull; 9:00 AM</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-3.5 pt-3.5" style={{ borderTop: `1px solid ${C.line}` }}>
              <IconTile icon={UserCheck} label="Check In" color={C.green} onClick={() => flashToast("Linda checked in")} />
              <IconTile icon={UserPlus} label="Add Customer" color={C.purple} onClick={() => flashToast("Opening new customer form")} />
              <IconTile icon={FileText} label="Notes" color={C.orange} onClick={() => flashToast("Opening notes")} />
              <IconTile icon={History} label="History" color={C.sub} onClick={() => flashToast("Opening visit history")} />
            </div>
          </div>

          <div className="rounded-xl bg-white border p-3 flex-1 flex flex-col" style={{ borderColor: C.line, minHeight: 0 }}>
            <div className="flex items-center gap-2 rounded-lg border px-3 py-2 mb-3" style={{ borderColor: C.line }}>
              <Search size={15} style={{ color: C.sub }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Scan Barcode or Search Item"
                className="outline-none text-sm w-full placeholder:text-slate-400"
              />
            </div>

            {padValue !== "" && (
              <div className="text-right text-2xl font-bold mb-2 pr-1" style={{ color: C.ink }}>
                {money(padAmount)}
              </div>
            )}

            <div className="grid grid-cols-4 gap-2 flex-1">
              {["7", "8", "9", "back", "4", "5", "6", "clear", "1", "2", "3", "qty", "00", "0", "enter"].map((key, i) => {
                if (key === "back") {
                  return (
                    <button key={i} onClick={() => pressPad("back")} className="rounded-lg border flex items-center justify-center" style={{ borderColor: C.line }}>
                      <Delete size={18} />
                    </button>
                  );
                }
                if (key === "clear") {
                  return (
                    <button key={i} onClick={() => pressPad("clear")} className="rounded-lg flex items-center justify-center" style={{ background: C.orangeSoft }}>
                      <RotateCcw size={18} color={C.orange} />
                    </button>
                  );
                }
                if (key === "qty") {
                  return (
                    <button key={i} className="rounded-lg flex flex-col items-center justify-center gap-0.5" style={{ background: "#fff", border: `1px solid ${C.line}` }}>
                      <X size={15} color={C.green} />
                      <span className="text-[11px] font-semibold" style={{ color: C.green }}>Qty</span>
                    </button>
                  );
                }
                if (key === "enter") {
                  return (
                    <button
                      key={i}
                      onClick={enterPad}
                      className="row-span-2 rounded-lg text-white font-semibold flex items-center justify-center"
                      style={{ background: C.green }}
                    >
                      ENTER
                    </button>
                  );
                }
                return (
                  <button
                    key={i}
                    onClick={() => pressPad(key)}
                    className="rounded-lg border text-lg font-semibold py-2.5"
                    style={{ borderColor: C.line }}
                  >
                    {key}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-4 gap-2 mt-2">
              {[1, 5, 10, 20].map((v) => (
                <button
                  key={v}
                  onClick={() => quickCash(v)}
                  className="rounded-lg border py-2 text-sm font-semibold"
                  style={{ borderColor: C.line, color: C.green }}
                >
                  ${v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Right: Categories + Services + Actions, or Payment ===== */}
        <div className="flex-1 flex flex-col gap-3 overflow-hidden" style={{ minHeight: 0 }}>
          {paying ? (
            <div className="rounded-xl bg-white border p-6 flex-1 flex flex-col" style={{ borderColor: C.line }}>
              <div className="flex items-center gap-3 mb-5">
                <button
                  onClick={cashMode ? () => setCashMode(false) : cancelPayment}
                  disabled={!!processingMethod}
                  className="w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 disabled:opacity-40"
                  style={{ borderColor: C.line }}
                >
                  <ArrowLeft size={16} />
                </button>
                <div>
                  <div className="text-lg font-semibold">
                    {cashMode ? "Cash Payment" : "Select Payment Method"}
                  </div>
                  <div className="text-sm" style={{ color: C.sub }}>
                    Amount due&nbsp;
                    <span className="font-bold" style={{ color: C.ink }}>{money(total)}</span>
                  </div>
                </div>
                <button
                  onClick={cancelPayment}
                  disabled={!!processingMethod}
                  className="ml-auto text-sm font-medium disabled:opacity-40"
                  style={{ color: C.sub }}
                >
                  Cancel
                </button>
              </div>

              {processingMethod ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                  <Loader2 size={40} className="animate-spin" color={C.green} />
                  <div className="text-base font-semibold">Processing {processingMethod}&hellip;</div>
                  <div className="text-sm" style={{ color: C.sub }}>Please don&rsquo;t close or refresh</div>
                </div>
              ) : cashMode ? (
                <div className="flex-1 flex flex-col">
                  <div className="text-xs font-bold tracking-wide mb-2" style={{ color: C.sub }}>
                    CASH RECEIVED
                  </div>
                  <div className="grid grid-cols-4 gap-2.5 mb-5">
                    {cashOptions.map((v) => (
                      <button
                        key={v}
                        onClick={() => setCashReceived(v)}
                        className="rounded-lg border py-3 text-sm font-semibold"
                        style={{
                          borderColor: cashReceived === v ? C.green : C.line,
                          borderWidth: cashReceived === v ? 2 : 1,
                          color: v === total ? C.green : C.ink,
                        }}
                      >
                        {v === total ? `Exact ${money(v)}` : money(v)}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-lg p-4 mb-5" style={{ background: C.bg }}>
                    <div className="flex items-center justify-between text-sm py-1">
                      <span style={{ color: C.sub }}>Amount Due</span>
                      <span className="font-medium">{money(total)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1">
                      <span style={{ color: C.sub }}>Cash Received</span>
                      <span className="font-medium">{money(cashReceived)}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 mt-1" style={{ borderTop: `1px solid ${C.line}` }}>
                      <span className="font-semibold">Change Due</span>
                      <span className="font-bold text-lg" style={{ color: C.green }}>
                        {money(Math.max(cashReceived - total, 0))}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={completeCashSale}
                    disabled={cashReceived < total}
                    className="w-full mt-auto rounded-xl py-3 text-white font-semibold disabled:opacity-40"
                    style={{ background: C.green }}
                  >
                    Complete Cash Sale
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 flex-1 content-start">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m.key}
                      onClick={() => selectPaymentMethod(m)}
                      className="flex flex-col items-center justify-center gap-3 rounded-xl border py-8"
                      style={{ borderColor: C.line }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ background: `${m.color}1A` }}
                      >
                        <m.icon size={26} color={m.color} />
                      </div>
                      <span className="text-sm font-semibold">{m.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
          <>
          <div className="rounded-xl bg-white border p-3 flex-1 flex flex-col overflow-hidden" style={{ borderColor: C.line, minHeight: 0 }}>
            {/* category tabs */}
            <div className="grid grid-cols-8 gap-1 pb-2.5" style={{ borderBottom: `1px solid ${C.line}` }}>
              {CATEGORIES.map((cat) => {
                const active = cat.key === activeCategory;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className="flex flex-col items-center gap-1 pb-2 pt-1"
                    style={{ borderBottom: active ? `2px solid ${C.pink}` : "2px solid transparent" }}
                  >
                    <cat.icon size={17} color={active ? C.pink : cat.color} />
                    <span
                      className="text-[10px] font-bold tracking-wide"
                      style={{ color: active ? C.pink : C.sub }}
                    >
                      {cat.label.toUpperCase()}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* service grid */}
            <div className="grid grid-cols-4 gap-2.5 pt-3">
              {filteredServices.map((svc) => {
                const selected = svc.name === selectedServiceName;
                return (
                  <button
                    key={svc.name}
                    onClick={() => {
                      setSelectedServiceName(svc.name);
                      addToTicket({ name: svc.name, time: svc.time, price: svc.price });
                      flashToast(`${svc.name} added`);
                    }}
                    className="text-left rounded-lg border px-3 py-2.5"
                    style={{
                      borderColor: selected ? C.pink : C.line,
                      borderWidth: selected ? 2 : 1,
                      background: "#fff",
                    }}
                  >
                    {svc.time && <div className="text-[11px]" style={{ color: C.sub }}>{svc.time}</div>}
                    <div className="text-sm font-semibold mt-0.5 truncate">{svc.name}</div>
                    <div className="text-sm font-bold mt-1">{money(svc.price)}</div>
                  </button>
                );
              })}
              {filteredServices.length === 0 && (
                <div className="col-span-4 text-center text-sm py-6" style={{ color: C.sub }}>
                  No items match &ldquo;{search}&rdquo;
                </div>
              )}
            </div>

            {/* popular add-ons */}
            <div className="mt-4 pt-3 flex-1 flex flex-col overflow-hidden" style={{ borderTop: `1px solid ${C.line}`, minHeight: 0 }}>
              <div className="text-[11px] font-bold tracking-wide mb-2" style={{ color: C.sub }}>
                POPULAR ADD-ONS
              </div>
              <div className="grid grid-cols-6 gap-2.5">
                {filteredAddOns.map((a) => (
                  <div key={a.name} className="rounded-lg border px-2.5 py-2.5 flex flex-col items-center text-center gap-1.5" style={{ borderColor: C.line }}>
                    <div>
                      <div className="text-xs font-semibold leading-tight">{a.name}</div>
                      <div className="text-xs font-bold mt-0.5">{money(a.price)}</div>
                    </div>
                    <button
                      onClick={() => {
                        addToTicket({ name: a.name, time: null, price: a.price });
                        flashToast(`${a.name} added`);
                      }}
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: C.greenSoft }}
                    >
                      <Plus size={13} color={C.green} />
                    </button>
                  </div>
                ))}
                <div className="rounded-lg border px-2.5 py-2.5 flex flex-col items-center justify-center gap-1.5" style={{ borderColor: C.line }}>
                  <MoreHorizontal size={16} style={{ color: C.sub }} />
                  <span className="text-[11px] font-semibold" style={{ color: C.sub }}>More</span>
                </div>
              </div>
            </div>
          </div>

          {/* bottom action grid */}
          <div className="rounded-xl bg-white border p-3" style={{ borderColor: C.line }}>
            <div className="grid grid-cols-4 gap-2.5">
              {ACTION_TILES.map((t) => (
                <button
                  key={t.label}
                  onClick={() => flashToast(t.label)}
                  className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
                  style={{ borderColor: C.line, borderTop: `3px solid ${t.accent}` }}
                >
                  <t.icon size={16} color={t.accent} />
                  <span className="text-sm font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
          </>
          )}
        </div>
      </div>

      {/* ---------------- Bottom nav ---------------- */}
      <div className="flex items-center px-2 py-1.5" style={{ background: C.navy }}>
        {BOTTOM_NAV.map((n) => {
          const active = n.key === activeNav;
          return (
            <button
              key={n.key}
              onClick={() => setActiveNav(n.key)}
              className="flex flex-col items-center justify-center gap-0.5 px-4 py-1.5 rounded-lg relative"
              style={{ background: active ? C.pink : "transparent" }}
            >
              <n.icon size={17} color={active ? "#fff" : "#8B94A7"} />
              <span className="text-[10px] font-medium" style={{ color: active ? "#fff" : "#8B94A7" }}>
                {n.label}
              </span>
              {n.badge && (
                <span
                  className="absolute -top-0.5 right-1 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                  style={{ background: C.pink }}
                >
                  {n.badge}
                </span>
              )}
            </button>
          );
        })}
        <div className="ml-auto flex items-center gap-1.5 pr-2 text-sm font-medium" style={{ color: C.green }}>
          <Wifi size={15} /> Connected
        </div>
      </div>

      {toast && (
        <div
          className="fixed top-4 right-4 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-lg"
          style={{ background: C.ink, zIndex: 50 }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
