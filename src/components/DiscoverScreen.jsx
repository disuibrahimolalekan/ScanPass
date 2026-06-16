import React from 'react';
import { Search, MapPin, Calendar, ChevronRight } from 'lucide-react';

export default function DiscoverScreen({
  events,
  onSelectEvent,
  favourites = [],
  userProfile,
  onShowRecommendedModal
}) {
  const firstName = userProfile?.name?.split(' ')[0] || 'there';

  const featuredEvent  = events.find(e => e.featured);
  const recommended    = events.filter(e => e.recommended && !e.featured).slice(0, 5); // max 5
  const upcoming       = events.filter(e => !e.recommended && !e.featured);

  // Show "See all" only when there are more than 2 recommended events
  const showSeeAll = recommended.length > 2;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      overflow: 'hidden', background: '#ffffff', fontFamily: 'Inter, sans-serif'
    }}>

      {/* ══════════════════════════════════════════════════
          FIXED HEADER  — top padding clears the dynamic island
          ══════════════════════════════════════════════════ */}
      <div style={{
        flexShrink: 0,
        paddingTop: '24px',
        paddingLeft: '22px',
        paddingRight: '22px',
        paddingBottom: '12px',
        background: '#fff'
      }}>

        {/* Welcome */}
        <div style={{ marginBottom: '12px' }}>
          <span style={{ fontSize: '24px', fontWeight: '500', color: '#000' }}>
            Welcome,{' '}
            <span style={{ fontWeight: '700' }}>{firstName}!</span>
          </span>
        </div>

        {/* Search bar — single icon, fully functional */}
        <div style={{
          height: '40px', background: '#f9f9f9', borderRadius: '8px',
          border: '1px solid #d4d4d8', display: 'flex', alignItems: 'center',
          padding: '0 12px', gap: '8px'
        }}>
          <Search size={16} color="#71717a" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search for events..."
            style={{
              flex: 1, border: 'none', background: 'transparent',
              outline: 'none', fontSize: '13px', color: '#18181b', fontFamily: 'Inter, sans-serif'
            }}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SCROLLABLE CONTENT — only this scrolls
          ══════════════════════════════════════════════════ */}
      <div style={{
        flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column',
        scrollbarWidth: 'none', msOverflowStyle: 'none'
      }}>

        {/* Featured Event Banner */}
        {featuredEvent && (
          <div style={{ padding: '0 22px 20px 22px' }}>
            <div
              onClick={() => onSelectEvent(featuredEvent)}
              style={{
                height: '192px', borderRadius: '12px', overflow: 'hidden',
                position: 'relative', cursor: 'pointer',
                backgroundImage: `url(${featuredEvent.imageUrl})`,
                backgroundSize: 'cover', backgroundPosition: 'center'
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)' }} />
              <div style={{ position: 'absolute', left: '16px', bottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  height: '20px', padding: '0 10px', background: '#ea580c',
                  borderRadius: '100px', display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start'
                }}>
                  <span style={{ fontSize: '11px', color: '#ffedd5', letterSpacing: '0.06em', fontWeight: '600' }}>FEATURED EVENT</span>
                </div>
                <div style={{ fontSize: '17px', color: '#fff', lineHeight: '24px', fontWeight: '500', maxWidth: '220px' }}>
                  {featuredEvent.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={13} color="white" />
                    <span style={{ fontSize: '13px', color: '#fff' }}>{featuredEvent.date.split(',')[0]}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={13} color="white" />
                    <span style={{ fontSize: '13px', color: '#fff' }}>{featuredEvent.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Recommended for you ── */}
        <div className="recommended-container" style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Section header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', fontWeight: '600', color: '#18181b' }}>Recommended for you</span>
            {showSeeAll && (
              <span
                onClick={() => onShowRecommendedModal(recommended)}
                style={{ fontSize: '13px', color: '#f97316', cursor: 'pointer', fontWeight: '600' }}
              >
                See all
              </span>
            )}
          </div>

          {/* Show only first 2 recommended by default */}
          {recommended.slice(0, 2).map(event => (
            <div
              key={event.id}
              onClick={() => onSelectEvent(event)}
              style={{
                background: '#fff', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer',
                boxShadow: '0px 1px 6px rgba(0,0,0,0.10)', outline: '0.5px solid #f97316'
              }}
            >
              <img
                src={event.imageUrl} alt={event.title}
                style={{ width: '100%', height: '130px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} color="#f97316" />
                  <span style={{ fontSize: '12px', color: '#f97316', fontWeight: '500' }}>
                    {event.date.split(',')[0].toUpperCase()}&nbsp;&nbsp;{event.time.split(' ')[0]}
                  </span>
                </div>
                <span style={{ fontSize: '17px', fontWeight: '600', color: '#18181b', lineHeight: '24px' }}>{event.title}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="#52525b" />
                  <span style={{ fontSize: '12px', color: '#52525b' }}>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Upcoming near you ── */}
        <div className="upcoming-container" style={{ padding: '20px 22px 0 22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span style={{ fontSize: '20px', fontWeight: '600', color: '#18181b' }}>Upcoming near you</span>

          {upcoming.map(event => (
            <div
              key={event.id}
              onClick={() => onSelectEvent(event)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: '#fff', borderRadius: '10px', padding: '10px',
                boxShadow: '0px 1px 6px rgba(0,0,0,0.10)', outline: '0.5px solid #f97316', cursor: 'pointer'
              }}
            >
              <img
                src={event.imageUrl} alt={event.title}
                style={{ width: '76px', height: '60px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', overflow: 'hidden' }}>
                <span style={{ fontSize: '15px', color: '#18181b', fontWeight: '500', lineHeight: '22px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {event.title}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={11} color="#52525b" />
                  <span style={{ fontSize: '12px', color: '#52525b' }}>{event.date.split(',')[0].trim()}&nbsp;&nbsp;{event.time.split(' ')[0]}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={11} color="#52525b" />
                  <span style={{ fontSize: '12px', color: '#52525b' }}>{event.location}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
                <span style={{ fontSize: '13px', color: '#f97316', fontWeight: '700' }}>
                  {event.price === 0 ? 'Free' : `₦${(event.price * 1000).toLocaleString()}`}
                </span>
                <ChevronRight size={14} color="#a1a1aa" />
              </div>
            </div>
          ))}

          {upcoming.length === 0 && (
            <div style={{ padding: '20px 0', textAlign: 'center', color: '#71717a', fontSize: '14px' }}>
              No upcoming events nearby
            </div>
          )}
        </div>

        {/* Bottom spacer so last card is never hidden behind nav */}
        <div style={{ height: '28px', flexShrink: 0 }} />
      </div>
    </div>
  );
}
