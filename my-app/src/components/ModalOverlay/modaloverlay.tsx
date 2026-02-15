import React, {useState,useEffect} from "react";

import styles from "./ModalOverlay.module.css";

const ModalOverlay: React.FC<{isVisible: boolean, onClose: ()=>void, children: React.ReactNode}> = ({isVisible, onClose, children}) => {
    
    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }
    
    if(!isVisible) return null;

    return (
        <div className={styles["overlay"]} onClick={handleClose}>
            
                {children}
            
        </div>
    )
}

export default ModalOverlay;
 