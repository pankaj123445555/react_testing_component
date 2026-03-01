import styles from './Test.module.css';
import FormComponent from '../../components/Form/Form';

function TestComponent() {
  return (
    <div className={styles['container']}>
      <FormComponent />
    </div>
  );
}

export default TestComponent;
