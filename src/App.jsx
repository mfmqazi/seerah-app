import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import YasirQadhi from './pages/YasirQadhi';
import AbdulNasirJangda from './pages/AbdulNasirJangda';
import Summary from './pages/Summary';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/yasir-qadhi" element={<YasirQadhi />} />
            <Route path="/abdul-nasir-jangda" element={<AbdulNasirJangda />} />
            <Route path="/summary/:speaker/:summaryId" element={<Summary />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>© 2025 Seerah Journey. May Allah accept this effort.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
