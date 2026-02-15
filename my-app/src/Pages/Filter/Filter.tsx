import { useState } from 'react';
import ProductListing from '../../components/ProductListing/ProductListing';
import styles from './Filter.module.css';

const FilterComponent = ({ products }: any) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles['filter-cnt']}>
      <div>
        <input
          value={searchTerm}
          onChange={e => handleInputChange(e)}
          placeholder="Search products..."
        />
      </div>

      <div>
        <ProductListing products={filteredProducts} />
      </div>
    </div>
  );
};

export default FilterComponent;
