import React, { useState, useRef, useEffect } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue placeholder="选择选项">{value}</SelectValue>
      </SelectTrigger>
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                onSelect: (val: string) => {
                  onValueChange(val);
                  setIsOpen(false);
                }
              });
            }
            return child;
          })}
        </SelectContent>
      )}
    </div>
  );
};

export const SelectTrigger: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      onClick={onClick}
    >
      {children}
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

export const SelectValue: React.FC<{
  children: React.ReactNode;
  placeholder?: string;
}> = ({ children, placeholder }) => {
  return <span>{children || placeholder}</span>;
};

export const SelectContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg ${className}`}>
      <ul className="py-1 overflow-auto text-base max-h-60">
        {children}
      </ul>
    </div>
  );
};

export const SelectItem: React.FC<{
  value: string;
  children: React.ReactNode;
  onSelect?: (value: string) => void;
}> = ({ value, children, onSelect }) => {
  return (
    <li
      className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
      onClick={() => onSelect && onSelect(value)}
    >
      {children}
    </li>
  );
}; 