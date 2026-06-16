import React, { useState } from 'react';
import { HelpCircle, PhoneCall, Send, AlertCircle, RefreshCw } from 'lucide-react';

export default function SupportScreen({ onSubmitSuccess }) {
  const [issueType, setIssueType] = useState('Ticket scanning error');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleDescChange = (e) => {
    const text = e.target.value;
    if (text.length <= 200) {
      setDescription(text);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) {
      setError('Please provide a subject');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a description of the issue');
      return;
    }
    
    setError('');
    setIsSubmitting(true);

    // Simulate sending support request
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess();
      setSubject('');
      setDescription('');
    }, 1500);
  };

  const handleCallSupport = () => {
    alert('Dialing Event Support: +234 (0) 800-SCANPASS');
  };

  return (
    <div className="screen-container fade-in">
      {/* FIXED HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
        <HelpCircle size={26} color="var(--primary-orange)" />
        <h1 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '700' }}>Contact Support</h1>
      </div>

      {/* SCROLLABLE FORM CONTENT */}
      <div className="scrollable-content">
        {/* Info Banner */}
        <div className="support-info-banner">
          <div style={{ padding: '4px', background: 'var(--bg-brand-light)', borderRadius: '50%' }}>
            <AlertCircle size={20} color="var(--primary-orange)" />
          </div>
          <div className="support-banner-text">
            <h3>Having trouble with your ticket?</h3>
            <p>Our support team can help resolve that.</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div 
            style={{ 
              background: 'var(--danger-light)', 
              color: 'var(--danger)', 
              padding: '10px 14px', 
              borderRadius: '8px', 
              fontSize: '13px', 
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Issue type</label>
            <select 
              className="form-select"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              <option>Ticket scanning error</option>
              <option>Payment failed</option>
              <option>Event information incorrect</option>
              <option>Other issues</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Subject</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. My ticket QR code won't load"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Describe the issue</label>
            <div className="textarea-container">
              <textarea 
                className="form-textarea" 
                placeholder="Provide detail on what happened..."
                value={description}
                onChange={handleDescChange}
              />
              <span className="char-counter">{description.length}/200</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: '8px' }}>
            <button 
              type="submit" 
              className="primary-button"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.8 : 1 }}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw size={18} className="spin-animation" style={{ animation: 'spin 1s linear infinite' }} />
                  Sending Request...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Support Request
                </>
              )}
            </button>

            <button 
              type="button" 
              className="secondary-button"
              onClick={handleCallSupport}
              disabled={isSubmitting}
              style={{ background: 'white' }}
            >
              <PhoneCall size={18} />
              Call Event Support
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
