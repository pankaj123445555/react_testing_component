import styles from './Test.module.css';
import SearchDropDown from '../../components/SearchDropDown/SearchDropDown';

interface SearchOption {
  value: string;
  label: string;
}

const searchOptions: SearchOption[] = [
  { value: '1', label: 'Apple' },
  { value: '2', label: 'Banana' },
  { value: '3', label: 'Orange' },
  { value: '4', label: 'Mango' },
  { value: '5', label: 'Grapes' },
];

function TestComponent() {
  const handleSearchChange = (value: string) => {
    console.log('Selected value:', value);
  };

  return (
    <div className={styles['container']}>
      <SearchDropDown
        options={searchOptions}
        placeholder="Search fruits..."
        onChange={handleSearchChange}
        multiple={false}
      />
    </div>
  );
}

export default TestComponent;
