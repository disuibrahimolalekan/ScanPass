import React, { useState, useEffect } from 'react';
import { Compass, Heart, Search, User, HelpCircle, Bell, QrCode, AlertCircle } from 'lucide-react';
import DiscoverScreen from './components/DiscoverScreen';
import ProfileScreen from './components/ProfileScreen';
import SupportScreen from './components/SupportScreen';
import TicketsScreen from './components/TicketsScreen';
import EventDetailsScreen from './components/EventDetailsScreen';
import PaymentFailedScreen from './components/PaymentFailedScreen';
import OnboardingFlow from './components/OnboardingFlow';
import TicketSelection from './components/TicketSelection';
import NotificationsScreen from './components/NotificationsScreen';
import PaymentSuccessScreen from './components/PaymentSuccessScreen';
import PaymentScreen from './components/PaymentScreen';
import TicketDetailsScreen from './components/TicketDetailsScreen';

// Mock Events Data with descriptions for full page view
const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Atmosphere of Jesus 2026',
    date: 'June 1-3, 2026',
    time: '5:00 PM WAT',
    venue: 'Jogor Center, Liberty Road',
    location: 'Ibadan, Nigeria',
    price: 15,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    description: 'A transformative 3-day spiritual worship gathering featuring praise, worship, and spiritual growth sessions. Join thousands in Ibadan for a powerful Atmosphere of praise, gospel art ministries, and theological discussions. General admission tickets grant entry to all main hall worship panels and sessions.',
    featured: true,
    recommended: true,
    liveStream: true
  },
  {
    id: 2,
    title: 'Africa AI Summit',
    date: 'June 12, 2026',
    time: '9:00 AM - 12:00 PM WAT',
    venue: 'Main Hall, Civic Center',
    location: 'Victoria Island, Lagos',
    price: 0, // Free
    imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&auto=format&fit=crop&q=80',
    description: 'The premier conference for artificial intelligence in Africa. Discover how machine learning, LLMs, and computer vision are shaping agriculture, fintech, and public services on the continent. Meet founders, researchers, and government leaders driving AI policies in Lagos and across Africa.',
    featured: false,
    recommended: true,
    liveStream: true
  },
  {
    id: 3,
    title: 'Round Table Summit',
    date: 'June 20, 2026',
    time: '1:00 PM WAT',
    venue: 'E.A Center, Ring Road',
    location: 'Ibadan, Nigeria',
    price: 10,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    description: 'An executive gathering focused on corporate governance, technology investments, and entrepreneurial scaling in Nigeria. Network with top executives, discuss growth strategies in emerging markets, and join panel discussions on scaling local operations to regional heights.',
    featured: false,
    recommended: true,
    liveStream: false
  },
  {
    id: 4,
    title: 'Lekki Trade Fair',
    date: 'Saturday, July 7, 2026',
    time: '9:00 AM WAT',
    venue: 'LTF Zone, Lekki Phase 1',
    location: 'Lekki, Lagos',
    price: 20,
    imageUrl: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&auto=format&fit=crop&q=80',
    description: 'Expose your business and discover top-tier consumer products at the Lekki Trade Fair. Ranging from fashion, technological gadgets, food products, and home decor, this exhibition represents the vibrant Lagos business ecosystem. Admission includes food tasting coupons and raffle tickets.',
    featured: false,
    recommended: false,
    liveStream: false
  },
  {
    id: 5,
    title: 'Fintech Meetup',
    date: 'Saturday, July 9, 2026',
    time: '5:00 PM WAT',
    venue: 'Legacy Hall, Ajah Road',
    location: 'Ajah, Lagos',
    price: 0, // Free
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    description: 'Connect with fintech founders, product managers, and developers in Lagos. Discussions focus on payment APIs, cross-border remittance, micro-lending algorithms, and mobile money scaling. Free entry but registration is mandatory to secure entry pass.',
    featured: false,
    recommended: false,
    liveStream: false
  }
];

// Prepopulated tickets (Used & Expired) to show old tickets
const INITIAL_TICKETS = [
  {
    ticketId: 'SP-284918',
    status: 'upcoming',
    registeredAt: '2026-06-15T10:00:00Z',
    event: INITIAL_EVENTS[0] // Atmosphere of Jesus
  },
  {
    ticketId: 'SP-739184',
    status: 'used',
    registeredAt: '2025-11-15T09:00:00Z',
    event: {
      id: 101,
      title: 'Lagos Tech Expo 2025',
      date: 'Nov 15, 2025',
      time: '10:00 AM WAT',
      venue: 'Grand Ballroom, Eko Hotels',
      location: 'Victoria Island, Lagos',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    ticketId: 'SP-109283',
    status: 'expired',
    registeredAt: '2025-12-28T18:00:00Z',
    event: {
      id: 102,
      title: 'Afrobeats Fest 2025',
      date: 'Dec 28, 2025',
      time: '8:00 PM WAT',
      venue: 'Eko Energy City grounds',
      location: 'Victoria Island, Lagos',
      price: 50,
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80'
    }
  }
];

// Initial Mock Notifications
const INITIAL_NOTIFICATIONS = [
  { 
    id: 1, 
    type: 'support', 
    title: 'Support request resolved', 
    message: 'Welcome to ScanPass! If you have pass issues, check the support section.', 
    time: '2 hours ago', 
    read: true 
  },
  { 
    id: 2, 
    type: 'reminder', 
    title: 'Reminder: Africa AI Summit starts soon', 
    message: 'Verify your digital pass. The check-in gates open in 1 hour.', 
    time: '4 hours ago', 
    read: false 
  }
];

// Safe LocalStorage wrapper to handle disabled storage and invalid JSON parsing in browsers
const safeStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('Storage read blocked for:', key, e);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('Storage write blocked for:', key, e);
    }
  }
};

export default function App() {
  // Onboarding & Account State
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return safeStorage.getItem('scanpass_onboarded') === 'true';
  });
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = safeStorage.getItem('scanpass_profile');
      return saved ? JSON.parse(saved) : { name: 'Adewale Fisayo', location: 'Lekki, Lagos', interests: [] };
    } catch (e) {
      return { name: 'Adewale Fisayo', location: 'Lekki, Lagos', interests: [] };
    }
  });

  // Navigation State: discover, favourites, search, tickets, support, profile, notifications
  const [currentTab, setCurrentTab] = useState('discover');
  
  // App Core State
  const [events] = useState(INITIAL_EVENTS);
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = safeStorage.getItem('scanpass_reminders_v3');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = safeStorage.getItem('scanpass_favourites_v3');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = safeStorage.getItem('scanpass_tickets_v3');
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch (e) {
      return INITIAL_TICKETS;
    }
  });
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = safeStorage.getItem('scanpass_notifications_v3');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch (e) {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Checkout and Modal States
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [checkoutEvent, setCheckoutEvent] = useState(null);
  
  // Flow management steps: selection, payment, payment-failed, payment-success
  const [checkoutStep, setCheckoutStep] = useState(null);
  const [checkoutQuantity, setCheckoutQuantity] = useState(1);
  const [viewingTicket, setViewingTicket] = useState(null);
  const [lastCreatedTicketId, setLastCreatedTicketId] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Recommended events modal
  const [recModalOpen, setRecModalOpen] = useState(false);
  const [recModalEvents, setRecModalEvents] = useState([]);

  const handleShowRecommendedModal = (evs) => {
    setRecModalEvents(evs);
    setRecModalOpen(true);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    safeStorage.setItem('scanpass_onboarded', isOnboarded ? 'true' : 'false');
  }, [isOnboarded]);

  useEffect(() => {
    safeStorage.setItem('scanpass_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    safeStorage.setItem('scanpass_reminders_v3', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    safeStorage.setItem('scanpass_favourites_v3', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    safeStorage.setItem('scanpass_tickets_v3', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    safeStorage.setItem('scanpass_notifications_v3', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Add Notification Helper
  const addNotification = (title, message, type = 'reminder') => {
    const newNotif = {
      id: Date.now(),
      type,
      title,
      message,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Handle Complete Onboarding
  const handleCompleteOnboarding = (userData) => {
    setUserProfile(userData);
    setIsOnboarded(true);
    showToast(`Welcome, ${userData.name.split(' ')[0]}!`);
    addNotification(
      'Account Created Successfully',
      `Welcome to ScanPass, ${userData.name}! Search and book passes for upcoming events.`,
      'purchase'
    );
  };

  // Event Handlers
  const handleToggleReminder = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (reminders.includes(eventId)) {
      setReminders(prev => prev.filter(id => id !== eventId));
      showToast(`Reminder removed for ${event.title}`);
    } else {
      setReminders(prev => [...prev, eventId]);
      showToast(`Reminder set for ${event.title}!`);
      addNotification(
        'Reminder Scheduled',
        `We will notify you 1 hour before ${event.title} starts.`,
        'reminder'
      );
    }
  };

  const handleToggleFavourite = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (favourites.includes(eventId)) {
      setFavourites(prev => prev.filter(id => id !== eventId));
      showToast(`Removed ${event.title} from Favourites`);
    } else {
      setFavourites(prev => [...prev, eventId]);
      showToast(`Added ${event.title} to Favourites!`);
    }
  };

  // Trigger Booking flow
  const handleStartBooking = (event) => {
    setSelectedEvent(null); // Close details full-page
    setCheckoutEvent(event);
    setCheckoutStep('selection');
  };

  // Transition from Selection to Payment Form
  const handleStartPayment = (quantity) => {
    setCheckoutQuantity(quantity);
    setCheckoutStep('payment');
  };

  // Complete Payment Process (Priced vs Free)
  const handleProcessPayment = (totalPrice) => {
    // Bypassed failure simulation as requested so payment always succeeds immediately
    handleBookSuccess(checkoutEvent);
  };

  // Register Ticket Success
  const handleBookSuccess = (event) => {
    // Check if ticket is already booked
    if (tickets.some(t => t.event.id === event.id && t.status === 'upcoming')) {
      showToast(`You already have a pass for ${event.title}!`);
      setCheckoutEvent(null);
      setCheckoutStep(null);
      setCurrentTab('tickets');
      return;
    }

    const randomId = `SP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTicket = {
      ticketId: randomId,
      status: 'upcoming',
      event: event,
      registeredAt: new Date().toISOString()
    };

    setTickets(prev => [newTicket, ...prev]);
    setLastCreatedTicketId(randomId);
    setCheckoutStep('payment-success');
    
    // Add success notification
    addNotification(
      'Pass Booked Successfully',
      `You secured your pass for ${event.title}. QR ticket id is ${randomId}.`,
      'purchase'
    );
  };

  const handleRemoveTicket = (ticketId) => {
    const ticket = tickets.find(t => t.ticketId === ticketId);
    setTickets(prev => prev.filter(t => t.ticketId !== ticketId));
    showToast(`Pass for ${ticket.event.title} cancelled.`);
  };

  // Notification Operations
  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared.');
  };

  const hasUnreadNotifications = notifications.some(n => !n.read);

  // Render correct screen content based on active tab
  const renderScreenContent = () => {
    // Flow 0: Full-page ticket QR details screen (Generated QR Screen)
    if (viewingTicket) {
      return (
        <TicketDetailsScreen 
          ticket={viewingTicket}
          onBack={() => setViewingTicket(null)}
          onSelectEvent={(event) => {
            setViewingTicket(null);
            setSelectedEvent(event);
          }}
        />
      );
    }

    // Flow 1: Checkout Steps
    if (checkoutStep === 'selection' && checkoutEvent) {
      return (
        <TicketSelection 
          event={checkoutEvent} 
          onBack={() => {
            setCheckoutStep(null);
            setSelectedEvent(checkoutEvent); // return to details screen
          }}
          onCompleteCheckout={handleStartPayment}
        />
      );
    }

    if (checkoutStep === 'payment' && checkoutEvent) {
      return (
        <PaymentScreen 
          event={checkoutEvent}
          quantity={checkoutQuantity}
          onBack={() => setCheckoutStep('selection')}
          onPay={handleProcessPayment}
        />
      );
    }

    if (checkoutStep === 'payment-failed' && checkoutEvent) {
      return (
        <PaymentFailedScreen 
          event={checkoutEvent} 
          onCancel={() => {
            setCheckoutStep(null);
            setCheckoutEvent(null);
          }}
          onSuccess={handleBookSuccess}
        />
      );
    }

    if (checkoutStep === 'payment-success' && checkoutEvent) {
      return (
        <PaymentSuccessScreen 
          event={checkoutEvent}
          ticketId={lastCreatedTicketId}
          onGoToTickets={() => {
            const newlyBooked = tickets.find(t => t.ticketId === lastCreatedTicketId);
            setCheckoutStep(null);
            setCheckoutEvent(null);
            if (newlyBooked) {
              setViewingTicket(newlyBooked);
            } else {
              setCurrentTab('tickets');
            }
          }}
          onBackToHome={() => {
            setCheckoutStep(null);
            setCheckoutEvent(null);
            setCurrentTab('discover');
          }}
        />
      );
    }

    // Flow 2: Full-page event details view
    if (selectedEvent) {
      return (
        <EventDetailsScreen 
          event={selectedEvent}
          onBack={() => setSelectedEvent(null)}
          onBuyTicket={handleStartBooking}
          isReminderSet={reminders.includes(selectedEvent.id)}
          onToggleReminder={handleToggleReminder}
          isFavourite={favourites.includes(selectedEvent.id)}
          onToggleFavourite={handleToggleFavourite}
        />
      );
    }

    switch (currentTab) {
      case 'discover':
        return (
          <DiscoverScreen
            events={events}
            onSelectEvent={setSelectedEvent}
            favourites={favourites}
            onToggleFavourite={handleToggleFavourite}
            userProfile={userProfile}
            onShowRecommendedModal={handleShowRecommendedModal}
          />
        );

      case 'favourites':
        const likedList = events.filter(e => favourites.includes(e.id));
        return (
          <div className="screen-container fade-in">
            {/* FIXED HEADER */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
              <Heart size={26} color="var(--primary-orange)" fill="var(--primary-orange)" />
              <h1 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '700' }}>Favourites</h1>
            </div>
            
            {/* SCROLLABLE CONTENT */}
            <div className="scrollable-content">
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Events you have bookmarked. Click to view detailed information or secure your entry passes.
              </p>
              
              <div className="upcoming-list" style={{ marginTop: '10px' }}>
                {likedList.length > 0 ? (
                  likedList.map(event => (
                    <div 
                      key={event.id}
                      className="upcoming-card"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <img src={event.imageUrl} alt={event.title} className="upcoming-img" />
                      <div className="upcoming-info">
                        <h3 className="upcoming-title">{event.title}</h3>
                        <span className="upcoming-date">{event.date}</span>
                        <span className="upcoming-loc">{event.location}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavourite(event.id);
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--primary-orange)', cursor: 'pointer', padding: '6px' }}
                      >
                        <Heart size={20} fill="var(--primary-orange)" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '40px 20px', background: 'var(--bg-card)', borderRadius: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <Heart size={36} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
                    <p style={{ fontSize: '14px', fontWeight: '500' }}>Your Favourites list is empty.</p>
                    <p style={{ fontSize: '12px', marginTop: '4px' }}>Tap the heart buttons on events to bookmark them here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'tickets':
        return (
          <TicketsScreen 
            tickets={tickets}
            onRemoveTicket={handleRemoveTicket}
            onSelectTicket={setViewingTicket}
          />
        );

      case 'search':
        const searchFiltered = events.filter(e => 
          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.venue.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
          <div className="screen-container fade-in">
            {/* FIXED HEADER */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Search size={26} color="var(--primary-orange)" />
                <h1 style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '700' }}>Search</h1>
              </div>
              
              <div className="search-container" style={{ margin: 0 }}>
                <Search size={20} className="search-icon-left" />
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search events, venue or city..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            {/* SCROLLABLE RESULTS */}
            <div className="scrollable-content">
              <div className="upcoming-list" style={{ marginTop: '10px' }}>
                {searchQuery && searchFiltered.map(event => (
                  <div 
                    key={event.id}
                    className="upcoming-card"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <img src={event.imageUrl} alt={event.title} className="upcoming-img" />
                    <div className="upcoming-info">
                      <h3 className="upcoming-title">{event.title}</h3>
                      <span className="upcoming-date">{event.date}</span>
                      <span className="upcoming-loc">{event.location}</span>
                    </div>
                    <div className="upcoming-price">
                      {event.price === 0 ? 'Free' : `₦${(event.price * 1000).toLocaleString()}`}
                    </div>
                  </div>
                ))}
                
                {!searchQuery && (
                  <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px 20px' }}>
                    Type keywords to search events in Lagos, Ibadan, and more.
                  </div>
                )}
                
                {searchQuery && searchFiltered.length === 0 && (
                  <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px 20px' }}>
                    No results found for "{searchQuery}".
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'support':
        return (
          <SupportScreen 
            onSubmitSuccess={() => {
              showToast("Support request sent! We'll reply within 24h.");
              setCurrentTab('discover');
            }}
          />
        );

      case 'notifications':
        return (
          <NotificationsScreen 
            notifications={notifications}
            onMarkAllRead={handleMarkAllNotificationsRead}
            onClearAll={handleClearAllNotifications}
          />
        );

      case 'profile':
        return (
          <ProfileScreen 
            tickets={tickets.filter(t => t.status === 'upcoming')}
            onRemoveTicket={handleRemoveTicket}
            onNavigateToSupport={() => setCurrentTab('support')}
            userProfile={userProfile}
            onUpdateProfile={(updated) => {
              setUserProfile(updated);
              showToast("Profile updated successfully!");
            }}
            onSelectTicket={setViewingTicket}
            onLogout={() => {
              setIsOnboarded(false);
              safeStorage.setItem('scanpass_onboarded', 'false');
              setCurrentTab('discover');
            }}
          />
        );

      default:
        return null;
    }
  };

  // If user has not completed onboarding flow, override with OnboardingFlow
  if (!isOnboarded) {
    return <OnboardingFlow onComplete={handleCompleteOnboarding} />;
  }

  // Show nav bar only on main tab screens (not on event detail, checkout, or ticket details)
  const showNav = !selectedEvent && !checkoutStep && !viewingTicket;
  const isDiscover = currentTab === 'discover' && showNav;
  const isFavTab = currentTab === 'favourites' && showNav;
  const isTickets = currentTab === 'tickets' && showNav;
  const isAlerts = currentTab === 'notifications' && showNav;
  const isProfile = currentTab === 'profile' && showNav;

  const navBtnStyle = (active) => ({
    background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
    padding: '0',
    opacity: active ? 1 : 1
  });

  return (
    <div className="device-emulator">
      <div className="iphone-frame" style={{ position: 'relative' }}>
        {/* Desktop Navigation Header */}
        <header className="desktop-header">
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
            onClick={() => { setViewingTicket(null); setSelectedEvent(null); setCheckoutStep(null); setCurrentTab('discover'); }}
          >
            <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-orange)', fontFamily: 'Outfit' }}>⚡ ScanPass</span>
          </div>
          <nav className="desktop-nav-links">
            <button onClick={() => { setViewingTicket(null); setSelectedEvent(null); setCheckoutStep(null); setCurrentTab('discover'); }} className={`desktop-nav-btn ${currentTab === 'discover' ? 'active' : ''}`}>Discover</button>
            <button onClick={() => { setViewingTicket(null); setSelectedEvent(null); setCheckoutStep(null); setCurrentTab('favourites'); }} className={`desktop-nav-btn ${currentTab === 'favourites' ? 'active' : ''}`}>Favourites</button>
            <button onClick={() => { setViewingTicket(null); setSelectedEvent(null); setCheckoutStep(null); setCurrentTab('tickets'); }} className={`desktop-nav-btn ${currentTab === 'tickets' ? 'active' : ''}`}>My Ticket</button>
            <button onClick={() => { setViewingTicket(null); setSelectedEvent(null); setCheckoutStep(null); setCurrentTab('notifications'); }} className={`desktop-nav-btn ${currentTab === 'notifications' ? 'active' : ''}`}>Notification</button>
            <button onClick={() => { setViewingTicket(null); setSelectedEvent(null); setCheckoutStep(null); setCurrentTab('profile'); }} className={`desktop-nav-btn ${currentTab === 'profile' ? 'active' : ''}`}>Profile</button>
          </nav>
        </header>

        {/* Toast Notification Success Banner */}
        {toastMessage && (
          <div className="toast-success">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ── Screen Content (flex:1 so it fills space between header and nav) ── */}
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {renderScreenContent()}
        </div>

        {/* ══════════════════════════════════════════════════
            FIGMA-EXACT BOTTOM NAV BAR
            Hidden when showing EventDetails or Checkout (those have their own bars)
            ══════════════════════════════════════════════════ */}
        {/* ══════════════════════════════════════════════════
            RECOMMENDED EVENTS MODAL OVERLAY
            Blurs entire phone screen, card pops up in center
            Tap anywhere outside card to close
            ══════════════════════════════════════════════════ */}
        {recModalOpen && (
          <div
            onClick={() => setRecModalOpen(false)}
            style={{
              position: 'absolute', inset: 0, zIndex: 2000,
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0 20px'
            }}
          >
            {/* Card — click inside does NOT close */}
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: '#fff', borderRadius: '20px', width: '100%',
                maxHeight: '78%', display: 'flex', flexDirection: 'column',
                overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
              }}
            >
              {/* Modal header */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '18px 20px 12px', borderBottom: '1px solid #f4f4f5'
              }}>
                <span style={{ fontSize: '17px', fontWeight: '700', color: '#18181b', fontFamily: 'Inter, sans-serif' }}>
                  Recommended for you
                </span>
                <button
                  onClick={() => setRecModalOpen(false)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '14px', color: '#f97316', fontWeight: '600', fontFamily: 'Inter, sans-serif'
                  }}
                >Cancel</button>
              </div>

              {/* Scrollable event list */}
              <div style={{ overflowY: 'auto', padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recModalEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => { setRecModalOpen(false); setSelectedEvent(event); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      background: '#fff', borderRadius: '10px', padding: '10px',
                      boxShadow: '0px 1px 4px rgba(0,0,0,0.10)', outline: '0.5px solid #f97316',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={event.imageUrl} alt={event.title}
                      style={{ width: '72px', height: '56px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#18181b', lineHeight: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {event.title}
                      </span>
                      <span style={{ fontSize: '12px', color: '#f97316' }}>{event.date.split(',')[0]}</span>
                      <span style={{ fontSize: '11px', color: '#52525b' }}>{event.location}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#f97316', fontWeight: '700', flexShrink: 0 }}>
                      {event.price === 0 ? 'Free' : `₦${(event.price * 1000).toLocaleString()}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showNav && (
          <div className="bottom-nav" style={{
            flexShrink: 0, height: '80px',
            background: '#fff0f0',
            boxShadow: '0px -1px 4px 0px rgba(0,0,0,0.25)',
            display: 'flex', alignItems: 'center', paddingBottom: '6px',
            position: 'relative', zIndex: 999, overflow: 'visible'
          }}>

            {/* ── Active indicator: sits at the very top edge of nav bar ── */}
            {isDiscover && <div style={{ position: 'absolute', top: 0, left: '10%', transform: 'translateX(-50%)', width: '32px', height: '3px', background: '#000', borderRadius: '0 0 3px 3px' }} />}
            {isFavTab  && <div style={{ position: 'absolute', top: 0, left: '30%', transform: 'translateX(-50%)', width: '32px', height: '3px', background: '#000', borderRadius: '0 0 3px 3px' }} />}
            {isAlerts  && <div style={{ position: 'absolute', top: 0, left: '70%', transform: 'translateX(-50%)', width: '32px', height: '3px', background: '#000', borderRadius: '0 0 3px 3px' }} />}
            {isProfile && <div style={{ position: 'absolute', top: 0, left: '90%', transform: 'translateX(-50%)', width: '32px', height: '3px', background: '#000', borderRadius: '0 0 3px 3px' }} />}

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', width: '100%', padding: '0 8px' }}>

              {/* Discover */}
              <button
                onClick={() => { setSelectedEvent(null); setCheckoutStep(null); setViewingTicket(null); setCurrentTab('discover'); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 8px' }}
              >
                <Compass size={22} color={isDiscover ? '#000' : '#737373'} />
                <span style={{ fontSize: '10px', fontWeight: isDiscover ? '700' : '500', color: isDiscover ? '#000' : '#737373', fontFamily: 'Inter, sans-serif', lineHeight: '13px', whiteSpace: 'nowrap' }}>Discover</span>
              </button>

              {/* Favourites */}
              <button
                onClick={() => { setSelectedEvent(null); setCheckoutStep(null); setViewingTicket(null); setCurrentTab('favourites'); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 8px' }}
              >
                <Heart size={22} color={isFavTab ? '#000' : '#737373'} fill={isFavTab ? '#000' : 'none'} />
                <span style={{ fontSize: '10px', fontWeight: isFavTab ? '700' : '500', color: isFavTab ? '#000' : '#737373', fontFamily: 'Inter, sans-serif', lineHeight: '13px', whiteSpace: 'nowrap' }}>Favourites</span>
              </button>

              {/* Center My Ticket button — elevated above nav bar */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', marginTop: '-28px' }}>
                <button
                  onClick={() => { setSelectedEvent(null); setCheckoutStep(null); setViewingTicket(null); setCurrentTab('tickets'); }}
                  style={{
                    width: '58px', height: '58px', background: '#f97316',
                    borderRadius: '50%', border: '3px solid #fff0f0', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(249,115,22,0.35)', flexShrink: 0
                  }}
                  aria-label="My Tickets"
                >
                  <QrCode size={24} color="white" />
                </button>
                <span style={{ fontSize: '10px', fontWeight: isTickets ? '700' : '500', color: isTickets ? '#000' : '#737373', fontFamily: 'Inter, sans-serif', lineHeight: '13px', whiteSpace: 'nowrap' }}>My Ticket</span>
              </div>

              {/* Notification */}
              <button
                onClick={() => { setSelectedEvent(null); setCheckoutStep(null); setViewingTicket(null); setCurrentTab('notifications'); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 8px' }}
              >
                <div style={{ position: 'relative' }}>
                  <Bell size={22} color={isAlerts ? '#000' : '#737373'} />
                  {hasUnreadNotifications && (
                    <div style={{ position: 'absolute', top: '-1px', right: '-3px', width: '8px', height: '8px', background: '#f97316', borderRadius: '50%' }} />
                  )}
                </div>
                <span style={{ fontSize: '10px', fontWeight: isAlerts ? '700' : '500', color: isAlerts ? '#000' : '#737373', fontFamily: 'Inter, sans-serif', lineHeight: '13px', whiteSpace: 'nowrap' }}>Notification</span>
              </button>

              {/* Profile */}
              <button
                onClick={() => { setSelectedEvent(null); setCheckoutStep(null); setViewingTicket(null); setCurrentTab('profile'); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 8px' }}
              >
                <User size={22} color={isProfile ? '#000' : '#737373'} />
                <span style={{ fontSize: '10px', fontWeight: isProfile ? '700' : '500', color: isProfile ? '#000' : '#737373', fontFamily: 'Inter, sans-serif', lineHeight: '13px', whiteSpace: 'nowrap' }}>Profile</span>
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
