import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Register from '@/pages/Register';
import Admin from '@/pages/Admin';
import { useEffect, useState } from 'react';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.altKey && event.key === 'M') {
        event.preventDefault();
        setShowAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col relative">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          {showAdmin && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-4 md:p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Admin Access</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  You've accessed the admin panel. Click below to view submissions.
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <Button 
                    onClick={() => {
                      setShowAdmin(false);
                      window.location.href = '/admin';
                    }}
                    className="w-full sm:flex-1"
                  >
                    Go to Admin
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAdmin(false)}
                    className="w-full sm:flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;