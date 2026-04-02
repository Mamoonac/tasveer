import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ linksData, socialLinks, contactEmail }) => {

  const currentYear = new Date().getFullYear();

  // ✅ Default fallback (so app doesn't break)
  const platformLinks = linksData?.platform || [
    { label: "Explore", path: "/photographers" },
    { label: "Client Reviews", path: "/feedback" },
    { label: "Join as Artist", path: "/signup" }
  ];

  const supportLinks = linksData?.support || [
    { label: "Help Center" },
    { label: "Terms of Service" },
    { label: "Privacy Policy" }
  ];

  const socials = socialLinks || [
    { label: 'IG', url: 'https://instagram.com' },
    { label: 'TW', url: 'https://twitter.com' },
    { label: 'FB', url: 'https://facebook.com' }
  ];

  const email = contactEmail || "HELLO@TASVEER.COM";

  return (
    <footer className="bg-[#1f1010] border-t border-white/5 pt-20 pb-10 px-6 md:px-10">

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-20">

          {/* Brand */}
          <div>
            <Link to="/" className="text-3xl font-display text-[#D4AF37] tracking-tighter block mb-6">
              TASVEER
            </Link>

            <p className="text-white/30 text-xs leading-relaxed max-w-xs">
              The premier destination for professional photography services and artistic portfolio showcases.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold mb-8">
              Platform
            </h4>

            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-bold">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-white/30 hover:text-[#D4AF37] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold mb-8">
              Support
            </h4>

            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-bold">
              {supportLinks.map((item, index) => (
                <li key={index}>
                  <button className="text-white/30 hover:text-[#D4AF37] transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold mb-8">
              Connect
            </h4>

            <div className="flex gap-6 mb-8">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/40 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <p className="text-[10px] text-white/20 font-mono tracking-widest">
              {email}
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-white/[0.02] flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-[9px] uppercase tracking-widest text-white/20 font-bold text-center md:text-left">
            © {currentYear} TASVEER COLLECTIVE. ALL RIGHTS RESERVED.
          </p>

          <p className="text-[9px] uppercase tracking-widest text-white/10 font-bold italic text-center md:text-right">
            Developed for Excellence
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;