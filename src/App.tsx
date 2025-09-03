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
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          {showAdmin && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Admin Access</h3>
                <p className="text-gray-600 mb-4">
                  You've accessed the admin panel. Click below to view submissions.
                </p>
                <div className="flex space-x-3">
                  <Button 
                    onClick={() => {
                      setShowAdmin(false);
                      window.location.href = '/admin';
                    }}
                    className="flex-1"
                  >
                    Go to Admin
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAdmin(false)}
                    className="flex-1"
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