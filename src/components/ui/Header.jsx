import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const citizenNavItems = [
    { label: 'Dashboard', path: '/citizen-dashboard', icon: 'LayoutDashboard' },
    { label: 'Report Issue', path: '/issue-reporting-form', icon: 'FileText' },
    { label: 'Community Map', path: '/community-issue-map', icon: 'Map' },
    { label: 'My Issues', path: '/issue-details-view', icon: 'List' },
  ];

  const isStaffRoute = location?.pathname === '/municipal-staff-login';
  const isCitizenLoginRoute = location?.pathname === '/citizen-login';
  const isAuthRoute = isStaffRoute || isCitizenLoginRoute;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/citizen-login');
    setIsMobileMenuOpen(false);
  };

  const handleStaffLogin = () => {
    navigate('/municipal-staff-login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Building2" size={24} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-foreground">CivicReport</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Civic Engagement Platform</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        {!isAuthRoute && (
          <nav className="hidden lg:flex items-center space-x-1">
            {citizenNavItems?.map((item) => (
              <Button
                key={item?.path}
                variant={location?.pathname === item?.path ? "default" : "ghost"}
                size="sm"
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                onClick={() => handleNavigation(item?.path)}
                className="px-3"
              >
                {item?.label}
              </Button>
            ))}
          </nav>
        )}

        {/* Desktop Auth Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          {isAuthRoute ? (
            <div className="flex items-center space-x-2">
              <Button
                variant={isCitizenLoginRoute ? "default" : "outline"}
                size="sm"
                onClick={handleLogin}
              >
                Citizen Login
              </Button>
              <Button
                variant={isStaffRoute ? "default" : "outline"}
                size="sm"
                onClick={handleStaffLogin}
              >
                Staff Login
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                iconPosition="left"
                iconSize={16}
              >
                Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="LogOut"
                iconPosition="left"
                iconSize={16}
                onClick={handleLogin}
              >
                Logout
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleMobileMenu}
          iconName={isMobileMenuOpen ? "X" : "Menu"}
          iconSize={20}
        >
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-elevated">
          <div className="px-4 py-3 space-y-2">
            {!isAuthRoute ? (
              <>
                {citizenNavItems?.map((item) => (
                  <Button
                    key={item?.path}
                    variant={location?.pathname === item?.path ? "default" : "ghost"}
                    size="sm"
                    iconName={item?.icon}
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => handleNavigation(item?.path)}
                    fullWidth
                    className="justify-start"
                  >
                    {item?.label}
                  </Button>
                ))}
                <div className="border-t border-border pt-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                    fullWidth
                    className="justify-start mb-2"
                  >
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={16}
                    onClick={handleLogin}
                    fullWidth
                    className="justify-start"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Button
                  variant={isCitizenLoginRoute ? "default" : "outline"}
                  size="sm"
                  onClick={handleLogin}
                  fullWidth
                >
                  Citizen Login
                </Button>
                <Button
                  variant={isStaffRoute ? "default" : "outline"}
                  size="sm"
                  onClick={handleStaffLogin}
                  fullWidth
                >
                  Staff Login
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;