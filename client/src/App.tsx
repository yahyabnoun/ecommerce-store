import './App.css'
import AuthModal from './Pages/Auth/AuthModal'
import HomePage from './Pages/Home'
import Navbar from './Pages/Navbar'
import { useState } from 'react';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <Navbar onAuthButtonClick={() => setShowAuthModal(true)} />
      <HomePage />
      <AuthModal 
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  )
}

export default App
