/* eslint-disable react/prop-types */
import React from 'react';

const Button = ({ 
  color = "bg-blue-500", 
  size = "md", 
  children, 
  onClick, 
  className = "", 
  customSize = "" 
}) => {


  const sizes = {
    sm: "py-1 px-2 text-xs",
    md: "py-2 px-4 text-sm",
    lg: "py-3 px-6 text-lg"
  };

  return (
    <button
      onClick={onClick}
      className={` ${color} ${customSize || sizes[size]} text-white  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
