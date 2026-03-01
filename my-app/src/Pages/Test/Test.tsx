import styles from './Test.module.css';
import StopWatch from '../../components/stopWatch/stopWatch';

function TestComponent() {
  return (
    <div className={styles['container']}>
      <StopWatch />
    </div>
  );
}

export default TestComponent;
