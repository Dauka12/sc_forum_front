import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="black"
                        size="sm"
                        className="font-semibold"
                    >
                        <span>
                            {i18n.language === 'ru' ? 'RUS' :
                                i18n.language === 'en' ? 'ENG' :
                                    i18n.language === 'kk' ? 'KAZ' : 'RUS'}
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="animate-in slide-in-from-top-1"
                    sideOffset={8}
                    avoidCollisions={false}
                    forceMount
                >
                    <DropdownMenuItem onClick={() => changeLanguage('en')}
                        className="cursor-pointer hover:bg-accent transition-colors">
                        English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage('ru')}
                        className="cursor-pointer hover:bg-accent transition-colors">
                        Русский
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage('kk')}
                        className="cursor-pointer hover:bg-accent transition-colors">
                        Қазақша
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LanguageSwitcher;