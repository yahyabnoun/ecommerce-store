import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const loaderVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

const Loader = () => {
  return (
    <div className="flex h-[92vh] w-full items-center justify-center">
      <motion.div
        variants={loaderVariants}
        animate="animate"
        className="text-lime-400"
      >
        <Loader2 className="h-12 w-12" />
      </motion.div>
    </div>
  );
};

export default Loader;