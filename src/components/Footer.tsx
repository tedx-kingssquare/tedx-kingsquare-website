"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="#" className="inline-block mb-4">
              <img
                src="/logo-white.png"
                alt="TEDx Kings Square Women"
                className="h-8 md:h-9 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-gray-400 max-w-md">
              An independently organized TED event bringing together ideas and voices from our
              community. Unscripted 2026.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">About Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#speakers" className="hover:text-white transition">Speakers</a></li>
              <li><a href="#events" className="hover:text-white transition">Events</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              <li><a href="#partners" className="hover:text-white transition">Partners</a></li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">f</a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">𝕏</a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">ig</a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="LinkedIn">in</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 TEDx Kings Square Women. All rights reserved.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition"
            >
              Get Tickets
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition"
              aria-label="Back to top"
            >
              <span>↑</span> Back to Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
