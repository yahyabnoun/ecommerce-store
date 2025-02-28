import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, Heart, Search, X } from 'lucide-react';

interface NavbarProps {
  onAuthButtonClick: () => void;
}

const Navbar = ({ onAuthButtonClick }: NavbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [elementsInCart] = useState(2);
  const [elementsInWishlist] = useState(0);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const searchVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { 
      width: '200px', 
      opacity: 1, 
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex h-[8vh] w-full items-center justify-between px-4 lg:px-6 relative">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {['Men', 'Women', 'Kids'].map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink
                    href="#"
                    className="text-sm font-medium text-gray-800 hover:text-lime-500 transition-colors duration-200"
                  >
                    {item}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Center Logo - Absolute Positioned */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-gray-900">Sneakers</span>
            <span className="text-lime-500">X</span>
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  variants={searchVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  type="text"
                  placeholder="Search products..."
                  className="h-8 px-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              )}
            </AnimatePresence>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-lime-50"
              onClick={toggleSearch}
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="relative hover:bg-lime-50">
            <Heart className="h-5 w-5" />
            {elementsInWishlist > 0 && (
              <Badge className="absolute -right-1 -top-1 h-4 w-4 flex items-center justify-center rounded-full bg-lime-500 text-white text-xs">
                {elementsInWishlist}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="relative hover:bg-lime-50">
            <ShoppingCart className="h-5 w-5" />
            {elementsInCart > 0 && (
              <Badge className="absolute -right-1 -top-1 h-4 w-4 flex items-center justify-center rounded-full bg-lime-500 text-white text-xs">
                {elementsInCart}
              </Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onAuthButtonClick}
            className="hover:bg-lime-50"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;