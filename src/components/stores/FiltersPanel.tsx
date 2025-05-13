import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    useStoreCategories,
    useStoresStore
} from '@/store/storesStore';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Search } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const FiltersPanel: React.FC = () => {
    const { t } = useTranslation();
    const categories = useStoreCategories();

    const {
        activeCategory,
        setActiveCategory,
        activeFloor,
        setActiveFloor,
        searchTerm,
        setSearchTerm,
        showOnlyNew,
        showOnlyWithPromotions,
        showOnlyWithLoyalty,
        toggleShowOnlyNew,
        toggleShowOnlyWithPromotions,
        toggleShowOnlyWithLoyalty,
        viewMode,
        setViewMode
    } = useStoresStore();

    return (
        <div className="space-y-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={t('stores.search')}
                        className="pl-10 w-full h-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Button variant="outline" className="md:w-auto flex items-center gap-2">
                    <Filter size={18} />
                    {t('stores.filter')}
                </Button>
            </div>

            {/* Дополнительные чекбоксы с фильтрами */}
            <motion.div
                className="flex flex-wrap gap-4 pt-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showOnlyNew}
                        onChange={toggleShowOnlyNew}
                        className="w-4 h-4 accent-black rounded"
                    />
                    <span className="text-sm">{t('stores.showNew')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showOnlyWithPromotions}
                        onChange={toggleShowOnlyWithPromotions}
                        className="w-4 h-4 accent-black rounded"
                    />
                    <span className="text-sm">{t('stores.showPromotions')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showOnlyWithLoyalty}
                        onChange={toggleShowOnlyWithLoyalty}
                        className="w-4 h-4 accent-black rounded"
                    />
                    <span className="text-sm">{t('stores.showLoyalty')}</span>
                </label>
            </motion.div>

            {/* Вкладки для фильтрации по этажам с плавными переходами */}
            <Tabs defaultValue={activeFloor?.toString() || "all"} className="mb-6">
                <TabsList>
                    <TabsTrigger
                        value="all"
                        onClick={() => setActiveFloor(null)}
                        className="rounded-full transition-all duration-300"
                    >
                        {t('stores.all')}
                    </TabsTrigger>
                    <TabsTrigger
                        value="1"
                        onClick={() => setActiveFloor(1)}
                        className="rounded-full transition-all duration-300"
                    >
                        {t('stores.floor1')}
                    </TabsTrigger>
                    <TabsTrigger
                        value="2"
                        onClick={() => setActiveFloor(2)}
                        className="rounded-full transition-all duration-300"
                    >
                        {t('stores.floor2')}
                    </TabsTrigger>
                    <TabsTrigger
                        value="3"
                        onClick={() => setActiveFloor(3)}
                        className="rounded-full transition-all duration-300"
                    >
                        {t('stores.floor3')}
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Категории с плавными переходами */}
            <motion.div
                className="flex flex-wrap gap-2 mb-6"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.05
                        }
                    },
                    hidden: {}
                }}
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: { opacity: 1, scale: 1 }
                    }}
                >
                    <Button
                        variant={activeCategory === null ? "default" : "outline"}
                        size="sm"
                        className="rounded-full transition-all duration-300"
                        onClick={() => setActiveCategory(null)}
                    >
                        {t('stores.all')}
                    </Button>
                </motion.div>

                {categories.map((category: string) => (
                    <motion.div
                        key={category}
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            visible: { opacity: 1, scale: 1 }
                        }}
                    >
                        <Button
                            variant={activeCategory === category ? "default" : "outline"}
                            size="sm"
                            className="rounded-full transition-all duration-300"
                            onClick={() => setActiveCategory(category)}
                        >
                            {t(`stores.categories.${category}`)}
                        </Button>
                    </motion.div>
                ))}
            </motion.div>

            {/* Переключение вида */}
            <div className="flex justify-end mb-2">
                <div className="bg-gray-100 rounded-full p-1 flex">
                    <motion.button
                        whileHover={{ backgroundColor: viewMode === 'list' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-1.5 rounded-full flex items-center gap-1 text-sm ${viewMode === 'list'
                                ? 'bg-white text-black shadow-sm'
                                : 'text-gray-600'
                            } transition-all duration-200`}
                    >
                        <List size={16} />
                        <span>{t('stores.alphabet')}</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ backgroundColor: viewMode === 'map' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewMode('map')}
                        className={`px-3 py-1.5 rounded-full flex items-center gap-1 text-sm ${viewMode === 'map'
                                ? 'bg-white text-black shadow-sm'
                                : 'text-gray-600'
                            } transition-all duration-200`}
                    >
                        <Grid size={16} />
                        <span>{t('stores.map')}</span>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default FiltersPanel;
