import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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
        return i18n.language === lang 
            ? 'text-white font-medium bg-blue-700' 
            : 'text-gray-700 hover:bg-gray-200/50';
    };

    // Calculate button styles for active/inactive states
    const getButtonStyles = (lang: string) => {
        return i18n.language === lang
            ? 'font-medium'
            : '';
    };

    return (
        <div className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <motion.div 
                className="relative rounded-full flex items-center py-0.5 px-0.5 overflow-hidden shadow-sm border border-gray-100 bg-white"
                animate={{ 
                    boxShadow: isHovered 
                        ? '0 4px 12px rgba(0, 0, 0, 0.15)' 
                        : '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
                transition={{ duration: 0.2 }}
            >
                {/* Moving indicator background */}
                <motion.div
                    className="absolute top-0.5 bottom-0.5 w-1/3 bg-blue-700 rounded-full z-0"
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
                                className="absolute -inset-1 bg-blue-600 rounded-full"
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
                    className={`relative z-10 flex-1 px-1 py-1 text-sm text-center transition-all rounded-full ${getTextColor('en')}`}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className={`${getButtonStyles('en')}`}>US</span>
                </motion.button>

                <motion.button
                    onClick={() => changeLanguage('ru')}
                    className={`relative z-10 flex-1 px-1 py-1 text-sm text-center transition-all rounded-full ${getTextColor('ru')}`}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className={`${getButtonStyles('ru')}`}>RU</span>
                </motion.button>

                <motion.button
                    onClick={() => changeLanguage('kk')}
                    className={`relative z-10 flex-1 px-1 py-1 text-sm text-center transition-all rounded-full ${getTextColor('kk')}`}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className={`${getButtonStyles('kk')}`}>KZ</span>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default LanguageSwitcher;