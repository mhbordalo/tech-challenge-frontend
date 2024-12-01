interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
    variant?: "primary" | "warning" | "danger"
    size?: "sm" | "md" | "lg"
}

export function Button({children, variant = "primary", size = "md", className = "", ...props}: ButtonProps) {

    const baseClasses =
        "font-semibold text-xs uppercase rounded focus:outline-none focus:ring transition";
    const variantClasses = {
        primary: "bg-green-dark hover:bg-green-light text-white tracking-wider",
        warning: "bg-yellow-dark hover:bg-yellow-light text-white tracking-wider",
        danger: "bg-red-dark hover:bg-red-light text-white tracking-wider",
    };
    const sizeClasses = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
    } ${className}`;

    return(
        <button className={classes} {...props}>
            {children}
        </button>
    )
}