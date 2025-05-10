import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Search } from 'lucide-react';
import { useMemo, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Store = {
    id: number;
    name: string;
    category: string;
    floor: 1 | 2 | 3;
    isNew?: boolean;
    hasPromotions?: boolean;
    hasLoyaltyProgram?: boolean;
    temporarilyClosed?: boolean;
};

// Демо-данные для магазинов
const stores: Store[] = [
    { id: 1, name: 'Zara', category: 'womenClothing', floor: 1, hasPromotions: true },
    { id: 2, name: 'Adidas', category: 'sportswear', floor: 2, hasLoyaltyProgram: true },
    { id: 3, name: 'H&M', category: 'womenClothing', floor: 1 },
    { id: 4, name: 'Samsung', category: 'appliances', floor: 3 },
    { id: 5, name: 'Apple Store', category: 'appliances', floor: 2, isNew: true },
    { id: 6, name: 'Nike', category: 'sportswear', floor: 2 },
    { id: 7, name: 'Lego', category: 'toys', floor: 3, hasPromotions: true },
    { id: 8, name: 'Bershka', category: 'womenClothing', floor: 1 },
    { id: 9, name: 'Calvin Klein', category: 'underwear', floor: 2 },
    { id: 10, name: 'Xiaomi', category: 'appliances', floor: 3, temporarilyClosed: true },
    { id: 11, name: 'Mango', category: 'womenClothing', floor: 1 },
    { id: 12, name: 'Hugo Boss', category: 'menClothing', floor: 2 },
];

const StoreCard = ({ store }: { store: Store }) => {
    const { t } = useTranslation();
    return (
        <Link
            to={`/store/${store.id}`}
            key={store.id}
            className="block p-6 border rounded-xl hover:shadow-md transition-all bg-white"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{store.name}</h3>
                {store.isNew && (
                    <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                        {t('stores.new')}
                    </span>
                )}
            </div>
            <p className="text-gray-600 mb-4">{t(`stores.categories.${store.category}`)}</p>

            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    {t(`stores.floor${store.floor}`)}
                </span>

                <div className="flex gap-2">
                    {store.hasPromotions && (
                        <span className="text-xs text-gray-500 border rounded-full px-2 py-1">
                            %
                        </span>
                    )}
                    {store.hasLoyaltyProgram && (
                        <span className="text-xs text-gray-500 border rounded-full px-2 py-1">
                            ♥
                        </span>
                    )}
                    {store.temporarilyClosed && (
                        <span className="text-xs text-red-500 border border-red-500 rounded-full px-2 py-1">
                            !
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

const StoresList = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeFloor, setActiveFloor] = useState<number | null>(null);
    const [view, setView] = useState<'list' | 'map'>('list');
    const [isPending, startTransition] = useTransition();

    // Handle filter changes with a transition for smoother UI
    const handleCategoryChange = (category: string | null) => {
        startTransition(() => {
            setActiveCategory(category);
        });
    };

    const handleFloorChange = (floor: number | null) => {
        startTransition(() => {
            setActiveFloor(floor);
        });
    };

    // Memoize filtered results to prevent unnecessary re-renders
    const filteredStores = useMemo(() => {
        return stores.filter(store => {
            // Поиск по имени
            const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase());

            // Фильтр по категории
            const matchesCategory = activeCategory ? store.category === activeCategory : true;

            // Фильтр по этажу
            const matchesFloor = activeFloor ? store.floor === activeFloor : true;

            return matchesSearch && matchesCategory && matchesFloor;
        });
    }, [searchTerm, activeCategory, activeFloor]);

    // Get unique categories
    const categories = useMemo(() => {
        return Array.from(new Set(stores.map(store => store.category)));
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{t('stores.title')}</h1>

            {/* Поиск и фильтры */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={t('stores.search')}
                            className="pl-10 w-full h-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Button variant="outline" className="md:w-auto flex items-center gap-2">
                        <Filter size={18} />
                        {t('stores.filter')}
                    </Button>
                </div>

                {/* Вкладки для фильтрации по этажам с плавными переходами */}
                <Tabs defaultValue="all" className="mb-6">
                    <TabsList>
                        <TabsTrigger
                            value="all"
                            onClick={() => handleFloorChange(null)}
                            className="rounded-full transition-all duration-300"
                        >
                            {t('stores.all')}
                        </TabsTrigger>
                        <TabsTrigger
                            value="floor1"
                            onClick={() => handleFloorChange(1)}
                            className="rounded-full transition-all duration-300"
                        >
                            {t('stores.floor1')}
                        </TabsTrigger>
                        <TabsTrigger
                            value="floor2"
                            onClick={() => handleFloorChange(2)}
                            className="rounded-full transition-all duration-300"
                        >
                            {t('stores.floor2')}
                        </TabsTrigger>
                        <TabsTrigger
                            value="floor3"
                            onClick={() => handleFloorChange(3)}
                            className="rounded-full transition-all duration-300"
                        >
                            {t('stores.floor3')}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Категории с плавными переходами */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <Button
                        variant={activeCategory === null ? "default" : "outline"}
                        size="sm"
                        className="rounded-full transition-all duration-300"
                        onClick={() => handleCategoryChange(null)}
                    >
                        {t('stores.all')}
                    </Button>

                    {categories.map(category => (
                        <Button
                            key={category}
                            variant={activeCategory === category ? "default" : "outline"}
                            size="sm"
                            className="rounded-full transition-all duration-300"
                            onClick={() => handleCategoryChange(category)}
                        >
                            {t(`stores.categories.${category}`)}
                        </Button>
                    ))}
                </div>

                {/* Переключение вида */}
                <div className="flex justify-end mb-4">
                    <Tabs value={view} className="w-auto">
                        <TabsList>
                            <TabsTrigger
                                value="list"
                                onClick={() => setView('list')}
                                className="rounded-full"
                            >
                                {t('stores.alphabet')}
                            </TabsTrigger>
                            <TabsTrigger
                                value="map"
                                onClick={() => setView('map')}
                                className="rounded-full"
                            >
                                {t('stores.map')}
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Список магазинов с анимацией */}
            <div className={`transition-opacity duration-300 ${isPending ? 'opacity-70' : 'opacity-100'}`}>
                {view === 'list' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
                        {filteredStores.map((store) => (
                            <div key={store.id} className="animate-fadeIn" style={{ animationDelay: `${store.id * 50}ms` }}>
                                <StoreCard store={store} />
                            </div>
                        ))}
                        {filteredStores.length === 0 && (
                            <div className="col-span-full flex justify-center items-center py-10 text-gray-500">
                                {t('stores.noResults')}
                            </div>
                        )}
                    </div>
                )}

                {/* Вид карты (заглушка) */}
                {view === 'map' && (
                    <div className="min-h-[400px] border rounded-xl flex items-center justify-center bg-gray-100">
                        <p className="text-gray-500">
                            {t('stores.onMap')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoresList;