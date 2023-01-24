import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { OAuth } from './pages/Authentication/OAuth';
import { Login, SignUp } from './pages/pages';

export default function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/OAuth" element={<OAuth />} />
          <Route path="/dashboard" element={<>Dashboard</>} />
        </Routes>
      </Router>
    </>
  );
}
