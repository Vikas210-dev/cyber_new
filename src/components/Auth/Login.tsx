import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  isAuthenticated,
  fetchAndStoreToken,
  storeUserTokens,
  loginUser,
  isClientTokenValid,
  clearAuthData
} from '@/services/authservice';
import Captcha, { useCaptcha } from '@/components/ui/captcha';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    crmLoginId: '',
    password: '',
    captcha: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const { isValid: isCaptchaValid, onValidate: onCaptchaValidate } = useCaptcha();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate captcha first
      if (!isCaptchaValid) {
        throw new Error('Please complete the captcha verification.');
      }

      // Check if client token exists and is valid
      if (!isClientTokenValid()) {
        throw new Error('Client token is invalid. Please refresh the page to fetch a new token.');
      }

      // Use the loginUser function from authservice
      const response = await loginUser(formData.crmLoginId, formData.password);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `Login failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(' Login API Response:', data);

      // Check if login was successful
      if (data.statusCode === 'ESS-000' && data.response) {
        // Store user tokens using authservice function
        storeUserTokens(data);

        toast({
          title: "Login Successful",
          description: "You have been successfully logged in.",
          variant: "success",
        });

        console.log('Login completed successfully. Redirecting...');

        // Clear the login form
        setFormData({
          crmLoginId: '',
          password: '',
          captcha: ''
        });

        // Get the intended destination from location state or default to home
        const from = location.state?.from?.pathname || '/';
        console.log(`Redirecting to: ${from}`);
        navigate(from, { replace: true });

      } else {
        throw new Error(data.message || 'Login response format is invalid');
      }

    } catch (err) {
      console.error(' Error during login:', err);

      // Clear any partially stored tokens on error
      clearAuthData();

      // Set user-friendly error message
      const errorMessage = err instanceof Error ? err.message : 'Invalid credentials or captcha. Please try again.';
      setError(errorMessage);

    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication and fetch client token on page load
  useEffect(() => {
    const initializePage = async () => {
      console.log('Initializing login page...');

      // Check if user is already authenticated
      if (isAuthenticated()) {
        console.log('User already authenticated, redirecting...');

        // Get the intended destination from location state or default to home
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
        return;
      }

      // User not authenticated, fetch client token for login API
      setIsLoading(true);
      setError('');

      try {
        await fetchAndStoreToken();
        console.log('Client token fetched and stored successfully!');
      } catch (err) {
        console.error(' Error fetching client token:', err);
        setError('Failed to initialize login. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, [navigate, location]);

  // Show loading screen while checking authentication
  if (isLoading && !error) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">
            {isAuthenticated() ? 'Redirecting...' : 'Initializing login...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Government Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Himachal Pradesh Police
            </h1>
            <p className="text-lg font-semibold text-primary">
              Cyber Crime Helpline 1930
            </p>
            <p className="text-sm text-muted-foreground">
              CRM Portal - Secure Access
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-semibold text-center">
              Secure Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the CRM system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* CRM Login ID */}
              <div className="space-y-2">
                <Label htmlFor="crmLoginId" className="text-sm font-medium">
                  CRM Login ID / Username
                </Label>
                <Input
                  id="crmLoginId"
                  name="crmLoginId"
                  type="text"
                  required
                  placeholder="Enter your CRM Login ID"
                  value={formData.crmLoginId}
                  onChange={handleInputChange}
                  className="h-11"
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-11 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Captcha */}
              {/* <Captcha
                onValidate={onCaptchaValidate}
                length={6}
                disabled={isLoading}
              /> */}

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-11 font-medium"
               
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  'Secure Login'
                )}
              </Button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-light transition-colors underline-offset-4 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            This is a secure government portal. Unauthorized access is prohibited.
          </p>
          <p className="text-xs text-muted-foreground">
            Multiple failed login attempts will result in account suspension.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;