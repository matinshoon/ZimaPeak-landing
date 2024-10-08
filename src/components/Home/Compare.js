import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import axios from 'axios';

const Compare = () => {
  const { darkMode } = useContext(ThemeContext);
  const [timeLeft, setTimeLeft] = useState({});
  const [zoom, setZoom] = useState(false);
  const [cards, setCards] = useState([]);

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const difference = endOfMonth - now;

      let timeRemaining = {};
      if (difference > 0) {
        timeRemaining = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeRemaining;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      setZoom(true);
      setTimeout(() => setZoom(false), 500);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PUBLIC_BASE_URL}/orders/offer`);
        // Filter the offers to include only those where showcase is true (1)
        const showcasedOffers = response.data.filter(offer => offer.showcase === 1);
        setCards(showcasedOffers);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <section id="about" className={`py-12 px-6 transition-colors duration-300`}>
      <div className="mb-12 text-center">
        <h1 className={`font-extrabold text-4xl mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {currentMonth} Offer
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Don’t miss out on our exclusive offers for this month! Take advantage of significant savings and top-notch services.
        </p>
      </div>

      <div className="flex justify-center items-center space-x-6">
        {cards.map((card, index) => (
          <div key={index} className={`shadow-lg border-2 rounded-lg p-8 ${darkMode ? 'glass border-gray-700' : 'bg-white border-gray-300'} ${index === 1 ? 'flex-1 max-w-xs' : 'flex-1 max-w-md'}`}>
            <div className="mb-6">
              <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Offer valid for</p>
              <div className="flex justify-center items-center space-x-4 text-2xl font-bold">
                <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{timeLeft.days || 0}d</span>
                <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{timeLeft.hours || 0}h</span>
                <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{timeLeft.minutes || 0}m</span>
                <span className={`transition-transform ${zoom ? 'scale-150' : ''} ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{timeLeft.seconds || 0}s</span>
              </div>
            </div>

            {/* Category Section */}
            <div className="mb-6 text-center">
              <p className={`text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {card.category}
              </p>
            </div>

            <div className="mb-8">
              <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Monthly Investment</p>
              <div className="flex items-center space-x-3 justify-center">
                <h3 className={`text-3xl font-bold line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  ${(parseFloat(card.original_price) / 100)}
                </h3>
                <h3 className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  ${(parseFloat(card.discounted_price) / 100)}
                </h3>
              </div>
            </div>

            <div className="mb-10">
              <ul className="space-y-3">
                {card.features.split(',').map((feature, index) => (
                  <li key={index} className={`text-base leading-6 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center mt-8">
              <a
                href="/register"
                className={`relative border-2 border-primary hover:text-slate-800 hover:border-slate-800 md:font-bold h-10 w-full md:w-auto md:h-auto px-4 md:py-3 md:px-6 rounded-full ${darkMode ? 'text-white' : 'text-primary'}`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <p className="text-xs">Claim Offer</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="overlay cards__inner"></div>
    </section>
  );
};

export default Compare;