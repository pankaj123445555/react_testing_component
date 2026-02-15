import React, {useState} from "react";
import styles from "./Callback.module.css";


const ChildrenComponent = () =>{

    console.log('child re render');

    return <div>
        this is an children component
    </div>
}


const Callback = () =>{

    const [count,setCount] = useState<any>(0)

    console.log('parent re render')

    const updateName = () =>{
         console.log('name updated');
    }
    

    return (
        <div>
           <div onClick={()=> setCount(count+1)}>
            this is an call back parent component
            </div> 
            <div>
                <ChildrenComponent/>
            </div>
        </div>
    )
}

export default Callback;