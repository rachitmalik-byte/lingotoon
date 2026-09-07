import React from 'react';

const Badge = ({
  label,
  color = 'purple',
  size = 'md',
  variant = 'solid',
  className = ''
}) => {
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm"
  };

  const colorMap = {
    purple: { solid: "bg-[#7C3AED] text-white", soft: "bg-[#EDE9FE] text-[#7C3AED]" },
    blue: { solid: "bg-[#3B82F6] text-white", soft: "bg-[#DBEAFE] text-[#3B82F6]" },
    green: { solid: "bg-[#22C55E] text-white", soft: "bg-[#DCFCE7] text-[#22C55E]" },
    orange: { solid: "bg-[#F97316] text-white", soft: "bg-[#FFF7ED] text-[#F97316]" },
    yellow: { solid: "bg-[#FACC15] text-white", soft: "bg-[#FEF9C3] text-[#ca8a04]" }
  };

  const colors = colorMap[color] || colorMap.purple;
  const style = colors[variant] || colors.solid;

  return (
    <span className={`inline-flex items-center justify-center font-body font-semibold rounded-full ${sizes[size]} ${style} ${className}`}>
      {label}
    </span>
  );
};

export default Badge;
