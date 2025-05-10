import Layout from '@/components/layout/Layout';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Ленивая загрузка страниц
const Home = lazy(() => import('@/pages/Home'));
const StoresList = lazy(() => import('@/pages/StoresList'));

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center">Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="stores" element={<StoresList />} />
                        <Route path="store/:id" element={<div>Страница конкретного магазина (будет создана позже)</div>} />
                        <Route path="*" element={<div>Страница не найдена</div>} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRouter;