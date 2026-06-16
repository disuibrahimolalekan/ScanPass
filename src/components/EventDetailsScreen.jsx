import React, { useState } from 'react';
import { ChevronLeft, MapPin, Calendar, Clock, Heart, ChevronRight, Share2 } from 'lucide-react';

export default function EventDetailsScreen({
  event,
  onBack,
  onBuyTicket,
  isReminderSet,
  onToggleReminder,
  isFavourite,
  onToggleFavourite
}) {
  const [expanded, setExpanded] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  if (!event) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Join me at ${event.title}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2000);
    }
  };

  const description = event.description ||
    'The African AI Summit is a major continental AI event focused on accelerating artificial intelligence adoption, investment, and collaboration across Africa. The summit brings together innovators, policymakers, and investors from across the continent.';
  const shortDesc = description.length > 160 ? description.slice(0, 160) + '...' : description;

  const relatedEvents = [
    {
      title: 'Africa Startup Festival',
      date: '1 June', time: '10:00am', location: 'Ikeja, Lagos', price: 'Free',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      background: '#fff',
      fontFamily: 'Inter, sans-serif',
      position: 'relative'
    }}>

      {/* ══════════════════════════════════════════════════
          WHITE FIXED HEADER (exactly like TicketSelection / checkout page)
          Clears dynamic island, houses Back button and Favorite/Share icons
          ══════════════════════════════════════════════════ */}
      <div style={{
        flexShrink: 0,
        background: '#fff',
        padding: '24px 20px 12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #f4f4f5',
        zIndex: 10
      }}>
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

        {/* Favorite (Heart) + Share buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => onToggleFavourite && onToggleFavourite(event.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '4px'
            }}
          >
            <Heart size={20} color={isFavourite ? '#f97316' : '#000'} fill={isFavourite ? '#f97316' : 'none'} />
          </button>
          <button
            onClick={handleShare}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '4px'
            }}
          >
            <Share2 size={20} color="#000" />
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SCROLLABLE CONTENT (no scroll bar)
          ══════════════════════════════════════════════════ */}
      <div 
        className="scrollable-content event-details-layout"
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Hero image — properly proportioned below the header */}
        <div className="event-details-hero-column" style={{ position: 'relative', flexShrink: 0 }}>
          <img
            src={event.imageUrl}
            alt={event.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
          />
          {/* Subtle bottom shadow overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 100%)'
          }} />
        </div>

        {/* Details Card */}
        <div className="event-details-info-column" style={{
          background: '#fff',
          borderRadius: '20px 20px 0 0',
          marginTop: '-20px',
          position: 'relative',
          zIndex: 2,
          padding: '20px 20px 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: 1
        }}>

          {/* Title + Venue + Meta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '20px', fontWeight: '700', color: '#000', lineHeight: '26px' }}>
              {event.title}
            </span>
            <span style={{ fontSize: '12px', fontWeight: '500', color: '#52525b', lineHeight: '20px' }}>
              {event.venue}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <MapPin size={11} color="#f97316" />
                <span style={{ fontSize: '11px', color: '#52525b' }}>{event.location}</span>
              </div>
              <div style={{ width: '3px', height: '3px', background: '#a1a1aa', borderRadius: '50%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Calendar size={11} color="#f97316" />
                <span style={{ fontSize: '11px', color: '#52525b' }}>{event.date.split(',')[0].trim()}</span>
              </div>
              <div style={{ width: '3px', height: '3px', background: '#a1a1aa', borderRadius: '50%' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Clock size={11} color="#f97316" />
                <span style={{ fontSize: '11px', color: '#52525b' }}>{event.time.split(' ')[0]}</span>
              </div>
            </div>
          </div>

          {/* About */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>About</span>
            <span style={{ fontSize: '12px', color: '#52525b', lineHeight: '18px' }}>
              {expanded ? description : shortDesc}
              {!expanded && description.length > 160 && (
                <span onClick={() => setExpanded(true)} style={{ color: '#f97316', cursor: 'pointer' }}> see more</span>
              )}
            </span>
          </div>

          {/* Organizer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>Organizer</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '36px', height: '36px', background: '#f4f4f5', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#f97316' }}>IH</span>
              </div>
              <div style={{ flex: 1, padding: '0 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '500', color: '#27272a', lineHeight: '20px' }}>By Impact Hub Center</div>
                    <div style={{ fontSize: '10px', color: '#737373', lineHeight: '16px' }}>1k followers</div>
                  </div>
                  <button style={{
                    padding: '4px 14px', height: '28px', borderRadius: '8px',
                    border: '1px solid #3f3f46', background: 'none', cursor: 'pointer',
                    fontSize: '10px', fontWeight: '500', color: '#000'
                  }}>Follow</button>
                </div>
              </div>
            </div>
          </div>

          {/* Location with generated street-level map asset */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>Location</span>
            <span style={{ fontSize: '12px', color: '#52525b', lineHeight: '16px' }}>{event.location}</span>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '130px', position: 'relative' }}>
              <img
                src="/src/assets/street_map_illustration.png"
                alt="Street map"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Map pin marker overlay */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -60%)',
                width: '32px', height: '32px',
                background: '#f97316', borderRadius: '50% 50% 50% 0',
                transform: 'translate(-50%, -60%) rotate(-45deg)',
                border: '2px solid white',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
              }} />
            </div>
          </div>

          {/* You might also like */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#000' }}>You might also like...</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
                <span style={{ fontSize: '12px', color: '#52525b' }}>Skip</span>
                <ChevronRight size={13} color="#52525b" />
              </div>
            </div>
            {relatedEvents.map((rel, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={rel.imageUrl} alt={rel.title}
                  style={{ width: '80px', height: '56px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#000', lineHeight: '18px' }}>{rel.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10px', color: '#737373' }}>{rel.date}</span>
                    <div style={{ width: '2px', height: '10px', background: '#d4d4d4', borderRadius: '5px' }} />
                    <span style={{ fontSize: '10px', color: '#737373' }}>{rel.time}</span>
                    <div style={{ width: '2px', height: '10px', background: '#d4d4d4', borderRadius: '5px' }} />
                    <span style={{ fontSize: '10px', color: '#737373' }}>{rel.location}</span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#f97316', fontWeight: '600' }}>{rel.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom spacer */}
          <div style={{ height: '8px' }} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          FIXED BOTTOM ACTION BAR (does NOT scroll)
          ══════════════════════════════════════════════════ */}
      <div style={{
        flexShrink: 0,
        height: '76px',
        background: '#fff0f0',
        boxShadow: '0px -1px 4px 0px rgba(0,0,0,0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 10
      }}>
        {/* Price + Date left side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '18px', color: '#f97316', fontWeight: '700' }}>
            {event.price === 0 ? 'Free' : `₦${(event.price * 1000).toLocaleString()}`}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '10px', color: '#52525b' }}>{event.date.split(',')[0]}</span>
            <div style={{ width: '1px', height: '10px', background: '#d4d4d4', borderRadius: '5px' }} />
            <span style={{ fontSize: '10px', color: '#52525b' }}>{event.time.split(' ')[0]}</span>
          </div>
        </div>

        {/* Proceed to Payment button */}
        <button
          onClick={() => onBuyTicket(event)}
          style={{
            height: '48px', padding: '0 22px',
            background: '#f97316', borderRadius: '10px', border: 'none',
            cursor: 'pointer', fontSize: '15px', fontWeight: '600',
            color: 'white', whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(249,115,22,0.3)'
          }}
        >
          Proceed to Payment
        </button>
      </div>

      {/* Share Toast */}
      {shareToast && (
        <div style={{
          position: 'absolute',
          bottom: '90px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '500',
          zIndex: 100,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          Event link copied to clipboard!
        </div>
      )}
    </div>
  );
}
