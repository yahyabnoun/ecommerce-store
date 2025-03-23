import './App.css'
import AuthModal from './Pages/Auth/AuthModal'
import HomePage from './Pages/Home'
import Navbar from './Pages/Navbar'
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <AuthProvider>
      <Navbar onAuthButtonClick={() => setShowAuthModal(true)} />
      <HomePage />
      <AuthModal 
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </AuthProvider>
  )
}

export default App
