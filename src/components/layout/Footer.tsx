import { Facebook, Instagram, Map, Phone, Send, Timer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-gradient-to-tr from-gray-900 to-black text-white pt-16 pb-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl animate-pulse" 
                    style={{animationDuration: '15s'}}></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" 
                    style={{animationDuration: '20s', animationDelay: '2s'}}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    {/* Logo and information column */}
                    <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-6">
                        <div className="flex items-center justify-center md:justify-start">
                            <Logo className="bg-white mb-2 transform hover:rotate-12 transition-transform duration-300" />
                            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                Forum
                            </span>
                        </div>
                        
                        <div className="flex flex-col space-y-3 mt-6 w-full max-w-xs">
                            <div className="flex items-start group">
                                <Map className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white transition-colors" />
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                    {t('footer.address')}
                                </p>
                            </div>
                            
                            <div className="flex items-start group">
                                <Phone className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white transition-colors" />
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                    {t('footer.phone')}
                                </p>
                            </div>
                            
                            <div className="flex items-start group">
                                <Timer className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white transition-colors" />
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                    {t('footer.workingHours')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation columns */}
                    <div className="md:col-span-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {/* Column 1 */}
                            <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
                                <h3 className="font-bold mb-4 text-lg relative pb-2 inline-block">
                                    Forum
                                    <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                                            <span className="transform transition-transform duration-300 inline-block hover:translate-x-1">О нас</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                                            <span className="transform transition-transform duration-300 inline-block hover:translate-x-1">Новости</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                                            <span className="transform transition-transform duration-300 inline-block hover:translate-x-1">События</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                                            <span className="transform transition-transform duration-300 inline-block hover:translate-x-1">Вакансии</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 2 */}
                            <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
                                <h3 className="font-bold mb-4 text-lg relative pb-2 inline-block">
                                    Магазины
                                    <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                                            <span className="transform transition-transform duration-300 inline-block hover:translate-x-1">Одежда</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                                            <span className="transform transition-transform duration-300 inline-block hover:translate-x-1">Электроника</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                                            <span className="transform transition-transform duration-300 inline-block hover:translate-x-1">Товары для дома</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                                            <span className="transform transition-transform duration-300 inline-block hover:translate-x-1">Рестораны и кафе</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 3 */}
                            <div className="animate-fadeIn" style={{animationDelay: '0.3s'}}>
                                <h3 className="font-bold mb-4 text-lg relative pb-2 inline-block">
                                    Клиентам
                                    <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                                            <span className="transform transition-transform duration-300 inline-block hover:translate-x-1">Как добраться</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                                            <span className="transform transition-transform duration-300 inline-block hover:translate-x-1">Парковка</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                                            <span className="transform transition-transform duration-300 inline-block hover:translate-x-1">Контакты</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                                            <span className="transform transition-transform duration-300 inline-block hover:translate-x-1">FAQ</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social media links */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <p className="text-gray-400 text-sm">{t('footer.allRightsReserved')}</p>
                        </div>
                        
                        <div className="flex space-x-4">
                            <a href="#" className="group">
                                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                                    <Instagram className="h-5 w-5 text-gray-300 group-hover:text-white" />
                                </div>
                            </a>
                            <a href="#" className="group">
                                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                                    <Facebook className="h-5 w-5 text-gray-300 group-hover:text-white" />
                                </div>
                            </a>
                            <a href="#" className="group">
                                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                                    <Send className="h-5 w-5 text-gray-300 group-hover:text-white" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;