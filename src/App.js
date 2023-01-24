import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UserContext from './contexts/UserContext';
import { OAuth } from './pages/Authentication/OAuth';
import { LandingPage, Login, SignUp } from './pages/pages';

export default function App() {
  const token = localStorage.getItem('token');
  const [userToken, setUserToken] = useState(token);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ userToken, setUserToken }}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/OAuth" element={<OAuth />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <>Dashboard</>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
