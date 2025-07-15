import {
  Mountain,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 font-sans">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand & Social */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-teal-600" />
              <span className="text-2xl font-bold">Thrill Quest</span>
            </div>
            <p className="text-gray-600 text-sm">
              Your premier destination for heart-pounding adventures and
              unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-sky-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-pink-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Activities
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Adventures */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Adventures
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Water Sports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Mountain Activities
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Air Sports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Group Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Contact Info
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-teal-500" />
                <span>123 Adventure Lane, Mountain View</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-teal-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-teal-500" />
                <span>info@thrillquest.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Thrill Quest. All rights reserved. |
            <a href="#" className="mx-1 text-blue-600 hover:underline">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="mx-1 text-blue-600 hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
