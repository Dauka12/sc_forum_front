import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';

interface LogoProps {
    className?: string;
}

const Logo = ({ className }: LogoProps) => {
    return (
        <Link
            to="/"
            className={cn(
                "flex items-center justify-center font-bold text-3xl w-12 h-12 rounded-full border-2 border-black transition-all hover:scale-105",
                className
            )}
        >
            F
        </Link>
    );
};

export default Logo;