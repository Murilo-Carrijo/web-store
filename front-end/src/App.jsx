import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Favorites from './pages/favorites';
import Products from './pages/products';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/products/:id" element={<Products />} />
    </Routes>
  )
}

export default App
