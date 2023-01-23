import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, SignUp } from './pages/pages';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}
