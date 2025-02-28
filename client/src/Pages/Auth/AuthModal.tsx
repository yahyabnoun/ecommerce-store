import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react'; // Import X icon from lucide-react

interface AuthModalProps {
  show: boolean;
  onClose: () => void;
}

const AuthModal = ({ show, onClose }: AuthModalProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop that closes modal on click */}
          <motion.div
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Modal content */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div
              className="bg-background rounded-xl p-8 w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Toggle buttons and Close button */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant={isSignIn ? 'default' : 'outline'}
                  className="w-[45%] flex-1"
                  onClick={() => setIsSignIn(true)}
                >
                  Sign In
                </Button>
                <Button
                  variant={!isSignIn ? 'default' : 'outline'}
                  className="w-[45%] flex-1"
                  onClick={() => setIsSignIn(false)}
                >
                  Sign Up
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-[10%] border border-gray-300"
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isSignIn && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-4 py-2 border rounded-lg"
                      onChange={handleInputChange}
                      required={!isSignIn}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-lg"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border rounded-lg"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full mt-4 py-5 ">
                  {isSignIn ? 'Sign In' : 'Sign Up'}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;