import React from 'react';
import { CheckCircle, Clock, MessageSquare, Trash } from 'lucide-react';

export default function NotificationsScreen({ notifications = [], onMarkAllRead, onClearAll }) {
  return (
    <div className="screen-container fade-in">
      {/* FIXED HEADER (No Bell Icon, just text & action buttons) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '700' }}>Notifications</h1>
          
          {notifications.length > 0 && (
            <button 
              onClick={onClearAll}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--text-secondary)', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              <Trash size={14} />
              Clear
            </button>
          )}
        </div>

        {notifications.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              onClick={onMarkAllRead}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--primary-orange)', 
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '700'
              }}
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>

      {/* SCROLLABLE ALERTS LIST */}
      <div className="scrollable-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {notifications.length > 0 ? (
            notifications.map(notif => {
              let IconComponent = Clock;
              let iconColor = 'var(--primary-orange)';
              let iconBg = 'var(--bg-brand-light)';

              if (notif.type === 'purchase') {
                IconComponent = CheckCircle;
                iconColor = 'var(--success)';
                iconBg = 'var(--success-light)';
              } else if (notif.type === 'support') {
                IconComponent = MessageSquare;
                iconColor = '#3B82F6';
                iconBg = '#DBEAFE';
              }

              return (
                <div 
                  key={notif.id}
                  style={{
                    padding: '14px',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                    opacity: notif.read ? 0.75 : 1
                  }}
                >
                  {/* Unread indicator dot */}
                  {!notif.read && (
                    <div 
                      style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        width: '8px',
                        height: '8px',
                        background: 'var(--primary-orange)',
                        borderRadius: '50%'
                      }}
                    />
                  )}

                  <div 
                    style={{ 
                      padding: '8px', 
                      background: iconBg, 
                      color: iconColor, 
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconComponent size={18} />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <h4 style={{ fontSize: '13.5px', fontWeight: notif.read ? '600' : '700', color: 'var(--text-primary)' }}>
                      {notif.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {notif.message}
                    </p>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={10} />
                      {notif.time}
                    </span>
                  </div>
                </div>
              );
            })
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
              <Clock size={36} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '14px', fontWeight: '600' }}>No notifications found.</p>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>We'll notify you when tickets are booked or updates are made.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
