import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTranslation } from '../../services/translationService';
import { validateTranslationKey, validateTranslationText } from '../../utils/validation';
import { toast } from 'react-toastify';
import Navbar from '../Layout/Navbar';
import './Translation.css';

const AddTranslation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    key: '',
    englishText: '',
  });

  const [errors, setErrors] = useState({
    key: [],
    englishText: [],
  });

  const [touched, setTouched] = useState({
    key: false,
    englishText: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    let validation;
    if (name === 'key') {
      validation = validateTranslationKey(value);
    } else if (name === 'englishText') {
      validation = validateTranslationText(value);
    }

    setErrors({ ...errors, [name]: validation.errors });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const isFormValid = () => {
    const keyValid = validateTranslationKey(formData.key).isValid;
    const textValid = validateTranslationText(formData.englishText).isValid;
    return keyValid && textValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ key: true, englishText: true });

    if (!isFormValid()) {
      toast.error('Please fix all validation errors');
      return;
    }

    setLoading(true);
    try {
      await addTranslation(formData.key, formData.englishText);
      toast.success('Translation added successfully with auto-generated translations!');
      setTimeout(() => {
        navigate('/view-translations');
      }, 1500);
    } catch (error) {
      toast.error(error || 'Failed to add translation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="translation-container">
        <div className="translation-card">
          <div className="translation-header">
            <h1>Add New Translation</h1>
            <p>Create a translation key with auto-generated translations in multiple languages</p>
          </div>

          <form onSubmit={handleSubmit} className="translation-form">
            <div className="form-group">
              <label htmlFor="key">Translation Key *</label>
              <input
                type="text"
                id="key"
                name="key"
                value={formData.key}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.key && errors.key.length > 0 ? 'error' : ''}
                placeholder="e.g., welcome_message, login_button"
              />
              <small className="help-text">Use letters, numbers, underscores, dots, and hyphens only</small>
              {touched.key && errors.key.length > 0 && (
                <div className="error-messages">
                  {errors.key.map((error, index) => (
                    <span key={index} className="error-text">• {error}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="englishText">English Translation *</label>
              <textarea
                id="englishText"
                name="englishText"
                value={formData.englishText}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.englishText && errors.englishText.length > 0 ? 'error' : ''}
                placeholder="Enter the English text"
                rows="4"
              />
              <small className="help-text">This will be auto-translated to Hindi, Spanish, and French</small>
              {touched.englishText && errors.englishText.length > 0 && (
                <div className="error-messages">
                  {errors.englishText.map((error, index) => (
                    <span key={index} className="error-text">• {error}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="info-box">
              {/* <span className="info-icon">ℹ️</span> */}
              <p>Auto-translations will be generated for: Hindi (hi), Spanish (es), and French (fr)</p>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={!isFormValid() || loading}
              >
                {loading ? 'Adding Translation...' : 'Add Translation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTranslation;
