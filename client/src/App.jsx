import { Routes, Route } from 'react-router-dom'; 
import './App.css';
import { useState } from 'react';
import UrlShortener from './component/UrlShortnerForm/index';
import RequireAuth from './component/RequireAuth';
import UrlStatsPage from './component/UrlStats/index';


function App() {
 const [urls, setUrls] = useState([]);

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