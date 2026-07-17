import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Admin from './pages/Admin';
import AllReviews from './pages/AllReviews';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/diapers", element: <Diapers /> },
      { path: "/milk", element: <Milk /> },
      { path: "/toys", element: <Toys /> },
      { path: "/search", element: <Search /> },
      { path: "/write-review", element: <WriteReview /> },
      { path: "/review/:id", element: <ReviewDetail /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/parenting", element: <ParentingTips /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/profile", element: <Profile /> },
      { path: "/profile/edit", element: <EditProfile /> },
      { path: "/admin", element: <Admin /> },
      { path: "/reviews", element: <AllReviews /> }
    ]
  }
]);

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
