import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import Icon from '../../components/AppIcon';

const CitizenLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const citizenAuth = localStorage.getItem('citizenAuth');
    if (citizenAuth) {
      navigate('/citizen-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-20 h-20 bg-primary rounded-full mx-auto mb-4">
              <Icon name="Building2" size={40} color="white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome to CivicReport
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your voice matters. Report civic issues, track progress, and help build a better community together.
            </p>
          </div>

          {/* Main Content - Simplified to center only the LoginForm */}
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>

          {/* Footer Information */}
          <div className="mt-12 text-center">
            <div className="bg-card border border-border rounded-lg p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
                  <h3 className="text-sm font-semibold text-foreground mb-1">24/7 Reporting</h3>
                  <p className="text-xs text-muted-foreground">
                    Report issues anytime, anywhere
                  </p>
                </div>
                <div className="text-center">
                  <Icon name="MapPin" size={24} className="text-accent mx-auto mb-2" />
                  <h3 className="text-sm font-semibold text-foreground mb-1">Location-Based</h3>
                  <p className="text-xs text-muted-foreground">
                    Automatic geolocation tagging
                  </p>
                </div>
                <div className="text-center">
                  <Icon name="Bell" size={24} className="text-warning mx-auto mb-2" />
                  <h3 className="text-sm font-semibold text-foreground mb-1">Real-time Updates</h3>
                  <p className="text-xs text-muted-foreground">
                    Get notified on issue progress
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Credentials Notice */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Icon name="Info" size={16} className="text-warning mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-warning mb-1">Demo Credentials</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Use these credentials to explore the platform:
                  </p>
                  <div className="text-xs font-mono bg-card p-2 rounded border">
                    <div>Email: citizen@civicreport.gov</div>
                    <div>Password: CivicPass123</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} CivicReport. All rights reserved.</p>
            <p className="mt-1">A secure government platform for civic engagement.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CitizenLogin;