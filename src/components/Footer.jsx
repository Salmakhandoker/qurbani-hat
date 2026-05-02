export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        
        {/* About */}
        <div>
          <h2 className="text-xl font-bold">QurbaniHat</h2>
          <p className="mt-2 text-gray-400">
            Your trusted livestock marketplace for Qurbani animals.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-bold">Contact</h2>
          <p className="mt-2 text-gray-400">Dhaka, Bangladesh</p>
          <p className="text-gray-400">Email: support@qurbanihat.com</p>
          <p className="text-gray-400">Phone: +880123456789</p>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-xl font-bold">Follow Us</h2>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-green-400">Facebook</a>
            <a href="#" className="hover:text-green-400">Instagram</a>
            <a href="#" className="hover:text-green-400">Twitter</a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-700 text-gray-400">
        © 2026 QurbaniHat. All rights reserved.
      </div>
    </footer>
  );
}