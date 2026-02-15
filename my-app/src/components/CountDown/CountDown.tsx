import React, { useState, useEffect } from "react";
import styles from "./CountDown.module.css";

const CountDown: React.FC = () => {

    const [Timer, setTimer] = useState({
        hh: 0,
        mm: 0,
        ss: 0
    })

    useEffect(()=>{
    console.log(Timer);
    },[Timer])

     
    const handleChnageTime = (e: any) => {
        
        let value = Number(e.target.value);
        if(!value)value=0
         setTimer((prev)=>{
            return {
                ...prev,
                [e.target.name] : value
            }
         })
    }

    return (
        <div>
            <div>
                <h1>Count Down Timer</h1>
            </div>
            <div className={styles["inputs-cnt"]}>
                <span>
                    <input min={0} max={10} type="number" onChange={handleChnageTime} placeholder='hh' className={styles["input-box"]} name="hh" value={Timer.hh} />
                 :
                </span>
                <span>   <input min={0} max={60} type="number" onChange={handleChnageTime} placeholder="mm" className={styles["input-box"]} name="mm" value={Timer.mm} /> :</span>
                <span> <input  min={0} max={60} type="number" onChange={handleChnageTime} placeholder="ss" className={styles["input-box"]} name="ss" value={Timer.ss} /> </span>
            </div>
            <div className={styles["btn-cnt"]}>
                <button className={styles["btn"]} onClick={handleStart} disabled={isRunning || (Timer.hh === 0 && Timer.mm === 0 && Timer.ss === 0)}>Start Time</button>
                <button className={styles["btn"]} onClick={handleStop} disabled={!isRunning}>Stop Time</button>
            </div>
        </div>
    )
}

export default CountDown;