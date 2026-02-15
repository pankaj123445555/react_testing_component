import React,{useState} from "react";
import styles from "./timer.module.css"

const Timer : React.FC<any> = ({name,id}:{
    name: string,
    id:string
}) =>{

     console.log(name,id);

    const [clock,setClock] = useState<any>({
        mm: 0,
        ss : 0
    });

    const [timerId,setTimerId] = useState<any>(null);

    const startTime = () =>{
     const id =   setInterval(()=>{
            setClock((prev:any)=>{
                return {
                    mm : prev.ss===59?prev.mm+1:prev.mm,
                    ss : (prev.ss+1)%60
                }
            })

        },1000);

        setTimerId(id);
    }

    const stopTime = () =>{
    clearInterval(timerId);
    }


    return (
        <div className={styles["timer-cnt"]}>
            this is an timer component
            <div className={styles["time"]}>
             <span>{clock.mm}</span>
             <span> : </span>
             <span>{clock.ss}</span>
            </div>

            <div>
                <button onClick={()=> startTime()} className= {styles["btn"]}>Start Time</button>

                 <button onClick={()=> stopTime()} className= {styles["btn"]}>Stop Time</button>
            </div>
        </div>
    )
}

export default Timer;