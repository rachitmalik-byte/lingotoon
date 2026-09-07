import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  onClick,
  as: Component = 'div',
  to
}) => {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  const baseClasses = `bg-white rounded-2xl shadow-sm ${paddings[padding]}`;
  const hoverClasses = hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';

  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <Component className={classes} onClick={onClick}>
      {children}
    </Component>
  );
};

export default Card;
