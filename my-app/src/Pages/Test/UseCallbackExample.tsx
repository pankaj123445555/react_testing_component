import { useCallback, useState, memo } from 'react';
import styles from './UseCallbackExample.module.css';

// Child component that is memoized - will only re-render if props change
const ChildButton = memo(
  ({ onClick, label }: { onClick: () => void; label: string }) => {
    console.log(`ChildButton "${label}" rendered`);
    return <button className={styles['child-button']}>{label}</button>;
  }
);

// Component without useCallback - function recreated on every render
const WithoutUseCallback = () => {
  const [count, setCount] = useState(0);

  // This function is recreated every time component renders
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles['section']}>
      <h3>WITHOUT useCallback</h3>
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className={styles['increment-btn']}
      >
        Increment Count
      </button>

      <div className={styles['child-container']}>
        <ChildButton
          onClick={handleClick}
          label="Child Button (Re-renders every time)"
        />
      </div>
    </div>
  );
};

// Component with useCallback - function cached with dependency array
const WithUseCallback = () => {
  const [count, setCount] = useState(0);

  // This function is only recreated when count changes (only when state is used in function)
  const handleClick = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // Empty dependency array - function never changes

  return (
    <div className={styles['section']}>
      <h3>WITH useCallback (No Dependencies)</h3>
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className={styles['increment-btn']}
      >
        Increment Count
      </button>
      <p className={styles['description']}>
        ✓ ChildButton receives the same function reference, avoiding unnecessary
        re-renders
      </p>
      <div className={styles['child-container']}>
        <ChildButton
          onClick={handleClick}
          label="Child Button (Stable callback)"
        />
      </div>
    </div>
  );
};

// Component showing useCallback with dependencies
const UseCallbackWithDeps = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  // Function recreated when multiplier changes (dependency)
  const handleAllert = useCallback(() => {
    alert(`Count: ${count}, Multiplier: ${multiplier}`);
  }, [count, multiplier]); // Function recreates when these dependencies change

  return (
    <div className={styles['section']}>
      <h3>WITH useCallback (With Dependencies)</h3>
      <p>
        Count: {count} | Multiplier: {multiplier}
      </p>
      <div className={styles['button-group']}>
        <button
          onClick={() => setCount(count + 1)}
          className={styles['increment-btn']}
        >
          Increment Count
        </button>
        <button
          onClick={() => setMultiplier(multiplier + 1)}
          className={styles['increment-btn']}
        >
          Increment Multiplier
        </button>
      </div>
      <p className={styles['description']}>
        Function updates when count or multiplier changes. ChildButton
        re-renders only when callback changes.
      </p>
      <div className={styles['child-container']}>
        <ChildButton
          onClick={handleAllert}
          label="Show Alert (Uses dependencies)"
        />
      </div>
    </div>
  );
};

function UseCallbackExample() {
  return (
    <div className={styles['container']}>
      <h1>useCallback Hook Explained</h1>
      <p className={styles['intro']}>
        useCallback is a React hook that memonizes a function and returns the
        same function reference unless dependencies change. It's useful when
        passing callbacks to memoized child components.
      </p>

      <div className={styles['examples']}>
        <WithoutUseCallback />
        <WithUseCallback />
        <UseCallbackWithDeps />
      </div>
    </div>
  );
}

export default UseCallbackExample;
