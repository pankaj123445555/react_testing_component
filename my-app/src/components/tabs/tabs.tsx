import React, { useState, type ReactNode } from 'react';
import styles from './tabs.module.css';

interface Tab {
  id: number;
  name: string;
  content: string | ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  if (!tabs || tabs.length === 0) {
    return (
      <div className={styles['error-message']}>
        Error: At least one tab is required
      </div>
    );
  }

  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);

  const updateActiveTab = (tab: Tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className={styles['tab-cnt']}>
      <div className={styles['tab-wrapper-cnt']}>
        {tabs.map(item => {
          return (
            <div key={item.id} className={styles['tab-wrapper']}>
              <div
                onClick={() => updateActiveTab(item)}
                className={`${styles['each-tab']} ${item.id === selectedTab.id ? styles['active-tab'] : null}`}
              >
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles['tab-content']}>{selectedTab.content}</div>
    </div>
  );
};

export default Tabs;
