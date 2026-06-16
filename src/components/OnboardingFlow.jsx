import React, { useState, useEffect } from 'react';
import { Compass, Shield, Users, Mail, Lock, User, ArrowRight, MapPin, Check, RefreshCw, AlertCircle, Eye, EyeOff, Laptop, Trophy, Briefcase, Palette, Music, Utensils, Paintbrush, FlaskConical, Heart, GraduationCap, Rocket, Search } from 'lucide-react';
import locationIllustration from '../assets/location_illustration.png';

// Figma Brand QR-pattern Logo SVG
function ScanPassLogo({ size = 48, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top-Left Finder */}
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2.5" />
      <rect x="4.5" y="4.5" width="2" height="2" rx="0.5" fill={color} />
      
      {/* Top-Right Finder */}
      <rect x="15" y="2" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2.5" />
      <rect x="17.5" y="4.5" width="2" height="2" rx="0.5" fill={color} />
      
      {/* Bottom-Left Finder */}
      <rect x="2" y="15" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2.5" />
      <rect x="4.5" y="17.5" width="2" height="2" rx="0.5" fill={color} />
      
      {/* Bottom-Right custom blocks (stylized QR) */}
      <rect x="15" y="15" width="3" height="3" rx="0.75" fill={color} />
      <rect x="19" y="19" width="3" height="3" rx="0.75" fill={color} />
      <rect x="19" y="15" width="2" height="2" rx="0.5" fill={color} />
      <rect x="15" y="19" width="2" height="2" rx="0.5" fill={color} />
    </svg>
  );
}

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState('splash'); // splash, get-started, role-selection, signup, login, forgot-password, verify-otp, reset-password, location-permission, location-search, interests
  const [role, setRole] = useState('attendee'); // attendee, staff, organizer
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // New auth/reset password form states
  const [resetPasswordForm, setResetPasswordForm] = useState({ password: '', confirmPassword: '' });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  let stepContent = null;

  // Splash screen auto-transition
  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => {
        setStep('get-started');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(prev => prev.filter(i => i !== interest));
    } else {
      setSelectedInterests(prev => [...prev, interest]);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!signupForm.name || !signupForm.email || !signupForm.password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('location-permission');
    }, 1000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!loginForm.email || !loginForm.password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('location-permission');
    }, 1000);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('verify-otp');
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setAuthError('');
    if (otp.length < 4) {
      setAuthError('Please enter a 4-digit code.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('reset-password');
    }, 1000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!resetPasswordForm.password || !resetPasswordForm.confirmPassword) {
      setAuthError("All fields are required.");
      return;
    }
    if (resetPasswordForm.password !== resetPasswordForm.confirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('location-permission');
    }, 1000);
  };

  const handleLocationConfirm = (locationName) => {
    setSearchLocation(locationName);
    setStep('interests');
  };

  const handleFinish = () => {
    onComplete({
      name: signupForm.name || 'Adewale Fisayo',
      location: searchLocation || 'Lekki, Lagos',
      interests: selectedInterests,
      role: role
    });
  };

  // 1. Splash Screen Render (Figma Template)
  if (step === 'splash') {
    stepContent = (
      <div className="relative opacity-90 bg-orange-500 overflow-hidden fade-in" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="w-[492px] h-[874px] left-[-38px] top-0 absolute" />
        <div className="w-48 top-[360px] absolute inline-flex flex-col justify-start items-center gap-4" style={{ left: 0, right: 0, margin: '0 auto' }}>
          <ScanPassLogo size={64} color="white" />
          <div className="self-stretch text-center justify-start text-white text-4xl font-extrabold font-outfit" style={{ letterSpacing: '-0.5px' }}>ScanPass</div>
        </div>
      </div>
    );
  }

  // 2. Get Started Screen (Figma Template - Onboarding Screen 1)
  if (step === 'get-started') {
    stepContent = (
      <div className="screen-container fade-in" style={{ padding: '32px 20px 24px 20px', display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'flex-start', background: '#ffffff', overflowY: 'auto', gap: '24px', boxSizing: 'border-box' }}>

        
        {/* Image Frame */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }}>
          <img 
            style={{ width: '100%', maxHeight: '280px', borderRadius: '24px', objectFit: 'cover' }}
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80" 
            alt="Event Check-in Illustration"
          />
        </div>

        {/* Title and details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'center', marginBottom: '20px' }}>
          <div className="self-stretch">
            <span className="text-zinc-900 text-3xl font-bold font-outfit">The </span>
            <span className="text-orange-500 text-3xl font-bold font-outfit">Smarter Way</span>
            <span className="text-zinc-900 text-3xl font-bold font-outfit"> <br/>to Manage Event Access.</span>
          </div>
          <div className="text-center justify-start text-zinc-900 text-sm font-normal font-inter" style={{ color: 'var(--text-secondary)', alignSelf: 'center', maxWidth: '300px' }}>
            From ticket generation to event entry, ScanPass makes check-in faster, safer, and fully trackable.
          </div>
        </div>

        {/* Buttons & Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <button 
            onClick={() => setStep('role-selection')}
            className="primary-button"
          >
            Get Started
          </button>

          <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <span 
              onClick={() => { setRole('attendee'); setStep('login'); }}
              style={{ color: 'var(--primary-orange)', fontWeight: '700', cursor: 'pointer' }}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Role Selection Screen (Figma Template - Onboarding Screen 2 with Organize Event card)
  if (step === 'role-selection') {
    stepContent = (
      <div className="screen-container fade-in" style={{ padding: '32px 20px 24px 20px', display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'flex-start', background: '#ffffff', overflowY: 'auto', gap: '24px', boxSizing: 'border-box' }}>


        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
          <h2 className="font-outfit" style={{ fontSize: '26px', fontWeight: '800', lineHeight: 1.25 }}>
            Set up your <span style={{ color: 'var(--primary-orange)' }}>ScanPass</span> Experience
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            We’ll streamline your setup experience accordingly.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '20px 0', flex: 1, justifyContent: 'center' }}>
          {/* Card 1: Attend an Event */}
          <div 
            onClick={() => setRole('attendee')}
            style={{ 
              cursor: 'pointer',
              display: 'flex',
              padding: '16px',
              borderRadius: '16px',
              border: `2px solid ${role === 'attendee' ? 'var(--primary-orange)' : 'var(--border-light)'}`,
              background: role === 'attendee' ? 'var(--bg-brand-light-alt)' : 'white',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div className="size-9 bg-orange-500 text-white rounded-full flex items-center justify-center" style={{ flexShrink: 0 }}>
              <User size={18} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="font-outfit" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>Attend an Event</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.3 }}>
                Receive your QR ticket, access events seamlessly, and get verified instantly at entry.
              </p>
            </div>
            <div className="size-7 bg-orange-500 rounded-full flex items-center justify-center" style={{ flexShrink: 0 }}>
              <ArrowRight size={14} color="white" strokeWidth={3} />
            </div>
          </div>

          {/* Card 2: Staff Access */}
          <div 
            onClick={() => setRole('staff')}
            style={{ 
              cursor: 'pointer',
              display: 'flex',
              padding: '16px',
              borderRadius: '16px',
              border: `2px solid ${role === 'staff' ? 'var(--primary-orange)' : 'var(--border-light)'}`,
              background: role === 'staff' ? 'var(--bg-brand-light-alt)' : 'white',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div className="size-9 bg-orange-500 text-white rounded-full flex items-center justify-center" style={{ flexShrink: 0 }}>
              <Shield size={18} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="font-outfit" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>Staff Access</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.3 }}>
                Scan tickets, validate entries, and manage attendee check-ins efficiently.
              </p>
            </div>
            <div className="size-7 bg-orange-500 rounded-full flex items-center justify-center" style={{ flexShrink: 0 }}>
              <ArrowRight size={14} color="white" strokeWidth={3} />
            </div>
          </div>

          {/* Card 3: Organize an Event */}
          <div 
            onClick={() => setRole('organizer')}
            style={{ 
              cursor: 'pointer',
              display: 'flex',
              padding: '16px',
              borderRadius: '16px',
              border: `2px solid ${role === 'organizer' ? 'var(--primary-orange)' : 'var(--border-light)'}`,
              background: role === 'organizer' ? 'var(--bg-brand-light-alt)' : 'white',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div className="size-9 bg-orange-500 text-white rounded-full flex items-center justify-center" style={{ flexShrink: 0 }}>
              <Users size={18} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="font-outfit" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>Organize an Event</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.3 }}>
                Publish events, configure tickets, track stats, and manage entrances.
              </p>
            </div>
            <div className="size-7 bg-orange-500 rounded-full flex items-center justify-center" style={{ flexShrink: 0 }}>
              <ArrowRight size={14} color="white" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Buttons & Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <button 
            onClick={() => {
              if (role === 'attendee') {
                setStep('signup');
              } else {
                setStep('login');
              }
            }}
            className="primary-button"
          >
            Continue
          </button>

          <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <span 
              onClick={() => setStep('login')}
              style={{ color: 'var(--primary-orange)', fontWeight: '700', cursor: 'pointer' }}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 4. Sign Up Screen (Attendee Figma Template)
  if (step === 'signup') {
    stepContent = (
      <div className="screen-container fade-in" style={{ padding: '24px 20px 16px 20px', display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'flex-start', background: '#ffffff', overflowY: 'auto', gap: '12px', boxSizing: 'border-box' }}>


        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px', flexShrink: 0 }}>
          <h2 className="font-outfit" style={{ fontSize: '28px', fontWeight: '800' }}>
            Join the <span style={{ color: 'var(--primary-orange)' }}>Energy</span>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Create an account to discover upcoming festivals, conferences, and workshops tailored for you.
          </p>
        </div>

        {/* Form container */}
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '12px 0 0 0', flex: 1 }}>
          {/* Full Name */}
          <div className="form-group" style={{ marginBottom: '0px' }}>
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="Enter your full name"
              value={signupForm.name}
              onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          {/* Email Address */}
          <div className="form-group" style={{ marginBottom: '0px' }}>
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={16} style={{ position: 'absolute', left: '16px', color: 'var(--text-secondary)' }} />
              <input 
                type="email" 
                className="form-input"
                placeholder="name@gmail.com"
                style={{ paddingLeft: '44px' }}
                value={signupForm.email}
                onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group" style={{ marginBottom: '0px' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={16} style={{ position: 'absolute', left: '16px', color: 'var(--text-secondary)' }} />
              <input 
                type={showSignupPassword ? "text" : "password"} 
                className="form-input"
                placeholder="••••••••"
                style={{ paddingLeft: '44px', paddingRight: '44px' }}
                value={signupForm.password}
                onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                required
              />
              <button 
                type="button"
                onClick={() => setShowSignupPassword(!showSignupPassword)}
                style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                {showSignupPassword ? <EyeOff size={16} color="var(--text-secondary)" /> : <Eye size={16} color="var(--text-secondary)" />}
              </button>
            </div>
          </div>

          {/* Remember Me / Forgot Password */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
              <input type="checkbox" className="size-4 bg-white border border-zinc-300 rounded" style={{ cursor: 'pointer' }} />
              <span>Remember Me</span>
            </label>
            <span 
              onClick={() => setStep('forgot-password')}
              style={{ fontSize: '13px', color: 'var(--primary-orange)', fontWeight: '600', cursor: 'pointer' }}
            >
              Forgot Password?
            </span>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="primary-button"
            style={{ marginTop: '4px' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Social divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '6px 0', gap: '12px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
          </div>

          {/* Social login buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              type="button"
              onClick={() => handleLocationConfirm('Lekki, Lagos')}
              className="secondary-button"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#4285F4', border: 'none', color: '#ffffff', fontWeight: '600', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', background: 'white', borderRadius: '50%', fontSize: '11px', fontWeight: 'bold', color: '#4285F4' }}>G</span> Google
            </button>
            <button 
              type="button"
              onClick={() => handleLocationConfirm('Lekki, Lagos')}
              className="secondary-button"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#000000', border: 'none', color: '#ffffff', fontWeight: '600', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '16px', color: '#fff', lineHeight: 1 }}></span> Apple
            </button>
          </div>
        </form>

        {/* Footer links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', marginTop: '0px', flexShrink: 0 }}>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <span 
              onClick={() => setStep('login')}
              style={{ color: 'var(--primary-orange)', fontWeight: '700', cursor: 'pointer' }}
            >
              Log in
            </span>
          </div>

          <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.4, maxWidth: '280px' }}>
            By creating an account you agree to ScanPass’s{' '}
            <span style={{ color: 'var(--primary-orange)', fontWeight: '600' }}>Terms of Service</span> and{' '}
            <span style={{ color: 'var(--primary-orange)', fontWeight: '600' }}>Privacy Policy</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. Login Screen (Attendee Figma Template)
  if (step === 'login') {
    stepContent = (
      <div className="screen-container fade-in" style={{ padding: '32px 20px 24px 20px', display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'flex-start', background: '#ffffff', overflowY: 'auto', gap: '24px', boxSizing: 'border-box' }}>


        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', flexShrink: 0 }}>
          <h2 className="font-outfit" style={{ fontSize: '28px', fontWeight: '800' }}>
            Welcome back!
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            {role !== 'attendee'
              ? 'Log in with your credentials to access staff or organizer tools.'
              : 'Log in to discover upcoming festivals, conferences, and workshops.'}
          </p>
        </div>

        {/* Form container */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '20px 0', flex: 1 }}>
          {/* Email Address */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={16} style={{ position: 'absolute', left: '16px', color: 'var(--text-secondary)' }} />
              <input 
                type="email" 
                className="form-input"
                placeholder="name@gmail.com"
                style={{ paddingLeft: '44px' }}
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={16} style={{ position: 'absolute', left: '16px', color: 'var(--text-secondary)' }} />
              <input 
                type={showLoginPassword ? "text" : "password"} 
                className="form-input"
                placeholder="••••••••"
                style={{ paddingLeft: '44px', paddingRight: '44px' }}
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                required
              />
              <button 
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                {showLoginPassword ? <EyeOff size={16} color="var(--text-secondary)" /> : <Eye size={16} color="var(--text-secondary)" />}
              </button>
            </div>
          </div>

          {/* Remember Me / Forgot Password */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
              <input type="checkbox" className="size-4 bg-white border border-zinc-300 rounded" style={{ cursor: 'pointer' }} />
              <span>Remember Me</span>
            </label>
            <span 
              onClick={() => setStep('forgot-password')}
              style={{ fontSize: '13px', color: 'var(--primary-orange)', fontWeight: '600', cursor: 'pointer' }}
            >
              Forgot Password?
            </span>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="primary-button"
            style={{ marginTop: '16px' }}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          {/* Social divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0', gap: '12px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }}></div>
          </div>

          {/* Social login buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              type="button"
              onClick={() => handleLocationConfirm('Lekki, Lagos')}
              className="secondary-button"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#4285F4', border: 'none', color: '#ffffff', fontWeight: '600', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', background: 'white', borderRadius: '50%', fontSize: '11px', fontWeight: 'bold', color: '#4285F4' }}>G</span> Google
            </button>
            <button 
              type="button"
              onClick={() => handleLocationConfirm('Lekki, Lagos')}
              className="secondary-button"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#000000', border: 'none', color: '#ffffff', fontWeight: '600', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '16px', color: '#fff', lineHeight: 1 }}></span> Apple
            </button>
          </div>
        </form>

        {/* Footer links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginTop: '10px', flexShrink: 0 }}>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <span 
              onClick={() => setStep('signup')}
              style={{ color: 'var(--primary-orange)', fontWeight: '700', cursor: 'pointer' }}
            >
              Sign Up
            </span>
          </div>

          <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.4, maxWidth: '280px' }}>
            By creating an account you agree to ScanPass’s{' '}
            <span style={{ color: 'var(--primary-orange)', fontWeight: '600' }}>Terms of Service</span> and{' '}
            <span style={{ color: 'var(--primary-orange)', fontWeight: '600' }}>Privacy Policy</span>
          </div>
        </div>
      </div>
    );
  }

  // 6. Forgot Password Screen
  if (step === 'forgot-password') {
    stepContent = (
      <div className="screen-container fade-in" style={{ padding: '32px 20px 24px 20px', display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'flex-start', background: '#ffffff', overflowY: 'auto', gap: '24px', boxSizing: 'border-box' }}>


        {/* Content Container (combining icon, header, and form) */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', margin: '24px 0' }}>
          
          {/* Envelope with Lock Icon */}
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
            <div className="relative flex items-center justify-center bg-orange-500 rounded-3xl" style={{ width: '96px', height: '96px', background: 'var(--primary-orange)' }}>
              <Mail size={44} color="white" />
              <div className="absolute bg-white rounded-full flex items-center justify-center shadow-md border-2 border-orange-500" style={{ right: '-4px', bottom: '-4px', width: '32px', height: '32px' }}>
                <Lock size={14} style={{ color: 'var(--primary-orange)' }} />
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            <h2 className="font-outfit" style={{ fontSize: '24px', fontWeight: '800', color: '#111827' }}>Forgot Password?</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              No worries! Enter your email address and we’ll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontFamily: 'Outfit', fontWeight: '600', color: '#000000' }}>Email Address</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', color: '#71717A' }} />
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Enter your email" 
                  style={{ paddingLeft: '48px', height: '48px', borderRadius: '8px', border: '1px solid #D4D4D8' }}
                  required
                />
              </div>
            </div>

            <button type="submit" className="primary-button" style={{ height: '48px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '12px' }}>
              Set Reset Link
            </button>

            {/* OR divider */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', gap: '12px' }}>
              <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }}></div>
              <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '500' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }}></div>
            </div>

            {/* Back to Sign In Outline Button */}
            <button 
              type="button"
              onClick={() => setStep('login')}
              className="secondary-button"
              style={{ 
                height: '48px',
                borderColor: '#E8622A', 
                color: '#E8622A', 
                background: 'white',
                borderWidth: '1.5px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'Outfit',
                fontWeight: '600'
              }}
            >
              <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
              Back to Sign In
            </button>
          </form>
        </div>

        {/* Footer text elements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', marginTop: 'auto', flexShrink: 0 }}>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#52525B', lineHeight: 1.5 }}>
            <span style={{ fontWeight: '600' }}>Can’t find the email?</span><br />
            Check your spam or promotions folder, or make sure you entered your correct email.
          </p>
          
          <div style={{ fontSize: '13px', color: '#000000', fontFamily: 'Outfit' }}>
            Need help?{' '}
            <span 
              onClick={() => handleLocationConfirm('Lekki, Lagos')}
              style={{ color: '#E8622A', fontWeight: '700', cursor: 'pointer' }}
            >
              Contact Support
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 7. Verify OTP Screen
  if (step === 'verify-otp') {
    stepContent = (
      <div className="screen-container fade-in" style={{ padding: '32px 20px 24px 20px', display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'flex-start', background: '#ffffff', overflowY: 'auto', gap: '24px', boxSizing: 'border-box' }}>
        {/* Status bar & Back Arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>

          
          <button 
            onClick={() => setStep('forgot-password')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px 0', alignSelf: 'flex-start', color: '#000000' }}
          >
            <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>

        {/* Content Container */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', margin: '20px 0' }}>
          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center', marginBottom: '32px' }}>
            <h2 className="font-outfit" style={{ fontSize: '26px', fontWeight: '800', color: '#000000' }}>Verify Code</h2>
            <p style={{ fontSize: '14px', color: '#52525B', lineHeight: 1.4, alignSelf: 'center', maxWidth: '280px' }}>
              Please enter the code we just sent to your email
            </p>
          </div>

          {/* Validation Error Banner */}
          {authError && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#991B1B', fontSize: '13px', marginBottom: '16px' }}>
              <AlertCircle size={16} />
              <span>{authError}</span>
            </div>
          )}

          {/* Form and OTP Inputs */}
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  pattern="\d*"
                  inputMode="numeric"
                  value={otp[index] || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val) {
                      const newOtp = otp.split('');
                      newOtp[index] = val;
                      setOtp(newOtp.join(''));
                      // Focus next box
                      if (index < 3) {
                        const nextInput = document.getElementById(`otp-${index + 1}`);
                        if (nextInput) nextInput.focus();
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      const newOtp = otp.split('');
                      newOtp[index] = '';
                      setOtp(newOtp.join(''));
                      // Focus previous box
                      if (index > 0) {
                        const prevInput = document.getElementById(`otp-${index - 1}`);
                        if (prevInput) prevInput.focus();
                      }
                    }
                  }}
                  style={{
                    width: '56px',
                    height: '56px',
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: '700',
                    borderRadius: '12px',
                    border: otp[index] ? '2px solid var(--primary-orange)' : '1px solid #D4D4D8',
                    background: '#F4F4F5',
                    color: '#000000',
                    outline: 'none',
                    transition: 'all 0.15s ease'
                  }}
                />
              ))}
            </div>

            <div style={{ textAlign: 'center', fontSize: '14px', color: '#71717A', fontFamily: 'Outfit' }}>
              Didn’t receive code?<br />
              <span style={{ color: 'var(--primary-orange)', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>Resend Code</span>
            </div>

            <button type="submit" className="primary-button" style={{ height: '48px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
              Continue
            </button>
          </form>
        </div>

        <div style={{ height: '40px' }} />
      </div>
    );
  }

  // 8. Reset Password Screen
  if (step === 'reset-password') {
    stepContent = (
      <div className="screen-container fade-in" style={{ padding: '32px 20px 24px 20px', display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'flex-start', background: '#ffffff', overflowY: 'auto', gap: '24px', boxSizing: 'border-box' }}>
        {/* Status bar & Back Arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>

          
          <button 
            onClick={() => setStep('verify-otp')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px 0', alignSelf: 'flex-start', color: '#000000' }}
          >
            <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>

        {/* Content Container */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', margin: '20px 0' }}>
          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            <h2 className="font-outfit" style={{ fontSize: '26px', fontWeight: '800', color: '#000000' }}>Enter New Password</h2>
            <p style={{ fontSize: '14px', color: '#52525B' }}>
              Enter and confirm your new secure password below.
            </p>
          </div>

          {/* Validation Error Banner */}
          {authError && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#991B1B', fontSize: '13px', marginBottom: '16px' }}>
              <AlertCircle size={16} />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* New Password */}
            <div className="form-group">
              <label className="form-label" style={{ fontFamily: 'Outfit', fontWeight: '600', color: '#000000' }}>New Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={16} style={{ position: 'absolute', left: '16px', color: '#71717A' }} />
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  className="form-input" 
                  placeholder="••••••••" 
                  style={{ paddingLeft: '44px', paddingRight: '44px', height: '48px', borderRadius: '8px', border: '1px solid #D4D4D8' }}
                  value={resetPasswordForm.password}
                  onChange={(e) => {
                    setAuthError('');
                    setResetPasswordForm(prev => ({ ...prev, password: e.target.value }));
                  }}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
                >
                  {showNewPassword ? <EyeOff size={16} color="#71717A" /> : <Eye size={16} color="#71717A" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label" style={{ fontFamily: 'Outfit', fontWeight: '600', color: '#000000' }}>Confirm password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={16} style={{ position: 'absolute', left: '16px', color: '#71717A' }} />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="form-input" 
                  placeholder="••••••••" 
                  style={{ paddingLeft: '44px', paddingRight: '44px', height: '48px', borderRadius: '8px', border: '1px solid #D4D4D8' }}
                  value={resetPasswordForm.confirmPassword}
                  onChange={(e) => {
                    setAuthError('');
                    setResetPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }));
                  }}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
                >
                  {showConfirmPassword ? <EyeOff size={16} color="#71717A" /> : <Eye size={16} color="#71717A" />}
                </button>
              </div>
            </div>

            <button type="submit" className="primary-button" style={{ height: '48px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
              Confirm Password
            </button>
          </form>
        </div>

        <div style={{ height: '40px' }} />
      </div>
    );
  }

  // 9. Location Permission Screen
  if (step === 'location-permission') {
    stepContent = (
      <div className="screen-container fade-in" style={{ padding: '32px 20px 24px 20px', display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'flex-start', background: '#ffffff', overflowY: 'auto', gap: '24px', boxSizing: 'border-box' }}>
        {/* Header & Skip Link */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '32px', flexShrink: 0 }}>
          <button 
            onClick={() => setStep('interests')}
            style={{ background: 'none', border: 'none', color: '#52525B', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Outfit' }}
          >
            Skip
          </button>
        </div>

        {/* Content Block */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '24px', margin: '16px 0' }}>
          {/* Title & Subtext */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h2 className="font-outfit" style={{ fontSize: '24px', fontWeight: '800', lineHeight: 1.25, color: '#000000' }}>
              Where do you want to attend events most?
            </h2>
            <p style={{ fontSize: '14px', color: '#52525B', lineHeight: 1.4 }}>
              We’ll use your location to recommend nearby events, faster check-ins, and relevant updates.
            </p>
          </div>

          {/* Map Illustration */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '24px 0' }}>
            <img 
              style={{ width: '100%', maxHeight: '260px', borderRadius: '24px', objectFit: 'contain' }}
              src={locationIllustration} 
              alt="Map and Location selection illustration"
            />
          </div>

          {/* Button */}
          <button 
            onClick={() => setStep('location-search')}
            className="primary-button"
            style={{ width: '100%', marginBottom: "16px", padding: '16px', height: '48px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            Select Location
          </button>
        </div>
      </div>
    );
  }

  // 10. Location Search Screen (Enter Manually)
  if (step === 'location-search') {
    const popularLocations = ['Lagos', 'Port-Harcourt', 'Abuja', 'Oyo'];
    
    stepContent = (
      <div className="relative bg-WHITE overflow-hidden" style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
        {/* Background Screen (Dimmed version of Location Permission) */}
        <div style={{ opacity: 0.2, padding: '24px 20px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', pointerEvents: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', height: '32px' }}>
            <div>Skip</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h2 className="font-outfit" style={{ fontSize: '24px', fontWeight: '800' }}>Where do you want to attend events most?</h2>
            <p>We’ll use your location to recommend nearby events, faster check-ins, and relevant updates.</p>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img style={{ width: '100%', maxHeight: '340px', borderRadius: '24px', objectFit: 'contain' }} src={locationIllustration} alt="" />
          </div>
          <button className="primary-button">Select Location</button>
        </div>

        {/* Bottom Sheet Modal Drawer Overlay */}
        <div className="modal-overlay" onClick={() => setStep('location-permission')}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '70%', display: 'flex', flexDirection: 'column', background: '#ffffff', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '20px 24px' }}>
            <div className="sheet-handle" style={{ width: '40px', height: '5px', background: '#E4E4E7', borderRadius: '99px', alignSelf: 'center', marginBottom: '20px' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
              <h2 className="sheet-title" style={{ fontSize: '22px', fontWeight: '700', color: '#000000', fontFamily: 'Outfit' }}>Search a Location</h2>
              
              {/* Search Bar Input */}
              <div className="search-container" style={{ margin: 0, position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
                <Search size={20} className="search-icon-left" style={{ position: 'absolute', left: '16px', color: '#71717A' }} />
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search..." 
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  style={{ width: '100%', height: '48px', paddingLeft: '48px', borderRadius: '8px', border: '1px solid #D4D4D8', fontSize: '14px', outline: 'none', background: '#F4F4F5' }}
                  autoFocus
                />
              </div>
            </div>

            {/* Popular Locations list */}
            <div className="scrollable-content" style={{ marginTop: '20px', overflowY: 'auto', flex: 1 }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#000000', marginBottom: '12px', fontFamily: 'Outfit' }}>Popular Locations</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {popularLocations
                  .filter(loc => loc.toLowerCase().includes(searchLocation.toLowerCase()))
                  .map(loc => (
                    <div 
                      key={loc}
                      onClick={() => handleLocationConfirm(loc)}
                      style={{
                        padding: '16px 0',
                        borderBottom: '1px solid #E4E4E7',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontWeight: '500',
                        fontSize: '16px',
                        color: '#18181B',
                        fontFamily: 'Outfit'
                      }}
                    >
                      <span>{loc}</span>
                      <MapPin size={16} color="#71717A" />
                    </div>
                  ))}
                  
                {popularLocations.filter(loc => loc.toLowerCase().includes(searchLocation.toLowerCase())).length === 0 && (
                  <div style={{ padding: '24px 0', textAlign: 'center', color: '#71717A', fontSize: '14px' }}>
                    No matching location found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 11. Interest Selection Screen
  if (step === 'interests') {
    const interests = [
      { id: 'tech', label: 'Tech & AI', icon: Laptop },
      { id: 'sports', label: 'Sports', icon: Trophy },
      { id: 'business', label: 'Business', icon: Briefcase },
      { id: 'design', label: 'Design', icon: Palette },
      { id: 'music', label: 'Music', icon: Music },
      { id: 'networking', label: 'Networking', icon: Users },
      { id: 'food', label: 'Food', icon: Utensils },
      { id: 'arts', label: 'Arts', icon: Paintbrush },
      { id: 'science', label: 'Science', icon: FlaskConical },
      { id: 'wellness', label: 'Wellness', icon: Heart },
      { id: 'education', label: 'Education', icon: GraduationCap },
      { id: 'startup', label: 'Startup', icon: Rocket }
    ];

    const canContinue = selectedInterests.length >= 3;

    stepContent = (
      <div className="screen-container fade-in" style={{ padding: '32px 20px 24px 20px', display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'flex-start', background: '#ffffff', overflowY: 'auto', gap: '24px', boxSizing: 'border-box' }}>
        {/* Header and Skip */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '32px', flexShrink: 0 }}>
          <button 
            onClick={handleFinish}
            style={{ background: 'none', border: 'none', color: '#52525B', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Outfit' }}
          >
            Skip
          </button>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', flexShrink: 0 }}>
          <h2 className="font-outfit" style={{ fontSize: '24px', fontWeight: '800', lineHeight: 1.25, color: '#000000' }}>
            What sparks your<br />interest?
          </h2>
          <p style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.4 }}>
            Select at least 3 categories to personalize your event feed. We’ll find the best workshops, conferences, and meetups for you.
          </p>
        </div>

        {/* Scrollable grid container */}
        <div className="scrollable-content" style={{ margin: '16px 0', paddingRight: '4px', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {interests.map(item => {
              const isSelected = selectedInterests.includes(item.id);
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.id}
                  onClick={() => handleInterestToggle(item.id)}
                  style={{
                    padding: '16px 12px',
                    borderRadius: '12px',
                    border: `1.5px solid ${isSelected ? 'var(--primary-orange)' : '#E4E4E7'}`,
                    background: isSelected ? '#FDF2EC' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontWeight: '600',
                    textAlign: 'center',
                    boxShadow: isSelected ? '0 4px 6px -1px rgba(232, 98, 42, 0.05)' : 'none',
                    transition: 'all 0.15s ease',
                    height: '92px'
                  }}
                >
                  <IconComponent size={24} style={{ color: isSelected ? 'var(--primary-orange)' : '#71717A' }} />
                  <span style={{ fontSize: '13px', color: isSelected ? 'var(--primary-orange)' : '#18181B', fontFamily: 'Outfit' }}>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Button */}
        <button 
          className="primary-button" 
          onClick={handleFinish}
          disabled={!canContinue}
          style={{ 
            padding: '16px 24px',
            background: canContinue ? 'var(--primary-orange)' : '#A1A1AA',
            boxShadow: canContinue ? '0 4px 12px rgba(232, 98, 42, 0.2)' : 'none',
            cursor: canContinue ? 'pointer' : 'not-allowed',
            width: '100%',
            height: '48px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: '600',
            fontFamily: 'Outfit',
            border: 'none',
            gap: '8px'
          }}
        >
          Continue
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  if (step === 'splash') {
    return stepContent;
  }

  return (
    <div className="onboarding-split-container">
      <div className="onboarding-brand-sidebar">
        <div className="onboarding-brand-content">
          <div className="brand-logo-wrapper">
            <ScanPassLogo size={64} color="white" />
            <h1 className="brand-title">ScanPass</h1>
          </div>
          <p className="brand-subtitle">Your pass to the experience</p>
          <div className="brand-features">
            <div className="brand-feature-item">
              <span className="feature-icon">⚡</span>
              <div>
                <h4>Instant Entry Passes</h4>
                <p>Get verified digital tickets sent straight to your device.</p>
              </div>
            </div>
            <div className="brand-feature-item">
              <span className="feature-icon">📍</span>
              <div>
                <h4>Discover Local Events</h4>
                <p>Explore conferences, festivals, and workshops in your city.</p>
              </div>
            </div>
            <div className="brand-feature-item">
              <span className="feature-icon">🔒</span>
              <div>
                <h4>Secure Payments</h4>
                <p>Your transactions are always encrypted and fully secure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="onboarding-form-area">
        <div className="onboarding-card-wrapper">
          {stepContent}
        </div>
      </div>
    </div>
  );
}
