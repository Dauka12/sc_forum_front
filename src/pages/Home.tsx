import blurredShopCenterImage1 from '@/assets/images/blurred-shop-center-1.jpeg';
import blurredShopCenterImage2 from '@/assets/images/blurred-shop-center-2.jpeg';
import shopCenterImage1 from '@/assets/images/shop-center-1.jpeg';
import shopCenterImage2 from '@/assets/images/shop-center-2.jpeg';
import shopCenterImage3 from '@/assets/images/shop-center-3.jpeg';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Building, MapPin, ParkingSquare, ShoppingBag, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Original images for carousel
const carouselImages = [
    shopCenterImage1,
    shopCenterImage2,
    shopCenterImage3,
];

// Blurred images for backgrounds
const backgroundImages = [
    blurredShopCenterImage1,
    blurredShopCenterImage2,
];

const Home = () => {
    const { t } = useTranslation();
    const [currentImage, setCurrentImage] = useState(0);
    const storesRef = useRef<HTMLDivElement>(null);
    const promotionsRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    
    // Smooth scrollY value using spring physics
    const { scrollYProgress } = useScroll();
    const smoothScrollY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % carouselImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const scrollToContent = () => {
        storesRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    // Featured store cards - with translations
    const featuredStores = [
        { name: t('stores.featured.fashion'), type: t('stores.categories.womenClothing'), floor: 1, isNew: true },
        { name: t('stores.featured.tech'), type: t('stores.categories.appliances'), floor: 2, isNew: false },
        { name: t('stores.featured.homeDesign'), type: t('stores.categories.other'), floor: 1, isNew: true },
        { name: t('stores.featured.sports'), type: t('stores.categories.sportsGoods'), floor: 3, isNew: false },
    ];

    // Promotions with translations
    const promotions = [
        {
            title: t('promotions.summerSale.title'),
            description: t('promotions.summerSale.description'),
            period: t('promotions.summerSale.period')
        },
        {
            title: t('promotions.blackFriday.title'),
            description: t('promotions.blackFriday.description'),
            period: t('promotions.blackFriday.period')
        },
        {
            title: t('promotions.newStore.title'),
            description: t('promotions.newStore.description'),
            period: t('promotions.newStore.period')
        },
    ];

    const services = [
        { icon: <Building className="h-8 w-8" />, title: t('menu.shops'), count: "150+" },
        { icon: <ParkingSquare className="h-8 w-8" />, title: t('header.parking'), count: "1000+" },
        { icon: <MapPin className="h-8 w-8" />, title: t('header.map'), count: "4" },
        { icon: <ShoppingBag className="h-8 w-8" />, title: "Brands", count: "300+" },
    ];

    return (
        <div className="w-full">
            {/* Hero Section with Parallax - Adjusted to appear higher */}
            <section className="relative h-screen overflow-hidden -mt-16">
                {/* Background Images Carousel */}
                <AnimatePresence mode='wait'>
                    <motion.div 
                        key={currentImage}
                        className="absolute inset-0 bg-cover bg-center"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        style={{ 
                            backgroundImage: `url(${carouselImages[currentImage]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'brightness(0.7)'
                        }}
                    />
                </AnimatePresence>

                {/* Enhanced Gradient Overlay with better fade at the top for header */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70">
                    {/* Additional fade at the top for smooth header transition */}
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent"></div>
                </div>

                {/* Carousel Indicators - Moved up slightly */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {carouselImages.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImage ? 'bg-white scale-125' : 'bg-white/50'}`}
                            onClick={() => setCurrentImage(index)}
                        />
                    ))}
                </div>

                {/* Hero Content - Moved up slightly */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 pt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 20,
                            delay: 0.2
                        }}
                        className="mb-6"
                    >
                        <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                            FORUM
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100 mb-8">
                            {t('home.hero.subtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button
                                size="lg"
                                className="bg-white text-black hover:bg-black hover:text-white border-2 border-white group"
                                asChild
                            >
                                <Link to="/stores">
                                    {t('menu.shops')}
                                    <ShoppingBag className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-black group"
                            >
                                {t('header.howToGet')}
                                <MapPin className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Scroll Down Indicator */}
                    <motion.div 
                        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 2,
                            ease: "easeInOut"
                        }}
                        onClick={scrollToContent}
                    >
                        <div className="flex flex-col items-center">
                            <p className="text-sm mb-2">{t('home.scrollDown')}</p>
                            <ArrowDown className="h-6 w-6" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stores Section */}
            <section 
                ref={storesRef}
                className="relative py-24 overflow-hidden"
            >
                {/* Background with parallax */}
                <motion.div
                    className="absolute inset-0 bg-white"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(200, 200, 255, 0.1), transparent 40%)'
                    }}
                />
                
                <motion.div 
                    className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"
                    style={{
                        zIndex: 1
                    }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('menu.shops')}</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Откройте для себя мир шоппинга с более чем 150 магазинами под одной крышей
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredStores.map((store, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: i * 0.1,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                key={i}
                                className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group border"
                                whileHover={{ y: -5 }}
                            >
                                <div className="h-48 bg-gray-200 relative overflow-hidden">
                                    <motion.div 
                                        className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: 'tween', duration: 0.5 }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                        <h3 className="text-xl font-semibold text-white">{store.name}</h3>
                                        <p className="text-white/80">{store.type}</p>
                                    </div>
                                    {store.isNew && (
                                        <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {t('stores.new')}
                                        </span>
                                    )}
                                </div>
                                <div className="p-4 bg-white">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-500">
                                            {t('stores.floor')} {store.floor}
                                        </span>
                                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                            {t('stores.onMap')}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-12 text-center"
                    >
                        <Button asChild>
                            <Link to="/stores" className="flex items-center gap-2 px-6">
                                {t('stores.all')} <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Promotions & News Section with 3D Scroll Effect */}
            <section 
                ref={promotionsRef}
                className="relative py-24 overflow-hidden"
            >
                {/* 3D perspective container */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Parallax background */}
                    <motion.div 
                        className="absolute inset-0"
                        style={{ 
                            backgroundImage: `url(${backgroundImages[0]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(8px) brightness(0.4)',
                            scale: 1.2,
                            y: useTransform(smoothScrollY, [0.3, 0.6], ['-10%', '10%'])
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t('menu.newsAndPromotions')}</h2>
                        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                            Следите за последними акциями и событиями в нашем торговом центре
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {promotions.map((promo, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: i * 0.1,
                                    type: 'spring',
                                    stiffness: 50,
                                    damping: 15
                                }}
                                whileHover={{ 
                                    y: -10, 
                                    transition: { duration: 0.3, ease: 'easeOut' }
                                }}
                                key={i}
                                className="bg-white/90 backdrop-blur-md rounded-lg overflow-hidden shadow-lg border border-white/20 transform-gpu"
                                style={{
                                    perspective: 1000
                                }}
                            >
                                <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Star className="w-12 h-12 text-white/60" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                        <h3 className="text-xl font-semibold text-white">{promo.title}</h3>
                                        <p className="text-white/80 text-sm">{promo.period}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-700 mb-4">{promo.description}</p>
                                    <Button variant="link" className="px-0 font-medium">
                                        Подробнее
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services & Information Section */}
            <motion.section 
                ref={servicesRef} 
                className="py-24 bg-white relative overflow-hidden"
            >
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('menu.services')}</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Все сервисы и услуги для вашего комфортного шоппинга
                        </p>
                    </motion.div>

                    {/* Services Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {services.map((service, i) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: i * 0.1,
                                    type: 'spring',
                                    stiffness: 100,
                                    damping: 15
                                }}
                                whileHover={{ scale: 1.03 }}
                                key={i}
                                className="text-center p-6 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 shadow-sm"
                            >
                                <motion.div 
                                    className="bg-gray-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-blue-600"
                                    whileHover={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {service.icon}
                                </motion.div>
                                <motion.h3 
                                    className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ 
                                        delay: 0.1 + i * 0.1, 
                                        type: 'spring',
                                        stiffness: 100
                                    }}
                                >
                                    {service.count}
                                </motion.h3>
                                <p className="text-gray-600">{service.title}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* How to get here / Parking / Map */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ 
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-8 md:p-12 text-white">
                                <motion.h3 
                                    className="text-3xl font-bold mb-6"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {t('header.howToGet')}
                                </motion.h3>
                                <div className="space-y-4">
                                    <motion.p 
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <MapPin className="mr-3 h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                                        <span>{t('footer.address')}</span>
                                    </motion.p>
                                    <motion.p 
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <ParkingSquare className="mr-3 h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                                        <span>Бесплатная парковка на 1000+ машиномест</span>
                                    </motion.p>
                                    <motion.p 
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Building className="mr-3 h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                                        <span>{t('footer.workingHours')}</span>
                                    </motion.p>
                                </div>
                                <motion.div 
                                    className="mt-8"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <Button 
                                        variant="outline" 
                                        className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900 group"
                                    >
                                        Открыть Карту
                                        <MapPin className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                                    </Button>
                                </motion.div>
                            </div>
                            <motion.div 
                                className="h-96 bg-gray-300 relative"
                                initial={{ opacity: 0, clipPath: "inset(10% 10% 10% 10% round 10px)" }}
                                whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0px)" }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 1 }}
                                style={{ 
                                    backgroundImage: `url(${backgroundImages[1]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="absolute inset-0 bg-black/10"></div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section 
                ref={ctaRef}
                className="relative py-24 overflow-hidden"
            >
                <motion.div 
                    className="absolute inset-0"
                    style={{ 
                        backgroundImage: `url(${backgroundImages[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.2) blur(3px)',
                        y: useTransform(smoothScrollY, [0.7, 1], ['-5%', '5%'])
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                                {t('home.cta.title')}
                            </h2>
                        </motion.div>
                        <motion.p 
                            className="text-xl text-gray-300 mb-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {t('home.cta.description')}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button 
                                size="lg" 
                                className="bg-white text-black hover:bg-black hover:text-white border-2 border-white group"
                            >
                                {t('home.cta.button')}
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;