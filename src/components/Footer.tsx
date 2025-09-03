import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">
            Organized by Students of SAL Institute of Diploma Studies
          </p>
          <p className="text-xs text-gray-400 mb-2 sm:mb-3 md:mb-4">
            Guided by Respected Faculties
          </p>
          <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
            <span>© PBVITS</span>
            <a 
              href="https://pbvits.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}