import React from 'react';
import styles from './pagination.module.css';

type PaginationProps = {
  totalItem: number;
  currentItem: number;
  changePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalItem,
  currentItem,
  changePage,
}) => {
  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalItem <= 7) {
      return Array.from({ length: totalItem }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentItem > 4) {
      pages.push('...');
    }

    const start = Math.max(2, currentItem - 1);
    const end = Math.min(totalItem - 1, currentItem + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentItem < totalItem - 3) {
      pages.push('...');
    }

    pages.push(totalItem);

    return pages;
  };

  const pages = getPages();

  const handlePrev = () => {
    if (currentItem > 1) {
      changePage(currentItem - 1);
    }
  };

  const handleNext = () => {
    if (currentItem < totalItem) {
      changePage(currentItem + 1);
    }
  };

  return (
    <div className={styles['main-cnt']}>
      <button
        onClick={handlePrev}
        disabled={currentItem === 1}
        className={styles.navBtn}
      >
        Prev
      </button>

      {pages.map((item, index) =>
        item === '...' ? (
          <span key={`dots-${index}`} className={styles.dots}>
            ...
          </span>
        ) : (
          <div
            key={item}
            onClick={() => changePage(item as number)}
            className={`${styles.tab} ${
              currentItem === item ? styles['active-tab'] : ''
            }`}
          >
            {item}
          </div>
        )
      )}

      <button
        onClick={handleNext}
        disabled={currentItem === totalItem}
        className={styles.navBtn}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
