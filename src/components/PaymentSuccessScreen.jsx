import React from 'react';
import { Check, ChevronLeft } from 'lucide-react';

export default function PaymentSuccessScreen({ event, ticketId, onGoToTickets, onBackToHome }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      flex: 1,
      overflow: 'hidden',
      background: '#fff',
      fontFamily: 'Inter, sans-serif',
      position: 'relative'
    }}>
      {/* HEADER */}
      <div style={{
        flexShrink: 0,
        background: '#fff',
        padding: '24px 20px 12px 20px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #f4f4f5',
        zIndex: 10
      }}>
        <button
          onClick={onBackToHome}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 0'
          }}
        >
          <ChevronLeft size={18} color="#000" />
        </button>
      </div>

      {/* CONTENT */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 32px 60px 32px',
        textAlign: 'center',
        gap: '24px'
      }}>
        {/* Large Green Check Circle */}
        <div style={{
          width: '96px',
          height: '96px',
          background: '#10b981',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 10px 24px rgba(16,185,129,0.25)',
          marginBottom: '8px'
        }}>
          <Check size={48} color="white" strokeWidth={3} />
        </div>

        {/* Title & Subtitles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#18181b',
            lineHeight: '32px'
          }}>
            Your Order is Confirmed.
          </h2>
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#18181b'
          }}>
            Your registration was completed successfully.
          </p>
          <p style={{
            fontSize: '12px',
            color: '#71717a',
            lineHeight: '18px',
            maxWidth: '280px',
            margin: '0 auto',
            marginTop: '4px'
          }}>
            Get ready for an amazing event experience. Your digital ticket is now available.
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div style={{
        flexShrink: 0,
        padding: '20px 24px 30px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: '#fff'
      }}>
        <button
          onClick={onGoToTickets}
          style={{
            height: '48px',
            background: '#f97316',
            color: 'white',
            borderRadius: '10px',
            border: 'none',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(249,115,22,0.25)'
          }}
        >
          View Ticket
        </button>
        <button
          onClick={onBackToHome}
          style={{
            height: '48px',
            background: '#fff',
            color: '#f97316',
            borderRadius: '10px',
            border: '1px solid #f97316',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
