import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
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
        return i18n.language === lang ? 'text-white font-medium' : 'text-gray-300';
    };

    return (
        <div className="relative">
            <div className="relative h-10 bg-gray-900 rounded-full flex items-center py-1 px-1 overflow-hidden shadow-md">
                {/* Moving indicator background */}
                <motion.div
                    className="absolute top-1 bottom-1 w-[32%] bg-gradient-to-r from-blue-600 to-blue-500 rounded-full z-0"
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
                    className={`relative z-10 flex-1 px-3 py-1.5 text-center ${getTextColor('en')} hover:text-white transition-colors`}
                    whileTap={{ scale: 0.95 }}
                >
                    US
                </motion.button>

                <motion.button
                    onClick={() => changeLanguage('ru')}
                    className={`relative z-10 flex-1 px-3 py-1.5 text-center ${getTextColor('ru')} hover:text-white transition-colors`}
                    whileTap={{ scale: 0.95 }}
                >
                    RU
                </motion.button>

                <motion.button
                    onClick={() => changeLanguage('kk')}
                    className={`relative z-10 flex-1 px-3 py-1.5 text-center ${getTextColor('kk')} hover:text-white transition-colors`}
                    whileTap={{ scale: 0.95 }}
                >
                    KZ
                </motion.button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;