import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/utils/cn"

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border-2",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-transparent hover:text-primary border-primary",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-transparent hover:text-destructive border-destructive",
                outline:
                    "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-transparent hover:text-secondary-foreground border-secondary",
                ghost: "border-transparent hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline border-transparent",
                black: "bg-white text-black hover:bg-black hover:text-white border-black",
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-9 px-3 py-2",
                lg: "h-11 px-8 py-3",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
