import { Button } from '@/components/ui/button';
import { DrawerContent, SidebarDrawer } from '@/components/ui/drawer/vaul-sidebar';
import { MapPin, Menu, ParkingSquare, Search } from 'lucide-react';
import React from 'react';
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

const LanguageButton = ({ label, active, onClick, flag }: {
    lang: string,
    label: string,
    active: boolean,
    onClick: () => void,
    flag: string
}) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all ${
                active
                    ? 'bg-white text-black font-medium'
                    : 'bg-white/10 text-white hover:bg-white/20'
            }`}
        >
            <span className="text-lg">{flag}</span>
            <span>{label}</span>
        </button>
    );
};

const MenuSidebar = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    // Effect to handle body scroll locking
    React.useEffect(() => {
        if (isOpen) {
            // Store the current scroll position and lock body scroll
            const scrollY = window.scrollY;
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            // Restore scroll position when drawer closes
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.paddingRight = '';

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

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
                    <div className="px-8 py-6">
                        <h2 className="text-2xl font-bold text-white mb-6 opacity-0 animate-fadeIn"
                            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                            {t('header.menu')}
                        </h2>
                    </div>

                    {/* Main Navigation Menu */}
                    <div className="px-8 flex-grow">
                        <div className="space-y-4">
                            {menuItems.map((item, index) => (
                                <MenuItem key={index} to={item.to} label={item.label} delay={item.delay} />
                            ))}
                        </div>
                    </div>

                    {/* Quick Navigation Buttons */}
                    <div className="px-8 pt-6 mt-4 border-t border-white/10">
                        <h3 className="text-white/70 text-sm font-medium mb-4">
                            {t('header.quickNav')}
                        </h3>
                        <div className="space-y-3">
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
                    <div className="px-8 pt-6 mt-2 border-t border-white/10">
                        <h3 className="text-white/70 text-sm font-medium mb-4">
                            {t('menu.socialNetworks')}
                        </h3>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                                <span className="text-lg">IG</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                                <span className="text-lg">FB</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                                <span className="text-lg">TG</span>
                            </a>
                        </div>
                    </div>

                    {/* Language Switcher */}
                    <div className="px-8 py-6 mt-2 border-t border-white/10">
                        <h3 className="text-white/70 text-sm font-medium mb-4">
                            {t('header.language')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <LanguageButton
                                lang="en"
                                label="English"
                                flag="🇺🇸"
                                active={i18n.language === 'en'}
                                onClick={() => changeLanguage('en')}
                            />
                            <LanguageButton
                                lang="ru"
                                label="Русский"
                                flag="🇷🇺"
                                active={i18n.language === 'ru'}
                                onClick={() => changeLanguage('ru')}
                            />
                            <LanguageButton
                                lang="kk"
                                label="Қазақша"
                                flag="🇰🇿"
                                active={i18n.language === 'kk'}
                                onClick={() => changeLanguage('kk')}
                            />
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </SidebarDrawer>
    );
};

export default MenuSidebar;
