import React, { useState } from 'react';
import styles from './Dropdown.module.css';

interface DropdownOption {
  value: string;
  label: string;
}

interface SingleSelectDropDownProps {
  options: DropdownOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

const SingleSelectDropDown: React.FC<SingleSelectDropDownProps> = ({
  options,
  placeholder = 'Select an option',
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div className={styles['dropdown-container']}>
      <select
        className={styles['dropdown-select']}
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="" className={styles['dropdown-option']}>
          {placeholder}
        </option>
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            className={styles['dropdown-option']}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SingleSelectDropDown;
