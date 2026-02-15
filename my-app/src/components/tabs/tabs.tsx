import React,{useState} from "react";
import styles from "./tabs.module.css";

import data from "../../assets/data/tabs.json";


const Tabs : React.FC = () =>{

    const [allTabs,setAllTabs] = useState(data.tabs);

    const [selectedTabId,setSelectedTabId] = useState<any>(1);

    const updateActiveTab = (tab:any) =>{
        console.log('tab',tab);
        setSelectedTabId(tab.id);
    }
     
    return (
        <div className={styles["tab-cnt"]}>
           {
               allTabs.map((item,index)=>{
                return (
                    <div onClick={()=>updateActiveTab(item)}  key = {item.id} className={`${styles["each-tab"]} ${item.id===selectedTabId ? styles['active-tab']:null}`}>{item.name}</div>
                )
               })
           }
        </div>
    )
}

export default Tabs;