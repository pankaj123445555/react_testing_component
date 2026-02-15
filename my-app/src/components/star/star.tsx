import React, {useState,useEffect} from "react";
import styles from "./start.module.css"

const arr = [
    {
        id : 1,
        item : '*',
        color : 'black'
    },
    {
        id : 2,
        item : '*',
        color : 'black'
    },
    {
        id : 3,
        item : '*',
        color : 'black'
    },
    {
        id : 4,
        item : '*',
        color : 'black'
    },
    {
        id : 5,
        item : '*',
        color : 'black'
    },
    {
        id : 6,
        item : '*',
        color : 'black'
    },
]

const Star : React.FC = () =>{

    const [data,setData] = useState<any>([]);

    useEffect(()=>{
    setData(arr);
    },[]);

    const handleRatingChange = (item:any) =>{
       
        const filteredItem = data.map((it:any,index:number)=>{
                            if(it.id<=item.id)
                            {
                                return {
                                    ...it,
                                    color : 'yellow'
                                }
                            }
                            return {
                                ...it,
                                color: 'black   '
                            };
        })
         setData(filteredItem);
    }

    return (
        <div className={styles["star-cnt"]}>
            {
                data.map((item:any,index:any)=>{
                  return <span style={{color: item.color}} className= {styles["content"]} key={item.id} onClick={()=> handleRatingChange(item)}>{item.item}</span>
                })
            }
        </div>
    )
}

export default Star;