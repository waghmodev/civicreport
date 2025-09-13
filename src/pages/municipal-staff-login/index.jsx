import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import MunicipalBranding from './components/MunicipalBranding';
import QuickAccessLinks from './components/QuickAccessLinks';

const MunicipalStaffLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if staff is already authenticated
    const staffAuth = localStorage.getItem('staffAuth');
    if (staffAuth) {
      try {
        const authData = JSON.parse(staffAuth);
        // Check if session is still valid (24 hours)
        const loginTime = new Date(authData.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          // Redirect to appropriate dashboard
          navigate('/citizen-dashboard'); // Placeholder - would route to staff dashboard
          return;
        } else {
          // Session expired, clear storage
          localStorage.removeItem('staffAuth');
        }
      } catch (error) {
        // Invalid auth data, clear storage
        localStorage.removeItem('staffAuth');
      }
    }

    // Set page title
    document.title = 'Municipal Staff Login - CivicReport';
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            
            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
              
              {/* Left Column - Branding & Info */}
              <div className="lg:col-span-4 space-y-8">
                <MunicipalBranding />
                <QuickAccessLinks />
              </div>
              
              {/* Center Column - Login Form */}
              <div className="lg:col-span-4">
                <div className="bg-card border border-border rounded-xl shadow-card p-8">
                  <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Staff Authentication
                    </h2>
                    <p className="text-muted-foreground">
                      Sign in to access municipal administration tools
                    </p>
                  </div>
                  
                  <LoginForm />
                  
                  {/* Mock Credentials Helper */}
                  <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm font-medium text-primary">
                        Demo Credentials Available
                      </span>
                    </div>
                    <div className="text-xs text-primary/80 space-y-1">
                      <p>• STAFF001 - STAFF004 (Admin@2024, Public@2024, etc.)</p>
                      <p>• Different roles: Administrator, Manager, Supervisor, Field Worker</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Security Info */}
              <div className="lg:col-span-4">
                <SecurityBadges />
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-8">
              
              {/* Mobile Branding */}
              <div className="text-center">
                <MunicipalBranding />
              </div>
              
              {/* Mobile Login Form */}
              <div className="bg-card border border-border rounded-xl shadow-card p-6">
                <div className="mb-6 text-center">
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Staff Sign In
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Access municipal administration tools
                  </p>
                </div>
                
                <LoginForm />
                
                {/* Mobile Mock Credentials */}
                <div className="mt-6 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-xs font-medium text-primary">
                      Demo Access Available
                    </span>
                  </div>
                  <p className="text-xs text-primary/80">
                    Use STAFF001-004 with respective department passwords
                  </p>
                </div>
              </div>
              
              {/* Mobile Security & Links */}
              <div className="grid grid-cols-1 gap-6">
                <SecurityBadges />
                <QuickAccessLinks />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} City of Springfield Municipal Government. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Accessibility</span>
              <span>•</span>
              <span>Contact IT</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MunicipalStaffLogin;