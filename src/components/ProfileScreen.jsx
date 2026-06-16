import React, { useState } from 'react';
import { User, MapPin, Calendar, QrCode, HelpCircle, Mail, Phone, Shield } from 'lucide-react';

export default function ProfileScreen({ 
  tickets = [], 
  onRemoveTicket, 
  onNavigateToSupport,
  userProfile = { name: 'Adewale Fisayo', email: 'adewalefissy@gmail.com', phone: '+234 803 123 4567', role: 'Event Attendee', location: 'Ikeja, Lagos, Nigeria' },
  onUpdateProfile,
  onSelectTicket,
  onLogout
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userProfile.name || 'Adewale Fisayo',
    email: userProfile.email || 'adewale.fisayo@gmail.com',
    phone: userProfile.phone || '+234 803 123 4567'
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleSaveProfile = () => {
    if (onUpdateProfile) {
      onUpdateProfile({
        ...userProfile,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone
      });
    }
    setIsEditing(false);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('Please fill in all password fields');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    setPasswordError('');
    alert('Password successfully updated!');
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="screen-container fade-in">
      {/* FIXED HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
        <User size={26} color="var(--primary-orange)" />
        <h1 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '700' }}>Personal Account</h1>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="scrollable-content">
        {/* Profile Card Summary */}
        <div className="profile-card">
          <img 
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80" 
            alt={userProfile.name || 'Adewale Fisayo'} 
            className="profile-avatar" 
          />
          <div>
            <h2 className="profile-name">{userProfile.name || 'Adewale Fisayo'}</h2>
            <div className="profile-loc">
              <MapPin size={14} color="var(--primary-orange)" />
              <span>{userProfile.location || 'Ikeja, Lagos, Nigeria'}</span>
            </div>
          </div>
        </div>

        {/* Account Details Card */}
        <div 
          style={{ 
            background: 'white', 
            borderRadius: '16px', 
            padding: '20px', 
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
            <h3 style={{ fontFamily: 'Outfit', fontSize: '15px', fontWeight: '700' }}>
              Account Information
            </h3>
            {!isEditing && (
              <button 
                onClick={() => {
                  setEditForm({
                    name: userProfile.name || 'Adewale Fisayo',
                    email: userProfile.email || 'adewale.fisayo@gmail.com',
                    phone: userProfile.phone || '+234 803 123 4567'
                  });
                  setIsEditing(true);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-orange)',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px' }}>Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px' }}>Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px' }}>Phone Number</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editForm.phone}
                  onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button 
                  onClick={handleSaveProfile} 
                  className="primary-button"
                  style={{ padding: '10px', fontSize: '13px' }}
                >
                  Save Profile
                </button>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="secondary-button"
                  style={{ padding: '10px', fontSize: '13px', background: 'white' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'var(--primary-orange)', padding: '6px', background: 'var(--bg-warm)', borderRadius: '8px' }}>
                  <User size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Full Name</span>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>{userProfile.name || 'Adewale Fisayo'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'var(--primary-orange)', padding: '6px', background: 'var(--bg-warm)', borderRadius: '8px' }}>
                  <Mail size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Email Address</span>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>{userProfile.email || 'adewale.fisayo@gmail.com'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'var(--primary-orange)', padding: '6px', background: 'var(--bg-warm)', borderRadius: '8px' }}>
                  <Phone size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Phone Number</span>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>{userProfile.phone || '+234 803 123 4567'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: 'var(--primary-orange)', padding: '6px', background: 'var(--bg-warm)', borderRadius: '8px' }}>
                  <Shield size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Account Role</span>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>{userProfile.role || 'Event Attendee'}</div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  setPasswordError('');
                  setShowPasswordModal(true);
                }}
                className="secondary-button"
                style={{ fontSize: '13px', padding: '10px', marginTop: '6px', background: 'white' }}
              >
                Change Password
              </button>
            </>
          )}
        </div>

        {/* Passes List Section */}
        <div>
          <h2 className="section-title" style={{ marginBottom: '12px' }}>My Active Passes</h2>
          
          {tickets.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {tickets.map(ticket => (
                <div 
                  key={ticket.ticketId}
                  className="upcoming-card"
                  onClick={() => onSelectTicket && onSelectTicket(ticket)}
                  style={{ borderLeft: '4px solid var(--primary-orange)' }}
                >
                  <img src={ticket.event.imageUrl} alt={ticket.event.title} className="upcoming-img" />
                  <div className="upcoming-info">
                    <h3 className="upcoming-title">{ticket.event.title}</h3>
                    <span className="upcoming-date">
                      <Calendar size={13} />
                      {ticket.event.date}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--primary-orange)', fontWeight: '600', letterSpacing: '0.5px' }}>
                      TICKET ID: {ticket.ticketId}
                    </span>
                  </div>
                  <div style={{ padding: '8px', background: 'var(--bg-brand-light)', borderRadius: '50%', color: 'var(--primary-orange)' }}>
                    <QrCode size={18} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              style={{ 
                padding: '30px 20px', 
                background: 'var(--bg-card)', 
                borderRadius: '16px', 
                textAlign: 'center',
                border: '1px dashed var(--text-muted)',
                color: 'var(--text-secondary)'
              }}
            >
              <QrCode size={36} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '14px', fontWeight: '500' }}>No active passes found.</p>
            </div>
          )}
        </div>

        {/* Support Button (Fully scrollable container) */}
        <div style={{ marginTop: '10px', width: '100%' }}>
          <button 
            className="secondary-button" 
            style={{ background: 'white' }}
            onClick={onNavigateToSupport}
          >
            <HelpCircle size={16} />
            Need help? Contact Support
          </button>
        </div>

        {/* Log Out & Reset Button */}
        <div style={{ marginTop: '12px', width: '100%' }}>
          <button 
            className="secondary-button" 
            style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}
            onClick={() => {
              if (window.confirm("Are you sure you want to log out and reset onboarding?")) {
                if (onLogout) onLogout();
              }
            }}
          >
            Log Out & Reset Onboarding
          </button>
        </div>
      </div>

      {/* Password Modal Overlay */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()} style={{ paddingBottom: '30px' }}>
            <div className="sheet-handle" />
            <h3 className="sheet-title">Update Password</h3>
            {passwordError && (
              <div style={{ color: 'var(--danger)', fontSize: '12px', background: 'var(--danger-light)', padding: '8px 12px', borderRadius: '8px' }}>
                {passwordError}
              </div>
            )}
            <form onSubmit={handleSavePassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px' }}>Current Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px' }}>New Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '12px' }}>Confirm New Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
              <button type="submit" className="primary-button" style={{ marginTop: '10px' }}>
                Save Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
