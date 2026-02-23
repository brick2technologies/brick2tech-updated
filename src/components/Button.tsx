import { type ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline';
}

export function CustomButton({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "bg-[#142c4c] text-white hover:bg-[#1c3d6a] hover:shadow-lg hover:shadow-[#142c4c]/20",
    outline: "border-2 border-[#142c4c] text-[#142c4c] hover:bg-[#142c4c] hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}