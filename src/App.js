import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Home from './pages/Home';
import Register from './pages/Register';
import CaseStudies from './pages/CaseStudies';
import CaseStudy from './pages/CaseStudy';
import Services from './pages/Services';
// import Ai from './pages/Ai';
import ServiceDetails from './pages/ServiceDetails';
import Booking from './pages/Booking';
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Privacy from './pages/Privacy';
import AppLayout from './AppLayout';
import { ThemeContext } from './ThemeContext';
import ReactGA from 'react-ga4';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

function App() {
  const { darkMode } = useContext(ThemeContext);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);
    ReactGA.send('pageview');
  }, []);

  return (
    <Router>
      <HelmetProvider>
        <div id="root" className={`${darkMode ? 'dark' : 'light'}`}>
          <Helmet>
            <title>Zimapeak Marketing | Toronto Digital Marketing Agency</title>
            <meta name="description" content="Zimapeak Marketing is a leading digital marketing agency in Toronto offering web development, SEO services, and social media marketing." />
            <link rel="canonical" href="https://www.zimapeak.com/" />
          </Helmet>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route 
                path="/register" 
                element={
                  <Elements stripe={stripePromise}>
                    <Register />
                  </Elements>
                } 
              />
              <Route path="/services" element={<Services />} />
              {/* <Route path="/ai" element={<Ai />} /> */}
              <Route path="/services/:serviceName" element={<ServiceDetails />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/casestudies" element={<CaseStudies />} />
              <Route path="/casestudy/:id" element={<CaseStudy />} />
            </Routes>
          </AppLayout>
        </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;