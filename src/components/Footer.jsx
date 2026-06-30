export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand / About */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
            <span>🐄</span>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">QurbaniHat</span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-sm">
            Bangladesh's premier online livestock marketplace. We connect buyers directly with trusted local farmers to deliver healthy, certified cows and goats for a hassle-free Qurbani experience.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white tracking-wide border-b border-emerald-500/30 pb-2 inline-block">Contact Us</h3>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>Mirpur, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📧</span>
              <a href="mailto:support@qurbanihat.com" className="hover:text-emerald-400 transition-colors">support@qurbanihat.com</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:+880123456789" className="hover:text-emerald-400 transition-colors">+880 123 456 789</a>
            </li>
          </ul>
        </div>

        {/* Social Links & Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white tracking-wide border-b border-emerald-500/30 pb-2 inline-block">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 font-bold">
              f
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 font-bold">
              i
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 font-bold">
              t
            </a>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Get updates on new livestock stock, offers, and Qurbani tips.
          </p>
        </div>

      </div>

      <div className="bg-slate-950 py-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center">
          <p>© 2026 QurbaniHat. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}