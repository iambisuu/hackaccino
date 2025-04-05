// components/navbar.js
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-800">
            IVAA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/trends" className="text-gray-700 hover:text-green-600 transition-colors">
              Market Trends
            </Link>
            <Link href="/farmer-assist" className="text-gray-700 hover:text-green-600 transition-colors">
              Farming Assistant
            </Link>
            <Link href="/weather" className="text-gray-700 hover:text-green-600 transition-colors">
              Weather
            </Link>
            <Link href="/ai-chat" className="text-gray-700 hover:text-green-600 transition-colors">
              AI Chat
            </Link>
            
            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-green-600 transition-colors">
                <User className="w-5 h-5 mr-1" />
                <span>Account</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                  Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                  Settings
                </Link>
                <Link href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600">
                  Logout
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-500 hover:text-green-600 focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white">
          <Link href="/trends" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600">
            Market Trends
          </Link>
          <Link href="/farmer-assist" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600">
            Farming Assistant
          </Link>
          <Link href="/weather" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600">
            Weather
          </Link>
          <Link href="/chat" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600">
            AI Chat
          </Link>
          <Link href="/profile" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600">
            Profile
          </Link>
          <Link href="/settings" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600">
            Settings
          </Link>
          <Link href="/logout" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}