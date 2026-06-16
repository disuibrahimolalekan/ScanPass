import React, { useState } from 'react';
import { X, WifiOff, RefreshCw } from 'lucide-react';

export default function PaymentFailedScreen({ event, onCancel, onSuccess }) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    // Simulate payment call delay, then trigger success
    setTimeout(() => {
      setIsRetrying(false);
      onSuccess(event);
    }, 2000);
  };

  return (
    <div className="screen-container fade-in" style={{ paddingBottom: '40px' }}>
      <div className="failure-layout">
        {/* Error Icon Circle */}
        <div className="failure-circle">
          <WifiOff size={42} color="white" />
        </div>

        {/* Title */}
        <h2 className="failure-title">Failed Payment</h2>

        {/* Message */}
        <p className="failure-desc">
          Your payment of <strong>{event.price === 0 ? 'Free' : `₦${(event.price * 1000).toLocaleString()}`}</strong> for{' '}
          <strong>{event.title}</strong> could not be completed.
          <br /><br />
          Please check your internet connection and try again.
        </p>

        {/* Action Buttons */}
        <div className="failure-actions">
          <button 
            className="primary-button" 
            onClick={handleRetry} 
            disabled={isRetrying}
            style={{ opacity: isRetrying ? 0.8 : 1 }}
          >
            {isRetrying ? (
              <>
                <RefreshCw size={18} className="spin-animation" style={{ animation: 'spin 1s linear infinite' }} />
                Retrying Payment...
              </>
            ) : (
              'Retry Payment'
            )}
          </button>
          
          <button 
            className="secondary-button" 
            onClick={onCancel}
            disabled={isRetrying}
          >
            Cancel
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
