import type { Store } from '@/store/storesStore';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface StoreCardProps {
  store: Store;
  index: number;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, index }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: 'spring', 
        duration: 0.3, 
        delay: index * 0.05,
        stiffness: 400,
        damping: 17,
        ease: [0.4, 0.0, 0.2, 1]
      }}
      whileHover={{ 
        y: -5, 
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      <Link
        to={`/store/${store.id}`}
        className="block p-6 border rounded-xl bg-white h-full transition-all duration-300"
      >
        <div className="flex justify-between items-start mb-2">
          {store.logoUrl ? (
            <div className="w-12 h-12 rounded overflow-hidden mr-3 flex-shrink-0">
              <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
            </div>
          ) : null}
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{store.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{t(`stores.categories.${store.category}`)}</p>
          </div>
          
          {store.isNew && (
            <span className="bg-black text-white text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0">
              {t('stores.new')}
            </span>
          )}
        </div>

        {store.description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{store.description}</p>
        )}

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-600">
            {t(`stores.floor${store.floor}`)}
          </span>

          <div className="flex gap-2">
            {store.hasPromotions && (
              <motion.span 
                className="text-xs text-white bg-indigo-500 rounded-full px-2 py-1 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                %
              </motion.span>
            )}
            {store.hasLoyaltyProgram && (
              <motion.span 
                className="text-xs text-white bg-pink-500 rounded-full px-2 py-1 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ♥
              </motion.span>
            )}
            {store.temporarilyClosed && (
              <motion.span 
                className="text-xs text-white bg-red-500 rounded-full px-2 py-1 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                !
              </motion.span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StoreCard;
