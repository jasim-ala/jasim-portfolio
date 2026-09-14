import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Check, ArrowRight, Sparkles } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Cloud Infrastructure Kit', price: 120, category: 'DevOps' },
  { id: 2, name: 'Cybersecurity Audit Service', price: 250, category: 'Security' },
  { id: 3, name: 'Tier-1 Helpdesk Support Pack', price: 90, category: 'IT Support' },
];

export default function EcommerceSimulator() {
  const [cart, setCart] = useState({ 1: 1, 2: 0, 3: 1 });
  const [checkedOut, setCheckedOut] = useState(false);

  const updateQuantity = (id, delta) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
    setCheckedOut(false);
  };

  const totalItems = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const totalPrice = PRODUCTS.reduce(
    (sum, p) => sum + p.price * (cart[p.id] || 0),
    0
  );

  const handleCheckout = () => {
    if (totalItems === 0) return;
    setCheckedOut(true);
  };

  return (
    <div className="flex flex-col h-[320px] bg-black/80 rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-3.5 h-3.5 text-brand-violet" />
          <span className="text-[10px] uppercase tracking-wider text-zinc-300 font-bold">Live E-Commerce Demo</span>
        </div>
        <div className="text-[10px] text-zinc-400">
          Cart Items: <strong className="text-white">{totalItems}</strong>
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {PRODUCTS.map((prod) => {
          const qty = cart[prod.id] || 0;

          return (
            <div
              key={prod.id}
              className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10"
            >
              <div>
                <div className="text-[11px] font-bold text-white leading-tight">
                  {prod.name}
                </div>
                <div className="text-[10px] text-brand-cyan mt-0.5">
                  ${prod.price} <span className="text-zinc-500">• {prod.category}</span>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded-lg border border-white/10">
                <button
                  onClick={() => updateQuantity(prod.id, -1)}
                  disabled={qty === 0}
                  className="text-zinc-400 hover:text-white disabled:opacity-30"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-[11px] font-bold text-white w-4 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => updateQuantity(prod.id, 1)}
                  className="text-zinc-400 hover:text-white"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Footer */}
      <div className="p-3 bg-white/5 border-t border-white/10">
        {checkedOut ? (
          <div className="flex items-center justify-center gap-2 py-2 text-emerald-400 text-[11px] font-bold bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <Check className="w-4 h-4" />
            <span>Order Processed (+25% Faster Checkout!)</span>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[9px] text-zinc-500 uppercase">Subtotal</span>
              <div className="text-sm font-bold text-white">${totalPrice}</div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={totalItems === 0}
              className="px-4 py-2 rounded-xl bg-white text-black font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 hover:bg-zinc-200 disabled:opacity-30 transition-all"
            >
              <span>Quick Checkout</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
