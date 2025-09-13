import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'citizen@civicreport.gov',
    password: 'CivicPass123'
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Successful login
        localStorage.setItem('citizenAuth', JSON.stringify({
          email: formData?.email,
          loginTime: new Date()?.toISOString()
        }));
        navigate('/citizen-dashboard');
      } else {
        // Invalid credentials
        setErrors({
          general: 'Invalid email or password. Please try again.'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to forgot password page
    alert('Forgot password functionality would be implemented here');
  };

  const handleCreateAccount = () => {
    // In a real app, this would navigate to registration page
    alert('Account registration functionality would be implemented here');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
            <Icon name="User" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Citizen Login</h2>
          <p className="text-muted-foreground">Access your civic reporting account</p>
        </div>

        {errors?.general && (
          <div className="flex items-center gap-2 p-3 mb-4 bg-error/10 border border-error/20 rounded-md">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm text-error">{errors?.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            iconName="LogIn"
            iconPosition="left"
            iconSize={16}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 space-y-3">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={handleForgotPassword}
            iconName="HelpCircle"
            iconPosition="left"
            iconSize={14}
          >
            Forgot Password?
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">New to CivicReport?</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="default"
            fullWidth
            onClick={handleCreateAccount}
            iconName="UserPlus"
            iconPosition="left"
            iconSize={16}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;