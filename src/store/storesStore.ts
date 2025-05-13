import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Store = {
    id: number;
    name: string;
    category: string;
    floor: 1 | 2 | 3;
    isNew?: boolean;
    hasPromotions?: boolean;
    hasLoyaltyProgram?: boolean;
    temporarilyClosed?: boolean;
    logoUrl?: string;
    description?: string;
};

type ViewMode = 'list' | 'map';

interface StoresState {
    // Данные
    stores: Store[];
    isLoading: boolean;
    
    // Фильтры
    searchTerm: string;
    activeCategory: string | null;
    activeFloor: number | null;
    viewMode: ViewMode;
    
    // Флаги фильтрации
    showOnlyNew: boolean;
    showOnlyWithPromotions: boolean;
    showOnlyWithLoyalty: boolean;
    
    // Методы
    setSearchTerm: (term: string) => void;
    setActiveCategory: (category: string | null) => void;
    setActiveFloor: (floor: number | null) => void;
    setViewMode: (mode: ViewMode) => void;
    toggleShowOnlyNew: () => void;
    toggleShowOnlyWithPromotions: () => void;
    toggleShowOnlyWithLoyalty: () => void;
    fetchStores: () => Promise<void>;
}

// Демо-данные для магазинов
const demoStores: Store[] = [
    { id: 1, name: 'Zara', category: 'womenClothing', floor: 1, hasPromotions: true, description: 'Популярный бренд одежды для женщин' },
    { id: 2, name: 'Adidas', category: 'sportswear', floor: 2, hasLoyaltyProgram: true, description: 'Спортивная одежда и обувь' },
    { id: 3, name: 'H&M', category: 'womenClothing', floor: 1, description: 'Модная одежда по доступным ценам' },
    { id: 4, name: 'Samsung', category: 'appliances', floor: 3, description: 'Электроника и техника' },
    { id: 5, name: 'Apple Store', category: 'appliances', floor: 2, isNew: true, description: 'Официальный магазин техники Apple' },
    { id: 6, name: 'Nike', category: 'sportswear', floor: 2, description: 'Кроссовки и спортивная одежда' },
    { id: 7, name: 'Lego', category: 'toys', floor: 3, hasPromotions: true, description: 'Конструкторы и игрушки для детей' },
    { id: 8, name: 'Bershka', category: 'womenClothing', floor: 1, description: 'Молодежная модная одежда' },
    { id: 9, name: 'Calvin Klein', category: 'underwear', floor: 2, description: 'Нижнее белье и аксессуары' },
    { id: 10, name: 'Xiaomi', category: 'appliances', floor: 3, temporarilyClosed: true, description: 'Смартфоны и умные устройства' },
    { id: 11, name: 'Mango', category: 'womenClothing', floor: 1, description: 'Элегантная женская одежда' },
    { id: 12, name: 'Hugo Boss', category: 'menClothing', floor: 2, description: 'Премиальная мужская одежда' },
];

export const useStoresStore = create<StoresState>()(
    persist(
        (set) => ({
            // Начальное состояние
            stores: demoStores,
            isLoading: false,
            searchTerm: '',
            activeCategory: null,
            activeFloor: null,
            viewMode: 'list',
            showOnlyNew: false,
            showOnlyWithPromotions: false,
            showOnlyWithLoyalty: false,
            
            // Методы
            setSearchTerm: (term) => set({ searchTerm: term }),
            setActiveCategory: (category) => set({ activeCategory: category }),
            setActiveFloor: (floor) => set({ activeFloor: floor }),
            setViewMode: (mode) => set({ viewMode: mode }),
            toggleShowOnlyNew: () => set((state) => ({ showOnlyNew: !state.showOnlyNew })),
            toggleShowOnlyWithPromotions: () => set((state) => ({ 
                showOnlyWithPromotions: !state.showOnlyWithPromotions 
            })),
            toggleShowOnlyWithLoyalty: () => set((state) => ({ 
                showOnlyWithLoyalty: !state.showOnlyWithLoyalty 
            })),
            
            // Имитация загрузки данных с сервера
            fetchStores: async () => {
                set({ isLoading: true });
                
                // Имитация задержки сетевого запроса
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // В реальном приложении тут был бы API запрос
                set({ 
                    stores: demoStores,
                    isLoading: false 
                });
            }
        }),
        {
            name: 'stores-storage',
            partialize: (state) => ({ 
                activeCategory: state.activeCategory,
                activeFloor: state.activeFloor,
                viewMode: state.viewMode
            }),
        }
    )
);

// Селектор для получения отфильтрованных магазинов
export const useFilteredStores = (): Store[] => {
    const { 
        stores, 
        searchTerm, 
        activeCategory, 
        activeFloor,
        showOnlyNew,
        showOnlyWithPromotions,
        showOnlyWithLoyalty
    } = useStoresStore();
    
    return stores.filter(store => {
        // Поиск по имени
        const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Фильтр по категории
        const matchesCategory = activeCategory ? store.category === activeCategory : true;
        
        // Фильтр по этажу
        const matchesFloor = activeFloor ? store.floor === activeFloor : true;
        
        // Дополнительные фильтры
        const matchesNew = showOnlyNew ? !!store.isNew : true;
        const matchesPromotions = showOnlyWithPromotions ? !!store.hasPromotions : true;
        const matchesLoyalty = showOnlyWithLoyalty ? !!store.hasLoyaltyProgram : true;
        
        return matchesSearch && 
               matchesCategory && 
               matchesFloor &&
               matchesNew &&
               matchesPromotions &&
               matchesLoyalty;
    });
};

// Селектор для получения уникальных категорий
export const useStoreCategories = (): string[] => {
    const { stores } = useStoresStore();
    return Array.from(new Set(stores.map(store => store.category)));
};
