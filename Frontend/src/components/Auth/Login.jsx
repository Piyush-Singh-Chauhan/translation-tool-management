import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { validateEmail, validatePassword } from '../../utils/validation';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    let validation;
    if (name === 'email') {
      validation = validateEmail(value);
    } else if (name === 'password') {
      validation = validatePassword(value);
    }

    setErrors({ ...errors, [name]: validation.errors });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    
    // Validate on blur to show errors immediately when user leaves field
    let validation;
    if (name === 'email') {
      validation = validateEmail(value);
    } else if (name === 'password') {
      validation = validatePassword(value);
    }
    
    setErrors({ ...errors, [name]: validation.errors });
  };

  const isFormValid = () => {
    const emailValid = validateEmail(formData.email).isValid;
    const passwordValid = validatePassword(formData.password).isValid;
    return emailValid && passwordValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ email: true, password: true });

    // Validate all fields on submit
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    
    setErrors({
      email: emailValidation.errors,
      password: passwordValidation.errors,
    });

    if (!isFormValid()) {
      toast.error('Please fix all validation errors');
      return;
    }

    setLoading(true);
    try {
      const response = await login(formData.email, formData.password);
      setAuthUser(response.user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Login to access your translation dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email.length > 0 ? 'error' : ''}
              placeholder="Enter your email"
            />
            {touched.email && errors.email.length > 0 && (
              <div className="error-messages">
                {errors.email.map((error, index) => (
                  <span key={index} className="error-text">• {error}</span>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.password && errors.password.length > 0 ? 'error' : ''}
              placeholder="Enter your password"
            />
            {touched.password && errors.password.length > 0 && (
              <div className="error-messages">
                {errors.password.map((error, index) => (
                  <span key={index} className="error-text">• {error}</span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={!isFormValid() || loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;