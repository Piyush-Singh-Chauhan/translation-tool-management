import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchTranslations, getAllTranslations } from '../../services/translationService';
import Navbar from '../Layout/Navbar';
import './Translation.css';

const ViewTranslations = () => {
  const navigate = useNavigate();
  const [translations, setTranslations] = useState([]);
  const [filteredTranslations, setFilteredTranslations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTranslations();
  }, []);

  useEffect(() => {
    // Filter translations based on search query
    if (searchQuery.trim() === '') {
      setFilteredTranslations(translations);
    } else {
      const filtered = translations.filter(t =>
        t.key.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTranslations(filtered);
    }
  }, [searchQuery, translations]);

  const fetchTranslations = async () => {
    setLoading(true);
    try {
      const data = await getAllTranslations();
      setTranslations(data);
      setFilteredTranslations(data);
    } catch (error) {
      console.error('Failed to fetch translations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (translation) => {
    navigate('/edit-translation', { state: { translation } });
  };

  return (
    <>
      <Navbar />
      <div className="translation-container">
        <div className="view-header">
          <h1>All Translations</h1>
          <p>Search, view, and manage your translation keys</p>
        </div>

        <div className="search-section">
          <div className="search-box">
            {/* <span className="search-icon">🔍</span> */}
            <input
              type="text"
              placeholder="Search by translation key..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="search-info">
            Found {filteredTranslations.length} translation{filteredTranslations.length !== 1 ? 's' : ''}
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading translations...</p>
          </div>
        ) : filteredTranslations.length === 0 ? (
          <div className="empty-state">
            {/* <div className="empty-icon">📭</div> */}
            <h3>{searchQuery ? 'No translations found' : 'No translations yet'}</h3>
            <p>{searchQuery ? 'Try a different search term' : 'Start by adding your first translation'}</p>
            {!searchQuery && (
              <button className="btn-primary" onClick={() => navigate('/add-translation')}>
                Add Translation
              </button>
            )}
          </div>
        ) : (
          <div className="translations-grid">
            {filteredTranslations.map((translation) => (
              <div key={translation._id} className="translation-item">
                <div className="translation-key">
                  {/* <span className="key-icon">🔑</span> */}
                  <h3>{translation.key}</h3>
                </div>

                <div className="translation-values">
                  <div className="translation-row">
                    {/* <span className="lang-flag">🇬🇧</span> */}
                    <span className="lang-code">EN:</span>
                    <span className="lang-text">{translation.translations.en}</span>
                  </div>

                  <div className="translation-row">
                    {/* <span className="lang-flag">🇮🇳</span> */}
                    <span className="lang-code">HI:</span>
                    <span className="lang-text">{translation.translations.hi || 'N/A'}</span>
                  </div>

                  <div className="translation-row">
                    {/* <span className="lang-flag">🇪🇸</span> */}
                    <span className="lang-code">ES:</span>
                    <span className="lang-text">{translation.translations.es || 'N/A'}</span>
                  </div>

                  <div className="translation-row">
                    {/* <span className="lang-flag">🇫🇷</span> */}
                    <span className="lang-code">FR:</span>
                    <span className="lang-text">{translation.translations.fr || 'N/A'}</span>
                  </div>
                </div>

                <button
                  className="btn-edit"
                  onClick={() => handleEdit(translation)}
                >
                   Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewTranslations;
