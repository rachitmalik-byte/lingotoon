import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-body font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-[#7C3AED] text-white hover:bg-[#5B21B6] shadow-md hover:shadow-lg focus:ring-[#7C3AED]",
    secondary: "bg-white text-[#7C3AED] border-2 border-[#7C3AED] hover:bg-[#F5F3FF] focus:ring-[#7C3AED]",
    ghost: "bg-transparent text-[#7C3AED] hover:bg-[#EDE9FE] focus:ring-[#7C3AED]",
    game: "bg-[#F97316] text-white hover:bg-[#EA580C] shadow-lg hover:shadow-xl focus:ring-[#F97316]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3 text-lg"
  };

  const roundedClass = variant === 'game' ? 'rounded-full' : 'rounded-xl';
  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <motion.button
      type={type}
      whileTap={!(disabled || loading) ? { scale: 0.95 } : {}}
      whileHover={!(disabled || loading) ? { scale: 1.02 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${roundedClass} ${disabledStyles} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      ) : Icon ? (
        <Icon className={`w-5 h-5 ${children ? 'mr-2' : ''}`} />
      ) : null}
      {children}
    </motion.button>
  );
};

export default Button;
