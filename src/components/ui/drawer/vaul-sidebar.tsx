import { cn } from '@/utils/cn';
import { X } from 'lucide-react';
import React, {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Drawer as VaulSidebar } from 'vaul';

interface DrawerContextProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const useSidebarDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return context;
};

interface DrawerSidebarProps {
    children: ReactNode;
    open?: boolean;
    setOpen?: (open: boolean) => void;
    direction?: 'left' | 'right';
    outsideClose?: boolean;
    className?: string;
    triggerClassName?: string;
    DefaultTrigger?: () => React.ReactNode;
}

export function SidebarDrawer({
    children,
    open: controlledOpen,
    setOpen: controlledSetOpen,
    direction = 'left',
    outsideClose = true,
    className,
    triggerClassName,
    DefaultTrigger,
}: DrawerSidebarProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setOpen =
        controlledSetOpen !== undefined ? controlledSetOpen : setInternalOpen;

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        const handleMediaChange = (event: MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        setIsDesktop(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleMediaChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
        };
    }, []);

    return (
        <DrawerContext.Provider value={{ open, setOpen }}>
            <>
                {DefaultTrigger && (
                    <div onClick={() => setOpen(true)} className={triggerClassName}>
                        {DefaultTrigger()}
                    </div>
                )}

                <VaulSidebar.Root
                    open={open}
                    direction={direction === 'right' ? 'right' : 'left'}
                    onOpenChange={setOpen}
                    dismissible={isDesktop ? false : true}
                    // Правильная настройка блокировки прокрутки
                    shouldScaleBackground={false}
                    modal={true}
                >
                    <VaulSidebar.Portal>
                        <VaulSidebar.Overlay
                            className='fixed inset-0 dark:bg-black/70 bg-black/40 backdrop-blur-sm z-50'
                            onClick={() => outsideClose && setOpen(false)}
                        />
                        <VaulSidebar.Content
                            className={cn(
                                `z-50 ${outsideClose
                                    ? 'sm:w-[350px] w-[85%] h-[100%]'
                                    : 'w-full h-[100%]'
                                } fixed bottom-0 ${direction === 'right' ? 'right-0' : 'left-0'
                                } transition-transform duration-300 border-none outline-none text-white`,
                                className || 'dark:bg-black/95 bg-black/95 backdrop-blur-md'
                            )}
                            onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                            <div className="w-full h-full">
                                {isDesktop ? (
                                    <>
                                        <button
                                            className='flex justify-end w-auto absolute right-4 top-4 rounded-full p-2 opacity-70 hover:opacity-100 hover:bg-white/10 focus:outline-none transition-opacity'
                                            onClick={() => setOpen(false)}
                                        >
                                            <X className="h-6 w-6 text-white" />
                                            <span className="sr-only">Close</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className={`absolute top-[40%] ${direction === 'right' ? 'left-2' : 'right-2'
                                                } mx-auto h-16 w-[0.30rem] flex-shrink-0 rounded-full bg-gray-600 my-4`}
                                        />
                                    </>
                                )}
                                {children}
                            </div>
                        </VaulSidebar.Content>
                    </VaulSidebar.Portal>
                </VaulSidebar.Root>
            </>
        </DrawerContext.Provider>
    );
}

export function DrawerContent({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
