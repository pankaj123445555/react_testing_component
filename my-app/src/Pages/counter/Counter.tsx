import  {useState,useEffect} from "react";
import styles from "./Counter.module.css";

import CustomButton from "../../components/Button/button";


const counters = [
    {
        id: 1,
        title: "Counter 1",
        type: "action",
        value: 1
    },
    {
        id: 2,
        title: "Counter 2",
        type: "action",
        value: 2
    },
     {
        id: 3,
        title: "Counter 3",
        type: "action",
        value: 100
    },
    {
        id: 4,
        title: "Counter 4",
        type: "input",
        value: 0
    },
     {
        id: 5,
        title: "Counter 5",
        type: "action",
        value: -1
    },
    {
        id: 6,
        title: "Counter 5",
        type: "action",
        value: -5
    },
]

// Custom throttle implementation
function throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let lastCall = 0;
    return function(this: any, ...args: any[]) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    } as T;
}

const Counter = () => { 
    const [countervalue, setCountervalue] = useState(0);
    const [undoStack, setUndoStack] = useState<number[]>([]);
    const [redoStack, setRedoStack] = useState<number[]>([]);

    useEffect(()=>{
        console.log(countervalue);
    },[countervalue])

    const updateCounterValue = (value: number) => {
        setUndoStack((prev) => [...prev, countervalue]);
        setCountervalue((prev) => prev + value);
        setRedoStack([]); // Clear redo stack on new action
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value) || 0;
        setUndoStack((prev) => [...prev, countervalue]);
        setCountervalue(newValue);
        setRedoStack([]);
    };

    const handleReset = (data:any) => {
       console.log("reset",data);
    }

    // Throttled version of handleReset (1 second)
    const throttledHandleReset = throttle(handleReset, 1000);

    // Undo operation
    const handleUndo = () => {
        if (undoStack.length === 0) return;
        const prevValue = undoStack[undoStack.length - 1];
        setUndoStack((prev) => prev.slice(0, prev.length - 1));
        setRedoStack((prev) => [...prev, countervalue]);
        setCountervalue(prevValue);
    };

    // Redo operation
    const handleRedo = () => {
        if (redoStack.length === 0) return;
        const nextValue = redoStack[redoStack.length - 1];
        setRedoStack((prev) => prev.slice(0, prev.length - 1));
        setUndoStack((prev) => [...prev, countervalue]);
        setCountervalue(nextValue);
    };

    return (
        <div>
            <div className={styles["counters-list"]}>
                {
                    counters.map((counter) => {
                        return (
                            <div key={counter.id}>
                                
                                {counter.type === "action" ? (
                                    <div>
                                        <button onClick={()=> updateCounterValue(counter.value)} className={styles["counter-btn"]}>
                                        <span>{counter.value}</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles["input-counter"]}>
                                        <input
                                            type="number"
                                            value={countervalue}
                                            onChange={handleInputChange}
                                            className={styles["counter-input"]}
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })  
                }
            </div>
            <div className={styles["btn-cnt"]}>
                <button className={styles["btn"]} onClick={handleUndo} disabled={undoStack.length === 0}>Undo</button>
                <button className={styles["btn"]} onClick={handleRedo} disabled={redoStack.length === 0}>Redo</button>
            </div>
            <div className={styles["btn-cnt"]}>
                <CustomButton onClick={throttledHandleReset} className={styles["btn"]}>
                    <span>Custom Button</span>
                </CustomButton>
            </div>
        </div>
    )
}
export default Counter;