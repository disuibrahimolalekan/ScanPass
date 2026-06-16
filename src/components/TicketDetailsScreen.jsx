import React, { useState } from 'react';
import { ChevronLeft, Share2, Wallet, ChevronRight, Download, Check, Shield, FileText, Calendar } from 'lucide-react';

export default function TicketDetailsScreen({ ticket, onBack, onSelectEvent }) {
  const [viewMode, setViewMode] = useState('qr'); // 'qr' or 'order'
  const [savedToPhone, setSavedToPhone] = useState(false);
  const [addedToGallery, setAddedToGallery] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  if (!ticket) return null;
  const { event } = ticket;

  const eventPrice = event.price * 1000;
  const serviceFee = event.price === 0 ? 0 : 50;
  const totalPrice = eventPrice + serviceFee;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out my entry pass for ${event.title}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`ScanPass Ticket: ${ticket.ticketId}`);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2000);
    }
  };

  const handleSaveToPhone = () => {
    setSavedToPhone(true);
    setTimeout(() => setSavedToPhone(false), 3000);

    // Create Canvas Element for drawing ticket
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 680;
    const ctx = canvas.getContext('2d');

    // Helper to wrap text
    const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
      const words = text.split(' ');
      let line = '';
      let currentY = y;
      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, currentY);
      return currentY + lineHeight;
    };

    // 1. Draw solid background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw card container border & border decorations
    ctx.strokeStyle = '#e4e4e7';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // 3. Draw orange header strip
    ctx.fillStyle = '#f97316';
    ctx.fillRect(10, 10, canvas.width - 20, 12);

    // 4. Logo / Brand header
    ctx.fillStyle = '#18181b';
    ctx.font = 'bold 20px "Inter", "Helvetica", sans-serif';
    ctx.fillText('SCANPASS', 30, 60);

    // Verified badge
    ctx.fillStyle = '#10b981';
    ctx.font = '600 11px "Inter", sans-serif';
    ctx.fillText('• VERIFIED PASS', 280, 58);

    // Divider
    ctx.strokeStyle = '#f4f4f5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 80);
    ctx.lineTo(370, 80);
    ctx.stroke();

    // 5. Event Info section
    ctx.fillStyle = '#18181b';
    ctx.font = 'bold 18px "Inter", sans-serif';
    
    // Wrap Title text
    const titleY = 115;
    const endTitleY = wrapText(ctx, event.title, 30, titleY, 340, 24);

    // Metadata Labels
    ctx.fillStyle = '#71717a';
    ctx.font = '500 11px "Inter", sans-serif';
    ctx.fillText('DATE', 30, endTitleY + 10);
    ctx.fillText('TIME', 220, endTitleY + 10);

    ctx.fillStyle = '#18181b';
    ctx.font = '600 13px "Inter", sans-serif';
    ctx.fillText(event.date.split(',')[0], 30, endTitleY + 28);
    ctx.fillText(event.time.split(' ')[0], 220, endTitleY + 28);

    ctx.fillStyle = '#71717a';
    ctx.font = '500 11px "Inter", sans-serif';
    ctx.fillText('VENUE', 30, endTitleY + 55);
    ctx.fillText('TICKET ID', 220, endTitleY + 55);

    ctx.fillStyle = '#18181b';
    ctx.font = '600 13px "Inter", sans-serif';
    
    // Wrap venue text if long
    const venueY = endTitleY + 73;
    wrapText(ctx, event.venue || event.location, 30, venueY, 170, 18);
    ctx.fillText(ticket.ticketId, 220, venueY);

    // 6. Dashed separator for the ticket tear-off
    ctx.strokeStyle = '#d4d4d8';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(20, endTitleY + 120);
    ctx.lineTo(380, endTitleY + 120);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Side cut-outs (ticket design circles)
    ctx.fillStyle = '#f4f4f5';
    ctx.beginPath();
    ctx.arc(10, endTitleY + 120, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(390, endTitleY + 120, 12, 0, Math.PI * 2);
    ctx.fill();

    // 7. QR Code Section
    const qrSize = 160;
    const qrX = (canvas.width - qrSize) / 2;
    const qrY = endTitleY + 150;

    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&color=18181b&data=ScanPass-${ticket.ticketId}`;
    
    const triggerDownload = () => {
      try {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `ScanPass_Ticket_${ticket.ticketId}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Failed to download ticket image', err);
      }
    };

    qrImg.onload = () => {
      // Draw QR image
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

      // Draw custom center logo overlay (orange rounded square with white center symbol)
      const logoSize = 28;
      const logoX = qrX + (qrSize - logoSize) / 2;
      const logoY = qrY + (qrSize - logoSize) / 2;

      ctx.fillStyle = '#f97316';
      // roundRect fallback
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(logoX, logoY, logoSize, logoSize, 6);
        ctx.fill();
      } else {
        ctx.fillRect(logoX, logoY, logoSize, logoSize);
      }

      ctx.fillStyle = '#ffffff';
      const innerSize = 8;
      const innerX = logoX + (logoSize - innerSize) / 2;
      const innerY = logoY + (logoSize - innerSize) / 2;
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(innerX, innerY, innerSize, innerSize, 1);
        ctx.fill();
      } else {
        ctx.fillRect(innerX, innerY, innerSize, innerSize);
      }

      // Draw subtext below QR code
      ctx.fillStyle = '#18181b';
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Your Pass to the experience • Ticket 1 of 1', canvas.width / 2, qrY + qrSize + 35);
      
      ctx.fillStyle = '#71717a';
      ctx.font = '500 10px "Inter", sans-serif';
      ctx.fillText('General Admission • Check-in time: Anytime', canvas.width / 2, qrY + qrSize + 52);

      // Draw organizer info at the bottom
      ctx.fillStyle = '#f4f4f5';
      ctx.fillRect(20, canvas.height - 70, canvas.width - 40, 45);
      
      ctx.fillStyle = '#52525b';
      ctx.font = 'bold 10px "Inter", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('ORGANIZED BY:', 35, canvas.height - 44);
      ctx.fillStyle = '#18181b';
      ctx.font = 'bold 11px "Inter", sans-serif';
      ctx.fillText('Impact Hub Center', 125, canvas.height - 44);

      triggerDownload();
    };

    qrImg.onerror = () => {
      // Draw a fallback message if QR fails to load
      ctx.fillStyle = '#ef4444';
      ctx.font = '12px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('[QR Code Image Failed to Load]', canvas.width / 2, qrY + qrSize / 2);
      
      triggerDownload();
    };
  };

  const handleAddToGallery = () => {
    setAddedToGallery(true);
    setTimeout(() => setAddedToGallery(false), 2000);
  };

  // ══════════════════════════════════════════════════
  // ORDER DETAILS VIEW (invoice and transaction receipt details)
  // ══════════════════════════════════════════════════
  if (viewMode === 'order') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        background: '#fff',
        fontFamily: 'Inter, sans-serif'
      }}>
        {/* HEADER */}
        <div style={{ flexShrink: 0, background: '#fff', padding: '24px 20px 12px 20px', borderBottom: '1px solid #f4f4f5' }}>
          <button
            onClick={() => setViewMode('qr')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 0'
            }}
          >
            <ChevronLeft size={18} color="#000" />
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>Back</span>
          </button>
        </div>

        {/* CONTENT */}
        <div className="scrollable-content" style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#18181b' }}>Other Details</div>

          {/* Ticket ID & Date */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 2px' }}>
            <span style={{ fontSize: '12px', color: '#71717a' }}>Order Number: <strong>{ticket.ticketId}</strong></span>
            <span style={{ fontSize: '12px', color: '#71717a' }}>Transaction Date: {new Date(ticket.registeredAt).toLocaleDateString()}</span>
          </div>

          {/* Event Card Summary */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#fff',
            borderRadius: '12px',
            padding: '12px',
            border: '1px solid #f4f4f5',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
          }}>
            <img
              src={event.imageUrl}
              alt={event.title}
              style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
            />
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#18181b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {event.title}
              </span>
              <span style={{ fontSize: '11px', color: '#71717a' }}>{event.date.split(',')[0]}</span>
              <span style={{ fontSize: '11px', color: '#71717a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.venue || event.location}</span>
            </div>
          </div>

          {/* Pricing Breakdown Card */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #f4f4f5',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#18181b', marginBottom: '4px' }}>Billing Summary</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#71717a' }}>
              <span>Ticket Type</span>
              <span>General Admission</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#71717a' }}>
              <span>Ticket Price</span>
              <span>{event.price === 0 ? 'Free' : `₦${eventPrice.toLocaleString()}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#71717a' }}>
              <span>Quantity</span>
              <span>1</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#71717a' }}>
              <span>Service Fee</span>
              <span>{event.price === 0 ? 'Free' : `₦${serviceFee.toLocaleString()}`}</span>
            </div>
            <div style={{ height: '1px', background: '#f4f4f5', margin: '4px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '700', color: '#18181b' }}>
              <span>Total Paid</span>
              <span style={{ color: '#f97316' }}>{event.price === 0 ? 'Free' : `₦${totalPrice.toLocaleString()}`}</span>
            </div>
          </div>

          {/* Payment Method Details */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #f4f4f5',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#18181b', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={15} color="#10b981" />
              Payment Information
            </h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#71717a' }}>
              <span>Payment Type</span>
              <span>Credit Card</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#71717a' }}>
              <span>Cardholder</span>
              <span>Adewale Fisayo</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#71717a' }}>
              <span>Card Number</span>
              <span>•••• •••• •••• 4242</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════
  // DEFAULT QR PASS VIEW
  // ══════════════════════════════════════════════════
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
      {/* HEADER */}
      <div style={{
        flexShrink: 0,
        background: '#fff',
        padding: '24px 20px 12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #f4f4f5'
      }}>
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
        <button
          onClick={handleShare}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '4px'
          }}
        >
          <Share2 size={18} color="#000" />
        </button>
      </div>

      {/* SCROLLABLE TICKET VIEW */}
      <div className="scrollable-content ticket-details-layout" style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {/* Left Column: Date, Event Details, QR Card */}
        <div className="ticket-left-column" style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1.2, minWidth: 0 }}>
          {/* Date / Time Label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#71717a' }}>{event.date.split(',')[0]}</span>
            <span style={{ fontSize: '11px', color: '#a1a1aa' }}>{event.time.split(' ')[0]}</span>
          </div>

          {/* Small Event Row Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '4px'
          }}>
            <img
              src={event.imageUrl}
              alt={event.title}
              style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '16px', fontWeight: '700', color: '#18181b' }}>{event.title}</span>
          </div>

          {/* LARGE QR CODE CARD */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '24px 20px 20px 20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #f4f4f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px'
          }}>
            {/* Custom QR Code Image with Center Logo Overlay */}
            <div style={{ position: 'relative', width: '160px', height: '160px' }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&color=18181b&data=ScanPass-${ticket.ticketId}`}
                alt="ScanPass QR Code"
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
              {/* Custom Orange dead-center logo overlay */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '28px',
                height: '28px',
                background: '#f97316',
                borderRadius: '6px',
                border: '2.5px solid white',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* scanpass square center mark */}
                <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '1px' }} />
              </div>
            </div>

            {/* Subtext info */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', textAlign: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#18181b' }}>
                Your Pass to the experience • Ticket 1 of 1
              </span>
              <span style={{ fontSize: '11px', color: '#71717a' }}>
                General Admission • Check-in time: Anytime
              </span>
            </div>

            {/* Add to Ticket Gallery Button */}
            <button
              onClick={handleAddToGallery}
              style={{
                width: '100%',
                height: '44px',
                background: '#000',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: '600',
                marginTop: '4px'
              }}
            >
              {addedToGallery ? (
                <>
                  <Check size={15} color="#10b981" />
                  Added to Gallery
                </>
              ) : (
                <>
                  <Wallet size={15} color="white" />
                  Add to Ticket Gallery
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Menu Options, Organizer Details */}
        <div className="ticket-right-column" style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1.8, minWidth: 0 }}>
          {/* LIST OPTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f4f4f5' }}>
            
            {/* 1. Event Details link */}
            <div
              onClick={() => onSelectEvent && onSelectEvent(event)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                height: '48px', padding: '0 16px', cursor: 'pointer', borderBottom: '1px solid #f4f4f5'
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#3f3f46', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={15} color="#71717a" />
                Event Details
              </span>
              <ChevronRight size={16} color="#a1a1aa" />
            </div>

            {/* 2. Other Details link */}
            <div
              onClick={() => setViewMode('order')}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                height: '48px', padding: '0 16px', cursor: 'pointer', borderBottom: '1px solid #f4f4f5'
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#3f3f46', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={15} color="#71717a" />
                Other Details
              </span>
              <ChevronRight size={16} color="#a1a1aa" />
            </div>

            {/* 3. Save to Phone link */}
            <div
              onClick={handleSaveToPhone}
              style={{
                display: 'flex', alignItems: 'center',
                height: '48px', padding: '0 16px', cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#3f3f46', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={15} color="#71717a" />
                Save to Phone
              </span>
            </div>
          </div>

          {/* ORGANIZER INFO */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '6px',
            paddingBottom: '12px'
          }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: '#71717a' }}>Organized by</span>
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
        </div>
      </div>

      {/* Share Toast */}
      {shareToast && (
        <div style={{
          position: 'absolute',
          bottom: '30px',
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
          Ticket reference copied to clipboard!
        </div>
      )}

      {/* Save to Phone Alert */}
      {savedToPhone && (
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(16,185,129,0.95)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '500',
          zIndex: 100,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Check size={14} color="white" />
          Pass saved to device!
        </div>
      )}
    </div>
  );
}
