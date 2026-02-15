
import React, { use, useState } from "react";
import { useMemo } from "react";
import styles from "./Memo.module.css";


const Memo = () => {


    const [count,setCount] = useState<any>(0);

    const expensiveCalculation = () => {   

        let sum = 0;
        for (let i = 0; i < 1000000000; i++) {
            sum += i;
        }
        return sum;
    }

  const sum =   useMemo(expensiveCalculation, [count]);
    return (
        <div className={styles["memo-container"]}>
        this is an memo component -{sum}
        <div>
            <button onClick={()=>setCount(count+1)}> hey - {count}</button>
        </div>
        </div>
    )
};

export default Memo;