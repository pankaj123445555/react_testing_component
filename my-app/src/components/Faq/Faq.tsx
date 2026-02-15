import React from "react";
import styles from "./Faq.module.css";

const Faq: React.FC<any> = ({text,subText,isHide,toggleHide}:any) => {
    return (
        <div className={styles["faq-cnt"]}>
             <div>
                <div onClick={()=> toggleHide()} className={styles["text"]}>
                    <span>{text}</span>
                </div>
                <div className={styles["sub-text-cnt"]}>
                    {!isHide && <div className={styles["sub-text"]}>{subText}</div>}
                </div>
             </div>
        </div>
    )
}

export default Faq;