'use client';
import { Button } from '@/components/ui/button';
import { MapPin, ParkingSquare, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import MenuSidebar from './Sidebar';

const Header = () => {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
        
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    return (
        <header 
            className={`fixed top-0 left-0 right-0 w-full backdrop-blur-md z-50 transition-all duration-300 ease-in-out
                ${scrolled 
                    ? 'bg-white/90 border-b shadow-sm py-2' 
                    : 'bg-white/80 py-4'}
                ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
            `}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Always visible */}
                        <MenuSidebar />
                        
                        {/* Only visible on md and larger screens */}
                        <div className="hidden md:flex md:items-center md:gap-3">
                            <Button 
                                variant="black" 
                                size="sm" 
                                className="flex items-center gap-2 font-semibold transition-transform hover:scale-105"
                            >
                                <MapPin className="w-4 h-4" />
                                <span className="animate-fadeIn" style={{animationDelay: '0.1s'}}>{t('header.map')}</span>
                            </Button>
                            
                            <Button 
                                variant="black" 
                                size="sm" 
                                className="flex items-center gap-2 font-semibold transition-transform hover:scale-105"
                            >
                                <ParkingSquare className="w-4 h-4" />
                                <span className="animate-fadeIn" style={{animationDelay: '0.2s'}}>{t('header.parking')}</span>
                            </Button>
                        </div>
                    </div>

                    <Logo 
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 
                            ${scrolled ? 'scale-90' : 'scale-100'}`} 
                    />

                    {/* Hide on mobile, show on md and larger screens */}
                    <div className="hidden md:flex md:items-center md:gap-3">
                        <Button 
                            variant="black" 
                            size="sm" 
                            className="flex items-center gap-2 font-semibold transition-transform hover:scale-105"
                        >
                            <Search className="w-4 h-4" />
                            <span className="animate-fadeIn" style={{animationDelay: '0.3s'}}>{t('header.search')}</span>
                        </Button>
                        <div className="animate-fadeIn" style={{animationDelay: '0.4s'}}>
                            <LanguageSwitcher />
                        </div>
                    </div>
                    
                    {/* Only visible on mobile, empty div to balance layout */}
                    <div className="w-[60px] md:hidden"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;