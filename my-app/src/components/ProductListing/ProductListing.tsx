import React from 'react';
import styles from './ProductListing.module.css';

const ProductListing = ({ products }: any) => {
  if (!products.length) {
    return <p className={styles.empty}>No products found</p>;
  }

  return (
    <div className={styles.grid}>
      {products.map((product: any) => (
        <div key={product.id} className={styles.card}>
          <div className={styles.header}>
            <h3 className={styles.name}>{product.name}</h3>
            {!product.inStock && (
              <span className={styles.outOfStock}>Out of stock</span>
            )}
          </div>

          <p className={styles.category}>{product.category}</p>

          <div className={styles.footer}>
            <span className={styles.price}>₹{product.price}</span>
            <button className={styles.button} disabled={!product.inStock}>
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
