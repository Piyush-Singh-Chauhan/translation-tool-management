// Enterprise-level field validations

export const validateEmail = (email) => {
  const errors = [];
  
  if (!email) {
    errors.push('Email is required');
    return { isValid: false, errors };
  }
  
  // RFC 5322 standard email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    errors.push('Invalid email format');
  }
  
  // Check max length
  if (email.length > 70) {
    errors.push('Email is too long (max 70 characters)');
  }
  
  // Check for valid domain
  const domain = email.split('@')[1];
  if (domain && !/\.[a-zA-Z]{2,}$/.test(domain)) {
    errors.push('Email must have a valid domain');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateName = (name) => {
  const errors = [];
  
  if (!name) {
    errors.push('Name is required');
    return { isValid: false, errors };
  }
  
  if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (name.trim().length > 60) {
    errors.push('Name is too long (max 60 characters)');
  }
  
  // Check if first letter is capitalized
  if (name.charAt(0) !== name.charAt(0).toUpperCase() || name.charAt(0) === ' ') {
    errors.push('First letter must be capitalized');
  }
  
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateTranslationKey = (key) => {
  const errors = [];
  
  if (!key) {
    errors.push('Translation key is required');
    return { isValid: false, errors };
  }
  
  if (key.trim().length < 2) {
    errors.push('Key must be at least 2 characters');
  }
  
  if (!/^[a-zA-Z0-9_.-]+$/.test(key)) {
    errors.push('Key can only contain letters, numbers, underscores, dots, and hyphens');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateTranslationText = (text) => {
  const errors = [];
  
  if (!text) {
    errors.push('Translation text is required');
    return { isValid: false, errors };
  }
  
  if (text.trim().length < 1) {
    errors.push('Translation text cannot be empty');
  }
  
  return { isValid: errors.length === 0, errors };
};