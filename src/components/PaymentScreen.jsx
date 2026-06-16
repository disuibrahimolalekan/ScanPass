import React, { useState } from 'react';
import { ChevronLeft, Shield } from 'lucide-react';

export default function PaymentScreen({ event, quantity, onBack, onPay }) {
  const [cardholder, setCardholder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [formError, setFormError] = useState('');

  if (!event) return null;

  const eventPrice = event.price * 1000;
  const subtotal = eventPrice * quantity;
  const serviceFee = event.price === 0 ? 0 : 50;
  const total = subtotal + serviceFee;

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(value);
    }
  };

  // Format Expiry Date (adds '/' after MM)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      setExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
    } else {
      setExpiry(value);
    }
  };

  // Format CVV (max 3 digits)
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setCvv(value);
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    setFormError('');
    onPay(total);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      background: '#fff',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* HEADER */}
      <div style={{ flexShrink: 0, background: '#fff', padding: '24px 20px 12px 20px', borderBottom: '1px solid #f4f4f5' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 0'
          }}
        >
          <ChevronLeft size={18} color="#000" />
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>Checkout</span>
        </button>
      </div>

      {/* SCROLLABLE FORM */}
      <form 
        onSubmit={handlePayNow}
        className="scrollable-content checkout-form-layout"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Left Column: Payment fields */}
        <div className="checkout-left-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#18181b' }}>Payment Method</span>
              <span style={{ fontSize: '11px', color: '#71717a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Shield size={12} color="#10b981" />
                All transactions are secure and encrypted.
              </span>
            </div>

            {formError && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #ef4444',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '12px',
                color: '#ef4444',
                fontWeight: '500'
              }}>
                {formError}
              </div>
            )}

            {event.price > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', boxSizing: 'border-box' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#3f3f46' }}>Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="Jonathan Wick"
                    value={cardholder}
                    onChange={(e) => setCardholder(e.target.value)}
                    style={{
                      width: '100%',
                      height: '42px', padding: '0 12px', background: '#f9f9f9',
                      border: '1px solid #d4d4d8', borderRadius: '8px', outline: 'none',
                      fontSize: '13px', color: '#18181b', fontFamily: 'Inter, sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', boxSizing: 'border-box' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#3f3f46' }}>Credit Card Number</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    style={{
                      width: '100%',
                      height: '42px', padding: '0 12px', background: '#f9f9f9',
                      border: '1px solid #d4d4d8', borderRadius: '8px', outline: 'none',
                      fontSize: '13px', color: '#18181b', fontFamily: 'Inter, sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '16px', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#3f3f46' }}>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      style={{
                        width: '100%',
                        height: '42px', padding: '0 12px', background: '#f9f9f9',
                        border: '1px solid #d4d4d8', borderRadius: '8px', outline: 'none',
                        fontSize: '13px', color: '#18181b', fontFamily: 'Inter, sans-serif',
                        textAlign: 'center', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#3f3f46' }}>CVV</label>
                    <input
                      type="password"
                      placeholder="• • •"
                      value={cvv}
                      onChange={handleCvvChange}
                      style={{
                        width: '100%',
                        height: '42px', padding: '0 12px', background: '#f9f9f9',
                        border: '1px solid #d4d4d8', borderRadius: '8px', outline: 'none',
                        fontSize: '13px', color: '#18181b', fontFamily: 'Inter, sans-serif',
                        textAlign: 'center', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #10b981',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '13px',
                color: '#10b981',
                fontWeight: '500',
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                This event is Free. No payment details are required!
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              height: '50px',
              width: '100%',
              background: '#f97316',
              color: 'white',
              borderRadius: '10px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '10px',
              boxShadow: '0 4px 12px rgba(249,115,22,0.25)',
              flexShrink: 0
            }}
          >
            {event.price === 0 ? 'Register Now' : 'Pay Now'}
          </button>
        </div>

        {/* Right Column: Order Summary details */}
        <div className="checkout-right-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, width: '100%' }}>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#18181b', marginBottom: '-4px' }}>Order Summary</div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#fff',
            borderRadius: '12px',
            padding: '12px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            border: '1px solid #f4f4f5',
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <img
              src={event.imageUrl}
              alt={event.title}
              style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
            />
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#18181b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {event.title}
              </span>
              <span style={{ fontSize: '11px', color: '#71717a' }}>{event.date.split(',')[0]} • {event.time.split(' ')[0]}</span>
              <span style={{ fontSize: '11px', color: '#71717a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.venue || event.location}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#f97316' }}>
                {event.price === 0 ? 'Free' : `₦${eventPrice.toLocaleString()}`}
              </span>
            </div>

            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-4px',
              background: '#ffefeb',
              border: '1px solid #f97316',
              borderRadius: '100px',
              padding: '2px 8px',
              fontSize: '10px',
              fontWeight: '600',
              color: '#f97316',
              zIndex: 3
            }}>
              {quantity} {quantity === 1 ? 'TKT' : 'TKTS'}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '4px 2px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#71717a' }}>
              <span>Subtotal</span>
              <span>{event.price === 0 ? 'Free' : `₦${subtotal.toLocaleString()}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#71717a' }}>
              <span>Service Fee</span>
              <span>{event.price === 0 ? 'Free' : `₦${serviceFee.toLocaleString()}`}</span>
            </div>
            <div style={{ height: '1px', background: '#f4f4f5', margin: '4px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '700', color: '#18181b' }}>
              <span>Total</span>
              <span style={{ color: '#f97316' }}>{event.price === 0 ? 'Free' : `₦${total.toLocaleString()}`}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
