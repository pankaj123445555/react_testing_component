import React from 'react';
import styles from './Accordion.module.css';
import { FaChevronDown } from 'react-icons/fa';

interface AccordionProps {
  text: string;
  children: React.ReactNode;
}

const AccordionComponent: React.FC<AccordionProps> = ({ text, children }) => {
  const [showContent, setShowContent] = React.useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div className={styles['accordion-cnt']}>
      <button 
        className={styles['accordion-header']}
        onClick={toggleContent}
      >
        <span className={styles['accordion-title']}>{text}</span>
        <span className={`${styles['accordion-icon']} ${showContent ? styles['icon-open'] : ''}`}>
          <FaChevronDown />
        </span>
      </button>
      <div className={`${styles['accordion-content']} ${showContent ? styles['content-open'] : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default AccordionComponent;
