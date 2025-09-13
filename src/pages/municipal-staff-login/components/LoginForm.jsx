import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Mock credentials for different staff roles
  const mockCredentials = {
    'STAFF001': { password: 'Admin@2024', role: 'Administrator', department: 'IT' },
    'STAFF002': { password: 'Public@2024', role: 'Manager', department: 'Public Works' },
    'STAFF003': { password: 'Sanit@2024', role: 'Supervisor', department: 'Sanitation' },
    'STAFF004': { password: 'Field@2024', role: 'Field Worker', department: 'Maintenance' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear specific error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.employeeId?.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    } else if (!/^STAFF\d{3}$/?.test(formData?.employeeId)) {
      newErrors.employeeId = 'Invalid Employee ID format (e.g., STAFF001)';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (isLocked) {
      setErrors({ general: 'Account is temporarily locked. Please contact IT support.' });
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const credential = mockCredentials?.[formData?.employeeId];
      
      if (!credential || credential?.password !== formData?.password) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsLocked(true);
          setErrors({ 
            general: 'Too many failed attempts. Account locked for security. Contact IT support at ext. 2024.' 
          });
        } else {
          setErrors({ 
            general: `Invalid credentials. ${3 - newAttempts} attempts remaining. Use STAFF001-004 with respective passwords.` 
          });
        }
        return;
      }

      // Successful login
      localStorage.setItem('staffAuth', JSON.stringify({
        employeeId: formData?.employeeId,
        role: credential?.role,
        department: credential?.department,
        loginTime: new Date()?.toISOString()
      }));

      // Navigate to appropriate dashboard based on role
      navigate('/citizen-dashboard'); // Placeholder - would route to staff dashboard
      
    } catch (error) {
      setErrors({ general: 'System error. Please try again or contact IT support.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In real app, would trigger password reset flow
    alert('Password reset request sent to IT department. You will receive instructions via official email within 24 hours.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employee ID Field */}
        <Input
          label="Employee ID"
          type="text"
          name="employeeId"
          value={formData?.employeeId}
          onChange={handleInputChange}
          placeholder="Enter your employee ID (e.g., STAFF001)"
          error={errors?.employeeId}
          required
          disabled={isLoading || isLocked}
          className="text-base"
        />

        {/* Password Field */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            error={errors?.password}
            required
            disabled={isLoading || isLocked}
            className="text-base pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            disabled={isLoading || isLocked}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        {/* Remember Me */}
        <Checkbox
          label="Keep me signed in on this device"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
          disabled={isLoading || isLocked}
          className="text-sm"
        />

        {/* General Error */}
        {errors?.general && (
          <div className="flex items-start gap-3 p-4 bg-error/10 border border-error/20 rounded-lg">
            <Icon name="AlertCircle" size={18} className="text-error mt-0.5 flex-shrink-0" />
            <p className="text-sm text-error leading-relaxed">{errors?.general}</p>
          </div>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading || isLocked}
          iconName="LogIn"
          iconPosition="left"
          iconSize={18}
        >
          {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
        </Button>

        {/* Forgot Password */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            disabled={isLoading}
          >
            Forgot your password?
          </button>
        </div>

        {/* Login Attempts Warning */}
        {loginAttempts > 0 && loginAttempts < 3 && (
          <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <Icon name="Shield" size={16} className="text-warning" />
            <p className="text-sm text-warning">
              Security Notice: {loginAttempts}/3 failed attempts
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;