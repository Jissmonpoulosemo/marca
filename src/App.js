// App.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import {
  Heart, Calendar, MapPin, Clock, Phone, Share2, Music, Play, Pause,
  ChevronDown, Copy, Check, X, ExternalLink, User, Users, Gift,
  MessageCircle, Navigation, Home, BookOpen, Image, Mail,
  Sparkles, Award, Menu, Volume2, VolumeX, Camera, Film, Star
} from 'lucide-react';

// Configuration
const CONFIG = {
  couple: { groom: 'ARJUN', bride: 'ANJALI' },
  date: '2026-12-27',
  venue: {
    name: 'The Grand Palace Hall',
    address: '123 Luxury Avenue, Beverly Hills, CA 90210',
    mapUrl: 'https://maps.google.com/maps?q=123+Luxury+Avenue+Beverly+Hills+CA'
  },
  events: [
    { icon: '💍', title: 'Engagement', date: 'Dec 26, 2026', time: '6:00 PM', venue: 'Rooftop Garden' },
    { icon: '🕊️', title: 'Wedding Ceremony', date: 'Dec 27, 2026', time: '9:00 AM', venue: 'Grand Hall' },
    { icon: '🥂', title: 'Reception', date: 'Dec 27, 2026', time: '7:00 PM', venue: 'Grand Ballroom' }
  ],
  story: [
    { year: '2019', title: 'The First Meeting', desc: 'A serendipitous encounter at a coffee shop in Paris.', img: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop' },
    { year: '2021', title: 'The Beginning', desc: 'Long walks and deeper conversations that sparked a connection.', img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop' },
    { year: '2024', title: 'A New Chapter', desc: 'Together we explored the world and built our dreams.', img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop' },
    { year: '2026', title: 'Forever Begins', desc: 'Two hearts become one in a celebration of love.', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop' }
  ],
  gallery: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1000&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=800&fit=crop'
  ],
  schedule: [
    { time: '08:30 AM', event: 'Guest Arrival' },
    { time: '09:00 AM', event: 'Wedding Ceremony' },
    { time: '11:00 AM', event: 'Blessings & Photography' },
    { time: '12:30 PM', event: 'Wedding Lunch' },
    { time: '06:30 PM', event: 'Reception' },
    { time: '08:00 PM', event: 'Dinner' }
  ],
  contacts: [
    { name: 'Bride\'s Family', phone: '+1234567890', whatsapp: '+1234567890' },
    { name: 'Groom\'s Family', phone: '+1234567891', whatsapp: '+1234567891' },
    { name: 'Wedding Coordinator', phone: '+1234567892', whatsapp: '+1234567892' }
  ],
  musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  social: { instagram: 'https://instagram.com', hashtag: '#ArjunWedsAnjali' },
  upi: { id: 'arjunanjali@upi', qr: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=arjunanjali@upi' }
};

// Helper Components
const Section = ({ children, className }) => (
  <section className={`section ${className || ''}`}>{children}</section>
);

const AnimatedTitle = ({ children, tag: Tag = 'h2' }) => (
  <Tag className="animated-title">{children}</Tag>
);

const FloatingParticles = () => {
  useEffect(() => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    const particles = [];

    const resize = () => {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas id="particles-canvas" className="particles-canvas" />;
};

// Main App
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCountdownZero, setIsCountdownZero] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Countdown logic
  useEffect(() => {
    const target = new Date(CONFIG.date).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setIsCountdownZero(true);
        clearInterval(interval);
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Audio setup
  useEffect(() => {
    const audio = new Audio(CONFIG.musicUrl);
    audio.loop = true;
    audioRef.current = audio;
    return () => audio.pause();
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const shareInvite = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${CONFIG.couple.groom} & ${CONFIG.couple.bride} Wedding`,
        text: `Join us for the wedding of ${CONFIG.couple.groom} & ${CONFIG.couple.bride}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRsvp = (e) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    setTimeout(() => setRsvpSubmitted(false), 3000);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Gallery Lightbox
  const openGallery = (index) => {
    setGalleryIndex(index);
    setShowGallery(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setShowGallery(false);
    document.body.style.overflow = 'auto';
  };

  const galleryNext = () => setGalleryIndex((i) => (i + 1) % CONFIG.gallery.length);
  const galleryPrev = () => setGalleryIndex((i) => (i - 1 + CONFIG.gallery.length) % CONFIG.gallery.length);

  // Navigation items
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'story', icon: BookOpen, label: 'Story' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'gallery', icon: Image, label: 'Gallery' },
    { id: 'rsvp', icon: Mail, label: 'RSVP' },
  ];

  return (
    <div className="app">
      {/* Loading Screen */}
      <div className="loading-screen">
        <div className="loading-content">
          <h1 className="loading-names">{CONFIG.couple.groom} & {CONFIG.couple.bride}</h1>
          <div className="loading-line" />
          <div className="loading-sub">Elegant Wedding</div>
        </div>
      </div>

      {/* Opening Screen */}
      {!isOpen && (
        <div className="opening-screen">
          <div className="opening-bg" />
          <div className="opening-content">
            <p className="opening-family">Together with their families</p>
            <h1 className="opening-names">{CONFIG.couple.groom} & {CONFIG.couple.bride}</h1>
            <p className="opening-invite">Invite you to celebrate their wedding</p>
            <p className="opening-date">{new Date(CONFIG.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <button className="open-btn" onClick={handleOpen}>
              Open Invitation
              <ChevronDown size={20} />
            </button>
            <div className="tap-pulse">Tap to open</div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {isOpen && (
        <>
          {/* Hero Section */}
          <Section id="home" className="hero-section">
            <div className="hero-bg">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop" alt="Couple" className="hero-img" />
              <div className="hero-overlay" />
            </div>
            <FloatingParticles />
            <div className="hero-content">
              <p className="hero-sub">THE WEDDING OF</p>
              <h1 className="hero-names">
                {CONFIG.couple.groom}<br />
                <span className="hero-amp">&</span><br />
                {CONFIG.couple.bride}
              </h1>
              <p className="hero-date">{new Date(CONFIG.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <div className="hero-scroll">
                <span>Scroll</span>
                <ChevronDown size={20} />
              </div>
            </div>
          </Section>

          {/* Countdown */}
          <Section className="countdown-section">
            <AnimatedTitle>Counting the Moments</AnimatedTitle>
            {isCountdownZero ? (
              <div className="countdown-zero">
                <span className="countdown-zero-text">Today is the day! 🎉</span>
                <div className="confetti">✨</div>
              </div>
            ) : (
              <div className="countdown-grid">
                {Object.entries(countdown).map(([key, val]) => (
                  <div key={key} className="countdown-item">
                    <span className="countdown-value">{String(val).padStart(2, '0')}</span>
                    <span className="countdown-label">{key.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Our Story */}
          <Section id="story" className="story-section">
            <AnimatedTitle>Our Story</AnimatedTitle>
            <div className="timeline">
              {CONFIG.story.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.desc}</p>
                    <img src={item.img} alt={item.title} className="timeline-img" />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Couple Section */}
          <Section className="couple-section">
            <AnimatedTitle>The Couple</AnimatedTitle>
            <div className="couple-grid">
              <div className="couple-card">
                <div className="couple-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=300&fit=crop" alt="Bride" className="couple-img" />
                </div>
                <h3>{CONFIG.couple.bride}</h3>
                <p>Daughter of Mr. & Mrs. Sharma</p>
              </div>
              <div className="couple-connector">❤️</div>
              <div className="couple-card">
                <div className="couple-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=300&fit=crop" alt="Groom" className="couple-img" />
                </div>
                <h3>{CONFIG.couple.groom}</h3>
                <p>Son of Mr. & Mrs. Verma</p>
              </div>
            </div>
          </Section>

          {/* Events */}
          <Section id="events" className="events-section">
            <AnimatedTitle>Wedding Events</AnimatedTitle>
            <div className="events-grid">
              {CONFIG.events.map((ev, i) => (
                <div key={i} className="event-card">
                  <div className="event-icon">{ev.icon}</div>
                  <h3>{ev.title}</h3>
                  <p className="event-date">{ev.date}</p>
                  <p className="event-time">{ev.time}</p>
                  <p className="event-venue">{ev.venue}</p>
                  <div className="event-actions">
                    <button className="event-btn" onClick={() => window.open(CONFIG.venue.mapUrl)}>
                      <MapPin size={16} /> View Location
                    </button>
                    <button className="event-btn">Add to Calendar</button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Venue */}
          <Section className="venue-section">
            <AnimatedTitle>Venue</AnimatedTitle>
            <div className="venue-card">
              <h3>{CONFIG.venue.name}</h3>
              <p>{CONFIG.venue.address}</p>
              <iframe
                className="venue-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.621!2d-118.400!3d34.073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc!2sBeverly%20Hills!5e0!3m2!1sen!2sus!4v1700000000000"
                loading="lazy"
                title="Venue Map"
              />
              <button className="venue-btn" onClick={() => window.open(CONFIG.venue.mapUrl)}>
                Get Directions <ExternalLink size={16} />
              </button>
            </div>
          </Section>

          {/* Gallery */}
          <Section id="gallery" className="gallery-section">
            <AnimatedTitle>Photo Gallery</AnimatedTitle>
            <div className="gallery-grid">
              {CONFIG.gallery.map((img, i) => (
                <div key={i} className="gallery-item" onClick={() => openGallery(i)}>
                  <img src={img} alt={`Gallery ${i+1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </Section>

          {/* Video */}
          <Section className="video-section">
            <AnimatedTitle>A Glimpse of Our Journey</AnimatedTitle>
            <div className="video-container" onClick={() => setShowVideo(true)}>
              <img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=500&fit=crop" alt="Video Thumbnail" className="video-thumb" />
              <div className="video-play-btn">
                <Play size={40} fill="white" />
              </div>
            </div>
          </Section>

          {/* Schedule */}
          <Section className="schedule-section">
            <AnimatedTitle>Wedding Schedule</AnimatedTitle>
            <div className="schedule-timeline">
              {CONFIG.schedule.map((item, i) => (
                <div key={i} className="schedule-item">
                  <span className="schedule-time">{item.time}</span>
                  <span className="schedule-event">{item.event}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Dress Code */}
          <Section className="dresscode-section">
            <AnimatedTitle>Dress Code</AnimatedTitle>
            <div className="dresscode-content">
              <p className="dresscode-title">Traditional Elegance</p>
              <p>Come dressed in your favorite traditional attire and celebrate with us.</p>
              <div className="dresscode-icons">👘👔👗</div>
            </div>
          </Section>

          {/* RSVP */}
          <Section id="rsvp" className="rsvp-section">
            <AnimatedTitle>RSVP</AnimatedTitle>
            {rsvpSubmitted ? (
              <div className="rsvp-success">
                <Heart size={40} color="#b8860b" />
                <p>Thank you for celebrating with us ❤️</p>
              </div>
            ) : (
              <form className="rsvp-form" onSubmit={handleRsvp}>
                <input type="text" placeholder="Full Name" required className="rsvp-input" />
                <input type="number" placeholder="Number of Guests" className="rsvp-input" />
                <input type="tel" placeholder="Phone Number" className="rsvp-input" />
                <div className="rsvp-radio-group">
                  <label><input type="radio" name="attend" value="yes" /> YES, I'LL BE THERE</label>
                  <label><input type="radio" name="attend" value="no" /> SORRY, CAN'T MAKE IT</label>
                </div>
                <select className="rsvp-select">
                  <option>Meal Preference</option>
                  <option>Vegetarian</option>
                  <option>Non-Vegetarian</option>
                </select>
                <button type="submit" className="rsvp-btn">Send RSVP</button>
              </form>
            )}
          </Section>

          {/* Guest Wishes */}
          <Section className="wishes-section">
            <AnimatedTitle>Guest Wishes</AnimatedTitle>
            <div className="wishes-form">
              <input type="text" placeholder="Your Name" className="wishes-input" />
              <textarea placeholder="Your Message" className="wishes-textarea" />
              <button className="wishes-btn">Send Wish</button>
            </div>
            <div className="wishes-grid">
              <div className="wish-card">
                <p>"May your journey together be filled with love and happiness."</p>
                <span>— Rahul & Family</span>
              </div>
              <div className="wish-card">
                <p>"Wishing you a lifetime of joy and togetherness."</p>
                <span>— Priya</span>
              </div>
            </div>
          </Section>

          {/* Gift Section */}
          <Section className="gift-section">
            <AnimatedTitle>Your Presence Is Our Greatest Gift</AnimatedTitle>
            <p className="gift-text">Blessings and presence are more valuable than gifts. However, if you wish to bless us:</p>
            <div className="gift-card">
              <p>UPI: {CONFIG.upi.id}</p>
              <img src={CONFIG.upi.qr} alt="UPI QR" className="gift-qr" />
              <button className="gift-btn" onClick={() => { navigator.clipboard.writeText(CONFIG.upi.id); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
                {copied ? <Check size={16} /> : <Copy size={16} />} Copy UPI
              </button>
            </div>
          </Section>

          {/* Social */}
          <Section className="social-section">
            <AnimatedTitle>Share Your Moments</AnimatedTitle>
            <p className="social-hashtag">{CONFIG.social.hashtag}</p>
            <button className="social-btn" onClick={() => { navigator.clipboard.writeText(CONFIG.social.hashtag); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <Check size={16} /> : <Copy size={16} />} Copy Hashtag
            </button>
            <div className="social-links">
              <a href={CONFIG.social.instagram} target="_blank" rel="noopener"><Share2 size={24} /></a>
              <button onClick={shareInvite}><Share2 size={24} /></button>
            </div>
          </Section>

          {/* Contact */}
          <Section className="contact-section">
            <AnimatedTitle>Contact</AnimatedTitle>
            <div className="contact-grid">
              {CONFIG.contacts.map((c, i) => (
                <div key={i} className="contact-card">
                  <h4>{c.name}</h4>
                  <div className="contact-actions">
                    <a href={`tel:${c.phone}`}><Phone size={18} /> Call</a>
                    <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener"><MessageCircle size={18} /> WhatsApp</a>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Footer */}
          <footer className="footer">
            <p>With Love,</p>
            <h2>{CONFIG.couple.groom} & {CONFIG.couple.bride}</h2>
            <p>{new Date(CONFIG.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <div className="footer-animation">🌹✨</div>
          </footer>

          {/* Music Player */}
          <button className="music-player" onClick={toggleMusic}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            <div className="music-bars">
              <span className={`bar ${isPlaying ? 'active' : ''}`} />
              <span className={`bar ${isPlaying ? 'active' : ''}`} />
              <span className={`bar ${isPlaying ? 'active' : ''}`} />
            </div>
          </button>

          {/* Bottom Navigation */}
          <nav className="bottom-nav">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-item">
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Gallery Lightbox */}
          {showGallery && (
            <div className="gallery-lightbox" onClick={closeGallery}>
              <button className="lightbox-close" onClick={closeGallery}><X size={24} /></button>
              <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); galleryPrev(); }}>‹</button>
              <img src={CONFIG.gallery[galleryIndex]} alt="Gallery" className="lightbox-img" />
              <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); galleryNext(); }}>›</button>
              <span className="lightbox-counter">{galleryIndex + 1} / {CONFIG.gallery.length}</span>
            </div>
          )}

          {/* Video Lightbox */}
          {showVideo && (
            <div className="video-lightbox" onClick={() => setShowVideo(false)}>
              <button className="lightbox-close" onClick={() => setShowVideo(false)}><X size={24} /></button>
              <video controls autoPlay className="video-lightbox-player">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;