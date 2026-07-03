import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const Footer = ({
  logoText = 'MOMENTUM',
  socialLinks = [
    { icon: <FaInstagram size={18} />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaFacebookF size={18} />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaYoutube size={18} />, href: 'https://youtube.com', label: 'YouTube' },
    { icon: <FaXTwitter size={18} />, href: 'https://twitter.com', label: 'X (Twitter)' },
  ],
  quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Pricing & Plans', href: '/pricing' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  programLinks = [
    { label: 'Strength & Conditioning', href: '/programs' },
    { label: 'Cardio & HIIT', href: '/programs' },
    { label: 'Personal Coaching', href: '/personal-training' },
    { label: 'Nutrition & Diet', href: '/nutrition' },
    { label: 'Success Stories', href: '/transformation-stories' },
  ],
  openingHours = [
    { days: 'Mon - Fri', hours: '5:00 AM - 11:00 PM' },
    { days: 'Saturday', hours: '6:00 AM - 9:00 PM' },
    { days: 'Sunday', hours: '7:00 AM - 6:00 PM' },
  ],
  contactInfo = {
    address: '100 Fitness Boulevard, Elite District, NY 10001',
    phone: '+1 (800) 555-0199',
    email: 'info@momentum-fitness.com',
  },
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate API newsletter signup
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-gym-dark border-t border-white/5 pt-20 pb-8 text-white relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 group focus:outline-none w-fit">
              <span className="font-display font-black text-2xl tracking-widest text-white group-hover:text-primary transition-colors">
                {logoText}
              </span>
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
            </Link>
            <p className="text-sm text-gym-gray-400 leading-relaxed font-sans max-w-sm">
              Experience the pinnacle of physical conditioning. High-tech equipment, expert-guided coaching, and an electric community designed to unlock your ultimate human performance.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gym-gray-900 border border-white/5 text-gym-gray-400 hover:text-gym-dark hover:bg-primary hover:border-primary transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <h3 className="font-display font-bold uppercase tracking-wider text-sm text-white">
              Explore
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gym-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Col */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <h3 className="font-display font-bold uppercase tracking-wider text-sm text-white">
              Programs
            </h3>
            <ul className="flex flex-col gap-3">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gym-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Contact Col */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <h3 className="font-display font-bold uppercase tracking-wider text-sm text-white">
              Gym Info
            </h3>
            
            {/* Contact details */}
            <ul className="flex flex-col gap-3 text-sm text-gym-gray-400">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="text-primary mt-0.5 shrink-0" size={16} />
                <span className="text-xs leading-snug">{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-primary shrink-0" size={15} />
                <span className="text-xs">{contactInfo.phone}</span>
              </li>
            </ul>

            {/* Opening hours list */}
            <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
              <div className="flex items-center gap-2 mb-1">
                <FiClock className="text-secondary" size={15} />
                <span className="text-xs uppercase font-display font-bold tracking-wider text-white">Hours</span>
              </div>
              {openingHours.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs text-gym-gray-400 font-sans">
                  <span>{item.days}</span>
                  <span className="font-medium text-white">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Col */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <h3 className="font-display font-bold uppercase tracking-wider text-sm text-white">
              Join Our Tribe
            </h3>
            <p className="text-xs text-gym-gray-400 leading-relaxed font-sans">
              Subscribe to receive weekly training advice, schedule updates, and exclusive membership offers.
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                Thank you for subscribing! Keep pushing your limits.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                  leftIcon={<FiMail />}
                  aria-label="Email for Newsletter"
                  className="text-xs!"
                />
                <Button type="submit" variant="primary" size="sm" className="w-full">
                  Subscribe
                </Button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gym-gray-400">
          <p className="font-sans">
            &copy; {new Date().getFullYear()} {logoText} Fitness Gym. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
