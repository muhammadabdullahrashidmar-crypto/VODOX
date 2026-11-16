import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, CheckCircle2, User, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useCartStore } from '../store/useCartStore';
import { BRAND_CONFIG } from '../data/brand';
import { supabase } from '../lib/supabase';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getShippingProgress,
  } = useCartStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const subtotal = getSubtotal();
  const { progress, remaining, qualifies } = getShippingProgress();
  const shippingFee = qualifies ? 0 : 15;
  const grandTotal = subtotal + shippingFee;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    setIsCheckingOut(true);

    try {
      const orderPayload = {
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim().toLowerCase(),
        shipping_address: shippingAddress.trim(),
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          color: i.selectedColor,
          price: i.product.price,
          quantity: i.quantity,
        })),
        subtotal: subtotal,
        shipping_fee: shippingFee,
        total: grandTotal,
        status: 'new_order_inquiry',
      };

      const { error } = await supabase.from('orders').insert([orderPayload]);
      if (error) throw error;

      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setShowCheckoutForm(false);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#5E9C93', '#0E1212', '#EEF1F1'],
      });
      setTimeout(() => {
        clearCart();
        setCheckoutSuccess(false);
        setCustomerName('');
        setCustomerEmail('');
        setShippingAddress('');
        closeCart();
      }, 3500);
    } catch (err) {
      console.error('Order creation error:', err);
      setIsCheckingOut(false);
      alert('Failed to place order inquiry. Please check your network connection.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md h-full bg-[#FAFCFC] dark:bg-[#0D1011] border-l border-white/80 dark:border-white/10 shadow-2xl flex flex-col z-10 text-ink dark:text-white"
          >
            {/* Header */}
            <div className="p-6 border-b border-ink/5 dark:border-white/10 flex items-center justify-between bg-white/70 dark:bg-black/30 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-medium tracking-tight">Acoustic Bag</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/15 text-accent font-semibold border border-accent/20">
                  {items.reduce((acc, i) => acc + i.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-ink/5 dark:hover:bg-white/10 text-muted hover:text-ink dark:hover:text-white transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="px-6 py-3.5 bg-accent/5 dark:bg-accent/[0.08] border-b border-accent/10 dark:border-accent/15">
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <div className="flex items-center gap-1.5 text-ink/80 dark:text-neutral-300">
                  <Truck className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                  <span>
                    {qualifies
                      ? 'Complimentary Express Courier unlocked'
                      : `Add ${BRAND_CONFIG.currencySymbol}${remaining} for complimentary delivery`}
                  </span>
                </div>
                <span className="font-mono text-accent font-semibold">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-ink/10 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-accent rounded-full"
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5">
              {checkoutSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center text-accent mb-4 border border-accent/20">
                    <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight mb-2">Order Confirmed</h3>
                  <p className="text-sm text-muted dark:text-neutral-400 mb-4 max-w-xs leading-relaxed">
                    Thank you for choosing VODOX. Your bespoke packaging is being calibrated at our studio.
                  </p>
                  <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold">
                    Dispatched in 24 hours
                  </span>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-ink/5 dark:bg-white/5 flex items-center justify-center text-muted mb-4 border border-ink/10 dark:border-white/10">
                    <X className="w-6 h-6 opacity-40" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Your bag is empty</h3>
                  <p className="text-sm text-muted dark:text-neutral-400 max-w-xs mb-6">
                    Discover studio acoustics and select your signature Horizon finish.
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 rounded-full bg-ink dark:bg-white text-white dark:text-ink text-xs font-semibold uppercase tracking-wider hover:bg-accent transition-colors"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedColor}`}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-white/[0.04] border border-ink/5 dark:border-white/10 shadow-xs relative group"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl bg-white dark:bg-white/90 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedColor)}
                            className="text-muted hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-xs text-muted dark:text-neutral-400 flex items-center gap-1.5 mt-0.5">
                          <span
                            className="w-2 h-2 rounded-full border border-ink/10"
                            style={{ backgroundColor: item.product.hex }}
                          />
                          {item.selectedColor} finish
                        </p>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center rounded-full border border-ink/10 dark:border-white/15 bg-bg/50 dark:bg-white/[0.03] px-2.5 py-0.5 gap-2.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedColor, -1)}
                            className="text-muted hover:text-ink dark:hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" strokeWidth={1.5} />
                          </button>
                          <span className="text-xs font-mono font-medium min-w-[14px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedColor, 1)}
                            className="text-muted hover:text-ink dark:hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" strokeWidth={1.5} />
                          </button>
                        </div>

                        <span className="text-sm font-medium font-mono">
                          {BRAND_CONFIG.currencySymbol}
                          {item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && !checkoutSuccess && (
              <div className="p-6 bg-white/90 dark:bg-black/60 border-t border-ink/5 dark:border-white/10 backdrop-blur-md space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-muted dark:text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-ink dark:text-white">
                      {BRAND_CONFIG.currencySymbol}
                      {subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted dark:text-neutral-400">
                    <span>Insured Delivery</span>
                    <span className="text-accent font-medium">
                      {qualifies ? 'Complimentary' : `${BRAND_CONFIG.currencySymbol}15`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-medium pt-2 border-t border-ink/5 dark:border-white/10">
                    <span>Total</span>
                    <span className="font-mono font-semibold">
                      {BRAND_CONFIG.currencySymbol}
                      {grandTotal}
                    </span>
                  </div>
                </div>

                {showCheckoutForm ? (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-3 pt-2">
                    <div className="space-y-2">
                      <div className="relative">
                        <User className="w-3.5 h-3.5 absolute left-3 top-3 text-muted" />
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-bg dark:bg-white/[0.04] border border-ink/10 dark:border-white/15 text-ink dark:text-white placeholder:text-muted/60 focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-muted" />
                        <input
                          type="email"
                          required
                          placeholder="Email address for order tracking"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-bg dark:bg-white/[0.04] border border-ink/10 dark:border-white/15 text-ink dark:text-white placeholder:text-muted/60 focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-muted" />
                        <input
                          type="text"
                          required
                          placeholder="Delivery Address / City"
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-bg dark:bg-white/[0.04] border border-ink/10 dark:border-white/15 text-ink dark:text-white placeholder:text-muted/60 focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowCheckoutForm(false)}
                        className="px-4 py-3 rounded-full text-xs font-medium text-muted hover:text-ink dark:hover:text-white transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isCheckingOut}
                        className="flex-1 py-3 px-6 rounded-full bg-accent hover:bg-accent-hover text-white font-medium text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-studio active:scale-[0.99] disabled:opacity-60"
                      >
                        {isCheckingOut ? (
                          <div className="flex items-center gap-2">
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Confirming Order...</span>
                          </div>
                        ) : (
                          <>
                            <span>Complete Order</span>
                            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowCheckoutForm(true)}
                    className="w-full py-4 px-6 rounded-full bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-studio active:scale-[0.99]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                )}

                <div className="flex items-center justify-center gap-4 text-[11px] text-muted/80 dark:text-neutral-500 pt-1">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                    <span>2-Year Warranty</span>
                  </div>
                  <span>·</span>
                  <span>30-Day In-Home Trial</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
