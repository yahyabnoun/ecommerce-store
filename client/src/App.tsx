import './App.css'
import AuthModal from './Pages/Auth/AuthModal'
import HomePage from './Pages/Home'
import Navbar from './Pages/Navbar'
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from './Pages/ProductDetails/ProductDetails';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <AuthProvider>
      <Navbar onAuthButtonClick={() => setShowAuthModal(true)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductDetails />} />
      </Routes>
      <AuthModal 
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
  </AuthProvider>
  )
}

export default App
