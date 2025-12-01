import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AddTranslation from './components/Translation/AddTranslation';
import ViewTranslations from './components/Translation/ViewTranslations';
import EditTranslation from './components/Translation/EditTranslation';
import PrivateRoute from './components/Layout/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            
            <Route path="/add-translation" element={
              <PrivateRoute>
                <AddTranslation />
              </PrivateRoute>
            } />
            
            <Route path="/view-translations" element={
              <PrivateRoute>
                <ViewTranslations />
              </PrivateRoute>
            } />
            
            <Route path="/edit-translation" element={
              <PrivateRoute>
                <EditTranslation />
              </PrivateRoute>
            } />
          </Routes>
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
