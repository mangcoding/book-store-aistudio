import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Gift, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/book';

interface ToteBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (bookId: string, format: string, newQty: number) => void;
  onRemoveItem: (bookId: string, format: string) => void;
  onClearCart: () => void;
}

export const ToteBagDrawer: React.FC<ToteBagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('Elena Rostova');
  const [customerAddress, setCustomerAddress] = useState('42 Rue de Fleurus, Apt 3B, 75006 Paris');
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => {
    const formatObj = item.book.availableFormats.find((f) => f.format === item.format);
    const unitPrice = formatObj ? formatObj.price : item.book.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const giftWrapFee = includeGiftWrap ? 4.0 : 0;
  const isFreeShipping = rawSubtotal >= 50 || rawSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 5.0;
  const total = rawSubtotal + giftWrapFee + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `AB-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrderId(orderId);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  const handleCloseAndReset = () => {
    onClose();
    setTimeout(() => {
      setCheckoutStep('cart');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={handleCloseAndReset}
      />

      {/* Drawer Surface */}
      <div className="relative w-full max-w-md h-full bg-[#FAF8F5] border-l border-[#E8E4DC] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E4DC] bg-[#F5F2EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#94452c]" />
            <h3 className="font-serif font-bold text-lg text-[#242825]">
              {checkoutStep === 'confirmed'
                ? 'Order Confirmed'
                : checkoutStep === 'checkout'
                ? 'Dispatch & Delivery'
                : `Canvas Tote (${items.reduce((s, i) => s + i.quantity, 0)})`}
            </h3>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-1.5 rounded-full hover:bg-[#E8E4DC] text-[#6B726A] hover:text-[#242825]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        {checkoutStep === 'cart' && (
          <div className="bg-[#FAF8F5] px-5 py-2.5 border-b border-[#E8E4DC] text-xs">
            <div className="flex justify-between text-[#6B726A] mb-1">
              <span>Complimentary Courier Threshold ($50.00)</span>
              <span className="font-mono tabular-nums">
                {isFreeShipping ? 'Unlocked' : `$${(50 - rawSubtotal).toFixed(2)} away`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#E8E4DC] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#466558] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (rawSubtotal / 50) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutStep === 'confirmed' ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#c5e7d8] text-[#466558] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#242825]">
                Order Confirmed
              </h3>
              <p className="text-sm font-mono text-[#94452c] font-semibold">
                Receipt #{confirmedOrderId}
              </p>
              <p className="text-xs text-[#6B726A] max-w-xs mx-auto leading-relaxed">
                Thank you, {customerName}. Your parcel is being carefully hand-wrapped in acid-free tissue and scheduled for dispatch to:
              </p>
              <div className="bg-[#F5F2EB] p-3 rounded-xl border border-[#E8E4DC] text-xs text-[#242825] font-serif max-w-xs mx-auto">
                {customerAddress}
              </div>
              <p className="text-[11px] text-[#466558] font-medium">
                Tracking confirmation dispatched to your registered reader account.
              </p>
              <button
                onClick={handleCloseAndReset}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#94452c] text-white text-xs font-semibold hover:bg-[#793019] shadow-xs"
              >
                Return to Bookstore
              </button>
            </div>
          ) : checkoutStep === 'checkout' ? (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="bg-[#F5F2EB] p-3 rounded-xl border border-[#E8E4DC] space-y-1">
                <p className="text-xs font-semibold text-[#242825]">Atelier Delivery Guarantee</p>
                <p className="text-[11px] text-[#6B726A]">
                  Shipped in reinforced protective book mailers with archival bookplates.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B726A] mb-1">
                  Recipient Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#F5F2EB] border border-[#E8E4DC] text-xs text-[#242825] focus:outline-none focus:border-[#94452c]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B726A] mb-1">
                  Dispatch Address & Postal Code
                </label>
                <textarea
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#F5F2EB] border border-[#E8E4DC] text-xs text-[#242825] focus:outline-none focus:border-[#94452c]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B726A] mb-1">
                  Payment Method
                </label>
                <div className="bg-[#F5F2EB] p-3 rounded-lg border border-[#E8E4DC] text-xs flex items-center justify-between text-[#242825]">
                  <span>Direct Atelier Reader Account (COD / Card on File)</span>
                  <span className="font-semibold text-[#466558]">Verified</span>
                </div>
              </div>

              {/* Order total recap */}
              <div className="pt-2 border-t border-[#E8E4DC] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B726A]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${rawSubtotal.toFixed(2)}</span>
                </div>
                {includeGiftWrap && (
                  <div className="flex justify-between text-[#6B726A]">
                    <span>Letterpress Gift Wrap</span>
                    <span className="font-mono tabular-nums">$4.00</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6B726A]">
                  <span>Shipping</span>
                  <span className="font-mono tabular-nums">
                    {shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#242825] pt-1 border-t border-[#E8E4DC]">
                  <span>Final Total</span>
                  <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="flex-1 py-2.5 rounded-xl border border-[#E8E4DC] text-xs font-semibold text-[#6B726A] hover:bg-[#F5F2EB]"
                >
                  Back to Bag
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#94452c] text-white text-xs font-semibold hover:bg-[#793019] shadow-xs"
                >
                  Place Order · ${total.toFixed(2)}
                </button>
              </div>
            </form>
          ) : items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#dbc1ba] mx-auto" />
              <p className="font-serif text-lg font-semibold text-[#242825]">
                Your canvas tote is empty
              </p>
              <p className="text-xs text-[#6B726A] max-w-xs mx-auto">
                Explore our curated catalog of physical editions and tactile reads to begin your collection.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const formatObj = item.book.availableFormats.find((f) => f.format === item.format);
                const unitPrice = formatObj ? formatObj.price : item.book.price;

                return (
                  <div
                    key={`${item.book.id}-${item.format}`}
                    className="flex gap-3 bg-[#F5F2EB] p-3 rounded-xl border border-[#E8E4DC]"
                  >
                    <div className="w-16 aspect-[3/4] rounded-[4px] overflow-hidden shadow-book-spine shrink-0 border border-[#E8E4DC]">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#242825] truncate">
                          {item.book.title}
                        </h4>
                        <p className="text-[11px] text-[#6B726A] italic truncate">
                          {item.book.author}
                        </p>
                        <p className="text-xs text-[#94452c] font-medium mt-0.5">
                          {item.format} Edition · ${unitPrice.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8E4DC]/60">
                        {/* Quantity Stepper */}
                        <div className="flex items-center bg-[#FAF8F5] border border-[#E8E4DC] rounded-lg">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.book.id, item.format, item.quantity - 1)
                            }
                            className="w-6 h-6 flex items-center justify-center text-xs text-[#242825] hover:bg-[#E8E4DC]"
                          >
                            -
                          </button>
                          <span className="w-7 text-center text-xs font-mono tabular-nums text-[#242825]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.book.id, item.format, item.quantity + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center text-xs text-[#242825] hover:bg-[#E8E4DC]"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.book.id, item.format)}
                          className="p-1 text-[#6B726A] hover:text-[#94452c]"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Gift Wrapping option */}
              <div className="bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl p-3 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGiftWrap}
                    onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                    className="w-4 h-4 rounded text-[#94452c] focus:ring-[#94452c]"
                  />
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#242825]">
                    <Gift className="w-3.5 h-3.5 text-[#94452c]" />
                    <span>Include Hand-Pressed Letterpress Gift Note (+$4.00)</span>
                  </div>
                </label>

                {includeGiftWrap && (
                  <textarea
                    rows={2}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Inscribe a message to accompany the book..."
                    className="w-full p-2.5 rounded-lg bg-[#F5F2EB] border border-[#E8E4DC] text-xs text-[#242825] focus:outline-none focus:border-[#94452c]"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-5 border-t border-[#E8E4DC] bg-[#F5F2EB] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B726A]">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums">${rawSubtotal.toFixed(2)}</span>
              </div>
              {includeGiftWrap && (
                <div className="flex justify-between text-[#6B726A]">
                  <span>Gift Wrapping</span>
                  <span className="font-mono tabular-nums">$4.00</span>
                </div>
              )}
              <div className="flex justify-between text-[#6B726A]">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#242825] pt-1.5 border-t border-[#E8E4DC]">
                <span>Total</span>
                <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutStep('checkout')}
              className="w-full h-12 rounded-xl bg-[#94452c] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#793019] active:scale-[0.98] transition-all shadow-sm"
            >
              <span>Proceed to Dispatch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
