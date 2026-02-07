import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white">
      
      {/* Glow background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        
        {/* Top content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold">XCARGO</h3>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Ship smarter, faster and globally. We connect your business to the
              world with seamless logistics solutions.
            </p>
          </div>
          

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Press</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">Import</li>
              <li className="hover:text-white cursor-pointer">Export</li>
              <li className="hover:text-white cursor-pointer">Warehousing</li>
              <li className="hover:text-white cursor-pointer">Tracking</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-white/70 mb-4">
              Get shipping tips & updates directly to your inbox.
            </p>
            <div className="flex items-center bg-white/10 rounded-xl overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-4 py-3 w-full outline-none text-sm text-white placeholder:text-white/50"
              />
              <button className="px-4 py-3 bg-linear-to-r from-pink-500 to-cyan-400 text-indigo-900">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} XCARGO. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-linear-to-r hover:from-pink-500 hover:to-cyan-400 transition cursor-pointer"
                >
                  <Icon size={14} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
