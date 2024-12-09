import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#15181D] lg:px-12 text-white">
      <div className="container px-4 py-8 mx-auto">
        {/* Newsletter Section */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl md:text-3xl">
            Signup our newsletter to get update information, news, insight or
            promotions.
          </h2>
          <div className="flex flex-col max-w-xl gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 text-white bg-transparent border rounded border-white/20 placeholder:text-gray-400"
            />
            <button className="flex items-center gap-2 px-4 py-2 text-black bg-white rounded text-nowrap hover:bg-white/90">
              <FaEnvelope className="w-4 h-4" />
              Sign Up
            </button>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-end gap-4 mb-12">
          <Link href="#" className="hover:text-blue-400">
            <FaTwitter className="w-6 h-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="hover:text-blue-600">
            <FaFacebook className="w-6 h-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="hover:text-pink-600">
            <FaInstagram className="w-6 h-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="hover:text-blue-500">
            <FaLinkedin className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo Section */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Logo</h2>
            <p className="text-gray-400">We Work For Excellence</p>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">Products</h3>
            <div className="space-y-3">
              <div>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Solar Lightning System
                </Link>
              </div>
              <div>
                <Link href="#" className="text-gray-400 hover:text-white">
                  AQI Monitoring Device
                </Link>
              </div>
              <div>
                <Link href="#" className="text-gray-400 hover:text-white">
                  IoT Gateway
                </Link>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">Links</h3>
            <ul className="space-y-3">
              <div>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </div>
              <div>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Products
                </Link>
              </div>
              <div>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Gallery
                </Link>
              </div>
              <div>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Support
                </Link>
              </div>
              <div>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </div>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">Get in touch</h3>
            <ul className="space-y-4">
              <div className="flex items-start gap-3">
                <FaPhone className="flex-shrink-0 w-5 h-5 mt-1" />
                <span>+91-8588878612, +918588878600</span>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="flex-shrink-0 w-5 h-5 mt-1" />
                <span>sales@abcgetakej.com</span>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="flex-shrink-0 w-5 h-5 mt-1" />
                <span>
                  Faridabad Office: C/o- & Work, Plot No. 5B, Sector 15-A, First
                  Floor, Crown Plaza Mall, Faridabad.-121007
                </span>
              </div>
              <div className="flex items-start gap-3">
                <FaClock className="flex-shrink-0 w-5 h-5 mt-1" />
                <span>9:00 AM - 5:30 PM (Mon - Sat)</span>
              </div>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between pt-8 border-t sm:flex-row border-white/10">
          <p className="mb-4 text-gray-400 sm:mb-0">copyright reserved 2024</p>
          <Link href="#" className="text-gray-400 hover:text-white">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
