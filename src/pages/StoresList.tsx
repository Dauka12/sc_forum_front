import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Zustand store
import { useFilteredStores, useStoresStore } from '@/store/storesStore';

// Custom components
import FiltersPanel from '@/components/stores/FiltersPanel';
import StoresGrid from '@/components/stores/StoresGrid';
import StoresMap from '@/components/stores/StoresMap';

const StoresList = () => {
    const { t } = useTranslation();
    const { fetchStores, viewMode, isLoading } = useStoresStore();
    const filteredStores = useFilteredStores();

    // Fetch stores on component mount
    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    return (
        <motion.div 
            className="container mx-auto px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.h1 
                className="text-3xl font-bold mb-8" 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            >
                {t('stores.title')}
            </motion.h1>

            {/* Filters panel */}
            <FiltersPanel />

            {/* Content area with loading state and animations */}
            <div className="min-h-[400px]">
                {isLoading ? (
                    <motion.div 
                        className="flex flex-col items-center justify-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500">{t('stores.loading')}</p>
                    </motion.div>
                ) : (
                    <AnimatePresence mode="wait">
                        {viewMode === 'list' ? (
                            <motion.div
                                key="list-view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <StoresGrid stores={filteredStores} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="map-view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <StoresMap stores={filteredStores} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
};

export default StoresList;