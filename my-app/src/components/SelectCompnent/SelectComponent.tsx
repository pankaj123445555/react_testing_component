import React, { useRef, useEffect, useState } from "react";
import styles from "./SelectComponent.module.css"

const SelectDropdown = ({onChange,items,handleSelectedItem,selecteList}:any) => { 
    const [showSuggestions, setShowSuggestions] = useState(true);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleInputFocus = () => {
        setShowSuggestions(true);
    };

    return (
        <div ref={wrapperRef}>
            <div>
                <div>
                    <div>
                        <div className={styles["input-cnt"]}>
                            <div className={styles["selected-items"]}>
                            {selecteList.map((item:any,index:number) => (
                                <div key={index} className={styles["selected-item"]}>
                                    <span>{item.name}</span>
                                    <span>X</span>
                                </div>
                            ))}
                            </div>
                            <div> <input type="text" onChange={onChange} onFocus={handleInputFocus} /></div>
                      
                       </div>
                 </div>
                 {showSuggestions && (
                    <div className={styles.suggestionBox}>
                    {
                        // Render suggested items here
                        items.map((item:any, index:number) => (
                            <div onClick={()=> handleSelectedItem(item)} className={styles["item"]} key={index}>{item.name}</div>
                        ))
                    }
                    </div>
                )}
                </div>
            </div>
        </div>
    )

}

export default SelectDropdown;