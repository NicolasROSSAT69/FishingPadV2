import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Identification from './pages/Identification';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Identification />} />
        <Route path="/session" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Identification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
