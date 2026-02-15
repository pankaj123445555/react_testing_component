import React, {useState,useEffect} from "react";
import styles from "./otp.module.css";

const length = 6;

const otpData = [
    {
        id:1,
        value: ""
    },
     {
        id:2,
        value: ""
    },
     {
        id:3,
        value: ""
    },
     {
        id:4,
        value: ""
    },
     {
        id:5,
        value: ""
    },
     {
        id:6,
        value: ""
    },

];

const Otp : React.FC<any> = () =>{

    const [otps,setOtps] = useState<any>(otpData);

    const handleOtpChange = (e:any) =>{

        console.log(e.target.name,e.target.value)

     const updatedOtp = otps.map((item:any,index:number)=>{
        if(item.id==e.target.name)
        {
            return {
                ...item,
                value : e.target.value
            }
        }
        return item;
     })
    setOtps(updatedOtp);
    }
    return (
        <div className={styles["otp-cnt"]}>
             {
                otps.map((item:any,index:number)=>{
                    return (
                        <div className={styles["each-otp-box"]} key={item.id}>
                            <input onChange={(e)=> handleOtpChange(e)} name={item.id} value={item.value}/>
                        </div>
                    )
                })
             }
        </div>
    )
}

export default Otp;