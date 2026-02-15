
import React from "react";
import styles from "./pagination.module.css";

type paginationProps = {
    totalItem: number,
    currentItem: number,
    changePage: (page: number) => void
}

const Pagination: React.FC<paginationProps> = ({ totalItem, currentItem, changePage }) => {
    return (
        <div className={styles["main-cnt"]}>
            {
                Array.from({ length: totalItem }, (_, idx) => idx + 1).map((item, index) => {
                    return (
                        <div
                            onClick={() => changePage(item)}
                            className={`${styles.tab} ${currentItem === item ? styles["active-tab"] : ""}`}
                        >
                            {item}
                        </div>

                    )
                })
            }
        </div>
    )
}

export default Pagination;