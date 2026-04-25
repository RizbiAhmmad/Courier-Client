import React from "react";
import { Link } from "react-router-dom";
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiFacebook, 
  FiInstagram, 
  FiLinkedin, 
  FiTwitter,
  FiArrowRight
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blogs", path: "/blogs" },
    { name: "Why Choose Us", path: "/why-choose-us" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-indigo-950 text-white pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* 1. LEFT: COMPANY INFO */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-black text-indigo-950">SNS</div>
               <h3 className="text-2xl font-black tracking-tighter decoration-yellow-400 decoration-2 italic">SNS <span className="text-yellow-400">International</span></h3>
            </div>
            <p className="text-zinc-400 leading-relaxed font-medium">
              A trusted Bangladesh-based freight forwarding and international courier company committed to making global shipping easier, faster, and more dependable for businesses worldwide.
            </p>
            <div className="flex items-center gap-4">
               {[FiFacebook, FiInstagram, FiLinkedin, FiTwitter].map((Icon, idx) => (
                 <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-yellow-400 hover:text-indigo-950 transition-all duration-300">
                    <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          {/* 2. MIDDLE: QUICK LINKS */}
          <div className="lg:justify-self-center lg:text-center">
            <h4 className="text-lg font-bold mb-8 text-white uppercase tracking-widest border-b border-white/10 pb-2 inline-block">Quick Links</h4>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-4 gap-x-8">
               {quickLinks.map((link) => (
                 <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-zinc-400 hover:text-yellow-400 font-medium transition-colors flex items-center gap-2 group lg:justify-center"
                    >
                       <FiArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                       {link.name}
                    </Link>
                 </li>
               ))}
            </ul>
          </div>

          {/* 3. RIGHT: CONTACT INFO */}
          <div className="space-y-8">
            <h4 className="text-lg font-bold mb-8 text-white uppercase tracking-widest border-b border-white/10 pb-2 inline-block">Contact Us</h4>
            <div className="space-y-6">
               <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-indigo-950 transition-colors">
                     <FiMapPin size={22} />
                  </div>
                  <div>
                     <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Our Location</p>
                     <p className="text-zinc-300 font-medium">Nikunja-2, Khilkhet, Dhaka-1229, Bangladesh</p>
                  </div>
               </div>

               <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-indigo-950 transition-colors">
                     <FiPhone size={22} />
                  </div>
                  <div>
                     <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Phone Number</p>
                     <p className="text-zinc-300 font-medium">+880 1234 567899</p>
                  </div>
               </div>

               <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-indigo-950 transition-colors">
                     <FiMail size={22} />
                  </div>
                  <div>
                     <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Email Support</p>
                     <p className="text-zinc-300 font-medium italic underline decoration-white/10 underline-offset-4">info@sns-intl.com</p>
                  </div>
               </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-zinc-500 text-sm font-medium">
             &copy; {currentYear} <span className="text-zinc-300 font-bold">SNS International</span>. All rights reserved. 
             <span className="ml-2 opacity-100">Powered by <a href="https://bangladeshiit.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-600 transition-colors">Bangladeshi IT</a></span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
