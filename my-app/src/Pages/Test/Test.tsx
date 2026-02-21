import styles from './Test.module.css';
import SingleSelectDropDown from '../../components/DropDown/Dropdown';

interface DropdownOption {
  value: string;
  label: string;
}

const dropdownOptions: DropdownOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
];

function TestComponent() {
  const handleDropdownChange = (value: string) => {
    console.log('Selected value:', value);
  };

  return (
    <div className={styles['container']}>
      <SingleSelectDropDown
        options={dropdownOptions}
        placeholder="Choose an option"
        onChange={handleDropdownChange}
      />
    </div>
  );
}

export default TestComponent;
