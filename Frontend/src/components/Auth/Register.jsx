import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { validateName, validateEmail, validatePassword } from '../../utils/validation';
import { toast } from 'react-toastify';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: [],
    email: [],
    password: [],
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    
    // Auto-capitalize first letter of name
    if (name === 'name') {
      newValue = value;
      // Only auto-capitalize if it's the first character or follows a space
      if (newValue.length === 1 || (newValue.length > 1 && newValue[newValue.length - 2] === ' ')) {
        newValue = capitalizeFirstLetter(newValue);
      }
    }
    
    setFormData({ ...formData, [name]: newValue });

    // Real-time validation
    let validation;
    if (name === 'name') {
      validation = validateName(newValue);
    } else if (name === 'email') {
      validation = validateEmail(newValue);
    } else if (name === 'password') {
      validation = validatePassword(newValue);
    }

    setErrors({ ...errors, [name]: validation.errors });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    
    // Validate on blur to show errors immediately when user leaves field
    let validation;
    if (name === 'name') {
      validation = validateName(value);
    } else if (name === 'email') {
      validation = validateEmail(value);
    } else if (name === 'password') {
      validation = validatePassword(value);
    }
    
    setErrors({ ...errors, [name]: validation.errors });
  };

  const isFormValid = () => {
    const nameValid = validateName(formData.name).isValid;
    const emailValid = validateEmail(formData.email).isValid;
    const passwordValid = validatePassword(formData.password).isValid;
    return nameValid && emailValid && passwordValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, password: true });

    // Validate all fields on submit
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    
    setErrors({
      name: nameValidation.errors,
      email: emailValidation.errors,
      password: passwordValidation.errors,
    });

    if (!isFormValid()) {
      toast.error('Please fix all validation errors');
      return;
    }

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Sign up to get started with TMT</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.name && errors.name.length > 0 ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {touched.name && errors.name.length > 0 && (
              <div className="error-messages">
                {errors.name.map((error, index) => (
                  <span key={index} className="error-text">• {error}</span>
                ))}
              </div>
            )}
          </div>

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
              placeholder="Create a strong password"
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;