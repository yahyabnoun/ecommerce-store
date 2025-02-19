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
import { ShoppingCart, User, Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [elementsInCart] = useState(2);
  const [elementsInWishlist] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex h-14 w-[100vw] items-center justify-between px-[2vw] ">
        <NavigationMenu className="hidden md:flex justify-start">
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className="text-sm font-medium hover:text-primary">
                Men
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className="text-sm font-medium hover:text-primary">
                Women
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className="text-sm font-medium hover:text-primary">
                Kids
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="md:hidden flex justify-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>


        <div className="absolute w-[8%] ml-[44vw] mr-[44vw] h-14 flex items-center justify-center">
          <span className="text-xl font-bold ibrand">
            <span className="text-primary" style={{ letterSpacing: '1px' }}>Sneakers</span>
            <span className="text-gray-500" style={{ marginLeft: '2px' }}>X</span>
          </span>
        </div>

        <div className="flex justify-end items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-5 w-5" />
            {elementsInWishlist > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full">
                {elementsInWishlist}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {elementsInCart > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full">
                {elementsInCart}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                onClick={toggleMenu}
              />
              <motion.div
                className="fixed left-0 top-0 h-screen w-3/4 max-w-sm bg-background z-50 shadow-lg"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="flex h-14 items-center justify-between px-4 border-b">
                  <span className="text-xl font-bold ibrand">
                    <span className="text-primary" style={{ letterSpacing: '1px' }}>Sneakers</span>
                    <span className="text-gray-500" style={{ marginLeft: '2px' }}>X</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMenu}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-2 p-4">
                  {['Men', 'Women', 'Kids'].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.1, duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        className="justify-start text-lg w-full"
                        asChild
                      >
                        <a href="#">{item}</a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;