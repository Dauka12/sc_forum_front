import { Button } from '@/components/ui/button';
import { DrawerContent, SidebarDrawer } from '@/components/ui/drawer/vaul-sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import { Facebook, Globe, Instagram, MapPin, Menu, ParkingSquare, Search, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface MenuItem {
    to: string;
    label: string;
    delay: number;
}

const MenuItem = ({ to, label, delay = 0 }: MenuItem) => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100 + delay * 50);

        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <Link
            to={to}
            className={`text-xl font-medium text-white hover:text-white/80 hover:translate-x-1 block transform transition-all duration-300 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
        >
            {label}
        </Link>
    );
};

const NavButton = ({ icon, label, onClick, delay = 0 }: { icon: React.ReactNode, label: string, onClick?: () => void, delay?: number }) => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100 + delay * 50);

        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <Button
            variant="outline"
            onClick={onClick}
            className={`bg-white/10 text-white hover:bg-white hover:text-black border-white/20 transition-all w-full justify-start ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{
                transitionProperty: 'all',
                transitionDuration: '0.3s',
                transitionTimingFunction: 'ease-in-out',
                animationDelay: `${delay * 0.05}s`
            }}
        >
            <div className="flex items-center gap-2">
                {icon}
                <span>{label}</span>
            </div>
        </Button>
    );
};

const LanguageSwitcherSidebar = () => {
    const { i18n } = useTranslation();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const changeLanguage = (lng: string) => {
        if (lng === i18n.language || isTransitioning) return;

        setIsTransitioning(true);
        setTimeout(() => {
            i18n.changeLanguage(lng);
            setIsTransitioning(false);
        }, 500);
    };

    // Calculate the position for the active indicator
    const getIndicatorPosition = () => {
        switch (i18n.language) {
            case 'en': return '0%';
            case 'ru': return '33.33%';
            case 'kk': return '66.66%';
            default: return '33.33%';
        }
    };

    // Calculate text color based on current language
    const getTextColor = (lang: string) => {
        return i18n.language === lang ? 'text-white font-medium' : 'text-gray-400';
    };

    return (
        <div className="relative w-full">
            <div className="relative h-14 bg-gray-800/80 rounded-full flex items-center py-2 px-2 overflow-hidden shadow-inner">
                {/* Moving indicator background */}
                <motion.div
                    className="absolute top-2 bottom-2 w-[32%] bg-gradient-to-r from-blue-700 to-blue-600 rounded-full z-0"
                    initial={false}
                    animate={{
                        left: getIndicatorPosition(),
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                    }}
                >
                    {/* The liquid drop effect */}
                    <AnimatePresence>
                        {isTransitioning && (
                            <motion.div
                                className="absolute -inset-1 bg-blue-700 rounded-full"
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1.2 }}
                                exit={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Language buttons */}
                <motion.button
                    onClick={() => changeLanguage('en')}
                    className={`relative z-10 flex-1 px-3 py-2 text-center ${getTextColor('en')} hover:text-white transition-colors text-base`}
                    whileTap={{ scale: 0.95 }}
                >
                    US
                </motion.button>

                <motion.button
                    onClick={() => changeLanguage('ru')}
                    className={`relative z-10 flex-1 px-3 py-2 text-center ${getTextColor('ru')} hover:text-white transition-colors text-base`}
                    whileTap={{ scale: 0.95 }}
                >
                    RU
                </motion.button>

                <motion.button
                    onClick={() => changeLanguage('kk')}
                    className={`relative z-10 flex-1 px-3 py-2 text-center ${getTextColor('kk')} hover:text-white transition-colors text-base`}
                    whileTap={{ scale: 0.95 }}
                >
                    KZ
                </motion.button>
            </div>
        </div>
    );
};

const MenuSidebar = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    const menuItems: MenuItem[] = [
        { to: "/stores", label: t('menu.shops'), delay: 2 },
        { to: "/", label: t('menu.cafesAndRestaurants'), delay: 3 },
        { to: "/", label: t('menu.services'), delay: 4 },
        { to: "/", label: t('menu.entertainment'), delay: 5 },
        { to: "/", label: t('menu.newsAndPromotions'), delay: 6 },
        { to: "/", label: t('menu.vacancies'), delay: 7 },
        { to: "/", label: t('menu.contacts'), delay: 8 },
    ];

    return (
        <SidebarDrawer
            open={isOpen}
            setOpen={setIsOpen}
            direction="left"
            outsideClose={true}
            className="bg-gradient-to-br from-black to-gray-800"
            DefaultTrigger={() => (
                <Button
                    variant="black"
                    size="sm"
                    className="flex items-center gap-2 transition-all duration-300"
                >
                    <Menu className="h-5 w-5" />
                    <span className="hidden sm:inline">{t('header.menu')}</span>
                </Button>
            )}
        >
            <DrawerContent>
                <div className="flex flex-col h-full text-white">
                    {/* Header */}
                    <div className="px-8 py-4 flex-shrink-0">
                        <h2 className="text-2xl font-bold text-white opacity-0 animate-fadeIn"
                            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                            {t('header.menu')}
                        </h2>
                    </div>

                    {/* Main Navigation Menu - Scrollable */}
                    <div className="px-8 overflow-y-auto flex-grow custom-scrollbar">
                        <div className="space-y-4 pb-4">
                            {menuItems.map((item, index) => (
                                <MenuItem key={index} to={item.to} label={item.label} delay={item.delay} />
                            ))}
                        </div>
                    </div>

                    {/* Fixed bottom section that's always visible */}
                    <div className="flex-shrink-0 mt-auto">
                        {/* Quick Navigation Buttons */}
                        <div className="px-8 pt-4 border-t border-white/10">
                            <h3 className="text-white/70 text-sm font-medium mb-3">
                                {t('header.quickNav')}
                            </h3>
                            <div className="space-y-2">
                                <NavButton
                                    icon={<MapPin className="h-5 w-5" />}
                                    label={t('header.map')}
                                    delay={1}
                                />
                                <NavButton
                                    icon={<ParkingSquare className="h-5 w-5" />}
                                    label={t('header.parking')}
                                    delay={2}
                                />
                                <NavButton
                                    icon={<Search className="h-5 w-5" />}
                                    label={t('header.search')}
                                    delay={3}
                                />
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="px-8 pt-4 mt-2 border-t border-white/10">
                            <h3 className="text-white/70 text-sm font-medium mb-3">
                                {t('menu.socialNetworks')}
                            </h3>
                            <div className="flex space-x-4">
                                <a href="#" className="group">
                                    <div className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                                        <Instagram className="h-5 w-5 text-white" />
                                    </div>
                                </a>
                                <a href="#" className="group">
                                    <div className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                                        <Facebook className="h-5 w-5 text-white" />
                                    </div>
                                </a>
                                <a href="#" className="group">
                                    <div className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                                        <Send className="h-5 w-5 text-white" />
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Language Switcher */}
                        <div className="px-8 py-4 mt-2 border-t border-white/10">
                            <h3 className="text-white/70 text-sm font-medium mb-4 flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                {t('header.language')}
                            </h3>
                            <LanguageSwitcherSidebar />
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </SidebarDrawer>
    );
};

export default MenuSidebar;
