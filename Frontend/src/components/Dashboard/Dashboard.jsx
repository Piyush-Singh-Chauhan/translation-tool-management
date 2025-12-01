import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTranslations } from '../../services/translationService';
import Navbar from '../Layout/Navbar';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalKeys: 0,
    totalLanguages: 4, // en, hi, es, fr
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const translations = await getAllTranslations();
      setStats({
        totalKeys: translations.length,
        totalLanguages: 4,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Translation Dashboard</h1>
          <p>Manage your translations efficiently</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            {/* <div className="stat-icon">🔑</div> */}
            <div className="stat-info">
              <h3>{loading ? '...' : stats.totalKeys}</h3>
              <p>Total Translation Keys</p>
            </div>
          </div>

          <div className="stat-card">
            {/* <div className="stat-icon">🌍</div> */}
            <div className="stat-info">
              <h3>{stats.totalLanguages}</h3>
              <p>Languages Supported</p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <div className="action-card" onClick={() => navigate('/add-translation')}>
              {/* <div className="action-icon">➕</div> */}
              <h3>Add Translation</h3>
              <p>Create a new translation key with auto-generated translations</p>
            </div>

            <div className="action-card" onClick={() => navigate('/view-translations')}>
              {/* <div className="action-icon">📋</div> */}
              <h3>View Translations</h3>
              <p>Browse, search, and manage all your translations</p>
            </div>
          </div>
        </div>

        <div className="supported-languages">
          <h2>Supported Languages</h2>
          <div className="language-tags">
            <span className="language-tag">🇬🇧 English (en)</span>
            <span className="language-tag">🇮🇳 Hindi (hi)</span>
            <span className="language-tag">🇪🇸 Spanish (es)</span>
            <span className="language-tag">🇫🇷 French (fr)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
