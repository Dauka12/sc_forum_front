import StoreCard from '@/components/stores/StoreCard';
import type { Store } from '@/store/storesStore';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface StoresGridProps {
  stores: Store[];
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1
    }
  }
};

const StoresGrid: React.FC<StoresGridProps> = ({ stores }) => {
  const { t } = useTranslation();

  if (stores.length === 0) {
    return (
      <motion.div 
        className="col-span-full flex flex-col justify-center items-center py-20 text-gray-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <svg 
          className="w-16 h-16 mb-4 text-gray-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p className="text-lg font-medium">{t('stores.noResults')}</p>
        <p className="text-sm mt-2">{t('stores.tryDifferentFilters')}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit="exit"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]"
    >
      <AnimatePresence>
        {stores.map((store, index) => (
          <StoreCard key={store.id} store={store} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default StoresGrid;
