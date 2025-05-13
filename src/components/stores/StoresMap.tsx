import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Store } from '@/store/storesStore';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface StoresMapProps {
  stores: Store[];
}

const StoresMap: React.FC<StoresMapProps> = ({ stores }) => {
  const { t } = useTranslation();
  const [activeFloor, setActiveFloor] = useState<number>(1);
  
  // Filter stores by current floor in map view
  const storesByFloor = stores.filter(store => store.floor === activeFloor);
  
  // Some constants for our visual map
  const floorDimensions = {
    width: 600,
    height: 400
  };
  
  // This would be replaced with real coordinates in a production app
  const getStorePosition = (store: Store, index: number) => {
    // Simple algorithm to distribute stores visually - would be replaced with real coordinates
    const storesPerRow = 3;
    const row = Math.floor(index / storesPerRow);
    const col = index % storesPerRow;
    
    // Distribute stores in a grid with some random offset
    const baseX = (col + 1) * (floorDimensions.width / (storesPerRow + 1));
    const baseY = (row + 1) * (floorDimensions.height / 4);
    
    // Add some randomness to make it look more natural
    const randomOffsetX = Math.sin(store.id * 10) * 30;
    const randomOffsetY = Math.cos(store.id * 10) * 20;
    
    return {
      x: baseX + randomOffsetX,
      y: baseY + randomOffsetY
    };
  };
  
  return (
    <div className="bg-white rounded-xl border p-4 overflow-hidden">
      <div className="mb-4">
        <Tabs 
          value={activeFloor.toString()} 
          onValueChange={(value) => setActiveFloor(parseInt(value))}
          className="w-full"
        >
          <TabsList className="w-full justify-center mb-2">
            <TabsTrigger
              value="1"
              className="flex-1 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 rounded-full"
            >
              {t('stores.floor1')}
            </TabsTrigger>
            <TabsTrigger
              value="2"
              className="flex-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-full"
            >
              {t('stores.floor2')}
            </TabsTrigger>
            <TabsTrigger
              value="3"
              className="flex-1 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 rounded-full"
            >
              {t('stores.floor3')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="relative h-[400px] border-2 rounded-lg border-gray-100 overflow-hidden bg-gray-50">
        {/* Floor background with subtle grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThlYiIgb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />

        {/* Floor label */}
        <div 
          className={`absolute top-4 left-4 text-lg font-bold text-white px-3 py-1 rounded-full ${
            activeFloor === 1 ? 'bg-green-500' : 
            activeFloor === 2 ? 'bg-blue-500' : 
            'bg-purple-500'
          }`}
        >
          {t(`stores.floor${activeFloor}`)}
        </div>
        
        {/* North indicator */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-full shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L12 22M12 2L6 8M12 2L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Stores on the map */}
        <div className="relative w-full h-full">
          {storesByFloor.length > 0 ? (
            storesByFloor.map((store, index) => {
              const position = getStorePosition(store, index);
              return (
                <motion.div
                  key={store.id}
                  className="absolute cursor-pointer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: position.x, 
                    y: position.y 
                  }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.1
                  }}
                  whileHover={{ scale: 1.1 }}
                  style={{ 
                    transform: `translate(-50%, -50%)`,
                  }}
                >
                  <motion.div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-lg ${
                      store.temporarilyClosed ? 'bg-red-500' : 
                      store.isNew ? 'bg-black' : 
                      store.hasPromotions ? 'bg-indigo-500' : 
                      'bg-gray-700'
                    }`}
                    animate={store.hasPromotions ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ 
                      repeat: store.hasPromotions ? Infinity : 0, 
                      repeatType: 'reverse',
                      duration: 1.5
                    }}
                  >
                    {store.name.substring(0, 1)}
                    
                    {/* Ripple effect for new stores */}
                    {store.isNew && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-black"
                        animate={{ scale: [1, 1.5, 1.8], opacity: [0.7, 0.4, 0] }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeOut"
                        }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Store name tooltip */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs shadow-md whitespace-nowrap">
                    {store.name}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              {t('stores.noStoresOnFloor')}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        {t('stores.mapDescription')}
      </div>
    </div>
  );
};

export default StoresMap;
