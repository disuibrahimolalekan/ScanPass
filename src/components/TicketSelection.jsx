import React, { useState } from 'react';
import { ChevronLeft, MapPin, Calendar, Check } from 'lucide-react';

export default function TicketSelection({ event, onBack, onCompleteCheckout }) {
  const [quantity, setQuantity] = useState(1);
  if (!event) return null;

  const price = event.price === 0 ? 'Free' : `₦${(event.price * 1000 * quantity).toLocaleString()}`;

  const handleCheckout = () => {
    onCompleteCheckout(quantity);
  };

  const benefits = ['Main stage keynote', 'Breakout Workshop', 'Networking'];

  return (
    /* ─── Outer shell fills space given by App.jsx ─── */
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      background: '#fff',
      fontFamily: 'Inter, sans-serif'
    }}>

      {/* ══════════════════════════════════════════════════
          FIXED HEADER  (does NOT scroll)
          ══════════════════════════════════════════════════ */}
      <div style={{ flexShrink: 0, background: '#fff', padding: '50px 20px 12px 20px' }}>

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 0'
          }}
        >
          <ChevronLeft size={18} color="#000" />
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>Back</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════
          SCROLLABLE CONTENT  (only this scrolls)
          ══════════════════════════════════════════════════ */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '0 20px', gap: '16px' }}>

        {/* Page Title */}
        <div style={{ fontSize: '26px', fontWeight: '700', lineHeight: '36px', color: '#18181b' }}>
          Secure Your Spot at the{' '}
          <span style={{ color: '#f97316' }}>{event.title}</span>
        </div>

        {/* Description */}
        <div style={{ fontSize: '15px', color: '#18181b', lineHeight: '1.55', fontWeight: '400' }}>
          Join 5,000+ African young and intelligent minds from all countries in Africa as they gather to shift Africa to her next phase in technology
        </div>

        {/* Event Image Banner with overlay */}
        <div style={{ borderRadius: '8px', overflow: 'hidden', height: '176px', position: 'relative', flexShrink: 0 }}>
          <img
            src={event.imageUrl} alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', left: '20px', bottom: '14px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={20} color="white" />
              <span style={{ fontSize: '15px', color: '#fff', letterSpacing: '0.04em' }}>
                {event.date.split(',')[0]}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={14} color="white" />
              <span style={{ fontSize: '15px', color: '#fff', letterSpacing: '0.04em' }}>
                {event.venue || event.location}
              </span>
            </div>
          </div>
        </div>

        {/* Ticket Card */}
        <div style={{
          background: '#fff', borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden',
          border: '1px solid #f3f3f3'
        }}>
          <div style={{ padding: '16px' }}>

            {/* Top row: Limited badge + Price */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{
                height: '20px', padding: '0 10px', background: '#fff7ed',
                borderRadius: '100px', display: 'inline-flex', alignItems: 'center'
              }}>
                <span style={{ fontSize: '11px', color: '#f97316', letterSpacing: '0.05em' }}>Limited Availability</span>
              </div>
              <span style={{ fontSize: '22px', fontWeight: '600', color: '#f97316' }}>
                {event.price === 0 ? 'Free' : `₦${(event.price * 1000).toLocaleString()}`}
              </span>
            </div>

            {/* Ticket tier name */}
            <div style={{ fontSize: '22px', fontWeight: '600', color: '#18181b', marginBottom: '10px' }}>Early Bird</div>

            {/* Description with see more */}
            <div style={{ fontSize: '12px', color: '#52525b', lineHeight: '16px', marginBottom: '14px' }}>
              The African AI Summit is a major continental AI event focused on accelerating artificial intelligence adoption, investment, and collaboration across Africa.{' '}
              <span style={{ color: '#f97316', cursor: 'pointer' }}>see more</span>
            </div>

            {/* Benefits */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {benefits.map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '18px', height: '18px', border: '2px solid #f97316',
                    borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Check size={10} color="#f97316" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '12px', color: '#52525b', lineHeight: '16px' }}>{b}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: '#f3f3f3', margin: '4px 0 14px 0' }} />

            {/* Quantity selector */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>Quantity</span>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '20px',
                padding: '8px 14px', background: '#fff7ed',
                borderRadius: '12px', border: '1px solid #f97316'
              }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', color: '#3f3f46', lineHeight: 1
                  }}
                >−</button>
                <span style={{ fontSize: '14px', color: '#3f3f46', minWidth: '14px', textAlign: 'center' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(10, q + 1))}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', color: '#3f3f46', lineHeight: 1
                  }}
                >+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacer */}
        <div style={{ height: '8px' }} />
      </div>

      {/* ══════════════════════════════════════════════════
          FIXED BOTTOM ACTION  (does NOT scroll)
          ══════════════════════════════════════════════════ */}
      <div style={{ flexShrink: 0, padding: '12px 20px 20px 20px', background: '#fff', borderTop: '1px solid #f3f3f3' }}>
        <button
          onClick={handleCheckout}
          style={{
            width: '100%', height: '52px',
            background: '#f97316', borderRadius: '10px', border: 'none',
            cursor: 'pointer', fontSize: '16px', fontWeight: '600',
            color: 'white', letterSpacing: '0.01em'
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
