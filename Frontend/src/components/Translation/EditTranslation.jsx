import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateTranslation, translateText } from '../../services/translationService';
import { toast } from 'react-toastify';
import Navbar from '../Layout/Navbar';
import './Translation.css';

const EditTranslation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const translationData = location.state?.translation;

  const [formData, setFormData] = useState({
    en: '',
    hi: '',
    es: '',
    fr: '',
  });

  const [loading, setLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (!translationData) {
      toast.error('No translation data found');
      navigate('/view-translations');
      return;
    }

    setFormData({
      en: translationData.translations.en || '',
      hi: translationData.translations.hi || '',
      es: translationData.translations.es || '',
      fr: translationData.translations.fr || '',
    });
  }, [translationData, navigate]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Auto-translate other languages when English text changes
    if (name === 'en' && value.trim() !== '') {
      setIsTranslating(true);
      try {
        // Translate to Hindi, Spanish, and French
        const hindi = await translateText(value, 'hi');
        const spanish = await translateText(value, 'es');
        const french = await translateText(value, 'fr');
        
        setFormData(prevData => ({
          ...prevData,
          hi: hindi,
          es: spanish,
          fr: french
        }));
      } catch (error) {
        console.error('Translation error:', error);
        toast.error('Failed to auto-translate text');
      } finally {
        setIsTranslating(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.en.trim()) {
      toast.error('English translation is required');
      return;
    }

    setLoading(true);
    try {
      await updateTranslation(translationData._id, formData);
      toast.success('Translation updated successfully!');
      setTimeout(() => {
        navigate('/view-translations');
      }, 1500);
    } catch (error) {
      toast.error(error || 'Failed to update translation');
    } finally {
      setLoading(false);
    }
  };

  if (!translationData) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="translation-container">
        <div className="translation-card">
          <div className="translation-header">
            <h1>Edit Translation</h1>
            <p>Update translations for: <strong>{translationData.key}</strong></p>
          </div>

          <form onSubmit={handleSubmit} className="translation-form">
            <div className="form-group">
              <label htmlFor="en">🇬🇧 English Translation *</label>
              <textarea
                id="en"
                name="en"
                value={formData.en}
                onChange={handleChange}
                placeholder="Enter English translation"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hi">🇮🇳 Hindi Translation</label>
              <textarea
                id="hi"
                name="hi"
                value={formData.hi}
                onChange={handleChange}
                placeholder="Auto-translated text"
                rows="3"
                readOnly
              />
              {isTranslating && <small className="help-text">Translating...</small>}
            </div>

            <div className="form-group">
              <label htmlFor="es">🇪🇸 Spanish Translation</label>
              <textarea
                id="es"
                name="es"
                value={formData.es}
                onChange={handleChange}
                placeholder="Auto-translated text"
                rows="3"
                readOnly
              />
              {isTranslating && <small className="help-text">Translating...</small>}
            </div>

            <div className="form-group">
              <label htmlFor="fr">🇫🇷 French Translation</label>
              <textarea
                id="fr"
                name="fr"
                value={formData.fr}
                onChange={handleChange}
                placeholder="Auto-translated text"
                rows="3"
                readOnly
              />
              {isTranslating && <small className="help-text">Translating...</small>}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/view-translations')}
                disabled={loading || isTranslating}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading || isTranslating}
              >
                {loading ? 'Updating...' : 'Update Translation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTranslation;