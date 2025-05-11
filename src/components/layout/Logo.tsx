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
                "relative flex items-center justify-center font-bold text-3xl w-14 h-14 z-10",
                className
            )}
        >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse opacity-30"></span>
            <span className="absolute inset-0 rounded-full bg-white border-2 border-black"></span>
            <span className="relative z-10 bg-gradient-to-r from-black to-gray-800 text-transparent bg-clip-text">F</span>
            
            {/* Pulsing rings */}
            <span className="absolute inset-0 rounded-full border-2 border-black animate-ping opacity-20"></span>
            
            {/* Rotating border for visual interest */}
            <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <circle 
                    cx="50" 
                    cy="50" 
                    r="48" 
                    fill="none" 
                    stroke="rgba(0,0,0,0.2)" 
                    strokeWidth="1" 
                    strokeDasharray="1,5" 
                />
            </svg>
        </Link>
    );
};

export default Logo;