import React, { useState, useMemo, useEffect, useRef } from 'react';
import styles from './SearchDropDown.module.css';

interface SearchOption {
  value: string;
  label: string;
}

interface SearchDropDownProps {
  options?: SearchOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
  multiple?: boolean;
}

const SearchDropDown: React.FC<SearchDropDownProps> = ({
  options = [],
  placeholder = 'Search...',
  onChange,
  multiple,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<SearchOption[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    return options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleSelectOption = (option: SearchOption) => {
    setSearchTerm('');
    setSelectedValues((prev: SearchOption[]) => {
      const isAlreadySelected = prev.some(
        selected => selected.value === option.value
      );
      if (isAlreadySelected) {
        return prev.filter(selected => selected.value !== option.value);
      } else {
        return multiple ? [...prev, option] : [option];
      }
    });
    onChange?.(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles['search-dropdown-container']} ref={containerRef}>
      <input
        type="text"
        className={styles['search-input']}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className={styles['dropdown-menu']}>
          {filteredOptions.map(option => {
            const isSelected = selectedValues.some(
              selected => selected.value === option.value
            );
            return (
              <div
                key={option.value}
                className={`${styles['dropdown-item']} ${isSelected ? styles['selected'] : ''}`}
                onClick={() => handleSelectOption(option)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
      {isOpen && searchTerm && filteredOptions.length === 0 && (
        <div className={styles['no-results']}>No results found</div>
      )}
    </div>
  );
};

export default SearchDropDown;
