import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <img 
              src="https://www.sal.edu.in/storage/site-data/logo-1.png" 
              alt="SAL Institute Logo" 
              className="h-8 sm:h-10 w-auto flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm md:text-lg font-bold text-gray-900 truncate">SIH 2025</h1>
              <p className="text-xs text-gray-600 hidden sm:block truncate">SAL Institute</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-3 lg:space-x-6">
            <Link to="/" className="text-sm lg:text-base text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/register">
              <Button size="sm" className="text-sm lg:px-6">Register Now</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 sm:py-4 border-t bg-white">
            <div className="flex flex-col space-y-2 sm:space-y-3">
              <Link 
                to="/" 
                className="text-sm text-gray-700 hover:text-blue-600 transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full text-sm" size="sm">Register Now</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}