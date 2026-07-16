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
import WriteReview from './pages/WriteReview';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import ParentingTips from './pages/ParentingTips';
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
            <Route path="/write-review" element={<WriteReview />} />
            <Route path="/review/:id" element={<ReviewDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/parenting" element={<ParentingTips />} />
          </Routes>

        </main>
        <Footer />
      </Router>
    </LanguageProvider>
  );
}

export default App;
