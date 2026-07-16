import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Diapers from './pages/Diapers';
import Milk from './pages/Milk';
import Toys from './pages/Toys';
import ReviewDetail from './pages/ReviewDetail';
import Search from './pages/Search';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diapers" element={<Diapers />} />
            <Route path="/milk" element={<Milk />} />
            <Route path="/toys" element={<Toys />} />
            <Route path="/search" element={<Search />} />
            <Route path="/review/:id" element={<ReviewDetail />} />
          </Routes>

        </main>
        <Footer />
      </Router>
    </LanguageProvider>
  );
}

export default App;
