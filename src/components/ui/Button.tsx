"use client";

import { ReactNode } from "react";

type TButtonProps = {
  text: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<TButtonProps> = ({
  text,
  icon,
  className = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2
        px-6 py-3 rounded-lg
        bg-[#00455D] text-white
        hover:bg-white hover:text-[#00455D]
        transition-colors duration-300
        font-semibold
        ${className}
      `}
    >
      <span>{text}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
