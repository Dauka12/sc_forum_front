import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden relative">
            <Header />
            <main className="flex-grow pt-24 w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;