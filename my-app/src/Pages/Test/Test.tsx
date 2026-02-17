import styles from './Test.module.css';
import AccordionComponent from '../../components/Accordion/Accordion';

function TestComponent() {
  return (
    <div className={styles['container']}>
      <AccordionComponent text="heading text">
        <div>
          <h1>this is our children component</h1>
        </div>
      </AccordionComponent>
    </div>
  );
}

export default TestComponent;
