import React from 'react';
import { X, Calendar, MapPin, Video, Bell, BellOff, Ticket } from 'lucide-react';

export default function EventDetailsModal({ event, onClose, onBuyTicket, isReminderSet, onToggleReminder }) {
  if (!event) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        
        <div className="sheet-header">
          <span className="featured-badge" style={{ margin: 0 }}>
            {event.price === 0 ? 'FREE EVENT' : `$${event.price}`}
          </span>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Event Banner */}
        <div 
          style={{ 
            height: '160px', 
            borderRadius: '12px', 
            backgroundImage: `url(${event.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {event.liveStream && (
            <div 
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                background: 'rgba(0, 0, 0, 0.65)',
                color: '#fff',
                fontSize: '11px',
                padding: '4px 8px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: '600',
                backdropFilter: 'blur(4px)'
              }}
            >
              <Video size={12} color="#10B981" />
              LIVE STREAM AVAILABLE
            </div>
          )}
        </div>

        {/* Event Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 className="sheet-title">{event.title}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
              <Calendar size={18} color="var(--primary-orange)" />
              <div style={{ fontSize: '13px', lineHeight: 1.4 }}>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{event.date}</div>
                <div>{event.time}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
              <MapPin size={18} color="var(--primary-orange)" />
              <div style={{ fontSize: '13px', lineHeight: 1.4 }}>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{event.venue || event.location}</div>
                <div style={{ fontSize: '12px' }}>Lagos/Ibadan, Nigeria</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <button 
            className="primary-button" 
            onClick={() => onBuyTicket(event)}
          >
            <Ticket size={18} />
            {event.price === 0 ? 'Register Free Ticket' : `Get Ticket - $${event.price}`}
          </button>
          
          <button 
            className={`secondary-button`}
            onClick={() => onToggleReminder(event.id)}
            style={{ 
              borderColor: isReminderSet ? 'var(--text-secondary)' : 'var(--primary-orange)',
              color: isReminderSet ? 'var(--text-secondary)' : 'var(--primary-orange)'
            }}
          >
            {isReminderSet ? (
              <>
                <BellOff size={18} />
                Remove Reminder
              </>
            ) : (
              <>
                <Bell size={18} />
                Set Reminder
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
