import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Favorites from './pages/favorites';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  )
}

export default App
