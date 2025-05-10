import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

const MenuItem = ({ to, label, delay = 0 }: { to: string; label: string; delay?: number }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100 + delay * 50);

        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <Link
            to={to}
            className={`text-2xl font-medium text-white hover:text-white/80 hover:translate-x-1 block transform transition-all duration-300 ease-in-out ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
        >
            {label}
        </Link>
    );
};

const Header = () => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    {/* Левая часть хедера */}
                    <div className="flex items-center w-24">
                        <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                            <DialogTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="flex items-center gap-2 transition-all duration-300 hover:bg-primary/10"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="hidden sm:inline">{t('header.menu')}</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-black/95 backdrop-blur-md border-none shadow-lg overflow-y-auto">
                                <div className="flex flex-col space-y-6 py-8">
                                    <h2 className="text-3xl font-bold text-white mb-6 opacity-0 animate-fadeIn" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                                        {t('header.menu')}
                                    </h2>
                                    
                                    <div className="space-y-5">
                                        <MenuItem to="/" label={t('menu.shops')} delay={1} />
                                        <MenuItem to="/stores" label={t('menu.shops')} delay={2} />
                                        <MenuItem to="/" label={t('menu.cafesAndRestaurants')} delay={3} />
                                        <MenuItem to="/" label={t('menu.services')} delay={4} />
                                        <MenuItem to="/" label={t('menu.entertainment')} delay={5} />
                                        <MenuItem to="/" label={t('menu.newsAndPromotions')} delay={6} />
                                        <MenuItem to="/" label={t('menu.vacancies')} delay={7} />
                                        <MenuItem to="/" label={t('menu.contacts')} delay={8} />
                                    </div>

                                    <div className="pt-8 mt-4 border-t border-white/20 opacity-0 animate-fadeIn" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                                        <h3 className="mb-4 text-lg font-medium text-white/80">
                                            {t('menu.socialNetworks')}
                                        </h3>
                                        <div className="flex space-x-6">
                                            <a href="#" className="text-white hover:text-white/70 transition-colors duration-300 hover:translate-y-[-2px] inline-block">
                                                Instagram
                                            </a>
                                            <a href="#" className="text-white hover:text-white/70 transition-colors duration-300 hover:translate-y-[-2px] inline-block">
                                                Facebook
                                            </a>
                                            <a href="#" className="text-white hover:text-white/70 transition-colors duration-300 hover:translate-y-[-2px] inline-block">
                                                Telegram
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Логотип по центру */}
                    <Logo className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

                    {/* Правая часть хедера */}
                    <div className="flex items-center justify-end w-24">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;