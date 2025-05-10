import { useTranslation } from 'react-i18next';
import Logo from './Logo';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-black text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Логотип и информация */}
                    <div className="flex flex-col items-center md:items-start">
                        <Logo className="bg-white text-black mb-4" />
                        <p className="text-sm opacity-70">
                            {t('footer.address')}
                        </p>
                        <p className="text-sm opacity-70">
                            {t('footer.phone')}
                        </p>
                        <p className="text-sm opacity-70">
                            {t('footer.workingHours')}
                        </p>
                    </div>

                    {/* Колонка 1 */}
                    <div>
                        <h3 className="font-bold mb-4 text-lg">Forum</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm opacity-70 hover:opacity-100">О нас</a></li>
                            <li><a href="#" className="text-sm opacity-70 hover:opacity-100">Новости</a></li>
                            <li><a href="#" className="text-sm opacity-70 hover:opacity-100">События</a></li>
                            <li><a href="#" className="text-sm opacity-70 hover:opacity-100">Вакансии</a></li>
                        </ul>
                    </div>

                    {/* Колонка 2 */}
                    <div>
                        <h3 className="font-bold mb-4 text-lg">Магазины</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm opacity-70 hover:opacity-100">Одежда</a></li>
                            <li><a href="#" className="text-sm opacity-70 hover:opacity-100">Электроника</a></li>
                            <li><a href="#" className="text-sm opacity-70 hover:opacity-100">Товары для дома</a></li>
                            <li><a href="#" className="text-sm opacity-70 hover:opacity-100">Рестораны и кафе</a></li>
                        </ul>
                    </div>

                    {/* Колонка 3 */}
                    <div>
                        <h3 className="font-bold mb-4 text-lg">Клиентам</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm opacity-70 hover:opacity-100">Как добраться</a></li>
                            <li><a href="#" className="text-sm opacity-70 hover:opacity-100">Парковка</a></li>
                            <li><a href="#" className="text-sm opacity-70 hover:opacity-100">Контакты</a></li>
                            <li><a href="#" className="text-sm opacity-70 hover:opacity-100">FAQ</a></li>
                        </ul>
                    </div>
                </div>

                {/* Соцсети */}
                <div className="flex justify-center mt-8 space-x-6">
                    <a href="#" className="opacity-70 hover:opacity-100">Instagram</a>
                    <a href="#" className="opacity-70 hover:opacity-100">Facebook</a>
                    <a href="#" className="opacity-70 hover:opacity-100">Telegram</a>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 pt-6 border-t border-white/20">
                    <p className="text-sm opacity-50">{t('footer.allRightsReserved')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;