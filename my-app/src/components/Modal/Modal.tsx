import React from "react";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/modaloverlay";


 const Modal = ({closeModal}:any) =>{
    return (
        <ModalOverlay isVisible={true} onClose={closeModal}>
        <div className={styles["modal"]}>
            <div className={styles["close-btn"]}>
                <span onClick={closeModal}> X</span>
            </div>
            <div>
                <h1>Modal Component</h1>
            </div>
            <div>
                <p>This is modal content area</p>
            </div>
            <div>
                <button >Accept Offer</button>
            </div>
        </div>
         </ModalOverlay>
    )
 }

 export default Modal;