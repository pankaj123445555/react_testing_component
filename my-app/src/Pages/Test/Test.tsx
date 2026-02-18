import styles from './Test.module.css';
import Tabs from '../../components/tabs/tabs';
import SearchBar from '../../components/SearchBar/SearchBar';

interface Tab {
  id: number;
  name: string;
  content: string | React.ReactNode;
}

const tabs: Tab[] = [
  // {
  //   id: 1,
  //   name: 'tab1',
  //   content: <SearchBar />,
  // },
  // {
  //   id: 2,
  //   name: 'tab2',
  //   content: 'tab content 2',
  // },
  // {
  //   id: 3,
  //   name: 'tab3',
  //   content: 'tab content 3',
  // },
  // {
  //   id: 4,
  //   name: 'tab4',
  //   content: 'tab content 3',
  // },
];

function TestComponent() {
  return (
    <div className={styles['container']}>
      <Tabs tabs={tabs} />
    </div>
  );
}

export default TestComponent;
