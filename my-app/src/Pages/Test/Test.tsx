import React, { useState } from 'react';
import styles from './Test.module.css';
import Pagination from '../../components/pagination/pagination';

function TestComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles['container']}>
      <Pagination
        totalItem={25}
        currentItem={currentPage}
        changePage={changePage}
      />
    </div>
  );
}

export default TestComponent;
