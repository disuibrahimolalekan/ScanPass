import React, { useState } from 'react';
import { QrCode, Calendar } from 'lucide-react';

export default function TicketsScreen({ tickets = [], onRemoveTicket, onSelectTicket }) {
  const [activeCategory, setActiveCategory] = useState('upcoming'); // upcoming, used, expired

  // Group tickets by status
  const upcomingTickets = tickets.filter(t => t.status === 'upcoming');
  const usedTickets = tickets.filter(t => t.status === 'used');
  const expiredTickets = tickets.filter(t => t.status === 'expired');

  const getActiveList = () => {
    switch (activeCategory) {
      case 'upcoming': return upcomingTickets;
      case 'used': return usedTickets;
      case 'expired': return expiredTickets;
      default: return [];
    }
  };

  const activeList = getActiveList();

  return (
    <div className="screen-container fade-in">
      {/* FIXED HEADER (Title & Segment Tabs) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <QrCode size={26} color="var(--primary-orange)" />
          <h1 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '700' }}>My Tickets</h1>
        </div>

        {/* Segmented Category Tab Selectors */}
        <div 
          style={{ 
            display: 'flex', 
            background: 'rgba(0,0,0,0.04)', 
            borderRadius: '10px', 
            padding: '4px',
            margin: '0'
          }}
        >
          <button 
            onClick={() => setActiveCategory('upcoming')}
            style={{
              flex: 1,
              padding: '10px 0',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              background: activeCategory === 'upcoming' ? '#FFFFFF' : 'transparent',
              color: activeCategory === 'upcoming' ? 'var(--primary-orange)' : 'var(--text-secondary)',
              boxShadow: activeCategory === 'upcoming' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Upcoming
            <span style={{ 
              fontSize: '10px', 
              background: activeCategory === 'upcoming' ? 'var(--bg-brand-light)' : 'rgba(0,0,0,0.06)', 
              color: activeCategory === 'upcoming' ? 'var(--primary-orange)' : 'var(--text-secondary)',
              padding: '2px 6px',
              borderRadius: '20px'
            }}>
              {upcomingTickets.length}
            </span>
          </button>

          <button 
            onClick={() => setActiveCategory('used')}
            style={{
              flex: 1,
              padding: '10px 0',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              background: activeCategory === 'used' ? '#FFFFFF' : 'transparent',
              color: activeCategory === 'used' ? 'var(--primary-orange)' : 'var(--text-secondary)',
              boxShadow: activeCategory === 'used' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Used
            <span style={{ 
              fontSize: '10px', 
              background: activeCategory === 'used' ? 'var(--bg-brand-light)' : 'rgba(0,0,0,0.06)', 
              color: activeCategory === 'used' ? 'var(--primary-orange)' : 'var(--text-secondary)',
              padding: '2px 6px',
              borderRadius: '20px'
            }}>
              {usedTickets.length}
            </span>
          </button>

          <button 
            onClick={() => setActiveCategory('expired')}
            style={{
              flex: 1,
              padding: '10px 0',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              background: activeCategory === 'expired' ? '#FFFFFF' : 'transparent',
              color: activeCategory === 'expired' ? 'var(--primary-orange)' : 'var(--text-secondary)',
              boxShadow: activeCategory === 'expired' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Expired
            <span style={{ 
              fontSize: '10px', 
              background: activeCategory === 'expired' ? 'var(--bg-brand-light)' : 'rgba(0,0,0,0.06)', 
              color: activeCategory === 'expired' ? 'var(--primary-orange)' : 'var(--text-secondary)',
              padding: '2px 6px',
              borderRadius: '20px'
            }}>
              {expiredTickets.length}
            </span>
          </button>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="scrollable-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {activeList.length > 0 ? (
            activeList.map(ticket => (
              <div 
                key={ticket.ticketId}
                className="upcoming-card"
                onClick={() => onSelectTicket && onSelectTicket(ticket)}
                style={{ 
                  borderLeft: ticket.status === 'upcoming' 
                    ? '4px solid var(--primary-orange)' 
                    : ticket.status === 'used' 
                      ? '4px solid #10B981' 
                      : '4px solid var(--text-muted)',
                  opacity: ticket.status === 'expired' ? 0.75 : 1
                }}
              >
                <img src={ticket.event.imageUrl} alt={ticket.event.title} className="upcoming-img" />
                <div className="upcoming-info">
                  <h3 style={{ fontSize: '14px', fontWeight: '700' }} className="upcoming-title">{ticket.event.title}</h3>
                  <span className="upcoming-date">
                    <Calendar size={13} />
                    {ticket.event.date}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    ID: {ticket.ticketId}
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span 
                    style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '3px 8px',
                      borderRadius: '20px',
                      background: ticket.status === 'upcoming' 
                        ? 'var(--bg-brand-light)' 
                        : ticket.status === 'used' 
                          ? 'var(--success-light)' 
                          : 'rgba(0,0,0,0.05)',
                      color: ticket.status === 'upcoming' 
                        ? 'var(--primary-orange)' 
                        : ticket.status === 'used' 
                          ? 'var(--success)' 
                          : 'var(--text-secondary)',
                    }}
                  >
                    {ticket.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div 
              style={{ 
                padding: '60px 20px', 
                background: 'var(--bg-card)', 
                borderRadius: '16px', 
                textAlign: 'center',
                border: '1px dashed var(--border-color)',
                color: 'var(--text-secondary)'
              }}
            >
              <QrCode size={36} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '14px', fontWeight: '600' }}>No {activeCategory} tickets.</p>
              {activeCategory === 'upcoming' && (
                <p style={{ fontSize: '12px', marginTop: '4px' }}>Register for a verified event to generate a pass.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
