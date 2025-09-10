import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react'; 
import UrlShortener from './component/UrlShortnerForm/index';
import RequireAuth from './component/RequireAuth';
import UrlStatsPage from './component/UrlStats/index';

function App() {
  
  const [urls, setUrls] = useState(() => {
    try {
      const storedUrls = localStorage.getItem('shortenedUrls');
      return storedUrls ? JSON.parse(storedUrls) : [];
    } catch (error) {
      console.error("Failed to parse stored URLs from localStorage", error);
      return []; 
    }
  });

  
  useEffect(() => {
    try {
      localStorage.setItem('shortenedUrls', JSON.stringify(urls));
    } catch (error) {
      console.error("Failed to save URLs to localStorage", error);
    }
  }, [urls]); 

  return (
    <>
      <Routes>
        <Route path="/" element={<RequireAuth><UrlShortener urls={urls} setUrls={setUrls} /> </RequireAuth>} />
        <Route path="/stats" element={<RequireAuth><UrlStatsPage urls={urls} /></RequireAuth>} />
      </Routes>
    </>
  );
}

export default App;